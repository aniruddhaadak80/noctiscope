"use client";

import { MENTAL_TIMELINE, replayTimeline } from "@repo/core";
import { useState } from "react";

export default function TimeMachinePage() {
  const [steps, setSteps] = useState(5);
  const replay = replayTimeline(MENTAL_TIMELINE, steps);
  return (
    <div>
      <h1 className="text-3xl font-black">Time Machine</h1>
      <p className="mt-2 text-slate-300">
        Replay any mental state, event by event. Event-sourced mind.
      </p>
      <label className="mt-4 block text-sm">
        Steps: {steps}
        <input
          type="range"
          min={1}
          max={MENTAL_TIMELINE.length}
          value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
          className="w-full"
        />
      </label>
      <ol className="mt-4 space-y-2">
        {replay.map((e) => (
          <li
            key={e.t}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm"
          >
            <strong>t+{e.t}min</strong> — {e.event}{" "}
            <em className="text-slate-400">({e.state})</em>
          </li>
        ))}
      </ol>
    </div>
  );
}
