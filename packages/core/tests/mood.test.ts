import { describe, expect, it } from "vitest";
import { MOOD_LABELS, summarizeMoods } from "../src/mood";

describe("mood", () => {
  it("labels moods", () => {
    expect(MOOD_LABELS[1]).toBe("Heavy");
  });
  it("summarizes entries", () => {
    expect(summarizeMoods([2, 3, 4, 4])).toMatchObject({
      count: 4,
      average: 3.25,
      lowest: 2,
      highest: 4,
      trend: "rising",
    });
    expect(summarizeMoods([])).toMatchObject({ count: 0, trend: "none" });
  });
});
