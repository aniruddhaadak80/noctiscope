import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 15", () => {
  it("resolves desert", () => {
    expect(lookupSymbol("desert")?.meaning).toContain("emotional");
  });

  it("interprets a desert dream deterministically", () => {
    const a = interpretDream("dream of desert at night", 7331);
    const b = interpretDream("dream of desert at night", 7331);
    expect(a).toEqual(b);
  });
});
