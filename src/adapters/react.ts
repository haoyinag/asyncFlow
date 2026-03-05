import { useCallback, useEffect, useRef, useState } from "react";
import type { AsyncFlowError } from "../errors";
import type { FlowResult, FlowState, FlowTemplate, RunOptions, TaskHandle } from "../types";

export interface ReactUseAsyncFlowState<I = unknown> {
  taskId: string | null;
  status: FlowState["status"];
  loading: boolean;
  data: unknown;
  error: AsyncFlowError | null;
  run: (input?: I, options?: RunOptions) => Promise<FlowResult>;
  cancel: (reason?: string) => void;
}

export function useAsyncFlow<I>(flow: FlowTemplate<I>): ReactUseAsyncFlowState<I> {
  const currentTaskRef = useRef<TaskHandle | null>(null);
  const offStateRef = useRef<(() => void) | null>(null);

  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<FlowState["status"]>("idle");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<unknown>(undefined);
  const [error, setError] = useState<AsyncFlowError | null>(null);

  const clearSubscription = useCallback(() => {
    if (offStateRef.current) {
      offStateRef.current();
      offStateRef.current = null;
    }
  }, []);

  const bindState = useCallback(
    (task: TaskHandle) => {
      clearSubscription();
      offStateRef.current = task.onState((snapshot) => {
        setStatus(snapshot.status);
        setLoading(snapshot.loading);
        setData(snapshot.data);
        setError(snapshot.error);
      });
    },
    [clearSubscription]
  );

  const run = useCallback(
    async (input?: I, options?: RunOptions) => {
      if (currentTaskRef.current) {
        currentTaskRef.current.cancel("replaced_by_new_run");
        clearSubscription();
      }

      const task = flow.run(input, options);
      currentTaskRef.current = task;
      setTaskId(task.id);
      bindState(task);

      const result = await task.result;
      return result;
    },
    [bindState, clearSubscription, flow]
  );

  const cancel = useCallback((reason?: string) => {
    currentTaskRef.current?.cancel(reason);
  }, []);

  useEffect(() => {
    return () => {
      currentTaskRef.current?.cancel("component_unmounted");
      clearSubscription();
      currentTaskRef.current = null;
    };
  }, [clearSubscription]);

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
