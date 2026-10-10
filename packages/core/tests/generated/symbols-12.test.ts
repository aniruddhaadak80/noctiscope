import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 12", () => {
  it("resolves compass", () => {
    expect(lookupSymbol("compass")?.meaning).toContain("search");
  });

  it("interprets a compass dream deterministically", () => {
    const a = interpretDream("dream of compass at night", 7331);
    const b = interpretDream("dream of compass at night", 7331);
    expect(a).toEqual(b);
  });
});
