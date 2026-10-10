import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 9", () => {
  it("resolves cave", () => {
    expect(lookupSymbol("cave")?.meaning).toContain("retreat");
  });

  it("interprets a cave dream deterministically", () => {
    const a = interpretDream("dream of cave at night", 7331);
    const b = interpretDream("dream of cave at night", 7331);
    expect(a).toEqual(b);
  });
});
