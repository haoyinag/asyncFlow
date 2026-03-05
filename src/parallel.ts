import { AsyncTaskError, makeAbortError, toTaskError } from "./errors";
import type { ParallelRunOptions, ParallelTask } from "./types";

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

export async function runParallel<I = unknown, O = unknown>(
  tasks: Array<ParallelTask<I, O>>,
  params?: I,
  options: ParallelRunOptions = {}
): Promise<O[]> {
  const concurrency = options.concurrency ?? 8;
  const mode = options.mode ?? "fail-fast";
  const abortOnError = mode === "fail-fast";

  if (concurrency <= 0 || Number.isNaN(concurrency)) {
    throw new AsyncTaskError({
      code: "INVALID_CONCURRENCY",
      kind: "business",
      message: "concurrency must be > 0",
      phase: "parallel",
      aborted: false
    });
  }

  if (tasks.length === 0) return [];

  const controller = attachSignal(options.signal);
  const results: O[] = new Array(tasks.length);
  const errors: Array<AsyncTaskError | undefined> = new Array(tasks.length);

  let nextIndex = 0;
  let active = 0;
  let finished = 0;
  let settled = false;

  return new Promise<O[]>((resolve, reject) => {
    const maybeDone = () => {
      if (finished !== tasks.length || settled) return;
      settled = true;

      if (abortOnError) {
        const firstError = errors.find(Boolean);
        if (firstError) {
          reject(firstError);
          return;
        }
        resolve(results);
        return;
      }

      const failed = errors.filter(Boolean) as AsyncTaskError[];
      if (failed.length > 0) {
        reject(new AggregateError(failed, "One or more parallel tasks failed"));
        return;
      }
      resolve(results);
    };

    const schedule = () => {
      if (settled) return;
      if (controller.signal.aborted && !abortOnError) {
        // non fail-fast mode still allows remaining tasks to settle naturally.
      }

      while (active < concurrency && nextIndex < tasks.length && !settled) {
        const current = nextIndex;
        nextIndex += 1;
        active += 1;

        Promise.resolve(tasks[current]({ params: params as I, signal: controller.signal, index: current }))
          .then((value) => {
            results[current] = value;
          })
          .catch((error) => {
            const err = controller.signal.aborted
              ? makeAbortError("Parallel task aborted", `parallel:${current}`, error)
              : error instanceof AsyncTaskError
                ? error
                : toTaskError(error, `parallel:${current}`, "parallel");

            errors[current] = err;

            if (abortOnError && !settled) {
              settled = true;
              controller.abort(err);
              reject(err);
            }
          })
          .finally(() => {
            active -= 1;
            finished += 1;
            if (!settled) {
              schedule();
              maybeDone();
            }
          });
      }
    };

    schedule();
  }).finally(() => {
    controller.abort("completed");
  });
}
