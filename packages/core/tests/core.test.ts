import { describe, expect, it } from "vitest";
import {
  ARCHETYPES,
  BRAIN_REGIONS,
  buildMemoryPalace,
  COGNITIVE_BIASES,
  DEFENSE_MECHANISMS,
  interpretDream,
  labelEmotion,
  MENTAL_TIMELINE,
  mulberry32,
  NEUROTRANSMITTERS,
  reflectJournal,
  replayTimeline,
  SLEEP_STAGES,
  simulateBrainwaves,
  simulateNeurochemistry,
} from "../src/index";

describe("rng", () => {
  it("is deterministic for the same seed", () => {
    const a = mulberry32(7331);
    const b = mulberry32(7331);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });
});

describe("regions", () => {
  it("covers 12 regions", () => {
    expect(BRAIN_REGIONS).toHaveLength(12);
  });
});

describe("dreams", () => {
  it("detects flying + ocean + chase", () => {
    const r = interpretDream(
      "I was flying over a dark ocean while being chased",
      7331,
    );
    expect(r.symbols.length).toBeGreaterThanOrEqual(3);
    expect(r.narrative).toContain("fly");
    expect(r.valence).toBeLessThanOrEqual(5);
  });
  it("is deterministic", () => {
    expect(interpretDream("snake house", 1)).toEqual(
      interpretDream("snake house", 1),
    );
  });
});

describe("biases", () => {
  it("ships 18 biases", () => {
    expect(COGNITIVE_BIASES.length).toBeGreaterThanOrEqual(18);
  });
});

describe("archetypes", () => {
  it("ships 12 archetypes", () => {
    expect(ARCHETYPES).toHaveLength(12);
  });
});

describe("neurochem", () => {
  it("lists 8 transmitters and simulates 4 levels", () => {
    expect(NEUROTRANSMITTERS.length).toBeGreaterThanOrEqual(8);
    const sim = simulateNeurochemistry({
      sleepHours: 8,
      stressLevel: 2,
      exerciseDays: 5,
    });
    expect(sim.levels).toHaveLength(4);
    expect(sim.levels[0]?.score).toBeGreaterThan(50);
  });
});

describe("defenses", () => {
  it("ships 8 defenses", () => {
    expect(DEFENSE_MECHANISMS.length).toBeGreaterThanOrEqual(8);
  });
});

describe("sleep", () => {
  it("covers REM", () => {
    expect(SLEEP_STAGES.some((s) => s.id === "rem")).toBe(true);
  });
});

describe("memory", () => {
  it("pins words to rooms", () => {
    const palace = buildMemoryPalace(["ocean", "lantern", "key"]);
    expect(palace).toHaveLength(3);
    expect(palace[0]?.room).toBe("Foyer");
  });
});

describe("emotions", () => {
  it("labels anxiety", () => {
    expect(labelEmotion("tight chest restless").primary).toBe("Anxiety");
  });
});

describe("journal", () => {
  it("is deterministic", () => {
    expect(reflectJournal("hello", 7)).toEqual(reflectJournal("hello", 7));
  });
});

describe("brainwaves", () => {
  it("sums near 100 for deep-work", () => {
    const waves = simulateBrainwaves("deep-work");
    const total = waves.reduce((n, w) => n + w.power, 0);
    expect(total).toBeGreaterThanOrEqual(95);
  });
});

describe("timeline", () => {
  it("replays slices", () => {
    expect(replayTimeline(MENTAL_TIMELINE, 3)).toHaveLength(3);
  });
});
