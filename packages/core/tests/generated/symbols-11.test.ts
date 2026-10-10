import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 11", () => {
  it("resolves cloud", () => {
    expect(lookupSymbol("cloud")?.meaning).toContain("vague");
  });

  it("interprets a cloud dream deterministically", () => {
    const a = interpretDream("dream of cloud at night", 7331);
    const b = interpretDream("dream of cloud at night", 7331);
    expect(a).toEqual(b);
  });
});
