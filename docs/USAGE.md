# AsyncFlow Usage Guide

## 1. Installation
```bash
npm install
```

## 2. Core APIs
- `createAsyncFlow(options)`
- `createFlow(flowDef)`
- `runFlow(flowDef, input?, options?)`
- `task.result`
- `task.cancel(reason?)`
- `task.onState(listener)`

## 3. Concepts
- `mode: "defer"` => serial execution
- `mode: "async"` => parallel execution
- `ctx.last()` => previous output
- `ctx.pick(id)` => read output by step id
- `ctx.results()` => all current outputs

## 4. Minimal Serial Example
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

## 5. Nested Parallel Example
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

## 6. Global Engine + Child Component

### Vue
- Global engine: `examples/vue/engine.ts`
- Child usage: `examples/vue/UserPanel.vue`

### React
- Global engine: `examples/react/engine.ts`
- Child usage: `examples/react/UserPanel.tsx`

## 7. Cancellation and Fail-fast
- Default `abortOnError = true`
- Any failure aborts unfinished siblings and descendants.
- Call `task.cancel()` for manual cancellation.

## 8. State Subscription
```ts
const off = task.onState((s) => {
  console.log(s.status, s.loading, s.error);
});

off();
```

## 9. Adapter Hooks
- Vue: `useVueAsyncFlow(flow)`
- React: `useReactAsyncFlow(flow)`

Both adapters:
- map task state to framework state
- auto-clean subscription
- auto-cancel on component unmount

## 10. Best Practices
- Keep step functions pure when possible.
- Assign explicit `id` for important steps.
- Keep side effects in final steps.
- Prefer `deferFlow` sugar for short serial workflows.
- Use global engine singleton in app-level bootstrap.

## 11. Business Scenario (Vue2/Vue3)
- Shared API mock/open endpoint wrapper: `examples/scenario/mockBusinessApi.ts`
- Global engine init: `examples/scenario/engine.ts`
- Vue3 child usage: `examples/vue3/BusinessLoginFlow.vue`
- Vue2 child usage: `examples/vue2/BusinessLoginFlow.vue`

Vue3 approach:
- use `useVueAsyncFlow` hook adapter
- bind `status/loading/data/error` directly
- cleanup handled automatically by adapter

Vue2 approach:
- use core `flow.run()` + `task.onState()`
- cleanup in `beforeDestroy`
