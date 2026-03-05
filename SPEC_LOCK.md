# AsyncFlow v0.1 Lock Spec

Status: Locked
Updated: 2026-03-05

## 1. Product Positioning
1. `AsyncFlow` is a lightweight, atomic async orchestration engine focused on less boilerplate, safer defaults, and better observability.
2. It targets common Promise/`async/await` pain points: unclear orchestration, scattered error handling, weak cancellation lifecycle, and concurrency control complexity.
3. Implementation language: TypeScript.
4. Design principles: simple by default, safe by default, performance-oriented, observable, extensible.
5. v0.1 scope: core scheduler + safety semantics + type support + tests; heavy features deferred.

## 2. Orchestration & DSL
6. Two execution modes: `defer` (serial) and `async` (parallel).
7. Infinite nesting is supported.
8. DSL supports both sugar and explicit nodes (`step/group`).
9. Sugar semantics: function => `step`, array => `async group`.
10. Explicit `step/group` is recommended for complex workflows.

## 3. Data Pipeline
11. Unified context `ctx` is passed through all nodes.
12. `ctx.prev` uses a strict discriminated union (`single/group`).
13. Parallel output includes `byIndex` and `byId`.
14. Ergonomic helpers are required: `ctx.last()`, `ctx.pick(id)`, `ctx.results()`.
15. Node outputs include metadata (status, timing, error, aborted) for traceability.

## 4. Safety, Abort, Error
16. `AbortSignal` is auto-injected for every executable node.
17. Default failure policy: `abortOnError = true` (fail-fast).
18. Manual cancellation is required: `cancel(reason?)`.
19. Cancellation propagation:
   1. Parent cancel => all descendants canceled.
   2. Child failure => parent abort => unfinished siblings canceled.
20. Sync and async handlers can be mixed seamlessly.

## 5. Concurrency, State, Observability
21. v0.1 only includes global concurrency limit.
22. Local/per-group concurrency is explicitly postponed to v0.2+.
23. Built-in flow-level state: `status/loading/data/error`.
24. State subscription is required (`onState`/`subscribe`).
25. Flow/step/group lifecycle events should be available at least internally (`start/success/error/abort/end`).

## 6. Naming, IDs, Engine Usage
26. API naming must be semantic and concise to reduce cognitive load.
27. Recommended top-level APIs: `createFlow`, `runFlow`, `task.cancel()`, `task.onState()`.
28. `step.id` is optional for users.
29. If omitted, engine generates stable unique ids based on flow/path/counter (no function-source hash).
30. Recommended usage pattern: global engine initialization.
31. Components/pages call `run` per-use; not re-initializing engine each time.

## 7. Framework Adapters
32. Core remains framework-agnostic (no hard coupling to Vue/React internals).
33. Provide thin Vue/React adapters.
34. Provide `useAsyncFlow` hooks/composables for Vue/React.
35. Hook/composable must auto-handle subscription and unmount cleanup (including cancellation).

## 8. Performance & Memory Safety
36. Task completion must auto-release internal references.
37. Subscriptions must be detachable and leak-safe.
38. No heavy benchmarking required in v0.1, but anti-regression checks are required.
39. Minimum performance guardrails:
   1. Global concurrency cap is strictly enforced.
   2. Typical workload (100-300 tasks) has no obvious extra overhead.
40. Add churn/stability tests (create/cancel repeatedly) to detect sustained memory growth risks.

## 9. Error Model & Testing
41. Unified `AsyncFlowError` structure: `code/message/stepId/phase/cause/aborted`.
42. MVP required tests:
   1. serial/parallel/nested execution
   2. pipeline (`last/pick/results`)
   3. fail-fast and cancellation propagation
   4. global concurrency cap
   5. sync+async mixed execution
43. v0.1 acceptance: concise API, deterministic behavior, safe defaults, usable TS types, reproducible tests.

## 10. Explicit Non-goals for v0.1
44. Out of scope: local concurrency, retries/backoff, timeout DSL, compensation transactions, persistence/recovery.

---
This document is the locked implementation baseline for `AsyncFlow v0.1`.
Any scope changes must be explicitly added as a new section or new version file.
