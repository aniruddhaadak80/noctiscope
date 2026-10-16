"use client";

import type { InsightCard, InsightSnapshot } from "@repo/core";
import { synthesizeInsights } from "@repo/core";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const KEY = "noctiscope-insight-input";

function seedSnapshot(): InsightSnapshot {
  return {
    moods: [3, 3, 4, 4, 4, 5, 4],
    habitCompletion: [55, 65, 70, 80, 80, 85],
    focusMinutes: [25, 30, 45, 25, 50],
    breathRounds: [2, 3, 3, 4],
  };
}

function load(): InsightSnapshot {
  try {
    return JSON.parse(
      localStorage.getItem(KEY) ?? JSON.stringify(seedSnapshot()),
    ) as InsightSnapshot;
  } catch {
    return seedSnapshot();
  }
}

function save(snapshot: InsightSnapshot): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(snapshot));
  } catch {
    /* private mode */
  }
}

export default function InsightsPage() {
  const [snapshot, setSnapshot] = useState<InsightSnapshot>(() =>
    seedSnapshot(),
  );
  const [mood, setMood] = useState("4");
  const [habit, setHabit] = useState("75");
  const [focus, setFocus] = useState("35");
  const [rounds, setRounds] = useState("3");

  useEffect(() => {
    const initial = load();
    setSnapshot(initial);
  }, []);

  const cards = useMemo(() => synthesizeInsights(snapshot), [snapshot]);

  const radar = [
    {
      metric: "Mood",
      value:
        (snapshot.moods.reduce((a, b) => a + b, 0) /
          Math.max(1, snapshot.moods.length)) *
        20,
    },
    {
      metric: "Habits",
      value:
        snapshot.habitCompletion.reduce((a, b) => a + b, 0) /
        Math.max(1, snapshot.habitCompletion.length),
    },
    {
      metric: "Focus",
      value: Math.min(
        100,
        (snapshot.focusMinutes.reduce((a, b) => a + b, 0) /
          Math.max(1, snapshot.focusMinutes.length)) *
          2,
      ),
    },
    {
      metric: "Recovery",
      value: Math.min(
        100,
        (snapshot.breathRounds.reduce((a, b) => a + b, 0) /
          Math.max(1, snapshot.breathRounds.length)) *
          25,
      ),
    },
  ];

  const persist = () => {
    const next: InsightSnapshot = {
      moods: [...snapshot.moods.slice(-6), Number(mood) as number].filter((n) =>
        Number.isFinite(n),
      ),
      habitCompletion: [
        ...snapshot.habitCompletion.slice(-5),
        Number(habit),
      ].filter((n) => Number.isFinite(n)),
      focusMinutes: [...snapshot.focusMinutes.slice(-4), Number(focus)].filter(
        (n) => Number.isFinite(n),
      ),
      breathRounds: [...snapshot.breathRounds.slice(-3), Number(rounds)].filter(
        (n) => Number.isFinite(n),
      ),
    };
    setSnapshot(next);
    save(next);
  };

  return (
    <div>
      <h1 className="text-3xl font-black">Insight Observatory</h1>
      <p className="mt-2 text-slate-300">
        Explainable local synthesis; no model or network leaves your device.
      </p>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-bold">Current wellness snapshot</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              ["Mood (1-5)", mood, setMood],
              ["Habits (0-100)", habit, setHabit],
              ["Focus minutes", focus, setFocus],
              ["Breath rounds", rounds, setRounds],
            ].map(([label, value, setValue]) => (
              <label key={label as string} className="block text-sm">
                {label as string}
                <input
                  type="number"
                  value={value as string}
                  onChange={(e) =>
                    (setValue as (v: string) => void)(e.target.value)
                  }
                  className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 p-2"
                />
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={persist}
            className="mt-4 rounded-full bg-violet-400 px-5 py-2 text-sm font-semibold text-black"
          >
            Save & recompute
          </button>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-bold">Health vectors</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <Radar
                  name="You"
                  dataKey="value"
                  fill="rgba(167,139,250,0.3)"
                  stroke="#a78bfa"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-lg font-bold">Recent change by vector</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={radar}>
              <XAxis dataKey="metric" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {cards.map((card: InsightCard) => (
          <article
            key={card.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <p className="text-xs uppercase tracking-widest text-violet-300">
              {card.severity}
            </p>
            <h3 className="mt-1 text-lg font-bold">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{card.body}</p>
            <p className="mt-2 text-sm text-emerald-300">{card.action}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
