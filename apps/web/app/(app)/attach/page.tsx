"use client";

import {
  ATTACHMENT_QUIZ,
  attachmentGuidance,
  scoreAttachment,
} from "@repo/core";
import { useState } from "react";

export default function AttachPage() {
  const [answers, setAnswers] = useState<number[]>([]);
  const done =
    answers.length >= ATTACHMENT_QUIZ.length &&
    answers.every((a) => a >= 1 && a <= 5);
  const result = done ? scoreAttachment(answers) : null;
  return (
    <div>
      <h1 className="text-3xl font-black">Attachment Styles</h1>
      <p className="mt-2 text-slate-300">
        How you bond, in 8 questions. Teaching lens, not a diagnosis.
      </p>
      <ol className="mt-4 space-y-3">
        {ATTACHMENT_QUIZ.map((q, i) => (
          <li
            key={q.id}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm"
          >
            <p>
              {i + 1}. {q.text}
            </p>
            <div className="mt-1 flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() =>
                    setAnswers((prev) => {
                      const next = [...prev];
                      next[i] = v;
                      return next;
                    })
                  }
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
      {result ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
          <p>
            <strong>Leaning: {result.style}</strong>
          </p>
          <p className="mt-1 text-slate-300">
            {attachmentGuidance(result.style)}
          </p>
        </div>
      ) : null}
    </div>
  );
}
