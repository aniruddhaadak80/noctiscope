export interface FocusSummary {
  count: number;
  totalMinutes: number;
  averageMinutes: number;
  streak: number;
}

/** Summarizes completed focus sessions (lengths in minutes, oldest first). */
export function summarizeSessions(lengths: number[]): FocusSummary {
  const valid = lengths.filter((l) => l > 0);
  const totalMinutes = valid.reduce((n, l) => n + l, 0);
  return {
    count: valid.length,
    totalMinutes,
    averageMinutes:
      valid.length === 0
        ? 0
        : Math.round((totalMinutes / valid.length) * 10) / 10,
    streak: valid.length,
  };
}

export const FOCUS_PRESETS = [15, 25, 50];
