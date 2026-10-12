export interface HabitLoop {
  cue: string;
  craving: string;
  routine: string;
  reward: string;
}

export interface HabitScore {
  clarity: number;
  friction: number;
  pull: number;
  verdict: string;
  implementation: string;
}

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

/** Scores a habit loop design: specific cue + low friction + real reward wins. */
export function scoreHabit(loop: HabitLoop): HabitScore {
  const clarity = Math.max(
    1,
    Math.min(
      10,
      wordCount(loop.cue) >= 3 && wordCount(loop.routine) >= 2 ? 8 : 4,
    ),
  );
  const friction = Math.max(
    1,
    Math.min(10, loop.routine.toLowerCase().includes("phone") ? 8 : 4),
  );
  const pull = Math.max(1, Math.min(10, wordCount(loop.reward) >= 2 ? 8 : 4));
  const total = clarity - friction + pull;
  const verdict =
    total >= 10 ? "loop-worthy" : total >= 5 ? "needs shaping" : "redesign";
  return {
    clarity,
    friction,
    pull,
    verdict,
    implementation: `After [${loop.cue}], I will [${loop.routine}], because it gives [${loop.reward}].`,
  };
}
