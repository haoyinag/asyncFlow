# React Usage (v0.1 API)

```tsx
import { runParallel, useReactAsyncTask } from "asyncflow";

const { run, cancel, status, loading, data, error } = useReactAsyncTask(async ({ signal, input }) => {
  const qr = await getLoginQrCode(signal);
  const login = await loginByPassword(input, qr.qrId, signal);
  const token = await getToken(login.sessionId, signal);

  const [notices, list, vip] = await runParallel(
    [
      () => fetchNotices(token.accessToken, signal),
      () => fetchList(token.accessToken, signal),
      () => fetchVipInfo(token.accessToken, signal)
    ],
    undefined,
    { concurrency: 2, signal }
  );

  return { qr, token, notices, list, vip };
});
```
