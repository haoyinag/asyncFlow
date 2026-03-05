import { describe, expect, it } from "vitest";
import { asyncGroup, createFlow, deferFlow, runFlow, step } from "../src/index";

describe("sugar api", () => {
  it("builds flow/group/step with concise helpers", () => {
    const s = step(() => 1, "s1");
    const g = asyncGroup([() => 1], "g1");
    const f = deferFlow([s, g], "f1");

    expect(s.id).toBe("s1");
    expect(g.mode).toBe("async");
    expect(f.mode).toBe("defer");
    expect(f.id).toBe("f1");
  });

  it("runs concise serial flow with less boilerplate", async () => {
    const flow = createFlow(
      deferFlow([
        async () => "token-1",
        ({ last }) => ({ id: 1, name: "Ada", token: last() as string }),
        ({ last }) => {
          const p = last() as { id: number; name: string };
          return `${p.name}#${p.id}`;
        }
      ])
    );

    const result = await flow.run().result;
    expect(result.status).toBe("success");
    const root = result.data as { byIndex: Array<{ data: unknown }> };
    expect(root.byIndex[2].data).toBe("Ada#1");
  });

  it("still supports plain runFlow usage", async () => {
    const result = await runFlow({ mode: "defer", tasks: [() => 1] }).result;
    expect(result.status).toBe("success");
  });
});
