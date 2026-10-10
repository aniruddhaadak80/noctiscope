import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 22", () => {
  it("resolves flood", () => {
    expect(lookupSymbol("flood")?.meaning).toContain("feelings");
  });

  it("interprets a flood dream deterministically", () => {
    const a = interpretDream("dream of flood at night", 7331);
    const b = interpretDream("dream of flood at night", 7331);
    expect(a).toEqual(b);
  });
});
