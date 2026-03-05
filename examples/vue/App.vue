<script setup lang="ts">
import { createFlow, useVueAsyncFlow } from "../../src/index";

function sleep(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);

    const onAbort = () => {
      clearTimeout(timer);
      cleanup();
      reject(new Error("aborted"));
    };

    const cleanup = () => {
      if (signal) signal.removeEventListener("abort", onAbort);
    };

    if (signal) signal.addEventListener("abort", onAbort, { once: true });
  });
}

const userFlow = createFlow({
  id: "user-flow",
  mode: "defer",
  tasks: [
    { id: "token", run: async ({ signal }) => {
      await sleep(200, signal);
      return "token-001";
    }},
    { id: "profile", run: async ({ pick, signal }) => {
      await sleep(300, signal);
      const token = pick("token");
      return { id: 1, name: "Ada", token };
    }},
    { id: "summary", run: ({ pick }) => {
      const profile = pick("profile") as { id: number; name: string; token: string };
      return `${profile.name}#${profile.id}`;
    }}
  ]
});

const { run, cancel, status, loading, data, error } = useVueAsyncFlow(userFlow);

const onRun = async () => {
  await run();
};
</script>

<template>
  <main style="font-family: sans-serif; padding: 16px; max-width: 640px; margin: 0 auto;">
    <h1>AsyncFlow Vue Example</h1>
    <p>Status: {{ status }}</p>
    <p>Loading: {{ loading }}</p>
    <p>Data: {{ data }}</p>
    <p style="color: #c00">Error: {{ error?.message }}</p>
    <button @click="onRun">Run Flow</button>
    <button @click="cancel('manual cancel')" style="margin-left: 8px;">Cancel</button>
  </main>
</template>
