import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 3", () => {
  it("resolves balloon", () => {
    expect(lookupSymbol("balloon")?.meaning).toContain("rising");
  });

  it("interprets a balloon dream deterministically", () => {
    const a = interpretDream("dream of balloon at night", 7331);
    const b = interpretDream("dream of balloon at night", 7331);
    expect(a).toEqual(b);
  });
});
