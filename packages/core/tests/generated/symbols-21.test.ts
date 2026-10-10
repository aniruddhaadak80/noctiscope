import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 21", () => {
  it("resolves feather", () => {
    expect(lookupSymbol("feather")?.meaning).toContain("lightness");
  });

  it("interprets a feather dream deterministically", () => {
    const a = interpretDream("dream of feather at night", 7331);
    const b = interpretDream("dream of feather at night", 7331);
    expect(a).toEqual(b);
  });
});
