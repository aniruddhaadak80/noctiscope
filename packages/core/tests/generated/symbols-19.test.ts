import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 19", () => {
  it("resolves elevator", () => {
    expect(lookupSymbol("elevator")?.meaning).toContain("rises");
  });

  it("interprets a elevator dream deterministically", () => {
    const a = interpretDream("dream of elevator at night", 7331);
    const b = interpretDream("dream of elevator at night", 7331);
    expect(a).toEqual(b);
  });
});
