import { describe, expect, it } from "vitest";
import { synthesizeInsights } from "../src/insights";

describe("insights", () => {
  it("returns at least four explainable cards", () => {
    const cards = synthesizeInsights({
      moods: [3, 3, 4, 4, 5, 4],
      habitCompletion: [60, 80, 75, 90],
      focusMinutes: [25, 30, 50],
      breathRounds: [2, 3, 4],
    });
    expect(cards.length).toBeGreaterThanOrEqual(4);
    expect(cards.map((c) => c.id)).toContain("mood-course");
    expect(cards.every((c) => c.body.length > 20 && c.score >= 0)).toBe(true);
  });
});
