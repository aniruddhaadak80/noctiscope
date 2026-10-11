export type Chronotype = "lark" | "third-bird" | "owl";

export interface ChronoAnswer {
  energy: number;
  bedtime: number;
  wakeEase: number;
}

export function scoreChronotype(a: ChronoAnswer): {
  type: Chronotype;
  window: string;
  tip: string;
} {
  const total = a.energy + a.bedtime + a.wakeEase;
  if (total <= 6) {
    return {
      type: "lark",
      window: "22:00 – 06:00",
      tip: "Front-load deep work before noon; dim lights after 20:00.",
    };
  }
  if (total >= 11) {
    return {
      type: "owl",
      window: "00:30 – 08:30",
      tip: "Protect mornings; schedule creative work after 21:00.",
    };
  }
  return {
    type: "third-bird",
    window: "23:00 – 07:00",
    tip: "Peak focus 10:00–14:00; keep bedtime within 30 minutes.",
  };
}
