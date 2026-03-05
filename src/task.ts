import { AsyncFlowError, makeAbortError, toFlowError } from "./errors";
import type {
  TaskContext,
  TaskFn,
  TaskHandleSimple,
  TaskResult,
  TaskRunConfig,
  TaskState
} from "./types";

let taskCounter = 0;

function now() {
  return Date.now();
}

function createInitialState<T, M extends Record<string, unknown>>(meta: M): TaskState<T, M> {
  return {
    status: "idle",
    loading: false,
    data: undefined,
    error: null,
    meta,
    startedAt: null,
    endedAt: null
  };
}

function attachSignal(parent?: AbortSignal) {
  const controller = new AbortController();
  if (!parent) return controller;

  if (parent.aborted) {
    controller.abort(parent.reason);
  } else {
    parent.addEventListener("abort", () => controller.abort(parent.reason), { once: true });
  }
  return controller;
}

export function runTask<I = unknown, O = unknown, M extends Record<string, unknown> = Record<string, unknown>>(
  taskFn: TaskFn<I, O, M>,
  config?: TaskRunConfig<I, M>
): TaskHandleSimple<O, M> {
  const parsed = {
    params: config?.params,
    signal: config?.signal,
    meta: (config?.meta ?? ({} as M))
  };

  const id = `task_${++taskCounter}`;
  const controller = attachSignal(parsed.signal);
  const meta = parsed.meta;

  const listeners = new Set<(state: TaskState<O, M>) => void>();
  const state = createInitialState<O, M>(meta);

  const emit = () => {
    const snapshot: TaskState<O, M> = { ...state, meta: { ...state.meta } };
    for (const l of listeners) l(snapshot);
  };

  const setMeta = (patch: Partial<M>) => {
    state.meta = { ...state.meta, ...patch };
    emit();
  };

  state.status = "running";
  state.loading = true;
  state.startedAt = now();
  emit();

  const result = (async (): Promise<TaskResult<O, M>> => {
    try {
      const ctx: TaskContext<I, M> = {
        params: parsed.params as I,
        signal: controller.signal,
        setMeta,
        getMeta: () => ({ ...state.meta })
      };

      const data = await taskFn(ctx);
      state.status = "success";
      state.loading = false;
      state.data = data;
      state.endedAt = now();
      emit();

      return {
        status: "success",
        data,
        error: null,
        meta: { ...state.meta }
      };
    } catch (error) {
      const err = controller.signal.aborted
        ? makeAbortError("Task aborted", undefined, error)
        : error instanceof AsyncFlowError
          ? error
          : toFlowError(error, "runTask", "task");

      state.status = err.aborted ? "aborted" : "error";
      state.loading = false;
      state.error = err;
      state.endedAt = now();
      emit();

      return {
        status: err.aborted ? "aborted" : "error",
        data: undefined,
        error: err,
        meta: { ...state.meta }
      };
    } finally {
      controller.abort("completed");
    }
  })();

  return {
    id,
    result,
    cancel: (reason?: string) => {
      if (!controller.signal.aborted) controller.abort(reason ?? "manual_cancel");
    },
    onState: (listener) => {
      listeners.add(listener);
      listener({ ...state, meta: { ...state.meta } });
      return () => listeners.delete(listener);
    },
    getState: () => ({ ...state, meta: { ...state.meta } })
  };
}
