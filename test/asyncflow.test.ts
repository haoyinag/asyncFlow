import { describe, expect, it } from "vitest";
import { createAsyncFlow, runFlow } from "../src/index";

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

    if (signal) {
      signal.addEventListener("abort", onAbort, { once: true });
    }
  });
}

describe("AsyncFlow v0.1 MVP", () => {
  it("runs defer tasks in order and pipes last result", async () => {
    const task = runFlow({
      mode: "defer",
      tasks: [
        () => 1,
        ({ last }) => (last() as number) + 2,
        async ({ last }) => {
          await sleep(5);
          return (last() as number) * 3;
        }
      ]
    });

    const result = await task.result;
    expect(result.status).toBe("success");
    expect((result.data as { byIndex: Array<{ data: unknown }> }).byIndex[2].data).toBe(9);
  });

  it("runs async group in parallel and supports nested group", async () => {
    const task = runFlow({
      mode: "defer",
      tasks: [
        {
          mode: "async",
          tasks: [
            async () => {
              await sleep(20);
              return "A";
            },
            async () => {
              await sleep(10);
              return "B";
            },
            {
              mode: "defer",
              tasks: [() => "C1", ({ last }) => `${String(last())}-C2`]
            }
          ]
        }
      ]
    });

    const result = await task.result;
    const root = result.data as { byIndex: Array<{ byIndex: Array<{ data: unknown }> }> };
    const asyncGroup = root.byIndex[0];
    expect(asyncGroup.byIndex[0].data).toBe("A");
    expect(asyncGroup.byIndex[1].data).toBe("B");
    expect((asyncGroup.byIndex[2] as { byIndex: Array<{ data: unknown }> }).byIndex[1].data).toBe("C1-C2");
  });

  it("supports last/pick/results helpers", async () => {
    const task = runFlow({
      mode: "defer",
      tasks: [
        { id: "token", run: () => "t-1" },
        {
          id: "profile",
          run: ({ pick, results }) => {
            const t = pick("token");
            const keys = Object.keys(results());
            return `${String(t)}:${keys.includes("token")}`;
          }
        }
      ]
    });

    const result = await task.result;
    const root = result.data as { byId: Record<string, { data: unknown }> };
    expect(root.byId.profile.data).toBe("t-1:true");
  });

  it("fail-fast aborts siblings and returns error status", async () => {
    const task = runFlow({
      mode: "defer",
      tasks: [
        {
          mode: "async",
          tasks: [
            async () => {
              await sleep(5);
              throw new Error("boom");
            },
            async ({ signal }) => {
              await sleep(80, signal);
              return "never";
            }
          ]
        }
      ]
    });

    const result = await task.result;
    expect(result.status).toBe("error");
    expect(result.error?.code).toBe("STEP_ERROR");

    const envelopes = result.envelopes;
    const abortedExists = Object.values(envelopes).some(
      (env) => env.kind === "step" && env.status === "aborted"
    );
    expect(abortedExists).toBe(true);
  });

  it("supports manual cancel", async () => {
    const task = runFlow({
      mode: "defer",
      tasks: [
        async ({ signal }) => {
          await sleep(100, signal);
          return 1;
        }
      ]
    });

    setTimeout(() => task.cancel("leave"), 5);
    const result = await task.result;
    expect(result.status).toBe("aborted");
    expect(result.error?.aborted).toBe(true);
  });

  it("enforces global concurrency cap", async () => {
    const engine = createAsyncFlow({ concurrency: 2 });
    let active = 0;
    let maxActive = 0;

    const task = engine.runFlow({
      mode: "defer",
      tasks: [
        {
          mode: "async",
          tasks: Array.from({ length: 8 }, (_, i) => async () => {
            active += 1;
            maxActive = Math.max(maxActive, active);
            await sleep(20 + (i % 2) * 10);
            active -= 1;
            return i;
          })
        }
      ]
    });

    const result = await task.result;
    expect(result.status).toBe("success");
    expect(maxActive).toBeLessThanOrEqual(2);
  });

  it("supports sync and async mixed tasks", async () => {
    const task = runFlow({
      mode: "defer",
      tasks: [
        () => 2,
        async ({ last }) => (last() as number) + 3,
        ({ last }) => (last() as number) * 2
      ]
    });

    const result = await task.result;
    const root = result.data as { byIndex: Array<{ data: unknown }> };
    expect(root.byIndex[2].data).toBe(10);
  });

  it("state subscription works and can unsubscribe", async () => {
    const task = runFlow({ mode: "defer", tasks: [() => 1] });

    let count = 0;
    const off = task.onState((s) => {
      count += 1;
      expect(["idle", "running", "success", "error", "aborted"]).toContain(s.status);
    });

    const result = await task.result;
    expect(result.status).toBe("success");
    off();
    expect(count).toBeGreaterThan(1);
  });

  it("is stable under repeated create/cancel cycles", async () => {
    const engine = createAsyncFlow({ concurrency: 4 });
    const tasks = Array.from({ length: 120 }, () =>
      engine.runFlow({
        mode: "defer",
        tasks: [
          async ({ signal }) => {
            await sleep(10, signal);
            return 1;
          }
        ]
      })
    );

    tasks.forEach((t, i) => {
      if (i % 2 === 0) t.cancel("batch_cancel");
    });

    const results = await Promise.all(tasks.map((t) => t.result));
    expect(results.length).toBe(120);
    const hasSuccess = results.some((r) => r.status === "success");
    const hasAborted = results.some((r) => r.status === "aborted");
    expect(hasSuccess).toBe(true);
    expect(hasAborted).toBe(true);
  });
});
