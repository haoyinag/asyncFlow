# API 参考（v0.2 草案）

## 错误模型

### `AsyncFlowError`
```ts
interface AsyncFlowError {
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

### 签名
```ts
runTask(taskFn, config?)
```

### config
```ts
type TaskRunConfig<I, M> = {
  params?: I;
  signal?: AbortSignal;
  meta?: M;
}
```

### 上下文
```ts
type TaskContext<I, M> = {
  params: I;
  signal: AbortSignal;
  setMeta: (patch: Partial<M>) => void;
  getMeta: () => M;
}
```

### 返回
`TaskHandleSimple<T, M>`，包含：
- `id`
- `result`
- `cancel(reason?)`
- `onState(listener)`
- `getState()`

## `runParallel`

### 签名
```ts
runParallel(tasks, params?, options?)
```

### options
```ts
{
  concurrency?: number;            // 默认 8
  mode?: "fail-fast" | "collect-all"; // 默认 fail-fast
  signal?: AbortSignal;
}
```

## `createRunner`

### 签名
```ts
createRunner({ concurrency?, mode? })
```

### 返回
- `runTask`
- `runParallel`

## `useReactAsyncTask`

### 签名
```ts
useReactAsyncTask(taskFn, options?, initialMeta?)
```

### 返回
- `run(params?, options?)`
- `execute(params?, options?)`（`run` 别名）
- `cancel`
- `taskId`
- `status`
- `loading`
- `data`
- `error`
- `meta`

## `useVueAsyncTask`

### 签名
```ts
useVueAsyncTask(taskFn, options?, initialMeta?)
```

### 返回
与 React 一致，字段以 Vue Ref 暴露。
