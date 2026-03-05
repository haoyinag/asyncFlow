# AsyncFlow

Lightweight async orchestration engine for Promise/async-await workflows.

## Documents
- Lock Spec (EN): [SPEC_LOCK.md](./SPEC_LOCK.md)
- Lock Spec (ZH): [SPEC_LOCK.zh-CN.md](./SPEC_LOCK.zh-CN.md)
- README (ZH): [README.zh-CN.md](./README.zh-CN.md)
- Examples (EN): [examples/README.md](./examples/README.md)
- Examples (ZH): [examples/README.zh-CN.md](./examples/README.zh-CN.md)

## v0.1 MVP Scope
- `defer` / `async` orchestration with nesting
- data piping via `ctx.prev` + `last/pick/results`
- auto `AbortSignal`, fail-fast, manual cancel
- global concurrency limit
- flow state subscription
- unified `AsyncFlowError`
- Vue/React adapter hooks (`useAsyncFlow`) with auto cleanup

## Quick Start
```bash
npm install
npm test
npm run build
```

## Adapter Hooks
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
