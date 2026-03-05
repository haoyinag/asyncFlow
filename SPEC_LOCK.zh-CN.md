# AsyncFlow v0.1 锁定规范

状态：已锁定
更新日期：2026-03-05

## 1. 产品定位
1. `AsyncFlow` 是轻量、原子化的异步编排引擎，目标是减少样板代码、提供安全默认值并增强可观测性。
2. 重点解决 Promise/`async/await` 常见问题：编排不清晰、错误处理分散、取消与生命周期不统一、并发控制复杂。
3. 实现语言：TypeScript。
4. 设计原则：默认简单、默认安全、性能优先、可观测、可扩展。
5. v0.1 聚焦：核心调度 + 安全语义 + 类型支持 + 测试，重型特性后置。

## 2. 编排与 DSL
6. 支持两种执行模式：`defer`（串行）与 `async`（并行）。
7. 支持无限嵌套。
8. DSL 同时支持语法糖与显式节点（`step/group`）。
9. 语法糖约定：函数 => `step`，数组 => `async group`。
10. 复杂流程推荐显式 `step/group`。

## 3. 数据管道
11. 全流程统一传递 `ctx`。
12. `ctx.prev` 使用严格判别联合（`single/group`）。
13. 并行输出同时提供 `byIndex` 与 `byId`。
14. 必须提供易用 helper：`ctx.last()`、`ctx.pick(id)`、`ctx.results()`。
15. 节点输出包含元信息（状态、耗时、错误、是否中止）以便追踪。

## 4. 安全、取消、错误
16. 每个可执行节点自动注入 `AbortSignal`。
17. 默认失败策略：`abortOnError = true`（fail-fast）。
18. 必须支持手动取消：`cancel(reason?)`。
19. 取消传播规则：
   1. 父取消 => 子孙全部取消。
   2. 子失败 => 父中止 => 同层未完成兄弟取消。
20. 同步与异步处理函数可混写。

## 5. 并发、状态、可观测
21. v0.1 仅支持全局并发上限。
22. 局部并发（per-group）明确后置到 v0.2+。
23. 内置流程级状态：`status/loading/data/error`。
24. 必须提供状态订阅（`onState`/`subscribe`）。
25. flow/step/group 生命周期事件至少内部可用（`start/success/error/abort/end`）。

## 6. 命名、ID、引擎使用方式
26. API 命名要求语义清晰且简洁，降低心智负担。
27. 推荐顶层 API：`createFlow`、`runFlow`、`task.cancel()`、`task.onState()`。
28. `step.id` 对用户为可选。
29. 未填写时自动生成稳定唯一 id（基于 flow/path/counter，不用函数源码哈希）。
30. 推荐使用方式：全局初始化引擎。
31. 组件/页面按需执行 `run`，而不是反复初始化引擎。

## 7. 框架适配层
32. 核心层保持框架无关（不耦合 Vue/React 内部机制）。
33. 提供薄的 Vue/React 适配层。
34. 提供 Vue/React 的 `useAsyncFlow` hook/composable。
35. hook/composable 必须自动处理订阅与卸载清理（含取消）。

## 8. 性能与内存安全
36. 任务完成后应自动释放内部引用。
37. 订阅必须可解除，避免泄漏。
38. v0.1 不要求重型 benchmark，但必须有防退化检查。
39. 最低性能护栏：
   1. 全局并发上限必须严格生效。
   2. 常见规模（100-300 任务）无明显额外开销。
40. 增加 churn/stability 测试（反复创建/取消）以识别持续性内存增长风险。

## 9. 错误模型与测试
41. 统一 `AsyncFlowError`：`code/message/stepId/phase/cause/aborted`。
42. MVP 必测：
   1. 串行/并行/嵌套执行
   2. 管道能力（`last/pick/results`）
   3. fail-fast 与取消传播
   4. 全局并发上限
   5. 同步+异步混写
43. v0.1 验收标准：API 简洁、行为确定、安全默认、TS 可用、测试可复现。

## 10. v0.1 明确非目标
44. 不在 v0.1 范围内：局部并发、重试退避、超时 DSL、补偿事务、持久化恢复。

---
本文件是 `AsyncFlow v0.1` 的锁定实现基线。
任何范围变更必须以新增章节或新版本文件的方式显式记录。
