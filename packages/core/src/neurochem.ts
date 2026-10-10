export interface Transmitter {
  id: string;
  name: string;
  role: string;
}

export const NEUROTRANSMITTERS: Transmitter[] = [
  {
    id: "dopamine",
    name: "Dopamine",
    role: "Anticipation and reward learning; the wanting chemical.",
  },
  {
    id: "serotonin",
    name: "Serotonin",
    role: "Mood stability, sleep, appetite; the enough-ness signal.",
  },
  {
    id: "cortisol",
    name: "Cortisol",
    role: "Stress mobilization; useful acutely, corrosive chronically.",
  },
  {
    id: "oxytocin",
    name: "Oxytocin",
    role: "Bonding and trust; released by touch and belonging.",
  },
  { id: "gaba", name: "GABA", role: "Calming brake; quiets neural noise." },
  {
    id: "glutamate",
    name: "Glutamate",
    role: "Excitatory learning signal; sculpts memory.",
  },
  {
    id: "norepinephrine",
    name: "Norepinephrine",
    role: "Alertness and focus under novelty.",
  },
  {
    id: "endorphin",
    name: "Endorphins",
    role: "Natural pain relief and runner's glow.",
  },
];

export interface NeuroInput {
  sleepHours: number;
  stressLevel: number;
  exerciseDays: number;
}

export interface NeuroLevel {
  id: string;
  name: string;
  score: number;
  effect: string;
}

const clamp = (n: number): number => Math.max(5, Math.min(100, Math.round(n)));

export function simulateNeurochemistry(input: NeuroInput): {
  levels: NeuroLevel[];
} {
  const { sleepHours, stressLevel, exerciseDays } = input;
  const dopamine = clamp(
    55 + exerciseDays * 4 - stressLevel * 3 + (sleepHours >= 7 ? 8 : -8),
  );
  const serotonin = clamp(
    50 + (sleepHours >= 7 ? 12 : -12) + exerciseDays * 3 - stressLevel * 2,
  );
  const cortisol = clamp(
    45 + stressLevel * 5 - exerciseDays * 3 - (sleepHours >= 7 ? 8 : 6),
  );
  const oxytocin = clamp(50 + exerciseDays * 2 + (stressLevel < 4 ? 10 : -5));
  return {
    levels: [
      {
        id: "dopamine",
        name: "Dopamine",
        score: dopamine,
        effect: dopamine > 60 ? "Motivated and seeking" : "Flat, hard to start",
      },
      {
        id: "serotonin",
        name: "Serotonin",
        score: serotonin,
        effect:
          serotonin > 60
            ? "Stable and content"
            : "Fragile mood, poor sleep loop",
      },
      {
        id: "cortisol",
        name: "Cortisol",
        score: cortisol,
        effect: cortisol > 65 ? "Wired and vigilant" : "Calm baseline",
      },
      {
        id: "oxytocin",
        name: "Oxytocin",
        score: oxytocin,
        effect:
          oxytocin > 60 ? "Connected and trusting" : "Lonely signal rising",
      },
    ],
  };
}
