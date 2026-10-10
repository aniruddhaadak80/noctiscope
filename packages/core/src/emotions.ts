export interface EmotionReading {
  primary: string;
  intensity: number;
  reframe: string;
  breathing: string;
}

export function labelEmotion(text: string): EmotionReading {
  const lower = text.toLowerCase();
  const table: Array<{
    keys: string[];
    primary: string;
    reframe: string;
    breathing: string;
  }> = [
    {
      keys: ["tight", "chest", "restless", "anxi", "worry"],
      primary: "Anxiety",
      reframe: "Anxiety is care without a plan. Give it one tiny next action.",
      breathing: "Box breathing 4-4-4-4 for 4 rounds.",
    },
    {
      keys: ["heavy", "sad", "grief", "empty", "tear"],
      primary: "Sadness",
      reframe:
        "Sadness honors what mattered. Let it move through like weather.",
      breathing: "Slow exhale breathing: in 4, out 8.",
    },
    {
      keys: ["hot", "anger", "angry", "rage", "irritat"],
      primary: "Anger",
      reframe:
        "Anger marks a crossed boundary. Name the boundary, not the person.",
      breathing: "Physiological sigh: double inhale, long exhale.",
    },
    {
      keys: ["tired", "exhaust", "flat", "numb"],
      primary: "Exhaustion",
      reframe: "Flatness is a depleted battery, not a verdict on your life.",
      breathing: "Rest without screens for 20 minutes.",
    },
    {
      keys: ["shame", "guilt", "embarrass"],
      primary: "Shame",
      reframe: "Shame shrinks when spoken. Tell one safe person.",
      breathing: "Hand on chest, breathe into the warmth.",
    },
  ];
  for (const row of table) {
    if (row.keys.some((k) => lower.includes(k))) {
      const intensity = Math.min(
        10,
        5 + row.keys.filter((k) => lower.includes(k)).length * 2,
      );
      return {
        primary: row.primary,
        intensity,
        reframe: row.reframe,
        breathing: row.breathing,
      };
    }
  }
  return {
    primary: "Unnamed activation",
    intensity: 5,
    reframe: "Stay with the sensation 90 seconds; emotions peak and pass.",
    breathing: "Coherent breathing: 5.5 breaths per minute.",
  };
}
