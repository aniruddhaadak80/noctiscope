import { describe, expect, it } from "vitest";
import { scoreChronotype } from "../src/chronotype";
import {
  PERSONALITY_QUIZ,
  dominantTrait,
  scorePersonality,
  traitReading,
} from "../src/personality";
import { computeStressIndex } from "../src/stress";

describe("personality", () => {
  it("ships 10 questions across 5 traits", () => {
    expect(PERSONALITY_QUIZ).toHaveLength(10);
    expect(new Set(PERSONALITY_QUIZ.map((q) => q.trait)).size).toBe(5);
  });
  it("scores all-5s with reversals handled", () => {
    const scores = scorePersonality([5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
    expect(scores.openness).toBe(6);
    expect(dominantTrait(scores)).toBe("openness");
    expect(traitReading("openness")).toContain("dream journal");
  });
  it("clamps out-of-range answers", () => {
    const scores = scorePersonality([99, -3]);
    expect(scores.openness).toBeGreaterThanOrEqual(2);
  });
});

describe("chronotype", () => {
  it("detects lark, owl and third-bird", () => {
    expect(scoreChronotype({ energy: 1, bedtime: 1, wakeEase: 1 }).type).toBe(
      "lark",
    );
    expect(scoreChronotype({ energy: 5, bedtime: 5, wakeEase: 5 }).type).toBe(
      "owl",
    );
    expect(scoreChronotype({ energy: 3, bedtime: 3, wakeEase: 3 }).type).toBe(
      "third-bird",
    );
  });
});

describe("stress", () => {
  it("bands correctly and clamps", () => {
    expect(
      computeStressIndex({ sleepDebt: 0, workload: 0, recovery: 10 }).band,
    ).toBe("green");
    expect(
      computeStressIndex({ sleepDebt: 10, workload: 10, recovery: 0 }).band,
    ).toBe("red");
    expect(
      computeStressIndex({ sleepDebt: 5, workload: 5, recovery: 5 }).band,
    ).toBe("amber");
  });
});
