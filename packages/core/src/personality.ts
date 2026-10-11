export type Trait =
  | "openness"
  | "conscientiousness"
  | "extraversion"
  | "agreeableness"
  | "neuroticism";

export interface QuizQuestion {
  id: string;
  trait: Trait;
  text: string;
  reversed: boolean;
}

export const PERSONALITY_QUIZ: QuizQuestion[] = [
  {
    id: "o1",
    trait: "openness",
    text: "I enjoy exploring strange dreams and odd ideas.",
    reversed: false,
  },
  {
    id: "o2",
    trait: "openness",
    text: "I prefer routine over novelty.",
    reversed: true,
  },
  {
    id: "c1",
    trait: "conscientiousness",
    text: "I finish what I start, even when it gets boring.",
    reversed: false,
  },
  {
    id: "c2",
    trait: "conscientiousness",
    text: "My plans usually collapse within a week.",
    reversed: true,
  },
  {
    id: "e1",
    trait: "extraversion",
    text: "I recharge by being around people.",
    reversed: false,
  },
  {
    id: "e2",
    trait: "extraversion",
    text: "Long parties drain me completely.",
    reversed: true,
  },
  {
    id: "a1",
    trait: "agreeableness",
    text: "I assume people are doing their best.",
    reversed: false,
  },
  {
    id: "a2",
    trait: "agreeableness",
    text: "Trust must be earned slowly, if ever.",
    reversed: true,
  },
  {
    id: "n1",
    trait: "neuroticism",
    text: "My mood swings notices before I do.",
    reversed: false,
  },
  {
    id: "n2",
    trait: "neuroticism",
    text: "I stay calm under most pressure.",
    reversed: true,
  },
];

export type TraitScores = Record<Trait, number>;

const TRAITS: Trait[] = [
  "openness",
  "conscientiousness",
  "extraversion",
  "agreeableness",
  "neuroticism",
];

/** answers: array of 1-5 Likert values aligned with PERSONALITY_QUIZ order. */
export function scorePersonality(answers: number[]): TraitScores {
  const scores = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  };
  PERSONALITY_QUIZ.forEach((q, i) => {
    const raw = Math.max(1, Math.min(5, Math.round(answers[i] ?? 3)));
    scores[q.trait] += q.reversed ? 6 - raw : raw;
  });
  return scores;
}

export function dominantTrait(scores: TraitScores): Trait {
  let best: Trait = "openness";
  for (const t of TRAITS) {
    if (scores[t] > scores[best]) best = t;
  }
  return best;
}

const READINGS: Record<Trait, string> = {
  openness:
    "High openness: your subconscious speaks in symbols — keep the dream journal close.",
  conscientiousness:
    "High conscientiousness: your night shift files memories neatly — protect sleep.",
  extraversion:
    "High extraversion: you process feelings aloud — journal as if talking to a friend.",
  agreeableness:
    "High agreeableness: you absorb others' moods — name what is yours each night.",
  neuroticism:
    "High sensitivity: your alarm is loud — affect labeling and slow exhales help most.",
};

export function traitReading(trait: Trait): string {
  return READINGS[trait];
}
