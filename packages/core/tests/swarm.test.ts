import { describe, expect, it } from "vitest";
import {
  ATTACHMENT_QUIZ,
  attachmentGuidance,
  scoreAttachment,
} from "../src/attachment";
import { scoreHabit } from "../src/habits";
import { spawnSwarm, swarmCensus, tickSwarm } from "../src/swarm";

describe("swarm", () => {
  it("spawns deterministically", () => {
    expect(spawnSwarm(100, 7331)).toEqual(spawnSwarm(100, 7331));
  });
  it("keeps agents in bounds and census consistent", () => {
    const ticked = tickSwarm(spawnSwarm(1000, 7331), 7331, 7);
    expect(
      ticked.every((a) => a.x >= 0 && a.x <= 1 && a.y >= 0 && a.y <= 1),
    ).toBe(true);
    const census = swarmCensus(ticked);
    expect(Object.values(census).reduce((n, c) => n + c, 0)).toBe(1000);
  });
});

describe("attachment", () => {
  it("scores secure on high secure answers", () => {
    const { style } = scoreAttachment([5, 5, 1, 1, 1, 1, 1, 1]);
    expect(style).toBe("secure");
    expect(attachmentGuidance("secure")).toContain("repairing");
    expect(ATTACHMENT_QUIZ).toHaveLength(8);
  });
});

describe("habits", () => {
  it("grades a crisp loop as loop-worthy", () => {
    const s = scoreHabit({
      cue: "after morning coffee",
      craving: "to feel awake",
      routine: "walk around the block",
      reward: "clear head",
    });
    expect(s.verdict).toBe("loop-worthy");
    expect(s.implementation).toContain("After [after morning coffee]");
  });
});
