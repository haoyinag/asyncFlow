export * from "./types";
export * from "./errors";
export * from "./sugar";

export { AsyncFlowEngine, createAsyncFlow } from "./engine";

import { createAsyncFlow } from "./engine";

const defaultEngine = createAsyncFlow();

export const createFlow = defaultEngine.createFlow;
export const runFlow = defaultEngine.runFlow;

export { useAsyncFlow as useVueAsyncFlow } from "./adapters/vue";
export { useAsyncFlow as useReactAsyncFlow } from "./adapters/react";
