"use client";

import { MOOD_LABELS, type MoodValue, summarizeMoods } from "@repo/core";
import { useEffect, useMemo, useState } from "react";

interface MoodRecord {
  day: string;
  value: MoodValue;
  note?: string;
}

function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function load(): MoodRecord[] {
  try {
    return JSON.parse(
      localStorage.getItem("noctiscope-moods") ?? "[]",
    ) as MoodRecord[];
  } catch {
    return [];
  }
}

export default function MoodPage() {
  const [value, setValue] = useState<MoodValue>(3);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<MoodRecord[]>([]);

  useEffect(() => setEntries(load()), []);

  const save = () => {
    const today = dayKey(new Date());
    const next = [
      { day: today, value, note: note.trim() || undefined },
      ...entries.filter((e) => e.day !== today),
    ] as MoodRecord[];
    setEntries(next);
    try {
      localStorage.setItem("noctiscope-moods", JSON.stringify(next));
    } catch {
      /* private mode */
    }
    setNote("");
  };

  const last30 = useMemo(() => {
    const days: MoodRecord[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = dayKey(d);
      const entry = entries.find((e) => e.day === key);
      days.push(entry ?? { day: key, value: 3 });
    }
    return days;
  }, [entries]);

  const summary = summarizeMoods(last30.map((e) => e.value));
  const total = summary.count;

  return (
    <div>
      <h1 className="text-3xl font-black">Mood Log</h1>
      <p className="mt-2 text-slate-300">
        Track one feeling per day; the heatmap reveals the pattern.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {([1, 2, 3, 4, 5] as MoodValue[]).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setValue(n)}
            className={`rounded-full px-4 py-1 text-sm ${value === n ? "bg-violet-400 text-black" : "border border-white/20"}`}
          >
            {n} · {MOOD_LABELS[n]}
          </button>
        ))}
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="A short note (optional)"
        className="mt-3 w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm"
        rows={2}
      />
      <button
        type="button"
        onClick={save}
        className="mt-2 rounded-full bg-violet-400 px-5 py-2 text-sm font-semibold text-black"
      >
        Log today
      </button>
      <div className="mt-4 grid grid-cols-10 gap-1">
        {last30.map((e) => (
          <div
            key={e.day}
            title={e.day}
            className="h-5 w-5 rounded-sm"
            style={{
              background: `rgba(167, 139, 250, ${0.18 + (e.value - 1) * 0.18})`,
            }}
          />
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
        <p>
          <strong>
            {total} days · avg {summary.average} · {summary.trend}
          </strong>
        </p>
      </div>
    </div>
  );
}
