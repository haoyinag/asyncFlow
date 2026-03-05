# 快速开始

## 安装
```bash
npm install mangoo
```

## 最小示例
```ts
import { runTask, runParallel } from "mangoo";

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
import { useTask } from "mangoo/react";

const { run, execute, cancel, status, loading, data, error } = useTask(async ({ signal, params }) => {
  return login(params, signal);
});
```

## Vue Hook
```ts
import { useTask } from "mangoo/vue";

const { run, execute, cancel, status, loading, data, error } = useTask(async ({ signal, params }) => {
  return login(params, signal);
});
```
