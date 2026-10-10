export interface Archetype {
  id: string;
  name: string;
  description: string;
  shadow: string;
  integration: string;
}

export const ARCHETYPES: Archetype[] = [
  {
    id: "hero",
    name: "Hero",
    description: "Faces trials to prove worth; thrives on challenge.",
    shadow: "Martyr complex; cannot rest or receive.",
    integration: "Let the quest serve others, then rest.",
  },
  {
    id: "shadow",
    name: "Shadow",
    description: "Everything disowned and denied in yourself.",
    shadow: "Projection onto others.",
    integration: "Name it, dialogue with it, befriend it.",
  },
  {
    id: "anima-animus",
    name: "Anima / Animus",
    description: "The inner contrasexual soul-image.",
    shadow: "Possession by mood or rigid opinion.",
    integration: "Create with it: art, journaling, dialogue.",
  },
  {
    id: "sage",
    name: "Sage",
    description: "Seeks truth through reflection and evidence.",
    shadow: "Analysis paralysis; cold detachment.",
    integration: "Let knowledge become compassionate action.",
  },
  {
    id: "caregiver",
    name: "Caregiver",
    description: "Protects and nurtures others.",
    shadow: "Self-neglect and guilt-tripping.",
    integration: "Include yourself in the circle of care.",
  },
  {
    id: "explorer",
    name: "Explorer",
    description: "Craves freedom and discovery.",
    shadow: "Chronic restlessness; never arriving.",
    integration: "Explore inward as far as outward.",
  },
  {
    id: "creator",
    name: "Creator",
    description: "Births new forms and worlds.",
    shadow: "Perfectionism and unfinished works.",
    integration: "Ship imperfect work on rhythm.",
  },
  {
    id: "ruler",
    name: "Ruler",
    description: "Builds order and responsibility.",
    shadow: "Control and rigidity.",
    integration: "Rule yourself first, lightly.",
  },
  {
    id: "jester",
    name: "Jester",
    description: "Lightens darkness with play.",
    shadow: "Using humor to avoid feeling.",
    integration: "Let laughter and grief sit together.",
  },
  {
    id: "orphan",
    name: "Orphan / Everyperson",
    description: "Seeks belonging and safety.",
    shadow: "Victimhood and cynicism.",
    integration: "Grieve, then choose your people.",
  },
  {
    id: "lover",
    name: "Lover",
    description: "Devotion to people, beauty, ideals.",
    shadow: "Losing self in merging.",
    integration: "Love with boundaries intact.",
  },
  {
    id: "magician",
    name: "Magician",
    description: "Transforms reality through will and ritual.",
    shadow: "Manipulation and inflation.",
    integration: "Use power transparently for healing.",
  },
];
