import { describe, expect, it } from "vitest";
import { useReactAsyncTask, useVueAsyncTask } from "../src/index";

describe("adapter exports (v0.1)", () => {
  it("exports react/vue task hooks", () => {
    expect(typeof useReactAsyncTask).toBe("function");
    expect(typeof useVueAsyncTask).toBe("function");
  });
});
