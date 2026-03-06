# 并发模式对照

| 维度 | `fail-fast` | `collect-all` |
|---|---|---|
| 默认值 | 是 | 否 |
| 首个任务失败后 | 立刻结束并 reject | 继续等待其余任务 |
| 失败返回形式 | `AsyncTaskError` | `AggregateError` |
| 适合场景 | 任一失败就不必继续（如关键链路） | 需要汇总全部子任务结果/错误 |

## 选择建议

- 页面初始化依赖完整性高：优先 `fail-fast`
- 批处理、报表类任务：优先 `collect-all`
