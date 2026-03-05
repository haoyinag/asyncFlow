# React 使用示例（当前 v0.1 API）

## 示例：登录后并发加载首页数据
```tsx
import React, { useState } from "react";
import { runParallel, useReactAsyncTask } from "asyncflow";

export default function Demo() {
  const [form, setForm] = useState({ account: "", password: "", captcha: "" });

  const { run, cancel, status, loading, data, error } = useReactAsyncTask(async ({ signal, input }) => {
    const payload = input as typeof form;

    const qr = await getLoginQrCode(signal);
    const login = await loginByPassword(payload, qr.qrId, signal);
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

  return (
    <div>
      <button onClick={() => run(form)}>Run</button>
      <button onClick={() => cancel("manual")}>Cancel</button>
      <p>{status}</p>
      <p>{String(loading)}</p>
      <p>{error?.message}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```
