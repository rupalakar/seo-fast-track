import { create } from "zustand";
import type { InterviewPracticeLog } from "@/lib/types/state";

interface InterviewState {
  logs: Record<string, InterviewPracticeLog>; // keyed by questionId
  setLog: (questionId: string, patch: Partial<Omit<InterviewPracticeLog, "questionId">>) => void;
  reset: () => void;
}

export const useInterviewStore = create<InterviewState>()((set, get) => ({
  logs: {},
  setLog: (questionId, patch) => {
    const existing = get().logs[questionId] ?? {
      questionId,
      notes: "",
      confidence: 1 as const,
      lastPracticedAt: "",
    };
    set((s) => ({
      logs: {
        ...s.logs,
        [questionId]: {
          ...existing,
          ...patch,
          lastPracticedAt: new Date().toISOString(),
        },
      },
    }));
  },
  reset: () => set({ logs: {} }),
}));
