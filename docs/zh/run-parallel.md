# runParallel

## 签名

```ts
runParallel(tasks, params?, options?) => Promise<O[]>
```

## 配置项

```ts
{
  concurrency?: number; // 默认 8
  mode?: 'fail-fast' | 'collect-all'; // 默认 fail-fast
  signal?: AbortSignal;
}
```

## 示例：首页并发加载

```ts
const [notices, listPage, vip] = await runParallel(
  [
    ({ signal }) => api.fetchNotices({ signal }),
    ({ signal }) => api.fetchList({ page: 1, signal }),
    ({ signal }) => api.fetchVip({ signal })
  ],
  undefined,
  { concurrency: 2, mode: 'fail-fast' }
);
```

## 两种失败策略

### `fail-fast`

- 某个子任务失败后，整体立刻 `reject`
- 其余子任务收到中断信号

### `collect-all`

- 等待全部子任务完成
- 只要存在失败，最终 `reject(new AggregateError(...))`

```ts
try {
  await runParallel(tasks, undefined, { mode: 'collect-all' });
} catch (err) {
  if (err instanceof AggregateError) {
    console.log(err.errors);
  }
}
```

## 注意事项

- 返回数组顺序与输入任务顺序一致。
- `concurrency <= 0` 会抛出 `AsyncTaskError`，错误码 `INVALID_CONCURRENCY`。
