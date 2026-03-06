# 常见问题

## 为什么 `cancel()` 后任务还可能成功？

因为取消是协作式的。若底层异步逻辑没有使用 `signal`，任务仍可能完成。

## `runTask` 失败会抛异常吗？

任务执行错误不会通过 `throw` 冒泡；请通过 `await task.result` 的 `status` 判断。

## `runParallel` 在 `collect-all` 下怎么拿到全部错误？

捕获 `AggregateError`，读取 `error.errors`。

## React / Vue 一定要用吗？

不需要。核心 API（`runTask/runParallel/createRunner`）是框架无关的。

## 为什么建议从 `mangoo/react` 或 `mangoo/vue` 导入 Hook？

这是包导出约定，能避免入口歧义，也更清晰。
