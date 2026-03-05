# 10 分钟上手（新手版）

目标：不学复杂概念，先跑通一个真实可用流程。

## 第 1 步：先记住 2 个 API
1. `runTask`：跑一个完整异步任务（自动给你状态与取消）
2. `runParallel`：在任务里跑并发请求

## 第 2 步：直接复制这个最小模板
```ts
import { runTask, runParallel } from "asyncflow";

const task = runTask(async ({ params, signal }) => {
  // 串行步骤（原生 await）
  const token = await login(params, signal);

  // 并发步骤（仅并发段用 runParallel）
  const [notices, vip] = await runParallel(
    [
      () => fetchNotices(token, signal),
      () => fetchVip(token, signal)
    ],
    undefined,
    { concurrency: 2, mode: "fail-fast", signal }
  );

  return { token, notices, vip };
}, {
  params: { account: "a", password: "b" }
});

const res = await task.result;
```

## 第 3 步：理解 3 个字段
1. `params`：这次执行的输入参数
2. `signal`：取消信号（请求层支持时可真正中断请求）
3. `status/loading/data/error`：任务状态（通过 `onState` 或 Hook 获取）

## 第 4 步：什么时候传 `signal`
- 先记一句话：**不传也能用，传了才可中断。**
- 如果你的请求封装支持 `signal`，就传：
```ts
fetch(url, { signal })
```
- 如果你们旧项目不支持，先不改，也能先用任务状态与取消语义。

## 第 5 步：什么时候用 `runParallel`
- 有并发请求才用
- 串行依赖链继续原生 `await`

## 第 6 步：推荐学习顺序
1. 先用 `runTask` 跑通一个页面提交流程
2. 再把首页并发请求替换为 `runParallel`
3. 最后再看 `meta`（进阶）
