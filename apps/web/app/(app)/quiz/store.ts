"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuizState {
  answers: number[];
  setAnswer: (index: number, value: number) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      answers: [],
      setAnswer: (index, value) =>
        set((s) => {
          const answers = [...s.answers];
          answers[index] = value;
          return { answers };
        }),
      reset: () => set({ answers: [] }),
    }),
    { name: "noctiscope-quiz" },
  ),
);
