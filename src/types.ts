export interface AsyncTaskErrorShape {
  code: string;
  message: string;
  kind: "abort" | "network" | "business" | "unknown";
  stepId?: string;
  phase?: string;
  cause?: unknown;
  aborted: boolean;
}

export type TaskStatus = "idle" | "running" | "success" | "error" | "aborted";

export interface TaskState<T = unknown, M extends Record<string, unknown> = Record<string, unknown>> {
  status: TaskStatus;
  loading: boolean;
  data: T | undefined;
  error: import("./errors").AsyncTaskError | null;
  meta: M;
  startedAt: number | null;
  endedAt: number | null;
}

export interface TaskResult<T = unknown, M extends Record<string, unknown> = Record<string, unknown>> {
  status: Exclude<TaskStatus, "idle" | "running">;
  data: T | undefined;
  error: import("./errors").AsyncTaskError | null;
  meta: M;
}

export interface TaskContext<I = unknown, M extends Record<string, unknown> = Record<string, unknown>> {
  params: I;
  signal: AbortSignal;
  setMeta: (patch: Partial<M>) => void;
  getMeta: () => M;
}

export type TaskFn<I = unknown, O = unknown, M extends Record<string, unknown> = Record<string, unknown>> = (
  ctx: TaskContext<I, M>
) => O | Promise<O>;

export interface TaskRunConfig<I = unknown, M extends Record<string, unknown> = Record<string, unknown>> {
  params?: I;
  signal?: AbortSignal;
  meta?: M;
}

export interface TaskRunOptions {
  signal?: AbortSignal;
}

export interface TaskHandleSimple<T = unknown, M extends Record<string, unknown> = Record<string, unknown>> {
  readonly id: string;
  readonly result: Promise<TaskResult<T, M>>;
  cancel: (reason?: string) => void;
  onState: (listener: (state: TaskState<T, M>) => void) => () => void;
  getState: () => TaskState<T, M>;
}

export interface ParallelTaskContext<I = unknown> {
  params: I;
  signal: AbortSignal;
  index: number;
}

export type ParallelTask<I = unknown, O = unknown> = (
  ctx: ParallelTaskContext<I>
) => O | Promise<O>;

export interface ParallelRunOptions extends TaskRunOptions {
  concurrency?: number;
  mode?: "fail-fast" | "collect-all";
  signal?: AbortSignal;
}

export interface RunnerOptions {
  concurrency?: number;
  mode?: "fail-fast" | "collect-all";
}
