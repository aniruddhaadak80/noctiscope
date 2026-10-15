export type MoodValue = 1 | 2 | 3 | 4 | 5;

export const MOOD_LABELS: Record<MoodValue, string> = {
  1: "Heavy",
  2: "Low",
  3: "Steady",
  4: "Light",
  5: "Radiant",
};

export interface MoodEntry {
  day: string; // YYYY-MM-DD
  value: MoodValue;
  note?: string;
}

export interface MoodSummary {
  count: number;
  average: number;
  lowest: number;
  highest: number;
  trend: "rising" | "falling" | "steady" | "none";
}

/** Average mood, range and an arrow trend (first half vs second half). */
export function summarizeMoods(values: number[]): MoodSummary {
  const valid = values.filter((v) => v >= 1 && v <= 5);
  if (valid.length === 0) {
    return { count: 0, average: 0, lowest: 0, highest: 0, trend: "none" };
  }
  const average =
    Math.round((valid.reduce((a, b) => a + b, 0) / valid.length) * 100) / 100;
  const mid = Math.floor(valid.length / 2);
  const first = valid.slice(0, mid);
  const second = valid.slice(mid);
  const avg0 = first.length
    ? first.reduce((a, b) => a + b, 0) / first.length
    : 0;
  const avg1 = second.length
    ? second.reduce((a, b) => a + b, 0) / second.length
    : 0;
  const trend: MoodSummary["trend"] =
    Math.abs(avg1 - avg0) < 0.3 ? "steady" : avg1 > avg0 ? "rising" : "falling";
  return {
    count: valid.length,
    average,
    lowest: Math.min(...valid),
    highest: Math.max(...valid),
    trend,
  };
}
