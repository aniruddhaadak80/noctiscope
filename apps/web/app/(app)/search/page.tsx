"use client";

import { ARCHETYPES, BRAIN_REGIONS, COGNITIVE_BIASES } from "@repo/core";
import { SYMBOL_MATRIX } from "@repo/core/generated/symbol-matrix";
import Link from "next/link";
import { useMemo, useState } from "react";

interface Hit {
  kind: string;
  title: string;
  body: string;
  href: string;
}

export default function SearchPage() {
  const [q, setQ] = useState("shadow");
  const hits = useMemo<Hit[]>(() => {
    const needle = q.trim().toLowerCase();
    if (needle.length < 2) return [];
    const out: Hit[] = [];
    for (const r of BRAIN_REGIONS) {
      if (`${r.name} ${r.role} ${r.whisper}`.toLowerCase().includes(needle)) {
        out.push({
          kind: "Region",
          title: r.name,
          body: r.role,
          href: "/atlas",
        });
      }
    }
    for (const [symbol, entry] of Object.entries(SYMBOL_MATRIX)) {
      if (`${symbol} ${entry.meaning}`.toLowerCase().includes(needle)) {
        out.push({
          kind: "Symbol",
          title: symbol,
          body: entry.meaning,
          href: `/symbols/${symbol}`,
        });
      }
    }
    for (const b of COGNITIVE_BIASES) {
      if (`${b.name} ${b.description}`.toLowerCase().includes(needle)) {
        out.push({
          kind: "Bias",
          title: b.name,
          body: b.description,
          href: "/biases",
        });
      }
    }
    for (const a of ARCHETYPES) {
      if (
        `${a.name} ${a.description} ${a.shadow}`.toLowerCase().includes(needle)
      ) {
        out.push({
          kind: "Archetype",
          title: a.name,
          body: a.description,
          href: "/archetypes",
        });
      }
    }
    return out.slice(0, 40);
  }, [q]);

  return (
    <div>
      <h1 className="text-3xl font-black">Deep Search</h1>
      <p className="mt-2 text-slate-300">
        One query across regions, symbols, biases and archetypes.
      </p>
      <label className="mt-4 block text-sm" htmlFor="deep-search">
        Search the subconscious
      </label>
      <input
        id="deep-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 p-3"
      />
      <p className="mt-2 text-xs text-slate-400">{hits.length} hits</p>
      <ul className="mt-3 space-y-2">
        {hits.map((h) => (
          <li
            key={`${h.kind}-${h.title}`}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm"
          >
            <span className="text-xs uppercase tracking-widest text-violet-300">
              {h.kind}
            </span>
            <p className="font-bold">{h.title}</p>
            <p className="text-slate-300">{h.body}</p>
            <Link href={h.href} className="text-sky-300">
              Open →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
