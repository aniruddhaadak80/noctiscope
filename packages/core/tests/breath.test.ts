import { describe, expect, it } from "vitest";
import {
  BREATH_PROTOCOLS,
  cycleSeconds,
  getProtocol,
  sessionSeconds,
} from "../src/breathing";
import { FOCUS_PRESETS, summarizeSessions } from "../src/focus";

describe("breathing", () => {
  it("ships 4 protocols with positive cycles", () => {
    expect(BREATH_PROTOCOLS).toHaveLength(4);
    for (const p of BREATH_PROTOCOLS) {
      expect(cycleSeconds(p)).toBeGreaterThan(0);
      expect(sessionSeconds(p)).toBe(cycleSeconds(p) * p.rounds);
    }
  });
  it("box cycle is 16 seconds", () => {
    expect(cycleSeconds(getProtocol("box"))).toBe(16);
  });
  it("rejects unknown protocols", () => {
    expect(() => getProtocol("nope")).toThrow();
  });
});

describe("focus", () => {
  it("summarizes sessions", () => {
    expect(summarizeSessions([25, 25, 50])).toEqual({
      count: 3,
      totalMinutes: 100,
      averageMinutes: 33.3,
      streak: 3,
    });
    expect(summarizeSessions([]).count).toBe(0);
    expect(FOCUS_PRESETS).toContain(25);
  });
});
