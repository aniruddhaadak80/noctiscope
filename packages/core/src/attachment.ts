export type AttachmentStyle =
  | "secure"
  | "anxious"
  | "avoidant"
  | "disorganized";

export interface AttachmentQuestion {
  id: string;
  style: AttachmentStyle;
  text: string;
}

export const ATTACHMENT_QUIZ: AttachmentQuestion[] = [
  {
    id: "s1",
    style: "secure",
    text: "I find it easy to trust people I am close to.",
  },
  {
    id: "s2",
    style: "secure",
    text: "I can ask for help without feeling weak.",
  },
  { id: "ax1", style: "anxious", text: "I worry people I love will leave me." },
  {
    id: "ax2",
    style: "anxious",
    text: "I need frequent reassurance to feel safe.",
  },
  {
    id: "av1",
    style: "avoidant",
    text: "I prefer to solve emotional problems alone.",
  },
  {
    id: "av2",
    style: "avoidant",
    text: "Closeness feels like losing freedom.",
  },
  {
    id: "d1",
    style: "disorganized",
    text: "I crave closeness and fear it at the same time.",
  },
  {
    id: "d2",
    style: "disorganized",
    text: "My reactions in conflict surprise even me.",
  },
];

export function scoreAttachment(answers: number[]): {
  style: AttachmentStyle;
  scores: Record<AttachmentStyle, number>;
} {
  const scores: Record<AttachmentStyle, number> = {
    secure: 0,
    anxious: 0,
    avoidant: 0,
    disorganized: 0,
  };
  ATTACHMENT_QUIZ.forEach((q, i) => {
    scores[q.style] += Math.max(1, Math.min(5, Math.round(answers[i] ?? 3)));
  });
  let style: AttachmentStyle = "secure";
  for (const s of Object.keys(scores) as AttachmentStyle[]) {
    if (scores[s] > scores[style]) style = s;
  }
  return { style, scores };
}

const GUIDANCE: Record<AttachmentStyle, string> = {
  secure: "Keep repairing quickly after ruptures — that is the whole skill.",
  anxious: "Sooth the alarm before the conversation: body first, words second.",
  avoidant: "Practice one small disclosure daily; freedom survives closeness.",
  disorganized: "Name both urges aloud — craving and fear — to integrate them.",
};

export function attachmentGuidance(style: AttachmentStyle): string {
  return GUIDANCE[style];
}
