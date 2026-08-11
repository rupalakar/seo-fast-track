import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuizAttempt } from "@/lib/types/state";

interface QuizState {
  latestAttempt: QuizAttempt | null;
  setAttempt: (attempt: QuizAttempt) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      latestAttempt: null,
      setAttempt: (attempt) => set({ latestAttempt: attempt }),
      reset: () => set({ latestAttempt: null }),
    }),
    { name: "seo-ft/quiz", skipHydration: true }
  )
);
