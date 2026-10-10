export interface SleepStage {
  id: string;
  name: string;
  duration: string;
  description: string;
  subconsciousWork: string;
}

export const SLEEP_STAGES: SleepStage[] = [
  {
    id: "n1",
    name: "N1 Hypnagogia",
    duration: "1-7 min",
    description: "Threshold dozing with hypnic imagery.",
    subconsciousWork: "Loose associations surface; creative seeds.",
  },
  {
    id: "n2",
    name: "N2 Light Sleep",
    duration: "~25 min",
    description: "Sleep spindles consolidate facts.",
    subconsciousWork: "Day residue gets tagged for keeping.",
  },
  {
    id: "n3",
    name: "N3 Deep Sleep",
    duration: "~40 min",
    description: "Slow-wave restoration; body repairs.",
    subconsciousWork: "Emotional charge drains from memories.",
  },
  {
    id: "rem",
    name: "REM Dreaming",
    duration: "~20-30 min",
    description: "Paralyzed body, vivid theater of mind.",
    subconsciousWork: "Fear extinction and narrative integration.",
  },
  {
    id: "cycle",
    name: "Full 90-min Cycle",
    duration: "x4-6 nightly",
    description: "Cycles repeat, REM lengthening toward dawn.",
    subconsciousWork: "Each cycle files, prunes, rehearses.",
  },
  {
    id: "hypnosis",
    name: "Hypnotic Trance",
    duration: "waking",
    description: "Focused suggestible state, theta-rich.",
    subconsciousWork: "Direct dialogue with habit scripts.",
  },
];
