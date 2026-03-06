# Core Concepts

## 1) Task

A task is one async workflow executed through `runTask`.

A task has:
- `id`
- `result` promise
- `cancel(reason?)`
- state subscription (`onState`, `getState`)

## 2) State

Each task run exposes one state snapshot model:

- `status`: `idle | running | success | error | aborted`
- `loading`: boolean
- `data`: success payload
- `error`: `AsyncTaskError | null`
- `meta`: user-defined mutable meta object
- `startedAt` / `endedAt`

## 3) Cancellation model

`mangoo` cancels by aborting an internal `AbortController`.

Important:
- cancellation is cooperative
- your async code (or HTTP client) must honor `signal`
- if underlying work ignores `signal`, it may still complete

## 4) Parallel model

`runParallel` executes task array with a concurrency limit.

Modes:
- `fail-fast`: reject immediately on first failure and abort siblings
- `collect-all`: wait all, then reject with `AggregateError` if any failed

## 5) Runner

`createRunner({ concurrency, mode })` gives a preconfigured pair:
- `runner.runTask(...)`
- `runner.runParallel(...)`

Defaults are only for `runParallel`.
