import type { LevelId, QuizSection } from "@/lib/types/content";
import type { QuizAttempt } from "@/lib/types/state";
import { QUIZ_QUESTIONS } from "@/content/quiz-questions";

export const SECTION_THRESHOLDS: Record<QuizSection, number> = {
  A: 4 / 5,
  B: 3 / 4,
  C: 3 / 4,
  D: 3 / 4,
  E: 2 / 3,
};

export const SECTION_LABELS: Record<QuizSection, string> = {
  A: "SEO Fundamentals",
  B: "Keyword & Search Intent",
  C: "On-Page SEO",
  D: "Technical SEO Basics",
  E: "Measurement Basics",
};

const SECTION_ORDER: QuizSection[] = ["A", "B", "C", "D", "E"];

const SECTION_TO_LEVEL: Record<QuizSection, LevelId> = {
  A: "level-0-fundamentals",
  B: "level-1-keyword",
  C: "level-2-onpage",
  D: "level-3-technical",
  E: "level-5-measurement",
};

export function scoreQuiz(answers: (number | null)[]): QuizAttempt {
  const sectionScores: Record<QuizSection, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  const sectionTotals: Record<QuizSection, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };

  QUIZ_QUESTIONS.forEach((q, i) => {
    sectionTotals[q.section] += 1;
    if (answers[i] === q.correctIndex) {
      sectionScores[q.section] += 1;
    }
  });

  const mastered: Record<QuizSection, boolean> = { A: false, B: false, C: false, D: false, E: false };
  SECTION_ORDER.forEach((section) => {
    const ratio = sectionTotals[section] > 0 ? sectionScores[section] / sectionTotals[section] : 0;
    mastered[section] = ratio >= SECTION_THRESHOLDS[section];
  });

  const firstUnmastered = SECTION_ORDER.find((section) => !mastered[section]);
  const placementLevelId: LevelId = firstUnmastered
    ? SECTION_TO_LEVEL[firstUnmastered]
    : "capstone";

  return {
    answers,
    sectionScores,
    sectionTotals,
    mastered,
    placementLevelId,
    completedAt: new Date().toISOString(),
  };
}

export function isSectionMasteredForLevel(
  attempt: QuizAttempt | null,
  levelId: LevelId
): boolean {
  if (!attempt) return false;
  const section = (Object.entries(SECTION_TO_LEVEL) as [QuizSection, LevelId][]).find(
    ([, l]) => l === levelId
  )?.[0];
  if (!section) return false;
  return attempt.mastered[section];
}
