import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LessonStatus } from "@/lib/types/state";

interface ProgressState {
  lessonStatus: Record<string, LessonStatus>;
  setLessonStatus: (lessonId: string, status: LessonStatus) => void;
  reset: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      lessonStatus: {},
      setLessonStatus: (lessonId, status) =>
        set((s) => ({ lessonStatus: { ...s.lessonStatus, [lessonId]: status } })),
      reset: () => set({ lessonStatus: {} }),
    }),
    { name: "seo-ft/progress", skipHydration: true }
  )
);
