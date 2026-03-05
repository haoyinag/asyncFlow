import type {
  FlowInputObject,
  FlowMode,
  GroupNodeInput,
  StepHandler,
  StepNodeInput,
  TaskInput
} from "./types";

export function step<I = unknown>(run: StepHandler<I>, id?: string): StepNodeInput<I> {
  return id ? { id, run } : { run };
}

export function group<I = unknown>(mode: FlowMode, tasks: TaskInput<I>[], id?: string): GroupNodeInput<I> {
  return id ? { id, mode, tasks } : { mode, tasks };
}

export function deferGroup<I = unknown>(tasks: TaskInput<I>[], id?: string): GroupNodeInput<I> {
  return group("defer", tasks, id);
}

export function asyncGroup<I = unknown>(tasks: TaskInput<I>[], id?: string): GroupNodeInput<I> {
  return group("async", tasks, id);
}

export function deferFlow<I = unknown>(tasks: TaskInput<I>[], id?: string): FlowInputObject<I> {
  return id ? { id, mode: "defer", tasks } : { mode: "defer", tasks };
}

export function asyncFlow<I = unknown>(tasks: TaskInput<I>[], id?: string): FlowInputObject<I> {
  return id ? { id, mode: "async", tasks } : { mode: "async", tasks };
}
