import { mulberry32, pickSeeded } from "./rng";

export interface DreamSymbol {
  symbol: string;
  meaning: string;
  affect: string;
}

export interface DreamReading {
  symbols: DreamSymbol[];
  valence: number;
  arousal: number;
  narrative: string;
  lucidPrompt: string;
}

const SYMBOL_TABLE: Array<{ keys: string[]; meaning: string; affect: string }> =
  [
    {
      keys: ["fly", "flying", "float"],
      meaning: "longing for freedom or escape from a constraint",
      affect: "euphoric-anxious",
    },
    {
      keys: ["chase", "chased", "running", "pursu"],
      meaning: "avoided conflict catching up with you",
      affect: "anxious",
    },
    {
      keys: ["ocean", "sea", "water", "river", "lake"],
      meaning: "the unconscious itself; depth of feeling",
      affect: "melancholic-vast",
    },
    {
      keys: ["teeth", "tooth"],
      meaning: "anxiety about appearance, aging or powerlessness",
      affect: "anxious",
    },
    {
      keys: ["house", "room", "door"],
      meaning: "the self; unexplored rooms are disowned parts",
      affect: "curious",
    },
    {
      keys: ["snake"],
      meaning: "transformation, healing, or feared desire",
      affect: "ambivalent",
    },
    {
      keys: ["death", "dead", "dying"],
      meaning: "an ending making room for a beginning",
      affect: "solemn",
    },
    {
      keys: ["baby", "child"],
      meaning: "a new beginning or vulnerable project",
      affect: "tender",
    },
    {
      keys: ["exam", "test", "school"],
      meaning: "performance anxiety and self-evaluation",
      affect: "anxious",
    },
    {
      keys: ["mirror"],
      meaning: "self-image confrontation",
      affect: "reflective",
    },
    {
      keys: ["key", "lock"],
      meaning: "a sought solution or blocked access",
      affect: "hopeful",
    },
    {
      keys: ["dark", "night", "shadow"],
      meaning: "the shadow; what you have not yet faced",
      affect: "fearful",
    },
    {
      keys: ["light", "sun", "lantern"],
      meaning: "insight breaking through",
      affect: "hopeful",
    },
    {
      keys: ["forest", "tree", "woods"],
      meaning: "growth and the unknown psyche",
      affect: "mysterious",
    },
    {
      keys: ["bird"],
      meaning: "aspiration and perspective",
      affect: "uplifted",
    },
    {
      keys: ["fall", "falling"],
      meaning: "loss of control or letting go",
      affect: "fearful",
    },
    {
      keys: ["fire"],
      meaning: "passion, anger, or purification",
      affect: "intense",
    },
    {
      keys: ["storm", "thunder"],
      meaning: "emotional turbulence",
      affect: "turbulent",
    },
    {
      keys: ["bridge"],
      meaning: "a transition between life phases",
      affect: "liminal",
    },
    {
      keys: ["train", "car", "road", "journey"],
      meaning: "life direction and momentum",
      affect: "directional",
    },
  ];

const LUCID_PROMPTS = [
  "Tonight, ask: am I dreaming? Look at your hands twice.",
  "Set an intention: next time I am chased, I will stop and ask what it wants.",
  "Rehearse the dream ending you prefer for five minutes before sleep.",
  "Keep a lamp and notebook by the bed; write before checking your phone.",
];

export function interpretDream(text: string, seed = 7331): DreamReading {
  const lower = text.toLowerCase();
  const symbols: DreamSymbol[] = [];
  for (const entry of SYMBOL_TABLE) {
    if (entry.keys.some((k) => lower.includes(k))) {
      symbols.push({
        symbol: entry.keys[0] ?? "dream",
        meaning: entry.meaning,
        affect: entry.affect,
      });
    }
  }
  if (symbols.length === 0) {
    symbols.push({
      symbol: "night",
      meaning: "unprocessed residue of the day seeking integration",
      affect: "neutral",
    });
  }
  const rand = mulberry32(seed + text.length * 97 + symbols.length * 13);
  const anxious = (lower.match(/chase|fall|dark|teeth|exam|death|storm/g) ?? [])
    .length;
  const bright = (lower.match(/fly|light|sun|bird|lantern|bridge|key/g) ?? [])
    .length;
  const valence = Math.max(
    -5,
    Math.min(5, bright - anxious * 2 + (symbols.length > 3 ? 1 : 0)),
  );
  const arousal = Math.max(
    1,
    Math.min(10, 4 + anxious * 2 + (lower.length > 120 ? 1 : 0)),
  );
  const detail = symbols.map((s) => `${s.symbol} (${s.meaning})`).join("; ");
  const tone = valence >= 0 ? "integrative" : "unresolved";
  const narrative = `Your dream stages ${symbols.map((s) => s.symbol).join(", ")}. Read as the subconscious rehearsing unresolved affect: ${detail}. Overall tone is ${tone} with arousal ${arousal}/10.`;
  return {
    symbols,
    valence,
    arousal,
    narrative,
    lucidPrompt: pickSeeded(rand, LUCID_PROMPTS),
  };
}
