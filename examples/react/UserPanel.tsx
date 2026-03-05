import { deferFlow, useReactAsyncFlow } from "../../src/index";
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

const userFlow = asyncFlowEngine.createFlow(
  deferFlow([
    async ({ signal }) => {
      await sleep(100, signal);
      return "token-from-child";
    },
    async ({ last, signal }) => {
      await sleep(150, signal);
      const token = last() as string;
      return { id: 202, name: "Grace", token };
    },
    ({ last }) => {
      const profile = last() as { id: number; name: string };
      return `${profile.name}#${profile.id}`;
    }
  ], "user-flow")
);

export default function UserPanel() {
  const { run, cancel, status, loading, data, error } = useReactAsyncFlow(userFlow);

  return (
    <section>
      <h2>React Child Component</h2>
      <p>Status: {status}</p>
      <p>Loading: {String(loading)}</p>
      <p>Data: {String(data)}</p>
      <p style={{ color: "#c00" }}>Error: {error?.message}</p>

      <button onClick={() => run()}>Run Child Flow</button>
      <button onClick={() => cancel("child cancel")} style={{ marginLeft: 8 }}>
        Cancel
      </button>
    </section>
  );
}
