import { createAsyncFlow } from "../../src/index";

// App-level singleton engine
export const asyncFlowEngine = createAsyncFlow({
  concurrency: 6,
  abortOnError: true
});
