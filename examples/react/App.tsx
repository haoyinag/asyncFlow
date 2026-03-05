import { createFlow, useReactAsyncFlow } from "../../src/index";

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
  id: "react-user-flow",
  mode: "defer",
  tasks: [
    {
      id: "token",
      run: async ({ signal }) => {
        await sleep(200, signal);
        return "token-002";
      }
    },
    {
      id: "profile",
      run: async ({ pick, signal }) => {
        await sleep(300, signal);
        const token = pick("token");
        return { id: 2, name: "Grace", token };
      }
    },
    {
      id: "summary",
      run: ({ pick }) => {
        const profile = pick("profile") as { id: number; name: string; token: string };
        return `${profile.name}#${profile.id}`;
      }
    }
  ]
});

export default function App() {
  const { run, cancel, status, loading, data, error } = useReactAsyncFlow(userFlow);

  const onRun = async () => {
    await run();
  };

  return (
    <main style={{ fontFamily: "sans-serif", padding: 16, maxWidth: 640, margin: "0 auto" }}>
      <h1>AsyncFlow React Example</h1>
      <p>Status: {status}</p>
      <p>Loading: {String(loading)}</p>
      <p>Data: {String(data)}</p>
      <p style={{ color: "#c00" }}>Error: {error?.message}</p>
      <button onClick={onRun}>Run Flow</button>
      <button onClick={() => cancel("manual cancel")} style={{ marginLeft: 8 }}>Cancel</button>
    </main>
  );
}
