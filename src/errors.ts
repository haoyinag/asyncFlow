import type { AsyncFlowErrorShape } from "./types";

export class AsyncFlowError extends Error implements AsyncFlowErrorShape {
  code: string;
  stepId?: string;
  phase?: string;
  cause?: unknown;
  aborted: boolean;

  constructor(input: AsyncFlowErrorShape) {
    super(input.message);
    this.name = "AsyncFlowError";
    this.code = input.code;
    this.stepId = input.stepId;
    this.phase = input.phase;
    this.cause = input.cause;
    this.aborted = input.aborted;
  }
}

export function makeAbortError(message: string, stepId?: string, cause?: unknown) {
  return new AsyncFlowError({
    code: "ABORTED",
    message,
    stepId,
    phase: "execution",
    cause,
    aborted: true
  });
}

export function toFlowError(error: unknown, stepId: string, phase: string): AsyncFlowError {
  if (error instanceof AsyncFlowError) return error;

  const message = error instanceof Error ? error.message : String(error);
  return new AsyncFlowError({
    code: "STEP_ERROR",
    message,
    stepId,
    phase,
    cause: error,
    aborted: false
  });
}
