# Error Handling

## Error shape

`mangoo` normalizes task errors into `AsyncTaskError`:

```ts
interface AsyncTaskError {
  code: string;
  message: string;
  kind: 'abort' | 'network' | 'business' | 'unknown';
  stepId?: string;
  phase?: string;
  cause?: unknown;
  aborted: boolean;
}
```

## Sources

Errors can come from:
- thrown business errors in your task
- network failures
- manual cancellation or external signal abort

## Recommended pattern

```ts
const result = await task.result;

if (result.status === 'aborted') {
  return;
}

if (result.status === 'error') {
  report(result.error);
  return;
}

render(result.data);
```

## Parallel errors

- `fail-fast`: rejects with first `AsyncTaskError`
- `collect-all`: rejects with `AggregateError` whose `errors` hold each sub-task error
