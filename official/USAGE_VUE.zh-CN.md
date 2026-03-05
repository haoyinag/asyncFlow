# Vue 使用示例（当前 v0.1 API）

## 示例：登录后并发加载首页数据
```vue
<script setup lang="ts">
import { runParallel, useVueAsyncTask } from "asyncflow";

const form = reactive({ account: "", password: "", captcha: "" });

const { run, cancel, status, loading, data, error } = useVueAsyncTask(async ({ signal, input }) => {
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
</script>
```
