<script setup lang="ts">
import { deferFlow, useVueAsyncFlow } from "../../src/index";
import { asyncFlowEngine } from "./engine";

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

// In child component: define reusable flow template via global engine.
const userFlow = asyncFlowEngine.createFlow(
  deferFlow([
    async ({ signal }) => {
      await sleep(100, signal);
      return "token-from-child";
    },
    async ({ last, signal }) => {
      await sleep(150, signal);
      const token = last() as string;
      return { id: 101, name: "Ada", token };
    },
    ({ last }) => {
      const profile = last() as { id: number; name: string };
      return `${profile.name}#${profile.id}`;
    }
  ], "user-flow")
);

const { run, cancel, status, loading, data, error } = useVueAsyncFlow(userFlow);
</script>

<template>
  <section>
    <h2>Vue Child Component</h2>
    <p>Status: {{ status }}</p>
    <p>Loading: {{ loading }}</p>
    <p>Data: {{ data }}</p>
    <p style="color: #c00">Error: {{ error?.message }}</p>

    <button @click="run()">Run Child Flow</button>
    <button @click="cancel('child cancel')" style="margin-left: 8px">Cancel</button>
  </section>
</template>
