# Vue 用法

## 导入

```ts
import { useTask } from 'mangoo/vue';
```

## 基础示例

```vue
<script setup lang="ts">
import { useTask } from 'mangoo/vue';

type LoadInput = { id: string };
type LoadData = { name: string };

const task = useTask<LoadInput, LoadData, { phase: string }>(
  async ({ params, signal, setMeta }) => {
    setMeta({ phase: 'loading' });
    return api.fetchDetail(params.id, { signal });
  },
  { concurrency: 4, mode: 'fail-fast' },
  { phase: 'idle' }
);

function load() {
  void task.run({ id: '1001' });
}
</script>

<template>
  <button :disabled="task.loading" @click="load">加载</button>
  <button :disabled="!task.loading" @click="task.cancel('manual_cancel')">取消</button>

  <p>{{ task.status }}</p>
  <p>{{ task.meta.phase }}</p>
  <p>{{ task.error?.message }}</p>
  <p>{{ task.data?.name }}</p>
</template>
```

## 行为说明

- `run` 与 `execute` 是同一个函数。
- 多次运行时，旧任务会先被取消。
- 组件卸载时，当前任务自动取消。
