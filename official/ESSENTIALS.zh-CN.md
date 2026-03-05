# 核心概念

## runTask
`runTask` 执行一个异步任务，返回任务句柄：
1. `result`
2. `cancel`
3. `onState`
4. `getState`

`taskFn` 使用 `params` 获取本次执行输入。

## runParallel
`runParallel` 负责并发段：
1. 并发上限 `concurrency`
2. 失败策略 `mode: fail-fast | collect-all`

## createRunner
在应用初始化时集中定义默认策略：
```ts
const runner = createRunner({ concurrency: 4, mode: "fail-fast" });
```
