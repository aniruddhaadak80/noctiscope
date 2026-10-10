import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 0", () => {
  it("resolves abyss", () => {
    expect(lookupSymbol("abyss")?.meaning).toContain("confrontation");
  });

  it("interprets a abyss dream deterministically", () => {
    const a = interpretDream("dream of abyss at night", 7331);
    const b = interpretDream("dream of abyss at night", 7331);
    expect(a).toEqual(b);
  });
});
