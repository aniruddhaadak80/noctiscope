import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 7", () => {
  it("resolves candle", () => {
    expect(lookupSymbol("candle")?.meaning).toContain("fragile");
  });

  it("interprets a candle dream deterministically", () => {
    const a = interpretDream("dream of candle at night", 7331);
    const b = interpretDream("dream of candle at night", 7331);
    expect(a).toEqual(b);
  });
});
