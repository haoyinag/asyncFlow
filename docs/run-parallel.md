# runParallel

## Signature

```ts
runParallel(tasks, params?, options?) => Promise<O[]>
```

## Options

```ts
type ParallelRunOptions = {
  concurrency?: number; // default 8
  mode?: 'fail-fast' | 'collect-all'; // default fail-fast
  signal?: AbortSignal;
};
```

## Example: dashboard bootstrap

```ts
import { runParallel } from 'mangoo';

const [profile, notices, stats] = await runParallel(
  [
    ({ signal }) => api.getProfile({ signal }),
    ({ signal }) => api.getNotices({ signal }),
    ({ signal }) => api.getStats({ signal })
  ],
  undefined,
  { concurrency: 2, mode: 'fail-fast' }
);
```

## `fail-fast` vs `collect-all`

### `fail-fast`

- first failed sub-task rejects the whole promise
- remaining tasks receive aborted signal

### `collect-all`

- waits for all sub-tasks to settle
- rejects once with `AggregateError` if any failed

```ts
try {
  await runParallel(tasks, undefined, { mode: 'collect-all' });
} catch (e) {
  if (e instanceof AggregateError) {
    console.log(e.errors); // array of AsyncTaskError
  }
}
```

## Notes

- result order is stable and matches input task order
- `concurrency <= 0` throws `AsyncTaskError` with code `INVALID_CONCURRENCY`
