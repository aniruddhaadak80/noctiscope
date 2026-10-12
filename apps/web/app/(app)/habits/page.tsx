"use client";

import { scoreHabit } from "@repo/core";
import { useState } from "react";

export default function HabitsPage() {
  const [cue, setCue] = useState("after morning coffee");
  const [craving, setCraving] = useState("to feel awake");
  const [routine, setRoutine] = useState("walk around the block");
  const [reward, setReward] = useState("clear head");
  const score = scoreHabit({ cue, craving, routine, reward });
  return (
    <div>
      <h1 className="text-3xl font-black">Habit Loop Builder</h1>
      <p className="mt-2 text-slate-300">
        Design the loop your basal ganglia will run on autopilot.
      </p>
      <div className="mt-4 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
        {[
          ["Cue", cue, setCue],
          ["Craving", craving, setCraving],
          ["Routine", routine, setRoutine],
          ["Reward", reward, setReward],
        ].map(([label, value, set]) => (
          <label key={label as string} className="block text-sm">
            {label as string}
            <input
              value={value as string}
              onChange={(e) => (set as (v: string) => void)(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 p-2"
            />
          </label>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
        <p>
          <strong>Verdict: {score.verdict}</strong> (clarity {score.clarity} ·
          friction {score.friction} · pull {score.pull})
        </p>
        <p className="mt-2 text-emerald-300">{score.implementation}</p>
      </div>
    </div>
  );
}
