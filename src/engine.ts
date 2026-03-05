import { ConcurrencyGate } from "./concurrency";
import { AsyncFlowError, makeAbortError, toFlowError } from "./errors";
import { normalizeFlowInput } from "./normalize";
import { createListenerStore, emitState, lastValue, makePrev, pickValue, resultsValue } from "./state";
import type {
  EngineOptions,
  FlowContext,
  FlowDef,
  FlowResult,
  FlowState,
  FlowTemplate,
  GroupEnvelope,
  GroupNode,
  NodeEnvelope,
  NodeInput,
  PrevValue,
  RunOptions,
  Runtime,
  StepEnvelope,
  StepNode,
  TaskHandle,
  TaskInput
} from "./types";

const defaultRunOptions: Required<Pick<RunOptions, "abortOnError" | "concurrency">> = {
  abortOnError: true,
  concurrency: 8
};

function now() {
  return Date.now();
}

export class AsyncFlowEngine {
  private gate = new ConcurrencyGate();
  private defaults: Required<Pick<RunOptions, "abortOnError" | "concurrency">>;

  constructor(options: EngineOptions = {}) {
    this.defaults = {
      abortOnError: options.abortOnError ?? defaultRunOptions.abortOnError,
      concurrency: options.concurrency ?? defaultRunOptions.concurrency
    };
  }

  createFlow<I = unknown>(input: import("./types").FlowInputObject<I> | TaskInput<I>[], options: RunOptions = {}): FlowTemplate<I> {
    const def = normalizeFlowInput(input);
    return {
      id: def.id,
      run: (runtimeInput?: I, runOptions?: RunOptions) => {
        return this.runCompiledFlow(def, runtimeInput, {
          ...options,
          ...runOptions
        });
      }
    };
  }

  runFlow<I = unknown>(input: import("./types").FlowInputObject<I> | TaskInput<I>[], runtimeInput?: I, options: RunOptions = {}): TaskHandle {
    const def = normalizeFlowInput(input);
    return this.runCompiledFlow(def, runtimeInput, options);
  }

  private runCompiledFlow<I>(def: FlowDef<I>, runtimeInput: I | undefined, options: RunOptions): TaskHandle {
    const merged = {
      abortOnError: options.abortOnError ?? this.defaults.abortOnError,
      concurrency: options.concurrency ?? this.defaults.concurrency
    };

    const taskId = `${def.id}:task:${Math.random().toString(36).slice(2, 9)}`;
    const listenerStore = createListenerStore();
    const controller = new AbortController();

    if (options.signal) {
      if (options.signal.aborted) {
        controller.abort(options.signal.reason);
      } else {
        options.signal.addEventListener("abort", () => controller.abort(options.signal?.reason), { once: true });
      }
    }

    const runtime: Runtime = {
      flowId: def.id,
      input: runtimeInput,
      controller,
      options: merged,
      envelopes: {},
      emitEvent: (event) => {
        listenerStore.state.lastEvent = event;
        emitState(listenerStore);
      }
    };

    listenerStore.state.status = "running";
    listenerStore.state.loading = true;
    listenerStore.state.startedAt = now();
    emitState(listenerStore);

    const result = (async (): Promise<FlowResult> => {
      runtime.emitEvent({ type: "flow:start", flowId: def.id, at: now() });
      try {
        const root = await this.executeGroup(
          {
            kind: "group",
            id: `${def.id}:root`,
            mode: def.mode,
            tasks: def.tasks as NodeInput<unknown>[]
          },
          undefined,
          runtime
        );

        listenerStore.state.status = "success";
        listenerStore.state.loading = false;
        listenerStore.state.data = root;
        listenerStore.state.endedAt = now();
        runtime.emitEvent({ type: "flow:end", flowId: def.id, at: now() });

        return {
          status: "success",
          data: root,
          error: null,
          envelopes: runtime.envelopes
        };
      } catch (error) {
        const flowError =
          error instanceof AsyncFlowError
            ? error
            : new AsyncFlowError({
                code: "FLOW_ERROR",
                message: error instanceof Error ? error.message : String(error),
                phase: "flow",
                cause: error,
                aborted: false
              });

        listenerStore.state.status = flowError.aborted ? "aborted" : "error";
        listenerStore.state.loading = false;
        listenerStore.state.error = flowError;
        listenerStore.state.endedAt = now();
        runtime.emitEvent({ type: "flow:end", flowId: def.id, at: now() });

        return {
          status: flowError.aborted ? "aborted" : "error",
          data: undefined,
          error: flowError,
          envelopes: runtime.envelopes
        };
      } finally {
        controller.abort("completed");
      }
    })();

    return {
      id: taskId,
      result,
      cancel: (reason?: string) => {
        if (!controller.signal.aborted) controller.abort(reason ?? "manual_cancel");
      },
      onState: (listener: (state: FlowState) => void) => {
        listenerStore.listeners.add(listener);
        listener({ ...listenerStore.state });
        return () => listenerStore.listeners.delete(listener);
      },
      getState: () => ({ ...listenerStore.state })
    };
  }

  private async executeNode(node: NodeInput<unknown>, prev: PrevValue | undefined, runtime: Runtime): Promise<NodeEnvelope> {
    if (node.kind === "step") return this.executeStep(node, prev, runtime);
    return this.executeGroup(node, prev, runtime);
  }

  private async executeStep(node: StepNode<unknown>, prev: PrevValue | undefined, runtime: Runtime): Promise<StepEnvelope> {
    const startedAt = now();

    if (runtime.controller.signal.aborted) {
      const abortedEnvelope: StepEnvelope = {
        kind: "step",
        id: node.id,
        ok: false,
        aborted: true,
        status: "aborted",
        error: makeAbortError("Step skipped because flow is aborted", node.id),
        startedAt,
        endedAt: now(),
        duration: now() - startedAt
      };
      runtime.envelopes[node.id] = abortedEnvelope;
      runtime.emitEvent({ type: "step:abort", flowId: runtime.flowId, nodeId: node.id, at: now() });
      throw abortedEnvelope.error;
    }

    runtime.emitEvent({ type: "step:start", flowId: runtime.flowId, nodeId: node.id, at: startedAt });
    const release = await this.gate.acquire(runtime.options.concurrency, runtime.controller.signal);

    try {
      const ctx: FlowContext<unknown> = {
        input: runtime.input,
        signal: runtime.controller.signal,
        prev,
        meta: {
          flowId: runtime.flowId,
          nodeId: node.id
        },
        last: () => lastValue(prev),
        pick: (id: string) => pickValue(runtime.envelopes, id),
        results: () => resultsValue(runtime.envelopes)
      };

      const data = await node.run(ctx);
      const endedAt = now();
      const envelope: StepEnvelope = {
        kind: "step",
        id: node.id,
        ok: true,
        aborted: false,
        status: "fulfilled",
        data,
        startedAt,
        endedAt,
        duration: endedAt - startedAt
      };
      runtime.envelopes[node.id] = envelope;
      runtime.emitEvent({ type: "step:success", flowId: runtime.flowId, nodeId: node.id, at: endedAt });
      return envelope;
    } catch (error) {
      const endedAt = now();
      const flowError = runtime.controller.signal.aborted ? makeAbortError("Step aborted", node.id, error) : toFlowError(error, node.id, "step");

      const envelope: StepEnvelope = {
        kind: "step",
        id: node.id,
        ok: false,
        aborted: flowError.aborted,
        status: flowError.aborted ? "aborted" : "rejected",
        error: flowError,
        startedAt,
        endedAt,
        duration: endedAt - startedAt
      };
      runtime.envelopes[node.id] = envelope;
      runtime.emitEvent({ type: flowError.aborted ? "step:abort" : "step:error", flowId: runtime.flowId, nodeId: node.id, at: endedAt });

      if (!flowError.aborted && runtime.options.abortOnError) {
        runtime.controller.abort(flowError);
      }

      throw flowError;
    } finally {
      release();
    }
  }

  private async executeGroup(node: GroupNode<unknown>, prev: PrevValue | undefined, runtime: Runtime): Promise<GroupEnvelope> {
    const startedAt = now();
    runtime.emitEvent({ type: "group:start", flowId: runtime.flowId, nodeId: node.id, at: startedAt });

    const byIndex: NodeEnvelope[] = [];
    const byId: Record<string, NodeEnvelope> = {};
    let success = 0;
    let failed = 0;
    let canceled = 0;

    const finalizeAndMaybeThrow = (error?: AsyncFlowError) => {
      const endedAt = now();
      const status: GroupEnvelope["status"] = failed > 0 ? "rejected" : canceled > 0 ? "aborted" : "fulfilled";

      const envelope: GroupEnvelope = {
        kind: "group",
        id: node.id,
        ok: status === "fulfilled",
        aborted: status === "aborted",
        status,
        mode: node.mode,
        total: node.tasks.length,
        success,
        failed,
        canceled,
        byIndex,
        byId,
        error,
        startedAt,
        endedAt,
        duration: endedAt - startedAt
      };

      runtime.envelopes[node.id] = envelope;
      runtime.emitEvent({ type: "group:end", flowId: runtime.flowId, nodeId: node.id, at: endedAt });
      if (error) throw error;
      return envelope;
    };

    if (node.mode === "defer") {
      let cursorPrev = prev;
      for (const child of node.tasks) {
        try {
          const out = await this.executeNode(child, cursorPrev, runtime);
          byIndex.push(out);
          byId[out.id] = out;
          if (out.status === "fulfilled") success += 1;
          if (out.status === "rejected") failed += 1;
          if (out.status === "aborted") canceled += 1;
          cursorPrev = makePrev(out);
        } catch (error) {
          const e = error instanceof AsyncFlowError ? error : toFlowError(error, child.id, "group");
          const known = runtime.envelopes[child.id];
          if (known) {
            byIndex.push(known);
            byId[known.id] = known;
            if (known.status === "aborted") canceled += 1;
            if (known.status === "rejected") failed += 1;
          }
          return finalizeAndMaybeThrow(e);
        }
      }

      return finalizeAndMaybeThrow();
    }

    const settled = await Promise.all(
      node.tasks.map(async (child) => {
        try {
          const out = await this.executeNode(child, prev, runtime);
          return { child, out } as const;
        } catch (error) {
          const known = runtime.envelopes[child.id];
          if (known) return { child, out: known, error } as const;
          const e = error instanceof AsyncFlowError ? error : toFlowError(error, child.id, "group");
          const synthetic: StepEnvelope = {
            kind: "step",
            id: child.id,
            ok: false,
            aborted: e.aborted,
            status: e.aborted ? "aborted" : "rejected",
            error: e,
            startedAt,
            endedAt: now(),
            duration: now() - startedAt
          };
          runtime.envelopes[child.id] = synthetic;
          return { child, out: synthetic, error } as const;
        }
      })
    );

    let firstError: AsyncFlowError | undefined;

    for (const item of settled) {
      byIndex.push(item.out);
      byId[item.out.id] = item.out;
      if (item.out.status === "fulfilled") success += 1;
      if (item.out.status === "rejected") {
        failed += 1;
        if (!firstError) {
          firstError =
            item.out.error ??
            new AsyncFlowError({
              code: "GROUP_CHILD_ERROR",
              message: "Group child rejected",
              stepId: item.out.id,
              phase: "group",
              aborted: false
            });
        }
      }
      if (item.out.status === "aborted") {
        canceled += 1;
        if (!firstError && runtime.options.abortOnError) {
          firstError = item.out.error ?? makeAbortError("Group child aborted", item.out.id);
        }
      }
    }

    if (firstError && runtime.options.abortOnError) {
      return finalizeAndMaybeThrow(firstError);
    }

    return finalizeAndMaybeThrow();
  }
}

export function createAsyncFlow(options: EngineOptions = {}) {
  const engine = new AsyncFlowEngine(options);
  return {
    createFlow: engine.createFlow.bind(engine),
    runFlow: engine.runFlow.bind(engine)
  };
}
