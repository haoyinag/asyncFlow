# React 用法

## 导入

```ts
import { useTask } from 'mangoo/react';
```

## 基础示例

```tsx
import { useTask } from 'mangoo/react';

type SubmitInput = { title: string };
type SubmitData = { id: string };

type SubmitMeta = { phase: string };

export function Demo() {
  const { run, cancel, status, loading, data, error, meta } = useTask<SubmitInput, SubmitData, SubmitMeta>(
    async ({ params, signal, setMeta }) => {
      setMeta({ phase: 'saving' });
      const saved = await api.save(params, { signal });

      setMeta({ phase: 'done' });
      return saved;
    },
    { concurrency: 4, mode: 'fail-fast' },
    { phase: 'idle' }
  );

  return (
    <>
      <button disabled={loading} onClick={() => run({ title: 'A' })}>提交</button>
      <button disabled={!loading} onClick={() => cancel('manual_cancel')}>取消</button>
      <p>{status}</p>
      <p>{meta.phase}</p>
      <p>{error?.message}</p>
      <p>{data?.id}</p>
    </>
  );
}
```

## 行为说明

- `run` 与 `execute` 完全等价。
- 再次调用 `run` 会取消上一次运行（原因：`replaced_by_new_run`）。
- 组件卸载时会自动取消（原因：`component_unmounted`）。
