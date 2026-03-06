# Getting Started

`mangoo` is a lightweight guardrail layer for async workflows.

It gives you:
- a stable task state model (`idle/running/success/error/aborted`)
- cancellation via `AbortSignal`
- controlled parallel execution
- React and Vue adapters with the same mental model

## Install

```bash
npm install mangoo
```

Framework adapters are shipped as subpath exports:

```ts
import { runTask, runParallel, createRunner } from 'mangoo';
import { useTask as useReactTask } from 'mangoo/react';
import { useTask as useVueTask } from 'mangoo/vue';
```

## Your first task

```ts
import { runTask } from 'mangoo';

const loginTask = runTask(
  async ({ params, signal, setMeta }) => {
    setMeta({ phase: 'checking' });

    const user = await api.login(params, { signal });
    setMeta({ phase: 'fetching-profile' });

    const profile = await api.getProfile(user.id, { signal });
    return profile;
  },
  {
    params: { account: 'demo', password: '123456' },
    meta: { phase: 'init' }
  }
);

loginTask.onState((s) => {
  console.log(s.status, s.loading, s.meta.phase);
});

const result = await loginTask.result;

if (result.status === 'success') {
  console.log(result.data);
}
```

## Next steps

- Read [Core Concepts](/core-concepts)
- Learn [runTask](/run-task)
- Learn [runParallel](/run-parallel)
