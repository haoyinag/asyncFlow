# API 参考

## 核心（`mangoo`）

### `runTask(taskFn, config?)`

运行单个异步任务，返回 `TaskHandleSimple`。

### `runParallel(tasks, params?, options?)`

运行并发子任务，支持并发上限与失败策略。

### `createRunner(options?)`

创建带默认并发配置的运行器：

```ts
createRunner({
  concurrency?: number; // 默认 8
  mode?: 'fail-fast' | 'collect-all'; // 默认 fail-fast
});
```

返回：

```ts
{
  runTask,
  runParallel
}
```

## React（`mangoo/react`）

### `useTask(taskFn, options?, initialMeta?)`

返回字段：
- `taskId`
- `status`
- `loading`
- `data`
- `error`
- `meta`
- `run`
- `execute`（`run` 别名）
- `cancel`

## Vue（`mangoo/vue`）

### `useTask(taskFn, options?, initialMeta?)`

返回字段与 React 一致，对应值以 Vue `ref` 形式暴露。

## 核心类型

```ts
type TaskStatus = 'idle' | 'running' | 'success' | 'error' | 'aborted';
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
