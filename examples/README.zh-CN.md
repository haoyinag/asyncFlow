# 示例

该目录提供 AsyncFlow 适配层的最小使用示例。

## Vue 3
- 文件：`examples/vue/App.vue`
- 入口：`examples/vue/main.ts`
- 演示内容：
  - `createFlow` + `useVueAsyncFlow`
  - 状态绑定（`status/loading/data/error`）
  - 手动取消
  - 组件卸载自动清理

## React
- 文件：`examples/react/App.tsx`
- 入口：`examples/react/main.tsx`
- 演示内容：
  - `createFlow` + `useReactAsyncFlow`
  - 状态绑定（`status/loading/data/error`）
  - 手动取消
  - 组件卸载自动清理

## 说明
这些示例是方便快速接入的最小片段。
可直接复制到你自己的 Vue/React 工程中运行。
