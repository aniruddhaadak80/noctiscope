import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 4", () => {
  it("resolves basement", () => {
    expect(lookupSymbol("basement")?.meaning).toContain("buried");
  });

  it("interprets a basement dream deterministically", () => {
    const a = interpretDream("dream of basement at night", 7331);
    const b = interpretDream("dream of basement at night", 7331);
    expect(a).toEqual(b);
  });
});
