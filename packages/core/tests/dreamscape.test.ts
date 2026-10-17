import { describe, expect, it } from "vitest";
import { composeDreamscape } from "../src/dreamscape";

describe("dreamscape", () => {
  it("is deterministic for the same seed and step", () => {
    const a = composeDreamscape(7331, 3);
    const b = composeDreamscape(7331, 3);
    expect(a).toEqual(b);
  });

  it("changes frame as the step advances", () => {
    const a = composeDreamscape(7331, 0);
    const b = composeDreamscape(7331, 1);
    expect(a).not.toEqual(b);
  });

  it("keeps geometry in frame", () => {
    const d = composeDreamscape(31337, 9);
    for (const s of d.stars) {
      expect(s.x).toBeGreaterThanOrEqual(0);
      expect(s.x).toBeLessThanOrEqual(1000);
      expect(s.y).toBeGreaterThanOrEqual(0);
      expect(s.y).toBeLessThanOrEqual(560);
    }
    expect(d.clusters).toHaveLength(5);
    expect(d.palette.sky1).toMatch(/^#/);
  });
});
