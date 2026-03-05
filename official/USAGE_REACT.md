# React Usage (v0.2 Draft)

## Global initialization
```ts
import { createRunner } from "mangoo";

export const taskRunner = createRunner({
  concurrency: 4,
  mode: "fail-fast"
});
```

## Child component usage
```tsx
import { useTask } from "mangoo/react";

const { execute, cancel, status, loading, data, error } = useTask(async ({ params, signal }) => {
  const qr = await getLoginQrCode(signal);
  const login = await loginByPassword(params, qr.qrId, signal);
  const token = await getToken(login.sessionId, signal);
  return { token };
});
```
