export type FlowMode = "defer" | "async";
export type FlowStatus = "idle" | "running" | "success" | "error" | "aborted";

export interface AsyncFlowErrorShape {
  code: string;
  message: string;
  stepId?: string;
  phase?: string;
  cause?: unknown;
  aborted: boolean;
}

export interface NodeTiming {
  startedAt: number;
  endedAt: number;
  duration: number;
}

export interface StepEnvelope extends NodeTiming {
  kind: "step";
  id: string;
  ok: boolean;
  aborted: boolean;
  status: "fulfilled" | "rejected" | "aborted";
  data?: unknown;
  error?: import("./errors").AsyncFlowError;
}

export interface GroupEnvelope extends NodeTiming {
  kind: "group";
  id: string;
  ok: boolean;
  aborted: boolean;
  status: "fulfilled" | "rejected" | "aborted";
  mode: FlowMode;
  total: number;
  success: number;
  failed: number;
  canceled: number;
  byIndex: NodeEnvelope[];
  byId: Record<string, NodeEnvelope>;
  error?: import("./errors").AsyncFlowError;
}

export type NodeEnvelope = StepEnvelope | GroupEnvelope;

export type PrevValue =
  | { type: "single"; value: StepEnvelope }
  | { type: "group"; value: GroupEnvelope };

export interface FlowContext<I = unknown> {
  input: I;
  signal: AbortSignal;
  prev?: PrevValue;
  meta: {
    flowId: string;
    nodeId: string;
  };
  last: () => unknown;
  pick: (id: string) => unknown;
  results: () => Record<string, unknown>;
}

export type StepHandler<I = unknown> = (ctx: FlowContext<I>) => unknown | Promise<unknown>;

export interface StepNodeInput<I = unknown> {
  id?: string;
  run: StepHandler<I>;
}

export interface GroupNodeInput<I = unknown> {
  id?: string;
  mode: FlowMode;
  tasks: TaskInput<I>[];
}

export interface FlowInputObject<I = unknown> {
  id?: string;
  mode?: FlowMode;
  tasks: TaskInput<I>[];
}

export type TaskInput<I = unknown> =
  | StepHandler<I>
  | StepNodeInput<I>
  | GroupNodeInput<I>
  | TaskInput<I>[];

export interface StepNode<I = unknown> {
  kind: "step";
  id: string;
  run: StepHandler<I>;
}

export interface GroupNode<I = unknown> {
  kind: "group";
  id: string;
  mode: FlowMode;
  tasks: NodeInput<I>[];
}

export type NodeInput<I = unknown> = StepNode<I> | GroupNode<I>;

export interface FlowDef<I = unknown> {
  id: string;
  mode: FlowMode;
  tasks: NodeInput<I>[];
}

export interface FlowEvent {
  type:
    | "flow:start"
    | "flow:end"
    | "step:start"
    | "step:success"
    | "step:error"
    | "step:abort"
    | "group:start"
    | "group:end";
  flowId: string;
  nodeId?: string;
  at: number;
}

export interface FlowState {
  status: FlowStatus;
  loading: boolean;
  data: unknown;
  error: import("./errors").AsyncFlowError | null;
  startedAt: number | null;
  endedAt: number | null;
  lastEvent: FlowEvent | null;
}

export interface FlowResult {
  status: Exclude<FlowStatus, "idle" | "running">;
  data: unknown;
  error: import("./errors").AsyncFlowError | null;
  envelopes: Record<string, NodeEnvelope>;
}

export interface RunOptions {
  abortOnError?: boolean;
  concurrency?: number;
  signal?: AbortSignal;
}

export interface EngineOptions extends RunOptions {}

export interface TaskHandle {
  readonly id: string;
  readonly result: Promise<FlowResult>;
  cancel: (reason?: string) => void;
  onState: (listener: (state: FlowState) => void) => () => void;
  getState: () => FlowState;
}

export interface FlowTemplate<I = unknown> {
  id: string;
  run: (input?: I, options?: RunOptions) => TaskHandle;
}

export interface Runtime {
  flowId: string;
  input: unknown;
  controller: AbortController;
  options: Required<Pick<RunOptions, "abortOnError" | "concurrency">>;
  envelopes: Record<string, NodeEnvelope>;
  emitEvent: (event: FlowEvent) => void;
}

export interface ListenerStore {
  state: FlowState;
  listeners: Set<(state: FlowState) => void>;
}
