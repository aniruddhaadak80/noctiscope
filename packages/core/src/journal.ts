import { mulberry32, pickSeeded } from "./rng";

export interface JournalReflection {
  mirror: string;
  pattern: string;
  nextStep: string;
}

const MIRRORS = [
  "I hear postponement protecting you from judgment.",
  "I hear exhaustion bargaining for rest.",
  "I hear a part of you that wants to be chosen.",
  "I hear ambition colliding with fear of visibility.",
];

const PATTERNS = [
  "Pattern: high standards plus low self-compassion equals freeze.",
  "Pattern: rescuing others to avoid your own task.",
  "Pattern: night-time clarity, morning avoidance.",
  "Pattern: all-or-nothing thinking shrinking the next step.",
];

const STEPS = [
  "Write the smallest version (10 minutes) and start it today.",
  "Send one message asking for help or accountability.",
  "Make the environment do the work: lay out the tools tonight.",
  "Set a 25-minute timer and stop mid-sentence when it rings.",
];

export function reflectJournal(text: string, seed = 7331): JournalReflection {
  const rand = mulberry32(seed + text.length * 31);
  return {
    mirror: pickSeeded(rand, MIRRORS),
    pattern: pickSeeded(rand, PATTERNS),
    nextStep: pickSeeded(rand, STEPS),
  };
}
