# 快速开始

## 安装
```bash
npm install
```

## 最小示例
```ts
import { runTask, runParallel } from "asyncflow";

const task = runTask(async ({ signal }) => {
  const token = await getToken(signal);
  const [notices, vip] = await runParallel(
    [
      () => fetchNotices(token, signal),
      () => fetchVipInfo(token, signal)
    ],
    undefined,
    { concurrency: 2, signal }
  );

  return { token, notices, vip };
});

const result = await task.result;
```

## React Hook
```tsx
import { useReactAsyncTask } from "asyncflow";

const { run, execute, cancel, status, loading, data, error } = useReactAsyncTask(async ({ signal, params }) => {
  return login(params, signal);
});
```

## Vue Hook
```ts
import { useVueAsyncTask } from "asyncflow";

const { run, execute, cancel, status, loading, data, error } = useVueAsyncTask(async ({ signal, params }) => {
  return login(params, signal);
});
```
