# API Reference

## Core (`mangoo`)

### `runTask(taskFn, config?)`

Runs one async workflow and returns a `TaskHandleSimple`.

### `runParallel(tasks, params?, options?)`

Runs parallel sub-tasks with concurrency control.

### `createRunner(options?)`

Creates a runner with default `runParallel` options:

```ts
createRunner({
  concurrency?: number; // default 8
  mode?: 'fail-fast' | 'collect-all'; // default fail-fast
});
```

Returns:

```ts
{
  runTask,
  runParallel
}
```

## React (`mangoo/react`)

### `useTask(taskFn, options?, initialMeta?)`

Returns:

```ts
{
  taskId,
  status,
  loading,
  data,
  error,
  meta,
  run,
  execute,
  cancel
}
```

## Vue (`mangoo/vue`)

### `useTask(taskFn, options?, initialMeta?)`

Returns the same fields as React adapter, exposed as Vue refs where applicable.

## Core types

```ts
type TaskStatus = 'idle' | 'running' | 'success' | 'error' | 'aborted';
```

```ts
interface TaskState<T, M> {
  status: TaskStatus;
  loading: boolean;
  data: T | undefined;
  error: AsyncTaskError | null;
  meta: M;
  startedAt: number | null;
  endedAt: number | null;
}
```

```ts
interface AsyncTaskError {
  code: string;
  message: string;
  kind: 'abort' | 'network' | 'business' | 'unknown';
  stepId?: string;
  phase?: string;
  cause?: unknown;
  aborted: boolean;
}
```
