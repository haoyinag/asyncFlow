import type { ListenerStore, NodeEnvelope, PrevValue } from "./types";

export function makePrev(envelope: NodeEnvelope): PrevValue {
  if (envelope.kind === "step") {
    return { type: "single", value: envelope };
  }
  return { type: "group", value: envelope };
}

export function lastValue(prev?: PrevValue): unknown {
  if (!prev) return undefined;
  if (prev.type === "single") {
    return prev.value.status === "fulfilled" ? prev.value.data : undefined;
  }
  return prev.value;
}

export function pickValue(envelopes: Record<string, NodeEnvelope>, id: string): unknown {
  const env = envelopes[id];
  if (!env) return undefined;
  if (env.kind === "step") {
    return env.status === "fulfilled" ? env.data : undefined;
  }
  return env;
}

export function resultsValue(envelopes: Record<string, NodeEnvelope>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [id, env] of Object.entries(envelopes)) {
    out[id] = env.kind === "step" ? (env.status === "fulfilled" ? env.data : undefined) : env;
  }
  return out;
}

export function createListenerStore(): ListenerStore {
  return {
    state: {
      status: "idle",
      loading: false,
      data: undefined,
      error: null,
      startedAt: null,
      endedAt: null,
      lastEvent: null
    },
    listeners: new Set()
  };
}

export function emitState(store: ListenerStore) {
  const snapshot = { ...store.state };
  for (const listener of store.listeners) listener(snapshot);
}
