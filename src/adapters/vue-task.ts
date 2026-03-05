import { onUnmounted, ref, shallowRef } from "vue";
import { createRunner } from "../runner";
import type { RunnerOptions, TaskFn, TaskHandleSimple, TaskResult, TaskRunOptions } from "../types";
import type { Ref, ShallowRef } from "vue";

export interface VueUseAsyncTaskState<I = unknown, O = unknown, M extends Record<string, unknown> = Record<string, unknown>> {
  taskId: Ref<string | null>;
  status: Ref<"idle" | "running" | "success" | "error" | "aborted">;
  loading: Ref<boolean>;
  data: ShallowRef<O | undefined>;
  error: ShallowRef<import("../errors").AsyncFlowError | null>;
  meta: Ref<Record<string, unknown>>;
  run: (params?: I, options?: TaskRunOptions) => Promise<TaskResult<O, M>>;
  execute: (params?: I, options?: TaskRunOptions) => Promise<TaskResult<O, M>>;
  cancel: (reason?: string) => void;
}

export function useAsyncTask<I = unknown, O = unknown, M extends Record<string, unknown> = Record<string, unknown>>(
  taskFn: TaskFn<I, O, M>,
  options: RunnerOptions = {},
  initialMeta?: M
): VueUseAsyncTaskState<I, O, M> {
  const runner = createRunner(options);

  const taskId = ref<string | null>(null);
  const status = ref<"idle" | "running" | "success" | "error" | "aborted">("idle");
  const loading = ref(false);
  const data = shallowRef<O | undefined>(undefined);
  const error = shallowRef<import("../errors").AsyncFlowError | null>(null);
  const meta = ref<Record<string, unknown>>((initialMeta ?? {}) as Record<string, unknown>);

  let currentTask: TaskHandleSimple<O, M> | null = null;
  let offState: (() => void) | null = null;

  const clearSubscription = () => {
    if (offState) {
      offState();
      offState = null;
    }
  };

  const run = async (params?: I, runOptions?: TaskRunOptions) => {
    if (currentTask) {
      currentTask.cancel("replaced_by_new_run");
      clearSubscription();
    }

    const task = runner.runTask(taskFn, {
      params,
      signal: runOptions?.signal,
      meta: initialMeta
    });
    currentTask = task;
    taskId.value = task.id;

    offState = task.onState((s) => {
      status.value = s.status;
      loading.value = s.loading;
      data.value = s.data;
      error.value = s.error;
      meta.value = s.meta as Record<string, unknown>;
    });

    return task.result;
  };

  const cancel = (reason?: string) => {
    currentTask?.cancel(reason);
  };

  onUnmounted(() => {
    currentTask?.cancel("component_unmounted");
    clearSubscription();
    currentTask = null;
  });

  return {
    taskId,
    status,
    loading,
    data,
    error,
    meta,
    run,
    execute: run,
    cancel
  };
}
