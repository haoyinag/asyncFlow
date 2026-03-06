# runTask

## Signature

```ts
runTask(taskFn, config?) => TaskHandleSimple
```

## Parameters

### `taskFn`

```ts
type TaskFn<I, O, M> = (ctx: {
  params: I;
  signal: AbortSignal;
  setMeta: (patch: Partial<M>) => void;
  getMeta: () => M;
}) => O | Promise<O>;
```

### `config`

```ts
type TaskRunConfig<I, M> = {
  params?: I;
  signal?: AbortSignal;
  meta?: M;
};
```

## Return value

```ts
type TaskHandleSimple<T, M> = {
  id: string;
  result: Promise<{ status: 'success' | 'error' | 'aborted'; data?: T; error: AsyncTaskError | null; meta: M }>;
  cancel: (reason?: string) => void;
  onState: (listener: (state: TaskState<T, M>) => void) => () => void;
  getState: () => TaskState<T, M>;
};
```

## Example: form submit workflow

```ts
import { runTask } from 'mangoo';

const submitTask = runTask(
  async ({ params, signal, setMeta }) => {
    setMeta({ step: 'saving' });
    const saved = await api.saveForm(params, { signal });

    setMeta({ step: 'auditing' });
    await api.writeAuditLog(saved.id, { signal });

    return saved;
  },
  {
    params: { title: 'Draft' },
    meta: { step: 'init' }
  }
);

const off = submitTask.onState((s) => {
  console.log(s.status, s.meta.step);
});

const result = await submitTask.result;
off();
```

## Notes

- `result` never throws for task execution errors. It resolves with `status: 'error' | 'aborted'`.
- `cancel()` only aborts signal-aware code.
- `onState()` immediately emits current snapshot once subscribed.
