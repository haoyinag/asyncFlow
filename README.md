# mangoo

`mangoo` is a native-first async guardrail library.

## Current Status
- Baseline: `v0.1` (locked)
- Working track: `v0.2-draft` (P0+P1 applied)

## Primary API (current draft)
- `runTask`
- `runParallel`
- `createRunner`
- `useReactAsyncTask`
- `useVueAsyncTask`

## Principles
1. Keep business logic in native `async/await`
2. Add guardrails for state/cancel/concurrency/error
3. Keep core framework-agnostic
4. Keep core HTTP-client-agnostic

## Official Docs
- English: [official/README.md](./official/README.md)
- Chinese: [official/README.zh-CN.md](./official/README.zh-CN.md)

## Usage Guides
- [official/USAGE_REACT.md](./official/USAGE_REACT.md)
- [official/USAGE_VUE.md](./official/USAGE_VUE.md)

## Commands
```bash
npm install mangoo
npm test
npm run build
```
