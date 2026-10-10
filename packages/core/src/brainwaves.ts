export interface Brainwave {
  band: string;
  range: string;
  power: number;
  meaning: string;
}

const PROFILES: Record<string, number[]> = {
  "deep-sleep": [85, 10, 3, 1, 1],
  dreaming: [30, 55, 10, 4, 1],
  resting: [15, 20, 45, 15, 5],
  "deep-work": [2, 5, 15, 60, 18],
  flow: [3, 8, 20, 40, 29],
  anxious: [2, 5, 10, 45, 38],
};

const META = [
  { band: "Delta", range: "0.5-4 Hz", meaning: "Deep sleep, healing" },
  { band: "Theta", range: "4-8 Hz", meaning: "Dreams, hypnosis, memory" },
  { band: "Alpha", range: "8-13 Hz", meaning: "Calm alertness" },
  { band: "Beta", range: "13-30 Hz", meaning: "Active thinking" },
  { band: "Gamma", range: "30-100 Hz", meaning: "Binding, insight" },
];

const DEFAULT_POWERS = [15, 20, 45, 15, 5];

export function simulateBrainwaves(state: string): Brainwave[] {
  const powers = PROFILES[state] ?? DEFAULT_POWERS;
  return META.map((m, i) => ({ ...m, power: powers[i] ?? 0 }));
}
