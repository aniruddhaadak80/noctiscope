import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 8", () => {
  it("resolves castle", () => {
    expect(lookupSymbol("castle")?.meaning).toContain("ambition");
  });

  it("interprets a castle dream deterministically", () => {
    const a = interpretDream("dream of castle at night", 7331);
    const b = interpretDream("dream of castle at night", 7331);
    expect(a).toEqual(b);
  });
});
