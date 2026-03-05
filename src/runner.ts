import { runParallel as runParallelBase } from "./parallel";
import { runTask as runTaskBase } from "./task";
import type {
  ParallelRunOptions,
  ParallelTask,
  RunnerOptions,
  TaskFn,
  TaskRunConfig,
  TaskHandleSimple,
} from "./types";

export interface Runner {
  runTask: <I = unknown, O = unknown, M extends Record<string, unknown> = Record<string, unknown>>(
    taskFn: TaskFn<I, O, M>,
    config?: TaskRunConfig<I, M>
  ) => TaskHandleSimple<O, M>;
  runParallel: <I = unknown, O = unknown>(
    tasks: Array<ParallelTask<I, O>>,
    params?: I,
    options?: ParallelRunOptions
  ) => Promise<O[]>;
}

const defaultOptions: Required<Pick<RunnerOptions, "concurrency" | "mode">> = {
  concurrency: 8,
  mode: "fail-fast"
};

export function createRunner(options: RunnerOptions = {}): Runner {
  const merged = {
    concurrency: options.concurrency ?? defaultOptions.concurrency,
    mode: options.mode ?? defaultOptions.mode
  };

  return {
    runTask: (taskFn, config) => runTaskBase(taskFn, config),
    runParallel: (tasks, params, runOptions) =>
      runParallelBase(tasks, params, {
        concurrency: runOptions?.concurrency ?? merged.concurrency,
        mode: runOptions?.mode ?? merged.mode,
        signal: runOptions?.signal
      })
  };
}

const defaultRunner = createRunner();

export const runTask = defaultRunner.runTask;
export const runParallel = defaultRunner.runParallel;
