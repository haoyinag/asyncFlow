# Vue 使用文档（v0.2 草案）

## 1. 全局初始化（推荐）
```ts
import { createRunner } from "asyncflow";

export const asyncRunner = createRunner({
  concurrency: 4,
  mode: "fail-fast"
});
```

## 2. 子组件使用
```ts
import { useVueAsyncTask } from "asyncflow";

const { execute, cancel, status, loading, data, error } = useVueAsyncTask(async ({ params, signal }) => {
  const qr = await getLoginQrCode(signal);
  const login = await loginByPassword(params, qr.qrId, signal);
  const token = await getToken(login.sessionId, signal);
  return { token };
});
```
