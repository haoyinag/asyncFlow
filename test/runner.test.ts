import { describe, expect, it } from "vitest";
import { createRunner, runParallel, runTask } from "../src/index";

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

describe("runner api", () => {
  it("runTask keeps native async/await style with unified state", async () => {
    const task = runTask(async ({ input, setMeta, signal }) => {
      setMeta({ phase: "start" });
      await sleep(5, signal);
      return `hello-${String(input)}`;
    }, "world", undefined, { phase: "init" as string });

    const snapshots: string[] = [];
    const off = task.onState((s) => snapshots.push(s.status));

    const result = await task.result;
    off();

    expect(result.status).toBe("success");
    expect(result.data).toBe("hello-world");
    expect(result.meta.phase).toBe("start");
    expect(snapshots.includes("running")).toBe(true);
    expect(snapshots.includes("success")).toBe(true);
  });

  it("runTask supports manual cancel", async () => {
    const task = runTask(async ({ signal }) => {
      await sleep(100, signal);
      return 1;
    });

    setTimeout(() => task.cancel("manual"), 5);
    const result = await task.result;
    expect(result.status).toBe("aborted");
    expect(result.error?.aborted).toBe(true);
  });

  it("runParallel limits concurrency", async () => {
    let active = 0;
    let maxActive = 0;

    const result = await runParallel(
      Array.from({ length: 8 }, (_, i) => async ({ signal }) => {
        active += 1;
        maxActive = Math.max(maxActive, active);
        await sleep(10 + (i % 3) * 5, signal);
        active -= 1;
        return i;
      }),
      undefined,
      { concurrency: 2 }
    );

    expect(result).toHaveLength(8);
    expect(maxActive).toBeLessThanOrEqual(2);
  });

  it("createRunner applies default options", async () => {
    const runner = createRunner({ concurrency: 2, abortOnError: true });

    let active = 0;
    let maxActive = 0;

    await runner.runParallel(
      Array.from({ length: 6 }, (_, i) => async ({ signal }) => {
        active += 1;
        maxActive = Math.max(maxActive, active);
        await sleep(8 + i, signal);
        active -= 1;
        return i;
      })
    );

    expect(maxActive).toBeLessThanOrEqual(2);
  });
});
