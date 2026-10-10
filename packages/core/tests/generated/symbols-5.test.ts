import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 5", () => {
  it("resolves bell", () => {
    expect(lookupSymbol("bell")?.meaning).toContain("a");
  });

  it("interprets a bell dream deterministically", () => {
    const a = interpretDream("dream of bell at night", 7331);
    const b = interpretDream("dream of bell at night", 7331);
    expect(a).toEqual(b);
  });
});
