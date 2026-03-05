import { runParallel as runParallelBase } from "./parallel";
import { runTask as runTaskBase } from "./task";
import type {
  ParallelRunOptions,
  ParallelTask,
  RunnerOptions,
  TaskFn,
  TaskHandleSimple,
  TaskRunOptions
} from "./types";

export interface Runner {
  runTask: <I = unknown, O = unknown, M extends Record<string, unknown> = Record<string, unknown>>(
    taskFn: TaskFn<I, O, M>,
    input?: I,
    options?: TaskRunOptions,
    initialMeta?: M
  ) => TaskHandleSimple<O, M>;
  runParallel: <I = unknown, O = unknown>(
    tasks: Array<ParallelTask<I, O>>,
    input?: I,
    options?: ParallelRunOptions
  ) => Promise<O[]>;
}

const defaultOptions: Required<Pick<RunnerOptions, "concurrency" | "abortOnError">> = {
  concurrency: 8,
  abortOnError: true
};

export function createRunner(options: RunnerOptions = {}): Runner {
  const merged = {
    concurrency: options.concurrency ?? defaultOptions.concurrency,
    abortOnError: options.abortOnError ?? defaultOptions.abortOnError
  };

  return {
    runTask: (taskFn, input, runOptions, initialMeta) => runTaskBase(taskFn, input, runOptions, initialMeta),
    runParallel: (tasks, input, runOptions) =>
      runParallelBase(tasks, input, {
        concurrency: runOptions?.concurrency ?? merged.concurrency,
        abortOnError: runOptions?.abortOnError ?? merged.abortOnError,
        signal: runOptions?.signal
      })
  };
}

const defaultRunner = createRunner();

export const runTask = defaultRunner.runTask;
export const runParallel = defaultRunner.runParallel;
