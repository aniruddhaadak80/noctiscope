import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 6", () => {
  it("resolves cage", () => {
    expect(lookupSymbol("cage")?.meaning).toContain("self-imposed");
  });

  it("interprets a cage dream deterministically", () => {
    const a = interpretDream("dream of cage at night", 7331);
    const b = interpretDream("dream of cage at night", 7331);
    expect(a).toEqual(b);
  });
});
