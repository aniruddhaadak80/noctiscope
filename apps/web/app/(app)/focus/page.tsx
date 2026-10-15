"use client";

import { FOCUS_PRESETS, summarizeSessions } from "@repo/core";
import { useEffect, useState } from "react";

function load(): number[] {
  try {
    return JSON.parse(
      localStorage.getItem("noctiscope-focus") ?? "[]",
    ) as number[];
  } catch {
    return [];
  }
}

export default function FocusPage() {
  const [minutes, setMinutes] = useState(25);
  const [left, setLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<number[]>([]);

  useEffect(() => setLog(load()), []);
  useEffect(() => {
    if (!running) return;
    if (left <= 0) {
      setRunning(false);
      setLog((prev) => {
        const next = [...prev, minutes];
        try {
          localStorage.setItem("noctiscope-focus", JSON.stringify(next));
        } catch {
          /* private mode */
        }
        return next;
      });
      return;
    }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, left, minutes]);

  const summary = summarizeSessions(log);
  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div>
      <h1 className="text-3xl font-black">Focus Timer</h1>
      <p className="mt-2 text-slate-300">
        One block, one intention. Completed blocks are logged locally.
      </p>
      <div className="mt-4 flex gap-2">
        {FOCUS_PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              setMinutes(p);
              setLeft(p * 60);
              setRunning(false);
            }}
            className={`rounded-full px-4 py-1 text-sm ${minutes === p ? "bg-violet-400 text-black" : "border border-white/20"}`}
          >
            {p}m
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-6xl font-black tabular-nums" aria-live="polite">
          {mm}:{ss}
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="rounded-full bg-violet-400 px-5 py-2 text-sm font-semibold text-black"
          >
            {running ? "Pause" : "Start"}
          </button>
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setLeft(minutes * 60);
            }}
            className="rounded-full border border-white/20 px-5 py-2 text-sm"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
        <p>
          <strong>
            {summary.count} blocks · {summary.totalMinutes} min total ·{" "}
            {summary.averageMinutes} min avg
          </strong>
        </p>
      </div>
    </div>
  );
}
