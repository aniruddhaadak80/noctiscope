"use client";

import { labelEmotion } from "@repo/core";
import { useState } from "react";

export default function EmotionsPage() {
  const [text, setText] = useState("I feel tight in my chest and restless");
  const result = labelEmotion(text);
  return (
    <div>
      <h1 className="text-3xl font-black">Emotion Waves</h1>
      <p className="mt-2 text-slate-300">
        Name it to tame it — affect labeling calms the amygdala.
      </p>
      <label className="mt-4 block text-sm" htmlFor="emo-input">
        What do you feel in your body right now?
      </label>
      <input
        id="emo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 p-3"
      />
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
        <p>
          <strong>Detected:</strong> {result.primary} ({result.intensity}/10)
        </p>
        <p className="mt-1 text-slate-300">{result.reframe}</p>
        <p className="mt-2 text-violet-300">Breathing: {result.breathing}</p>
      </div>
    </div>
  );
}
