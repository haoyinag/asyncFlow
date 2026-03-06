# React: useTask

## Import

```ts
import { useTask } from 'mangoo/react';
```

## Basic usage

```tsx
import { useTask } from 'mangoo/react';

type LoginInput = { account: string; password: string };

type LoginData = { accessToken: string };

export function LoginForm() {
  const { run, cancel, status, loading, data, error, meta } = useTask<LoginInput, LoginData, { phase: string }>(
    async ({ params, signal, setMeta }) => {
      setMeta({ phase: 'auth' });
      const login = await api.login(params, { signal });

      setMeta({ phase: 'token' });
      return api.getToken(login.sessionId, { signal });
    },
    { concurrency: 4, mode: 'fail-fast' },
    { phase: 'idle' }
  );

  return (
    <div>
      <button onClick={() => run({ account: 'demo', password: '123456' })} disabled={loading}>
        Login
      </button>
      <button onClick={() => cancel('manual_cancel')} disabled={!loading}>
        Cancel
      </button>

      <p>Status: {status}</p>
      <p>Phase: {meta.phase}</p>
      <p>Error: {error?.message}</p>
      <p>Token: {data?.accessToken}</p>
    </div>
  );
}
```

## Behavior notes

- `run(params?, options?)` starts one run and returns `TaskResult`.
- `execute` is an alias of `run`.
- starting a new `run` cancels previous run with reason `replaced_by_new_run`.
- on unmount, current task is canceled with reason `component_unmounted`.
