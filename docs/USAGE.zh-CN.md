# AsyncFlow 使用说明

## 1. 安装
```bash
npm install
```

## 2. 核心 API
- `createAsyncFlow(options)`
- `createFlow(flowDef)`
- `runFlow(flowDef, input?, options?)`
- `task.result`
- `task.cancel(reason?)`
- `task.onState(listener)`

## 3. 核心概念
- `mode: "defer"` => 串行执行
- `mode: "async"` => 并行执行
- `ctx.last()` => 上一步输出
- `ctx.pick(id)` => 通过 step id 读取输出
- `ctx.results()` => 当前全部输出

## 4. 最小串行示例
```ts
import { createFlow, deferFlow } from "asyncflow";

const flow = createFlow(
  deferFlow([
    async () => "token-1",
    ({ last }) => ({ token: last() as string }),
    ({ last }) => `done:${(last() as { token: string }).token}`
  ])
);

const task = flow.run();
const result = await task.result;
```

## 5. 嵌套并行示例
```ts
import { createFlow, deferFlow, asyncGroup } from "asyncflow";

const flow = createFlow(
  deferFlow([
    () => "token",
    asyncGroup([
      async ({ last }) => ({ profile: `P:${String(last())}` }),
      async ({ last }) => ({ orders: `O:${String(last())}` })
    ], "fetch-group")
  ])
);
```

## 6. 全局引擎 + 子组件调用

### Vue
- 全局引擎：`examples/vue/engine.ts`
- 子组件使用：`examples/vue/UserPanel.vue`

### React
- 全局引擎：`examples/react/engine.ts`
- 子组件使用：`examples/react/UserPanel.tsx`

## 7. 取消与熔断
- 默认 `abortOnError = true`
- 任一步失败会取消未完成的同层与子孙任务
- 手动取消使用 `task.cancel()`

## 8. 状态订阅
```ts
const off = task.onState((s) => {
  console.log(s.status, s.loading, s.error);
});

off();
```

## 9. 适配层 Hook
- Vue：`useVueAsyncFlow(flow)`
- React：`useReactAsyncFlow(flow)`

两个适配层都会：
- 把任务状态映射到框架状态
- 自动清理订阅
- 组件卸载时自动取消任务

## 10. 最佳实践
- 尽量让 step 保持纯函数。
- 关键步骤尽量显式设置 `id`。
- 把副作用聚合到流程末尾步骤。
- 简短串行场景优先用 `deferFlow`。
- 推荐在应用启动时初始化全局引擎。

## 11. 真实业务场景（Vue2/Vue3）
- 共享 API mock/开源接口封装：`examples/scenario/mockBusinessApi.ts`
- 全局引擎初始化：`examples/scenario/engine.ts`
- Vue3 子组件用法：`examples/vue3/BusinessLoginFlow.vue`
- Vue2 子组件用法：`examples/vue2/BusinessLoginFlow.vue`

Vue3 方案：
- 使用 `useVueAsyncFlow` Hook 适配层
- 直接绑定 `status/loading/data/error`
- 组件卸载自动清理

Vue2 方案：
- 使用核心 `flow.run()` + `task.onState()`
- 在 `beforeDestroy` 中手动清理与取消
