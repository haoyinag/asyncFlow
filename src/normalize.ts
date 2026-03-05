import { AsyncFlowError } from "./errors";
import type { FlowDef, FlowInputObject, FlowMode, NodeInput, TaskInput } from "./types";

let flowCounter = 0;

function toMode(mode: FlowMode | undefined): FlowMode {
  if (!mode) return "defer";
  if (mode === "defer" || mode === "async") return mode;
  return "defer";
}

export function normalizeFlowInput<I>(input: FlowInputObject<I> | TaskInput<I>[], flowId?: string): FlowDef<I> {
  const effectiveFlowId = flowId ?? `flow_${++flowCounter}`;

  if (Array.isArray(input)) {
    const asyncGroup = normalizeTask(input, [0], effectiveFlowId);
    if (asyncGroup.kind !== "group") {
      throw new Error("array input must normalize to a group");
    }

    return {
      id: effectiveFlowId,
      mode: "defer",
      tasks: [asyncGroup]
    };
  }

  const mode = toMode(input.mode);
  const tasks = input.tasks.map((task, index) => normalizeTask(task, [index], effectiveFlowId));

  return {
    id: input.id ?? effectiveFlowId,
    mode,
    tasks
  };
}

export function normalizeTask<I>(task: TaskInput<I>, path: number[], flowId: string): NodeInput<I> {
  if (Array.isArray(task)) {
    const id = `${flowId}:g:${path.join("-")}`;
    return {
      kind: "group",
      id,
      mode: "async",
      tasks: task.map((child, index) => normalizeTask(child, [...path, index], flowId))
    };
  }

  if (typeof task === "function") {
    return {
      kind: "step",
      id: `${flowId}:s:${path.join("-")}`,
      run: task
    };
  }

  if (typeof task === "object" && task !== null) {
    if ("run" in task && typeof task.run === "function") {
      return {
        kind: "step",
        id: task.id ?? `${flowId}:s:${path.join("-")}`,
        run: task.run
      };
    }

    if ("tasks" in task && Array.isArray(task.tasks)) {
      return {
        kind: "group",
        id: task.id ?? `${flowId}:g:${path.join("-")}`,
        mode: toMode(task.mode),
        tasks: task.tasks.map((child, index) => normalizeTask(child, [...path, index], flowId))
      };
    }
  }

  throw new AsyncFlowError({
    code: "INVALID_TASK",
    message: `Invalid task input at path ${path.join(".")}`,
    phase: "normalize",
    aborted: false
  });
}
