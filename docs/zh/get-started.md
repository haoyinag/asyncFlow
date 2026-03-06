# 10 分钟上手

## 1. 安装

```bash
npm install mangoo
```

按需导入：

```ts
import { runTask, runParallel, createRunner } from 'mangoo';
import { useTask as useReactTask } from 'mangoo/react';
import { useTask as useVueTask } from 'mangoo/vue';
```

## 2. 第一个任务

```ts
import { runTask } from 'mangoo';

type LoginInput = { account: string; password: string };

type Meta = { phase: string };

const task = runTask<LoginInput, { token: string }, Meta>(
  async ({ params, signal, setMeta }) => {
    setMeta({ phase: 'login' });
    const session = await api.login(params, { signal });

    setMeta({ phase: 'token' });
    const token = await api.getToken(session.id, { signal });

    return { token };
  },
  {
    params: { account: 'demo', password: '123456' },
    meta: { phase: 'init' }
  }
);

task.onState((state) => {
  console.log(state.status, state.loading, state.meta.phase);
});

const result = await task.result;
```

## 3. 并发段用 runParallel

```ts
const [notices, profile] = await runParallel(
  [
    ({ signal }) => api.getNotices({ signal }),
    ({ signal }) => api.getProfile({ signal })
  ],
  undefined,
  { concurrency: 2, mode: 'fail-fast' }
);
```

## 4. 记住这条原则

只在“需要控制的点”使用 `mangoo`：
- 主流程：继续写原生 `await`
- 并发段：使用 `runParallel`
- UI 层：使用 `useTask`
