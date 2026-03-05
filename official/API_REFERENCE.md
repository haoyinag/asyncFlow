# API Reference (v0.2 Draft)

## Error Model

### `AsyncTaskError`
```ts
interface AsyncTaskError {
  code: string;
  message: string;
  kind: "abort" | "network" | "business" | "unknown";
  stepId?: string;
  phase?: string;
  cause?: unknown;
  aborted: boolean;
}
```

## `runTask`

### Signature
```ts
runTask(taskFn, config?)
```

### Config
```ts
type TaskRunConfig<I, M> = {
  params?: I;
  signal?: AbortSignal;
  meta?: M;
}
```

### Context
```ts
type TaskContext<I, M> = {
  params: I;
  signal: AbortSignal;
  setMeta: (patch: Partial<M>) => void;
  getMeta: () => M;
}
```

### Return
```ts
TaskHandleSimple<T, M>
```
with:
- `id`
- `result`
- `cancel(reason?)`
- `onState(listener)`
- `getState()`

## `runParallel`

### Signature
```ts
runParallel(tasks, params?, options?)
```

### Options
```ts
{
  concurrency?: number;            // default 8
  mode?: "fail-fast" | "collect-all"; // default fail-fast
  signal?: AbortSignal;
}
```

## `createRunner`

### Signature
```ts
createRunner({ concurrency?, mode? })
```

### Return
- `runTask`
- `runParallel`

## `useTask` (React)

### Signature
```ts
import { useTask } from "mangoo/react";

useTask(taskFn, options?, initialMeta?)
```

### Return
- `run(params?, options?)`
- `execute(params?, options?)` (`run` alias)
- `cancel`
- `taskId`
- `status`
- `loading`
- `data`
- `error`
- `meta`

## `useTask` (Vue)

### Signature
```ts
import { useTask } from "mangoo/vue";

useTask(taskFn, options?, initialMeta?)
```

### Return
Same fields as React hook, via Vue refs.
