import { mulberry32 } from "./rng";

export type AgentState =
  | "deep-sleep"
  | "dreaming"
  | "resting"
  | "deep-work"
  | "flow"
  | "anxious";

export interface SwarmAgent {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  state: AgentState;
  energy: number;
}

const STATES: AgentState[] = [
  "deep-sleep",
  "dreaming",
  "resting",
  "deep-work",
  "flow",
  "anxious",
];

/** Deterministic swarm: same seed + ticks => identical positions. */
export function spawnSwarm(count: number, seed = 7331): SwarmAgent[] {
  const rand = mulberry32(seed);
  const agents: SwarmAgent[] = [];
  for (let i = 0; i < count; i++) {
    agents.push({
      id: i,
      x: rand(),
      y: rand(),
      vx: (rand() - 0.5) * 0.02,
      vy: (rand() - 0.5) * 0.02,
      state: STATES[Math.floor(rand() * STATES.length)] ?? "resting",
      energy: 0.3 + rand() * 0.7,
    });
  }
  return agents;
}

/** One tick of drift + state diffusion. Pure: returns new array. */
export function tickSwarm(
  agents: SwarmAgent[],
  seed = 7331,
  step = 0,
): SwarmAgent[] {
  const rand = mulberry32(seed + step * 101);
  return agents.map((a) => {
    let { x, y, vx, vy } = a;
    x += vx;
    y += vy;
    if (x < 0 || x > 1) vx = -vx;
    if (y < 0 || y > 1) vy = -vy;
    x = Math.max(0, Math.min(1, x));
    y = Math.max(0, Math.min(1, y));
    const flip = rand();
    const state =
      flip > 0.985
        ? (STATES[Math.floor(rand() * STATES.length)] ?? a.state)
        : a.state;
    return { ...a, x, y, vx, vy, state };
  });
}

export function swarmCensus(agents: SwarmAgent[]): Record<AgentState, number> {
  const census: Record<AgentState, number> = {
    "deep-sleep": 0,
    dreaming: 0,
    resting: 0,
    "deep-work": 0,
    flow: 0,
    anxious: 0,
  };
  for (const a of agents) census[a.state] += 1;
  return census;
}
