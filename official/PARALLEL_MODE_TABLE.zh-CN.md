# 并发模式对照表

| 模式 | 含义 | 适用场景 | 失败行为 |
|---|---|---|---|
| `fail-fast` | 任一失败即中止整体 | 首页聚合、关键流程 | 第一处错误直接抛出，其他任务中止 |
| `collect-all` | 全部跑完后统一判断 | 批处理、统计类任务 | 全部结束后，如有失败抛 `AggregateError` |

## 推荐默认
- 默认用 `fail-fast`
- 只有明确需要“尽量跑完再统一处理”时才用 `collect-all`

## 示例
```ts
await runParallel(tasks, undefined, {
  concurrency: 3,
  mode: "fail-fast"
});
```
