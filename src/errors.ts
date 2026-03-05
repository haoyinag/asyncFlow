import type { AsyncTaskErrorShape } from "./types";

export class AsyncTaskError extends Error implements AsyncTaskErrorShape {
  code: string;
  kind: "abort" | "network" | "business" | "unknown";
  stepId?: string;
  phase?: string;
  cause?: unknown;
  aborted: boolean;

  constructor(input: AsyncTaskErrorShape) {
    super(input.message);
    this.name = "AsyncTaskError";
    this.code = input.code;
    this.kind = input.kind;
    this.stepId = input.stepId;
    this.phase = input.phase;
    this.cause = input.cause;
    this.aborted = input.aborted;
  }
}

export function makeAbortError(message: string, stepId?: string, cause?: unknown) {
  return new AsyncTaskError({
    code: "ABORTED",
    kind: "abort",
    message,
    stepId,
    phase: "execution",
    cause,
    aborted: true
  });
}

function inferKind(error: unknown): "abort" | "network" | "business" | "unknown" {
  if (error && typeof error === "object") {
    const e = error as { name?: string; message?: string; code?: string };
    const msg = String(e.message ?? "").toLowerCase();
    const code = String(e.code ?? "").toLowerCase();
    const name = String(e.name ?? "").toLowerCase();

    if (name.includes("abort")) return "abort";
    if (msg.includes("network") || msg.includes("fetch") || code.includes("econn") || code.includes("timeout")) {
      return "network";
    }
    return "business";
  }
  return "unknown";
}

export function toTaskError(error: unknown, stepId: string, phase: string): AsyncTaskError {
  if (error instanceof AsyncTaskError) return error;

  const message = error instanceof Error ? error.message : String(error);
  return new AsyncTaskError({
    code: "STEP_ERROR",
    kind: inferKind(error),
    message,
    stepId,
    phase,
    cause: error,
    aborted: false
  });
}
