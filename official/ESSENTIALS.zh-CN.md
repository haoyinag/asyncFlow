# 核心概念

## runTask
把一个异步函数变成可观测、可取消的任务：
- 输入：`taskFn(ctx)`
- 输出：`TaskHandle`

`ctx` 包含：
- `input`
- `signal`
- `setMeta`
- `getMeta`

`TaskHandle` 包含：
- `result`
- `cancel`
- `onState`
- `getState`

## runParallel
并发执行任务数组，并支持：
- 并发上限 `concurrency`
- 失败策略 `abortOnError`

## createRunner
集中注入默认策略：
```ts
const runner = createRunner({ concurrency: 4, abortOnError: true });
```
