# API Reference (v0.1)

This reference only covers the locked `v0.1` API.

## 1) runTask

### Signature
```ts
runTask<I, O, M extends Record<string, unknown>>(
  taskFn: TaskFn<I, O, M>,
  input?: I,
  options?: TaskRunOptions,
  initialMeta?: M
): TaskHandleSimple<O, M>
```

### Params
- `taskFn`:
  - `ctx.input`
  - `ctx.signal`
  - `ctx.setMeta(patch)`
  - `ctx.getMeta()`
- `input`: optional task input
- `options.signal`: optional external abort signal
- `initialMeta`: optional metadata object

### Return
`TaskHandleSimple` with:
- `id`
- `result`
- `cancel(reason?)`
- `onState(listener)`
- `getState()`

### Status lifecycle
`idle -> running -> success | error | aborted`

## 2) runParallel

### Signature
```ts
runParallel<I, O>(tasks, input?, options?): Promise<O[]>
```

### Options
- `concurrency` (default: 8)
- `abortOnError` (default: true)
- `signal`

### Behavior
- Keeps output order aligned with input order.
- `abortOnError=true`: reject on first failure.
- `abortOnError=false`: wait all, then reject with `AggregateError` if needed.

## 3) createRunner

### Signature
```ts
createRunner({ concurrency?, abortOnError? })
```

### Return
- `runner.runTask(...)`
- `runner.runParallel(...)`

## 4) useReactAsyncTask

### Signature
```ts
useReactAsyncTask(taskFn, options?, initialMeta?)
```

### Return
- `run`
- `cancel`
- `taskId`
- `status`
- `loading`
- `data`
- `error`
- `meta`

### Notes
- New `run()` cancels the previous active task.
- Unmount auto-cancels and unsubscribes.

## 5) useVueAsyncTask

### Signature
```ts
useVueAsyncTask(taskFn, options?, initialMeta?)
```

### Return
Same shape as React hook, via Vue refs.
