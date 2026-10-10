import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 23", () => {
  it("resolves fog", () => {
    expect(lookupSymbol("fog")?.meaning).toContain("confusion");
  });

  it("interprets a fog dream deterministically", () => {
    const a = interpretDream("dream of fog at night", 7331);
    const b = interpretDream("dream of fog at night", 7331);
    expect(a).toEqual(b);
  });
});
