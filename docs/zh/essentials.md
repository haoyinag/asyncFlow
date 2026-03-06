# 核心概念

## Task（任务）

一次 `runTask` 执行就是一个任务实例，具备：
- `id`
- `result`
- `cancel(reason?)`
- `onState` / `getState`

## State（状态）

每个任务都有统一状态结构：
- `status`: `idle | running | success | error | aborted`
- `loading`
- `data`
- `error`
- `meta`
- `startedAt` / `endedAt`

## Cancellation（取消）

取消本质是中断 `AbortSignal`。

要点：
- 取消是“协作式”的
- 你的请求层要把 `signal` 传下去
- 底层不响应 `signal` 时，任务可能仍成功返回

## Runner（预配置执行器）

`createRunner({ concurrency, mode })` 会返回一组 API：
- `runner.runTask`
- `runner.runParallel`

默认配置只影响 `runParallel`。
