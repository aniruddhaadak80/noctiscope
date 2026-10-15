export interface BreathPhase {
  name: "inhale" | "hold" | "exhale" | "rest";
  seconds: number;
  hint: string;
}

export interface BreathProtocol {
  id: string;
  name: string;
  description: string;
  rounds: number;
  cycle: BreathPhase[];
}

export const BREATH_PROTOCOLS: BreathProtocol[] = [
  {
    id: "box",
    name: "Box breathing",
    description: "Navy-SEAL classic for acute anxiety: equal sides.",
    rounds: 4,
    cycle: [
      { name: "inhale", seconds: 4, hint: "Breathe in through the nose" },
      { name: "hold", seconds: 4, hint: "Hold, shoulders down" },
      { name: "exhale", seconds: 4, hint: "Slow exhale through the mouth" },
      { name: "hold", seconds: 4, hint: "Hold empty, stay soft" },
    ],
  },
  {
    id: "unwind",
    name: "4-7-8 unwind",
    description: "Long exhale activates the parasympathetic brake.",
    rounds: 3,
    cycle: [
      { name: "inhale", seconds: 4, hint: "Quiet inhale" },
      { name: "hold", seconds: 7, hint: "Let oxygen saturate" },
      { name: "exhale", seconds: 8, hint: "Whooshing exhale" },
    ],
  },
  {
    id: "coherent",
    name: "Coherent breathing",
    description: "5.5 breaths per minute; HRV resonance pace.",
    rounds: 6,
    cycle: [
      { name: "inhale", seconds: 5, hint: "Rise" },
      { name: "exhale", seconds: 5, hint: "Fall" },
    ],
  },
  {
    id: "sigh",
    name: "Physiological sigh",
    description: "Double inhale + long exhale: fastest known calm-down.",
    rounds: 3,
    cycle: [
      { name: "inhale", seconds: 2, hint: "Sniff in" },
      { name: "inhale", seconds: 2, hint: "Second sip on top" },
      { name: "exhale", seconds: 8, hint: "Long slow sigh out" },
    ],
  },
];

export function cycleSeconds(protocol: BreathProtocol): number {
  return protocol.cycle.reduce((n, p) => n + p.seconds, 0);
}

export function sessionSeconds(protocol: BreathProtocol): number {
  return cycleSeconds(protocol) * protocol.rounds;
}

export function getProtocol(id: string): BreathProtocol {
  const found = BREATH_PROTOCOLS.find((p) => p.id === id);
  if (!found) throw new Error(`unknown breath protocol: ${id}`);
  return found;
}
