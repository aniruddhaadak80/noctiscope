export interface StressInput {
  sleepDebt: number;
  workload: number;
  recovery: number;
}

export interface StressIndex {
  score: number;
  band: "green" | "amber" | "red";
  protocol: string;
}

export function computeStressIndex(input: StressInput): StressIndex {
  const sleep = Math.max(0, Math.min(10, input.sleepDebt));
  const work = Math.max(0, Math.min(10, input.workload));
  const rec = Math.max(0, Math.min(10, input.recovery));
  const score = Math.max(
    0,
    Math.min(100, Math.round(sleep * 6 + work * 5 - rec * 7 + 20)),
  );
  if (score >= 70) {
    return {
      score,
      band: "red",
      protocol: "Cancel one thing, walk 20 minutes, sleep 8h tonight.",
    };
  }
  if (score >= 40) {
    return {
      score,
      band: "amber",
      protocol: "Box breathing 4 rounds + one closed loop before bed.",
    };
  }
  return {
    score,
    band: "green",
    protocol: "Hold the rhythm: same bedtime, daylight before screens.",
  };
}
