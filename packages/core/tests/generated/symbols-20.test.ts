import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 20", () => {
  it("resolves engine", () => {
    expect(lookupSymbol("engine")?.meaning).toContain("your");
  });

  it("interprets a engine dream deterministically", () => {
    const a = interpretDream("dream of engine at night", 7331);
    const b = interpretDream("dream of engine at night", 7331);
    expect(a).toEqual(b);
  });
});
