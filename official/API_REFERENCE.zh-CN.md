# API 参考（v0.1）

本文档仅描述当前锁定版本 `v0.1` 的 API。

## 1) runTask

### 签名
```ts
runTask<I, O, M extends Record<string, unknown>>(
  taskFn: TaskFn<I, O, M>,
  input?: I,
  options?: TaskRunOptions,
  initialMeta?: M
): TaskHandleSimple<O, M>
```

### 参数
- `taskFn`：任务函数。
  - 入参 `ctx`：
    - `ctx.input: I`：运行输入
    - `ctx.signal: AbortSignal`：取消信号
    - `ctx.setMeta(patch: Partial<M>)`：更新任务元信息
    - `ctx.getMeta(): M`：读取任务元信息
- `input`：任务输入，可选。
- `options.signal`：外部取消信号，可选。
- `initialMeta`：初始元信息对象，可选。

### 返回值
`TaskHandleSimple<O, M>`：
- `id: string`：任务 ID
- `result: Promise<TaskResult<O, M>>`：任务最终结果
- `cancel(reason?)`：手动取消
- `onState(listener)`：订阅状态变化，返回取消订阅函数
- `getState()`：获取当前状态快照

### 状态语义
- `idle`：初始态
- `running`：执行中
- `success`：成功结束
- `error`：失败结束
- `aborted`：取消结束

### 示例（通用）
```ts
const task = runTask(async ({ signal, input, setMeta }) => {
  setMeta({ phase: "start" });
  const token = await login(input, signal);
  setMeta({ phase: "token_done" });
  return token;
}, { account: "a", password: "b" }, undefined, { phase: "init" });

const off = task.onState((s) => console.log(s.status, s.loading, s.meta));
const result = await task.result;
off();
```

## 2) runParallel

### 签名
```ts
runParallel<I, O>(
  tasks: Array<ParallelTask<I, O>>,
  input?: I,
  options?: ParallelRunOptions
): Promise<O[]>
```

### 参数
- `tasks`：并发任务函数数组。
  - 每个函数接收：
    - `ctx.input: I`
    - `ctx.signal: AbortSignal`
    - `ctx.index: number`
- `input`：共享输入，可选。
- `options`：
  - `concurrency?: number` 并发上限（默认 8）
  - `abortOnError?: boolean` 是否首错中止（默认 `true`）
  - `signal?: AbortSignal` 外部取消信号

### 返回值
- 成功：按输入顺序返回 `O[]`
- 失败：
  - `abortOnError=true`：首错抛出
  - `abortOnError=false`：全部执行后抛 `AggregateError`

### 示例（并发段）
```ts
const [notices, list, vip] = await runParallel(
  [
    () => fetchNotices(token, signal),
    () => fetchList(token, signal),
    () => fetchVipInfo(token, signal)
  ],
  undefined,
  { concurrency: 2, signal }
);
```

## 3) createRunner

### 签名
```ts
createRunner(options?: RunnerOptions): Runner
```

### 参数
- `options.concurrency?: number` 默认并发上限
- `options.abortOnError?: boolean` 默认失败策略

### 返回值
`Runner`：
- `runner.runTask(...)`
- `runner.runParallel(...)`

### 示例
```ts
const runner = createRunner({ concurrency: 4, abortOnError: true });
const task = runner.runTask(async ({ signal }) => fetchData(signal));
await task.result;
```

## 4) useReactAsyncTask

### 签名
```ts
useReactAsyncTask<I, O, M extends Record<string, unknown>>(
  taskFn: TaskFn<I, O, M>,
  options?: RunnerOptions,
  initialMeta?: M
)
```

### 参数
- `taskFn`：与 `runTask` 相同。
- `options`：Runner 默认策略。
- `initialMeta`：初始元信息。

### 返回值
- `run(input?, options?)`
- `cancel(reason?)`
- `taskId`
- `status`
- `loading`
- `data`
- `error`
- `meta`

### 行为说明
- 新 `run()` 会自动取消上一个未完成任务。
- 组件卸载时自动取消并清理订阅。

### 示例（React）
见：[USAGE_REACT.zh-CN.md](./USAGE_REACT.zh-CN.md)

## 5) useVueAsyncTask

### 签名
```ts
useVueAsyncTask<I, O, M extends Record<string, unknown>>(
  taskFn: TaskFn<I, O, M>,
  options?: RunnerOptions,
  initialMeta?: M
)
```

### 参数
与 `useReactAsyncTask` 一致。

### 返回值
与 React 一致，但为 Vue `Ref` 形式。

### 行为说明
- 新 `run()` 会自动取消上一个未完成任务。
- 组件卸载时自动取消并清理订阅。

### 示例（Vue）
见：[USAGE_VUE.zh-CN.md](./USAGE_VUE.zh-CN.md)
