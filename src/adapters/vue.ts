import { onUnmounted, ref, shallowRef } from "vue";
import type { AsyncFlowError } from "../errors";
import type { FlowResult, FlowState, FlowTemplate, RunOptions, TaskHandle } from "../types";

export interface VueUseAsyncFlowState<I = unknown> {
  taskId: ReturnType<typeof ref<string | null>>;
  status: ReturnType<typeof ref<FlowState["status"]>>;
  loading: ReturnType<typeof ref<boolean>>;
  data: ReturnType<typeof shallowRef<unknown>>;
  error: ReturnType<typeof shallowRef<AsyncFlowError | null>>;
  run: (input?: I, options?: RunOptions) => Promise<FlowResult>;
  cancel: (reason?: string) => void;
}

export function useAsyncFlow<I>(flow: FlowTemplate<I>): VueUseAsyncFlowState<I> {
  const taskId = ref<string | null>(null);
  const status = ref<FlowState["status"]>("idle");
  const loading = ref(false);
  const data = shallowRef<unknown>(undefined);
  const error = shallowRef<AsyncFlowError | null>(null);

  let currentTask: TaskHandle | null = null;
  let offState: (() => void) | null = null;

  const clearSubscription = () => {
    if (offState) {
      offState();
      offState = null;
    }
  };

  const bindState = (task: TaskHandle) => {
    clearSubscription();
    offState = task.onState((snapshot) => {
      status.value = snapshot.status;
      loading.value = snapshot.loading;
      data.value = snapshot.data;
      error.value = snapshot.error;
    });
  };

  const run = async (input?: I, options?: RunOptions) => {
    if (currentTask) {
      currentTask.cancel("replaced_by_new_run");
      clearSubscription();
    }

    const task = flow.run(input, options);
    currentTask = task;
    taskId.value = task.id;
    bindState(task);

    const result = await task.result;
    return result;
  };

  const cancel = (reason?: string) => {
    if (currentTask) {
      currentTask.cancel(reason);
    }
  };

  onUnmounted(() => {
    if (currentTask) {
      currentTask.cancel("component_unmounted");
    }
    clearSubscription();
    currentTask = null;
  });

  return {
    taskId,
    status,
    loading,
    data,
    error,
    run,
    cancel
  };
}
