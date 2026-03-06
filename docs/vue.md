# Vue: useTask

## Import

```ts
import { useTask } from 'mangoo/vue';
```

## Basic usage

```vue
<script setup lang="ts">
import { useTask } from 'mangoo/vue';

type SaveInput = { title: string };
type SaveResult = { id: string };

const task = useTask<SaveInput, SaveResult, { phase: string }>(
  async ({ params, signal, setMeta }) => {
    setMeta({ phase: 'saving' });
    return api.save(params, { signal });
  },
  { concurrency: 4, mode: 'fail-fast' },
  { phase: 'idle' }
);

function onSubmit() {
  void task.run({ title: 'hello' });
}
</script>

<template>
  <button :disabled="task.loading" @click="onSubmit">Save</button>
  <button :disabled="!task.loading" @click="task.cancel('manual_cancel')">Cancel</button>

  <p>Status: {{ task.status }}</p>
  <p>Phase: {{ task.meta.phase }}</p>
  <p>Error: {{ task.error?.message }}</p>
  <p>ID: {{ task.data?.id }}</p>
</template>
```

## Behavior notes

- `run` and `execute` are equivalent.
- when `run` is called again, previous run is canceled first.
- on component unmount, current run is canceled automatically.
