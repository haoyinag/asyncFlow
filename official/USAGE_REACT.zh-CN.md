# React 使用文档（v0.2 草案）

## 1. 全局初始化（推荐）
```ts
import { createRunner } from "mangoo";

export const taskRunner = createRunner({
  concurrency: 4,
  mode: "fail-fast"
});
```

## 2. 子组件使用
```tsx
import { useTask } from "mangoo/react";

const { execute, cancel, status, loading, data, error } = useTask(async ({ params, signal }) => {
  const qr = await getLoginQrCode(signal);
  const login = await loginByPassword(params, qr.qrId, signal);
  const token = await getToken(login.sessionId, signal);
  return { token };
});
```
