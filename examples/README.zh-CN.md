# 示例

该目录提供 AsyncFlow 适配层的最小使用示例。

## Vue 3
- 文件：`examples/vue/App.vue`
- 入口：`examples/vue/main.ts`
- 全局引擎：`examples/vue/engine.ts`
- 子组件使用：`examples/vue/UserPanel.vue`
- 演示内容：
  - `createFlow` + `useVueAsyncFlow`
  - 状态绑定（`status/loading/data/error`）
  - 手动取消
  - 组件卸载自动清理

## React
- 文件：`examples/react/App.tsx`
- 入口：`examples/react/main.tsx`
- 全局引擎：`examples/react/engine.ts`
- 子组件使用：`examples/react/UserPanel.tsx`
- 演示内容：
  - `createFlow` + `useReactAsyncFlow`
  - 状态绑定（`status/loading/data/error`）
  - 手动取消
  - 组件卸载自动清理

## 说明
这些示例是方便快速接入的最小片段。
可直接复制到你自己的 Vue/React 工程中运行。

## 真实业务场景示例
- 共享 mock/开源接口层：`examples/scenario/mockBusinessApi.ts`
- 全局引擎单例：`examples/scenario/engine.ts`
- Vue3 子组件（Hook 风格）：`examples/vue3/BusinessLoginFlow.vue`
- Vue2 子组件（手动状态订阅）：`examples/vue2/BusinessLoginFlow.vue`

场景流程：
1. 获取登录二维码
2. 用户输入账号/密码/验证码并点击登录
3. 登录并获取 token
4. 进入首页
5. 获取新闻公告
6. 获取分页列表
7. 判断 VIP 剩余时间并提示续费
