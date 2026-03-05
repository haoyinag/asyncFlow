import { describe, expect, it } from "vitest";
import { createFlow, useReactAsyncFlow, useVueAsyncFlow } from "../src/index";

describe("adapter exports", () => {
  it("exports vue/react hook adapters", () => {
    expect(typeof useVueAsyncFlow).toBe("function");
    expect(typeof useReactAsyncFlow).toBe("function");
  });

  it("createFlow still works with adapter exports present", async () => {
    const flow = createFlow({ mode: "defer", tasks: [() => 1] });
    const task = flow.run();
    const result = await task.result;
    expect(result.status).toBe("success");
  });
});
