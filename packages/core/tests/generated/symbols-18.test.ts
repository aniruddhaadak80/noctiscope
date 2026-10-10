import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 18", () => {
  it("resolves eclipse", () => {
    expect(lookupSymbol("eclipse")?.meaning).toContain("something");
  });

  it("interprets a eclipse dream deterministically", () => {
    const a = interpretDream("dream of eclipse at night", 7331);
    const b = interpretDream("dream of eclipse at night", 7331);
    expect(a).toEqual(b);
  });
});
