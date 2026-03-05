# Vue Usage (v0.2 Draft)

## Global initialization
```ts
import { createRunner } from "mangoo";
export const asyncRunner = createRunner({ concurrency: 4, mode: "fail-fast" });
```

## Child component usage
```ts
import { useVueAsyncTask } from "mangoo";

const { execute, cancel, status, loading, data, error } = useVueAsyncTask(async ({ params, signal }) => {
  const qr = await getLoginQrCode(signal);
  const login = await loginByPassword(params, qr.qrId, signal);
  const token = await getToken(login.sessionId, signal);
  return { token };
});
```
