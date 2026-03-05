import { createAsyncFlow } from "../../src/index";

// Global engine singleton: initialize once in app bootstrap.
export const asyncFlowEngine = createAsyncFlow({
  concurrency: 6,
  abortOnError: true
});
