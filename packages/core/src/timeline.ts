export interface TimelineEvent {
  t: number;
  event: string;
  state: string;
}

export const MENTAL_TIMELINE: TimelineEvent[] = [
  { t: 0, event: "Waking with a tight chest", state: "anxious" },
  { t: 20, event: "Coffee and news scroll", state: "deep-work" },
  { t: 60, event: "Hard conversation reheated in mind", state: "resting" },
  { t: 120, event: "Walk without headphones", state: "resting" },
  { t: 180, event: "Flow block on meaningful work", state: "flow" },
  { t: 300, event: "Old memory surfaces uninvited", state: "dreaming" },
  { t: 420, event: "Journaling and naming the feeling", state: "resting" },
  { t: 600, event: "Hypnagogic imagery before sleep", state: "dreaming" },
  { t: 660, event: "REM theater: chase becomes dialogue", state: "dreaming" },
  { t: 720, event: "Dawn: calmer baseline", state: "resting" },
];

export function replayTimeline(
  events: TimelineEvent[],
  steps: number,
): TimelineEvent[] {
  return events.slice(0, Math.max(1, Math.min(steps, events.length)));
}
