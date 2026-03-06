# runTask

## 签名

```ts
runTask(taskFn, config?) => TaskHandleSimple
```

## 入参

### `taskFn`

```ts
(ctx) => O | Promise<O>
```

其中 `ctx` 包含：
- `params`: 输入参数
- `signal`: 取消信号
- `setMeta(patch)`: 更新元信息
- `getMeta()`: 读取当前元信息

### `config`

```ts
{
  params?: I;
  signal?: AbortSignal;
  meta?: M;
}
```

## 返回值

- `id`: 任务 ID
- `result`: `Promise<TaskResult>`
- `cancel(reason?)`: 主动取消
- `onState(listener)`: 订阅状态变化
- `getState()`: 获取当前快照

## 实战示例：保存并写审计

```ts
const task = runTask(
  async ({ params, signal, setMeta }) => {
    setMeta({ step: 'save' });
    const saved = await api.saveDraft(params, { signal });

    setMeta({ step: 'audit' });
    await api.writeAudit(saved.id, { signal });

    return saved;
  },
  {
    params: { title: '文档 A' },
    meta: { step: 'init' }
  }
);

const result = await task.result;

if (result.status === 'success') {
  console.log(result.data);
}
```

## 注意事项

- `task.result` 在错误场景下不会抛出，而是返回 `status: 'error' | 'aborted'`。
- `onState` 注册后会先立刻收到一次当前状态。
