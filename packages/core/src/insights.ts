export interface InsightSnapshot {
  moods: number[];
  habitCompletion: number[];
  focusMinutes: number[];
  breathRounds: number[];
}

export interface InsightCard {
  id: string;
  severity: "high" | "medium" | "low" | "positive";
  title: string;
  body: string;
  action: string;
  score: number;
}

function average(values: number[]): number {
  const valid = values.filter((n) => Number.isFinite(n));
  if (valid.length === 0) return 0;
  return valid.reduce((a, b) => a + b, 0) / valid.length;
}

function trend(values: number[]): number {
  if (values.length < 4) return 0;
  const mid = Math.floor(values.length / 2);
  const first = average(values.slice(0, mid));
  const second = average(values.slice(mid));
  return Math.round((second - first) * 100) / 100;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Synthesizes explainable local-only insights from private behavioral data. */
export function synthesizeInsights(snapshot: InsightSnapshot): InsightCard[] {
  const moods = snapshot.moods.filter((v) => v >= 1 && v <= 5);
  const habits = snapshot.habitCompletion.map((v) => clamp(v, 0, 100));
  const focus = snapshot.focusMinutes.filter((v) => v >= 0);
  const breath = snapshot.breathRounds.filter((v) => v >= 0);

  const moodAvg = average(moods);
  const habitAvg = average(habits);
  const focusAvg = average(focus);
  const breathAvg = average(breath);
  const moodTrend = trend(moods);

  const cards: InsightCard[] = [];

  cards.push({
    id: "mood-course",
    severity: moodAvg >= 3.5 ? "positive" : moodAvg >= 2.5 ? "low" : "high",
    title:
      moodAvg >= 3.5
        ? "Your mood course is stable-positive"
        : "Your mood course needs attention",
    body: `Average mood across ${moods.length} logged days is ${moodAvg.toFixed(2)}/5 with a ${moodTrend >= 0 ? "rising" : "falling"} swing of ${Math.abs(moodTrend).toFixed(2)}.`,
    action:
      moodAvg >= 3.5
        ? "Anchor today with a gratitude line and one breath protocol."
        : "Use the breath pacer twice today and reduce the next decision to one step.",
    score: Math.round(clamp(moodAvg / 5, 0, 1) * 100),
  });

  cards.push({
    id: "habit-stability",
    severity: habitAvg >= 70 ? "positive" : habitAvg >= 40 ? "medium" : "high",
    title:
      habitAvg >= 70
        ? "Habits are becoming automatic"
        : "Habit loops are fragile",
    body: `Average completion is ${habitAvg.toFixed(0)}% over ${habits.length} observations; the best chance of recovery is same-cue, smaller repetition.`,
    action:
      habitAvg >= 70
        ? "Increase difficulty once, without changing the time cue."
        : "Shrink the habit to two minutes and keep the same cue.",
    score: Math.round(clamp(habitAvg, 0, 100)),
  });

  cards.push({
    id: "focus-stamina",
    severity: focusAvg >= 35 ? "positive" : "low",
    title:
      focusAvg >= 35
        ? "Deep-work blocks are healthy"
        : "Deep-work blocks need protection",
    body: `Average focus block is ${focusAvg.toFixed(0)} minutes across ${focus.length} blocks; scattered small blocks signal context switching cost.`,
    action:
      focusAvg >= 35
        ? "Schedule one 50-minute block before noon."
        : "Protect 25 minutes against notifications and one clear task.",
    score: Math.round(clamp(focusAvg / 50, 0, 1) * 100),
  });

  cards.push({
    id: "recovery-rhythm",
    severity: breathAvg >= 2 ? "low" : "medium",
    title: `Recovery practice is ${breathAvg >= 2 ? "present" : "thin"}`,
    body: `Breath sessions average ${breathAvg.toFixed(1)} rounds; nervous-system regulation responds pattern, not intensity.`,
    action:
      breathAvg >= 2
        ? "Keep one routine and one rescue protocol."
        : "Add one 90-second physiological sigh after lunch.",
    score: Math.round(clamp(breathAvg / 4, 0, 1) * 100),
  });

  if (moodTrend <= -0.6 || trend(focus) <= -10) {
    cards.push({
      id: "slip-early-warning",
      severity: "high",
      title: "Early warning: recent slide",
      body: "Recent mood/focus movement is below the previous period. This is a normal drift signal, not a diagnosis.",
      action:
        "Reduce the next plan to one controllable step and repeat for three days.",
      score: 20,
    });
  }

  return cards;
}
