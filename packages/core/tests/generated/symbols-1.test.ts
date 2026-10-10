import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 1", () => {
  it("resolves anchor", () => {
    expect(lookupSymbol("anchor")?.meaning).toContain("need");
  });

  it("interprets a anchor dream deterministically", () => {
    const a = interpretDream("dream of anchor at night", 7331);
    const b = interpretDream("dream of anchor at night", 7331);
    expect(a).toEqual(b);
  });
});
