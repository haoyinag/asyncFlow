import { AsyncFlowError, makeAbortError } from "./errors";

export class ConcurrencyGate {
  private active = 0;
  private queue: Array<{
    resolve: (release: () => void) => void;
    reject: (err: AsyncFlowError) => void;
    signal?: AbortSignal;
    onAbort?: () => void;
  }> = [];

  async acquire(limit: number, signal?: AbortSignal): Promise<() => void> {
    if (limit <= 0 || Number.isNaN(limit)) {
      throw new AsyncFlowError({
        code: "INVALID_CONCURRENCY",
        message: "concurrency must be > 0",
        aborted: false
      });
    }

    if (signal?.aborted) {
      throw makeAbortError("Acquire canceled before scheduling");
    }

    if (this.active < limit) {
      this.active += 1;
      return () => this.release(limit);
    }

    return new Promise<() => void>((resolve, reject) => {
      const waiter = { resolve, reject, signal } as {
        resolve: (release: () => void) => void;
        reject: (err: AsyncFlowError) => void;
        signal?: AbortSignal;
        onAbort?: () => void;
      };

      const onAbort = () => {
        const idx = this.queue.indexOf(waiter);
        if (idx >= 0) this.queue.splice(idx, 1);
        reject(makeAbortError("Acquire canceled while waiting in queue"));
      };

      waiter.onAbort = onAbort;
      if (signal) signal.addEventListener("abort", onAbort, { once: true });
      this.queue.push(waiter);
    });
  }

  private release(limit: number) {
    this.active = Math.max(0, this.active - 1);

    while (this.queue.length > 0 && this.active < limit) {
      const waiter = this.queue.shift();
      if (!waiter) continue;

      if (waiter.signal?.aborted) {
        waiter.reject(makeAbortError("Acquire canceled while draining queue"));
        continue;
      }

      if (waiter.signal && waiter.onAbort) {
        waiter.signal.removeEventListener("abort", waiter.onAbort);
      }

      this.active += 1;
      waiter.resolve(() => this.release(limit));
      break;
    }
  }
}
