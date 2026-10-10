import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 16", () => {
  it("resolves dove", () => {
    expect(lookupSymbol("dove")?.meaning).toContain("longed-for");
  });

  it("interprets a dove dream deterministically", () => {
    const a = interpretDream("dream of dove at night", 7331);
    const b = interpretDream("dream of dove at night", 7331);
    expect(a).toEqual(b);
  });
});
