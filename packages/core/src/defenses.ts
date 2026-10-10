export interface Defense {
  id: string;
  name: string;
  description: string;
  example: string;
  healthier: string;
}

export const DEFENSE_MECHANISMS: Defense[] = [
  {
    id: "denial",
    name: "Denial",
    description: "Refusing to accept reality.",
    example: "I am fine after the breakup.",
    healthier: "Name the loss aloud to one person.",
  },
  {
    id: "projection",
    name: "Projection",
    description: "Attributing your feelings to others.",
    example: "They are angry (you are).",
    healthier: "Ask: is this mine or theirs?",
  },
  {
    id: "rationalization",
    name: "Rationalization",
    description: "Inventing logical excuses.",
    example: "I failed because the test was unfair.",
    healthier: "List your own contribution first.",
  },
  {
    id: "regression",
    name: "Regression",
    description: "Retreating to childlike behavior under stress.",
    example: "Sulking instead of negotiating.",
    healthier: "Sooth the child, then act as the adult.",
  },
  {
    id: "sublimation",
    name: "Sublimation",
    description: "Channeling pain into creation. The healthy one.",
    example: "Grief becomes music.",
    healthier: "Keep creating; add rest too.",
  },
  {
    id: "displacement",
    name: "Displacement",
    description: "Redirecting emotion to a safer target.",
    example: "Yelling at family after work.",
    healthier: "Move the body, then address the source.",
  },
  {
    id: "reaction-formation",
    name: "Reaction Formation",
    description: "Expressing the opposite of what you feel.",
    example: "Excessive sweetness toward someone disliked.",
    healthier: "Admit the ambivalence.",
  },
  {
    id: "intellectualization",
    name: "Intellectualization",
    description: "Hiding behind abstraction.",
    example: "Theorizing grief instead of crying.",
    healthier: "Feel for 90 seconds, then analyze.",
  },
];
