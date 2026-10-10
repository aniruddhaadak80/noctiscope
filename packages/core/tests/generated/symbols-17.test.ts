import { describe, expect, it } from "vitest";
import { interpretDream } from "../../src/dreams";
import { lookupSymbol } from "../../src/generated/symbol-matrix";

describe("generated symbol contract 17", () => {
  it("resolves drum", () => {
    expect(lookupSymbol("drum")?.meaning).toContain("heartbeat");
  });

  it("interprets a drum dream deterministically", () => {
    const a = interpretDream("dream of drum at night", 7331);
    const b = interpretDream("dream of drum at night", 7331);
    expect(a).toEqual(b);
  });
});
