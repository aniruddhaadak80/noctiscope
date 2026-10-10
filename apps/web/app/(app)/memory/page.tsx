"use client";

import { buildMemoryPalace } from "@repo/core";
import { useState } from "react";

export default function MemoryPage() {
  const [words, setWords] = useState("ocean lantern key river mirror");
  const palace = buildMemoryPalace(words.split(/\s+/).filter(Boolean));
  return (
    <div>
      <h1 className="text-3xl font-black">Memory Palace Builder</h1>
      <p className="mt-2 text-slate-300">
        Method of loci: we pin each word to a room in your palace.
      </p>
      <label className="mt-4 block text-sm" htmlFor="mem-input">
        Words (space separated)
      </label>
      <input
        id="mem-input"
        value={words}
        onChange={(e) => setWords(e.target.value)}
        className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 p-3"
      />
      <ol className="mt-4 space-y-2">
        {palace.map((p) => (
          <li
            key={p.room}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm"
          >
            <strong>{p.room}</strong> — {p.word}: {p.image}
          </li>
        ))}
      </ol>
    </div>
  );
}
