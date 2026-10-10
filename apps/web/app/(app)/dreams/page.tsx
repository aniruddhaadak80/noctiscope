"use client";

import { interpretDream } from "@repo/core";
import { useState } from "react";

export default function DreamsPage() {
  const [text, setText] = useState(
    "I was flying over a dark ocean while being chased",
  );
  const result = interpretDream(text, 7331);
  return (
    <div>
      <h1 className="text-3xl font-black">Dream Decoder</h1>
      <p className="mt-2 text-slate-300">
        Deterministic symbol engine. 40+ symbols, affect scoring, lucid prompt.
        Nothing leaves your browser.
      </p>
      <label className="mt-4 block text-sm" htmlFor="dream-input">
        Describe your dream
      </label>
      <textarea
        id="dream-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 p-3"
      />
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="font-bold">Interpretation</h2>
        <p className="mt-1 text-sm text-slate-300">{result.narrative}</p>
        <ul className="mt-3 space-y-1 text-sm">
          {result.symbols.map((s) => (
            <li key={s.symbol}>
              <strong>{s.symbol}</strong> — {s.meaning}{" "}
              <em className="text-slate-400">({s.affect})</em>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm">
          <span className="text-violet-300">Lucid prompt: </span>
          {result.lucidPrompt}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          valence {result.valence} · arousal {result.arousal}
        </p>
      </div>
    </div>
  );
}
