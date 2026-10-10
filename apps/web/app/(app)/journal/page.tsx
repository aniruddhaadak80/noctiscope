"use client";

import { reflectJournal } from "@repo/core";
import { useState } from "react";

export default function JournalPage() {
  const [text, setText] = useState(
    "I keep procrastinating on the thing that matters most",
  );
  const reflection = reflectJournal(text, 7331);
  return (
    <div>
      <h1 className="text-3xl font-black">Shadow Journal</h1>
      <p className="mt-2 text-slate-300">
        A deterministic reflective agent. No network, no keys, no judgment.
      </p>
      <label className="mt-4 block text-sm" htmlFor="journal-input">
        Write honestly (stays in your browser)
      </label>
      <textarea
        id="journal-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 p-3"
      />
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
        <p>
          <strong>Mirror:</strong> {reflection.mirror}
        </p>
        <p className="mt-2">
          <strong>Pattern:</strong> {reflection.pattern}
        </p>
        <p className="mt-2 text-emerald-300">
          <strong>Next tiny step:</strong> {reflection.nextStep}
        </p>
      </div>
    </div>
  );
}
