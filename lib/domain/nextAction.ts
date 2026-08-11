import { LEVELS } from "@/content/levels";
import { TASK_TEMPLATES } from "@/content/tasks";
import type { LevelId, Lesson } from "@/lib/types/content";
import type { LessonStatus, OnboardingProfile, QuizAttempt, TaskInstance } from "@/lib/types/state";

export interface NextAction {
  label: string;
  description: string;
  href: string;
}

export function getNextAction({
  profile,
  attempt,
  lessonStatus,
  taskInstances,
  lessons,
}: {
  profile: OnboardingProfile | null;
  attempt: QuizAttempt | null;
  lessonStatus: Record<string, LessonStatus>;
  taskInstances: Record<string, TaskInstance>;
  lessons: Lesson[];
}): NextAction {
  if (!profile) {
    return {
      label: "Lengkapi Onboarding",
      description: "Ceritakan tujuan dan waktu belajarmu agar kurikulum bisa disesuaikan.",
      href: "/onboarding",
    };
  }

  if (!attempt) {
    return {
      label: "Kerjakan Screening Quiz",
      description: "20 pertanyaan singkat untuk menentukan titik mulai belajarmu.",
      href: "/quiz",
    };
  }

  const startIndex = LEVELS.findIndex((l) => l.id === attempt.placementLevelId);
  const orderedLevels = LEVELS.slice(Math.max(startIndex, 0));

  for (const level of orderedLevels) {
    const levelLessons = lessons
      .filter((l) => l.levelId === level.id)
      .sort((a, b) => a.order - b.order);
    const nextLesson = levelLessons.find((l) => lessonStatus[l.id] !== "completed");
    if (nextLesson) {
      return {
        label: `Lanjutkan Belajar: ${nextLesson.title}`,
        description: `${level.title} — ${nextLesson.estMinutes} menit`,
        href: `/learn/${level.id}/${nextLesson.id}`,
      };
    }

    const tasks = TASK_TEMPLATES.filter((t) => t.levelId === level.id);
    const inProgress = tasks.find((t) => {
      const status = taskInstances[t.id]?.status;
      return status === "DO" || status === "NEEDS_REVISION";
    });
    if (inProgress) {
      return {
        label: `Lanjutkan Tugas: ${inProgress.title}`,
        description: "Selesaikan dan kirim bukti pengerjaannya.",
        href: `/tasks/${inProgress.id}`,
      };
    }

    const awaitingReview = tasks.find((t) => taskInstances[t.id]?.status === "REVIEW");
    if (awaitingReview) {
      return {
        label: `Tinjau Tugas: ${awaitingReview.title}`,
        description: "Cek hasil kerjamu terhadap rubrik dan setujui bila sudah sesuai.",
        href: `/tasks/${awaitingReview.id}`,
      };
    }

    const notStarted = tasks.find((t) => (taskInstances[t.id]?.status ?? "NEW") === "NEW");
    if (notStarted) {
      return {
        label: `Mulai Tugas Praktik: ${notStarted.title}`,
        description: `${level.title} — bukti kerja nyata untuk skill ini.`,
        href: `/tasks/${notStarted.id}`,
      };
    }
  }

  return {
    label: "Semua level selesai — saatnya melamar kerja!",
    description: "Perkuat portofolio, lamar posisi SEO, dan latih jawaban interview-mu.",
    href: "/applications",
  };
}

export function getCurrentFocusLevelId(attempt: QuizAttempt | null): LevelId | null {
  return attempt?.placementLevelId ?? null;
}
