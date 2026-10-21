import { describe, expect, it } from "vitest";
import { labelEmotion } from "../src/emotions";

describe("labelEmotion", () => {
  it("reads a single emotion from the text", () => {
    const reading = labelEmotion("My chest feels tight again");

    expect(reading.primary).toBe("Anxiety");
    // "chest" and "tight" both match, so the intensity is 5 + 2 keys.
    expect(reading.intensity).toBe(9);
    expect(reading.reframe).not.toBe("");
    expect(reading.breathing).not.toBe("");
  });

  it("ignores the case of the text", () => {
    expect(labelEmotion("I AM EXHAUSTED").primary).toBe("Exhaustion");
    expect(labelEmotion("i am exhausted").primary).toBe("Exhaustion");
  });

  it("raises the intensity with the number of matching keys", () => {
    const one = labelEmotion("tired");
    const two = labelEmotion("tired and flat");

    expect(one.primary).toBe("Exhaustion");
    expect(one.intensity).toBe(7);
    expect(two.primary).toBe("Exhaustion");
    expect(two.intensity).toBe(9);
  });

  it("caps the intensity at ten", () => {
    const reading = labelEmotion("tight chest restless anxious worried");

    expect(reading.primary).toBe("Anxiety");
    expect(reading.intensity).toBe(10);
  });

  it("takes the first row that matches when several would", () => {
    // The table is ordered, and the first match wins: "sad" is in the sadness
    // row, which comes before the anger row that "angry" is in.
    expect(labelEmotion("angry and sad").primary).toBe("Sadness");
  });

  it("falls back to a neutral reading for text it does not recognise", () => {
    const reading = labelEmotion("The meeting moved to Thursday");

    expect(reading.primary).toBe("Unnamed activation");
    expect(reading.intensity).toBe(5);
    expect(reading.reframe).toContain("90 seconds");
  });

  it("matches a key that appears inside a longer word", () => {
    // The match is a substring test, not a word test: "anxi" is here to catch
    // "anxious" as well as "anxiety".
    expect(labelEmotion("feeling anxious about it all").primary).toBe(
      "Anxiety",
    );
  });

  it("never returns an empty reading", () => {
    for (const text of [
      "",
      "tight",
      "sad",
      "angry",
      "shame",
      "nothing familiar",
    ]) {
      const reading = labelEmotion(text);
      expect(reading.primary.length, text).toBeGreaterThan(0);
      expect(reading.reframe.length, text).toBeGreaterThan(0);
      expect(reading.breathing.length, text).toBeGreaterThan(0);
      expect(reading.intensity, text).toBeGreaterThanOrEqual(5);
      expect(reading.intensity, text).toBeLessThanOrEqual(10);
    }
  });
});
