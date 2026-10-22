"use client";

import {
  computeStressIndex,
  dominantTrait,
  PERSONALITY_QUIZ,
  scoreChronotype,
  scorePersonality,
  traitReading,
} from "@repo/core";
import { useState } from "react";
import { useQuizStore } from "./store";

const LIKERT = [1, 2, 3, 4, 5];

export default function QuizPage() {
  const { answers, setAnswer, reset } = useQuizStore();
  const [energy, setEnergy] = useState(3);
  const [bedtime, setBedtime] = useState(3);
  const [wakeEase, setWakeEase] = useState(3);
  const [sleepDebt, setSleepDebt] = useState(4);
  const [workload, setWorkload] = useState(5);
  const [recovery, setRecovery] = useState(4);

  const done =
    answers.length >= PERSONALITY_QUIZ.length &&
    answers.every((a) => a >= 1 && a <= 5);
  const scores = done ? scorePersonality(answers) : null;
  const top = scores ? dominantTrait(scores) : null;
  const chrono = scoreChronotype({ energy, bedtime, wakeEase });
  const stress = computeStressIndex({ sleepDebt, workload, recovery });

  return (
    <div>
      <h1 className="text-3xl font-black">Mind Quizzes</h1>
      <p className="mt-2 text-slate-300">
        Teaching instruments, not diagnoses. Results persist in your browser
        only.
      </p>

      <section
        aria-label="Big five"
        className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5"
      >
        <h2 className="font-bold">Big-five snapshot (10 questions)</h2>
        <ol className="mt-3 space-y-3">
          {PERSONALITY_QUIZ.map((q, i) => (
            <li key={q.id} className="text-sm">
              <p>
                {i + 1}. {q.text}
              </p>
              <div className="mt-1 flex gap-2">
                {LIKERT.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAnswer(i, v)}
                    aria-pressed={answers[i] === v}
                    className={`rounded-full px-3 py-1 text-xs ${answers[i] === v ? "bg-violet-400 text-black" : "border border-white/20"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ol>
        {scores && top ? (
          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4 text-sm">
            <p>
              <strong>Dominant trait: {top}</strong>
            </p>
            <p className="mt-1 text-slate-300">{traitReading(top)}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-3 rounded-full border border-white/20 px-4 py-1 text-xs"
            >
              Retake
            </button>
          </div>
        ) : null}
      </section>

      <section
        aria-label="Chronotype"
        className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5"
      >
        <h2 className="font-bold">Chronotype (3 sliders)</h2>
        <label className="mt-2 block text-sm">
          Morning energy: {energy}
          <input
            type="range"
            min={1}
            max={5}
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <label className="mt-2 block text-sm">
          Late bedtime pull: {bedtime}
          <input
            type="range"
            min={1}
            max={5}
            value={bedtime}
            onChange={(e) => setBedtime(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <label className="mt-2 block text-sm">
          Easy waking: {wakeEase}
          <input
            type="range"
            min={1}
            max={5}
            value={wakeEase}
            onChange={(e) => setWakeEase(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <p className="mt-2 text-sm">
          <strong>{chrono.type}</strong> · sleep window {chrono.window}
        </p>
        <p className="text-sm text-slate-300">{chrono.tip}</p>
      </section>

      <section
        aria-label="Stress index"
        className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5"
      >
        <h2 className="font-bold">Stress index</h2>
        <label className="mt-2 block text-sm">
          Sleep debt (0-10): {sleepDebt}
          <input
            type="range"
            min={0}
            max={10}
            value={sleepDebt}
            onChange={(e) => setSleepDebt(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <label className="mt-2 block text-sm">
          Workload (0-10): {workload}
          <input
            type="range"
            min={0}
            max={10}
            value={workload}
            onChange={(e) => setWorkload(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <label className="mt-2 block text-sm">
          Recovery (0-10): {recovery}
          <input
            type="range"
            min={0}
            max={10}
            value={recovery}
            onChange={(e) => setRecovery(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <p className="mt-2 text-sm">
          <strong>
            {stress.score}/100 · {stress.band}
          </strong>
        </p>
        <p className="text-sm text-slate-300">{stress.protocol}</p>
      </section>
    </div>
  );
}
