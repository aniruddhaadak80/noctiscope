export interface CognitiveBias {
  id: string;
  name: string;
  description: string;
  experiment: string;
  debias: string;
}

export const COGNITIVE_BIASES: CognitiveBias[] = [
  {
    id: "confirmation",
    name: "Confirmation Bias",
    description: "Seeking information that confirms what you already believe.",
    experiment: "Pick a belief, then steelman the opposite for 5 minutes.",
    debias: "Ask: what evidence would change my mind?",
  },
  {
    id: "negativity",
    name: "Negativity Bias",
    description: "Bad events weigh more than good ones.",
    experiment: "List 3 good things from today before one bad one.",
    debias: "Keep a 3:1 good-to-bad log for a week.",
  },
  {
    id: "anchoring",
    name: "Anchoring",
    description: "First numbers warp later judgments.",
    experiment: "Guess a quantity, then halve and double your guess.",
    debias: "Generate your own anchor before seeing others.",
  },
  {
    id: "availability",
    name: "Availability Heuristic",
    description: "Vivid memories feel more probable.",
    experiment: "Compare feared risks against base rates.",
    debias: "Look up the actual statistics.",
  },
  {
    id: "sunk-cost",
    name: "Sunk Cost Fallacy",
    description: "Past investment justifies future waste.",
    experiment: "Ask: would I start this today knowing what I know?",
    debias: "Decide from future value only.",
  },
  {
    id: "loss-aversion",
    name: "Loss Aversion",
    description: "Losses sting twice as much as gains please.",
    experiment: "Reframe a risk as gains kept vs losses avoided.",
    debias: "Decide with expected value, not fear.",
  },
  {
    id: "bandwagon",
    name: "Bandwagon Effect",
    description: "Believing things because others do.",
    experiment: "Argue against the group consensus once today.",
    debias: "Seek the lonely dissenting data point.",
  },
  {
    id: "hindsight",
    name: "Hindsight Bias",
    description: "Past events feel obvious after the fact.",
    experiment: "Write predictions down before outcomes.",
    debias: "Score your calibration monthly.",
  },
  {
    id: "self-serving",
    name: "Self-Serving Bias",
    description: "Success is skill, failure is luck.",
    experiment: "Credit others for one win today.",
    debias: "Do a blameless postmortem.",
  },
  {
    id: "fundamental-attribution",
    name: "Fundamental Attribution Error",
    description: "Others act from character, we act from circumstance.",
    experiment: "Invent 3 situational excuses for a stranger.",
    debias: "Assume context before character.",
  },
  {
    id: "dunning-kruger",
    name: "Dunning-Kruger Effect",
    description: "Beginners overestimate, experts underestimate.",
    experiment: "Rate your skill 1-10, then test it.",
    debias: "Seek frequent falsifying feedback.",
  },
  {
    id: "status-quo",
    name: "Status Quo Bias",
    description: "Preferring things to stay the same.",
    experiment: "Ask what you would choose with a blank slate.",
    debias: "Pre-commit to periodic reinvention.",
  },
  {
    id: "recency",
    name: "Recency Bias",
    description: "Latest events feel most important.",
    experiment: "Review a full year, not a week.",
    debias: "Journal so older evidence survives.",
  },
  {
    id: "survivorship",
    name: "Survivorship Bias",
    description: "Learning only from winners.",
    experiment: "Study three failures for every success story.",
    debias: "Ask who is missing from the data.",
  },
  {
    id: "planning",
    name: "Planning Fallacy",
    description: "Underestimating time and cost.",
    experiment: "Multiply your estimate by 1.5x.",
    debias: "Use reference-class forecasting.",
  },
  {
    id: "barnum",
    name: "Barnum Effect",
    description: "Vague statements feel personal.",
    experiment: "Give the same horoscope to five friends.",
    debias: "Demand falsifiable specifics.",
  },
  {
    id: "spotlight",
    name: "Spotlight Effect",
    description: "Overestimating how much others notice you.",
    experiment: "Wear something odd; count who notices.",
    debias: "Remember everyone is the star of their own film.",
  },
  {
    id: "zeigarnik",
    name: "Zeigarnik Effect",
    description: "Unfinished tasks haunt memory.",
    experiment: "Write open loops down to release them.",
    debias: "Close loops or park them explicitly.",
  },
];
