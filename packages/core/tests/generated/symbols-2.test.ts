import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 2", () => {
  it("resolves avalanche", () => {
    expect(lookupSymbol("avalanche")?.meaning).toContain("overwhelming");
  });

  it("interprets a avalanche dream deterministically", () => {
    const a = interpretDream("dream of avalanche at night", 7331);
    const b = interpretDream("dream of avalanche at night", 7331);
    expect(a).toEqual(b);
  });
});
