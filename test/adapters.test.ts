import { describe, expect, it } from "vitest";
import { useTask as useReactTask } from "../src/react";
import { useTask as useVueTask } from "../src/vue";

describe("adapter exports (v0.1)", () => {
  it("exports react/vue task hooks", () => {
    expect(typeof useReactTask).toBe("function");
    expect(typeof useVueTask).toBe("function");
  });
});
