# 取消与 Signal

## 一句话原则

不传 `signal` 也能跑；传了 `signal` 才能真正中断底层请求。

## 推荐做法

在每一层都把 `signal` 继续透传：

```ts
const task = runTask(async ({ signal }) => {
  return api.fetchUser({ signal });
});
```

```ts
function fetchUser({ signal }: { signal?: AbortSignal }) {
  return fetch('/api/user', { signal }).then((r) => r.json());
}
```

## 常见误区

- 只在顶层有 `signal`，请求函数没接收，结果“看起来取消了但请求没停”。
- 手动 `cancel()` 后仍然收到成功结果。通常是底层任务没有响应 `signal`。

## 与状态的关系

当任务因取消而结束时：
- `status` 为 `aborted`
- `error.kind` 为 `abort`
- `error.aborted` 为 `true`
