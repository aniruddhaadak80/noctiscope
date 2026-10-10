"use client";

import { simulateBrainwaves } from "@repo/core";
import { useState } from "react";

export default function BrainwavesPage() {
  const [state, setState] = useState("deep-work");
  const waves = simulateBrainwaves(state);
  return (
    <div>
      <h1 className="text-3xl font-black">Brainwave Observatory</h1>
      <p className="mt-2 text-slate-300">Delta → gamma teaching simulation.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          "deep-sleep",
          "dreaming",
          "resting",
          "deep-work",
          "flow",
          "anxious",
        ].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setState(s)}
            className={`rounded-full px-4 py-1 text-sm ${state === s ? "bg-violet-400 text-black" : "border border-white/20"}`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {waves.map((w) => (
          <div
            key={w.band}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <h2 className="font-bold">{w.band}</h2>
            <p className="text-xs text-slate-400">{w.range}</p>
            <p className="mt-1 text-2xl font-black text-sky-300">{w.power}%</p>
            <p className="mt-1 text-xs text-slate-300">{w.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
