import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 10", () => {
  it("resolves clock", () => {
    expect(lookupSymbol("clock")?.meaning).toContain("anxiety");
  });

  it("interprets a clock dream deterministically", () => {
    const a = interpretDream("dream of clock at night", 7331);
    const b = interpretDream("dream of clock at night", 7331);
    expect(a).toEqual(b);
  });
});
