# AsyncFlow

一个面向 Promise/async-await 场景的轻量异步任务编排引擎。

## 文档
- 锁定规范（英文）：[SPEC_LOCK.md](./SPEC_LOCK.md)
- 锁定规范（中文）：[SPEC_LOCK.zh-CN.md](./SPEC_LOCK.zh-CN.md)
- README（英文）：[README.md](./README.md)
- 示例（英文）：[examples/README.md](./examples/README.md)
- 示例（中文）：[examples/README.zh-CN.md](./examples/README.zh-CN.md)

## v0.1 MVP 范围
- 支持 `defer` / `async` 编排与嵌套
- 支持 `ctx.prev` 与 `last/pick/results` 数据传递
- 自动注入 `AbortSignal`、默认 fail-fast、支持手动取消
- 支持全局并发上限
- 支持流程状态订阅
- 统一 `AsyncFlowError` 错误模型
- 支持 Vue/React 适配 Hook（`useAsyncFlow`）并自动清理

## 快速开始
```bash
npm install
npm test
npm run build
```

## 适配层 Hook
```ts
import { createFlow, useVueAsyncFlow, useReactAsyncFlow } from "asyncflow";
```

Vue:
```ts
const flow = createFlow({ mode: "defer", tasks: [() => 1] });
const { run, status, loading, data, error, cancel } = useVueAsyncFlow(flow);
```

React:
```ts
const flow = createFlow({ mode: "defer", tasks: [() => 1] });
const { run, status, loading, data, error, cancel } = useReactAsyncFlow(flow);
```
