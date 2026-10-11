"use client";

import { NEUROTRANSMITTERS, simulateNeurochemistry } from "@repo/core";
import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function NeurochemPage() {
  const [sleep, setSleep] = useState(7);
  const [stress, setStress] = useState(5);
  const [exercise, setExercise] = useState(3);
  const result = simulateNeurochemistry({
    sleepHours: sleep,
    stressLevel: stress,
    exerciseDays: exercise,
  });
  return (
    <div>
      <h1 className="text-3xl font-black">Neurochemistry Sim</h1>
      <p className="mt-2 text-slate-300">
        Poke the soup. Simplified teaching model, not medical advice.
      </p>
      <div className="mt-4 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
        <label className="text-sm">
          Sleep hours: {sleep}
          <input
            type="range"
            min={0}
            max={12}
            value={sleep}
            onChange={(e) => setSleep(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <label className="text-sm">
          Stress (0-10): {stress}
          <input
            type="range"
            min={0}
            max={10}
            value={stress}
            onChange={(e) => setStress(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <label className="text-sm">
          Exercise days: {exercise}
          <input
            type="range"
            min={0}
            max={7}
            value={exercise}
            onChange={(e) => setExercise(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>
      <div className="mt-4 h-64 rounded-2xl border border-white/10 bg-white/5 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={result.levels.map((l) => ({ name: l.name, score: l.score }))}
            layout="vertical"
          >
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              width={90}
            />
            <Bar dataKey="score" fill="#7dd3fc" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {result.levels.map((l) => (
          <div
            key={l.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <h2 className="font-bold">{l.name}</h2>
            <p className="text-sm text-slate-300">{l.effect}</p>
            <p className="mt-1 text-2xl font-black text-violet-300">
              {l.score}/100
            </p>
          </div>
        ))}
      </div>
      <h2 className="mt-6 font-bold">Reference</h2>
      <ul className="mt-2 space-y-1 text-sm text-slate-300">
        {NEUROTRANSMITTERS.map((n) => (
          <li key={n.id}>
            <strong>{n.name}</strong> — {n.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
