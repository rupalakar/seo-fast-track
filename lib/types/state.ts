// User-generated state types — persisted via Zustand + localStorage.

import type { LevelId, QuizSection, SkillId } from "./content";

export type Goal =
  | "get-a-job"
  | "freelance"
  | "agency"
  | "own-business"
  | "general-skill";

export type ExperienceLevel = "none" | "some-theory" | "some-practice" | "worked-before";

export type WeeklyHours = "1-3" | "4-7" | "8-14" | "15+";

export interface OnboardingProfile {
  goal: Goal;
  experience: ExperienceLevel;
  weeklyHours: WeeklyHours;
  completedAt: string;
}

export interface QuizAttempt {
  answers: (number | null)[];
  sectionScores: Record<QuizSection, number>;
  sectionTotals: Record<QuizSection, number>;
  mastered: Record<QuizSection, boolean>;
  placementLevelId: LevelId;
  completedAt: string;
}

export type LessonStatus = "not_started" | "in_progress" | "completed";

export interface LearningProgressState {
  lessonStatus: Record<string, LessonStatus>;
}

export type TaskStatus = "NEW" | "DO" | "REVIEW" | "NEEDS_REVISION" | "APPROVED";

export interface TaskSubmission {
  text: string;
  links: string[];
}

export interface TaskHistoryEntry {
  status: TaskStatus;
  at: string;
  note?: string;
}

export interface TaskInstance {
  id: string;
  templateId: string;
  status: TaskStatus;
  submission: TaskSubmission;
  rubricChecks: Record<number, boolean>;
  reviewNotes: string;
  history: TaskHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioItem {
  id: string;
  sourceTaskInstanceIds: string[];
  title: string;
  business: string;
  problem: string;
  approach: string;
  findings: string;
  recommendations: string;
  result: string;
  evidenceLinks: string[];
  toolsUsed: string[];
  skillsDemonstrated: SkillId[];
  createdAt: string;
}

export type ApplicationStatus =
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED";

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  source: string;
  applicationDate: string;
  status: ApplicationStatus;
  portfolioItemIds: string[];
  notes: string;
  followUpDate?: string;
}

export interface NetworkingActivity {
  id: string;
  templateId?: string;
  title: string;
  notes: string;
  date: string;
  done: boolean;
}

export interface InterviewPracticeLog {
  questionId: string;
  notes: string;
  confidence: 1 | 2 | 3;
  lastPracticedAt: string;
}
