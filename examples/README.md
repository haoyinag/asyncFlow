# Examples

This folder contains minimal usage examples for AsyncFlow adapters.

## Vue 3
- File: `examples/vue/App.vue`
- Entry: `examples/vue/main.ts`
- Demonstrates:
  - `createFlow` + `useVueAsyncFlow`
  - state binding (`status/loading/data/error`)
  - manual cancel
  - auto cleanup on unmount

## React
- File: `examples/react/App.tsx`
- Entry: `examples/react/main.tsx`
- Demonstrates:
  - `createFlow` + `useReactAsyncFlow`
  - state binding (`status/loading/data/error`)
  - manual cancel
  - auto cleanup on unmount

## Note
These are integration-style snippets for quick adoption.
You can copy them into your own Vue/React app scaffold directly.
