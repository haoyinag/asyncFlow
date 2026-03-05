# Examples

This folder contains minimal usage examples for AsyncFlow adapters.

## Vue 3
- File: `examples/vue/App.vue`
- Entry: `examples/vue/main.ts`
- Global engine: `examples/vue/engine.ts`
- Child component usage: `examples/vue/UserPanel.vue`
- Demonstrates:
  - `createFlow` + `useVueAsyncFlow`
  - state binding (`status/loading/data/error`)
  - manual cancel
  - auto cleanup on unmount

## React
- File: `examples/react/App.tsx`
- Entry: `examples/react/main.tsx`
- Global engine: `examples/react/engine.ts`
- Child component usage: `examples/react/UserPanel.tsx`
- Demonstrates:
  - `createFlow` + `useReactAsyncFlow`
  - state binding (`status/loading/data/error`)
  - manual cancel
  - auto cleanup on unmount

## Note
These are integration-style snippets for quick adoption.
You can copy them into your own Vue/React app scaffold directly.

## Real Business Scenario Demo
- Shared mock/open API layer: `examples/scenario/mockBusinessApi.ts`
- Global engine singleton: `examples/scenario/engine.ts`
- Vue3 child component (hook style): `examples/vue3/BusinessLoginFlow.vue`
- Vue2 child component (manual state subscription): `examples/vue2/BusinessLoginFlow.vue`

Scenario flow:
1. get QR code
2. user inputs account/password/captcha and clicks login
3. login + token retrieval
4. enter home
5. fetch notices
6. fetch paged list
7. check VIP remaining days and show renewal tip
