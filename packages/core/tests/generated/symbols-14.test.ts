import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 14", () => {
  it("resolves dagger", () => {
    expect(lookupSymbol("dagger")?.meaning).toContain("betrayal");
  });

  it("interprets a dagger dream deterministically", () => {
    const a = interpretDream("dream of dagger at night", 7331);
    const b = interpretDream("dream of dagger at night", 7331);
    expect(a).toEqual(b);
  });
});
