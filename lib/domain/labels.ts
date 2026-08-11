import type { Goal, ExperienceLevel, WeeklyHours, ApplicationStatus, TaskStatus } from "@/lib/types/state";

export const GOAL_LABELS: Record<Goal, string> = {
  "get-a-job": "Mendapatkan pekerjaan sebagai SEO specialist",
  freelance: "Freelance SEO",
  agency: "Bekerja di agency SEO",
  "own-business": "Menerapkan SEO untuk bisnis sendiri",
  "general-skill": "Belajar skill umum SEO",
};

export const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  none: "Belum punya pengalaman sama sekali",
  "some-theory": "Sudah baca-baca teori, belum praktik",
  "some-practice": "Sudah pernah praktik langsung",
  "worked-before": "Pernah bekerja/magang di bidang SEO",
};

export const WEEKLY_HOURS_LABELS: Record<WeeklyHours, string> = {
  "1-3": "1–3 jam / minggu",
  "4-7": "4–7 jam / minggu",
  "8-14": "8–14 jam / minggu",
  "15+": "15+ jam / minggu",
};

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  APPLIED: "Applied",
  SCREENING: "Screening",
  INTERVIEW: "Interview",
  OFFER: "Offer",
  REJECTED: "Rejected",
};

export const APPLICATION_STATUS_ORDER: ApplicationStatus[] = [
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
];

export const TASK_STATUS_ORDER: TaskStatus[] = ["NEW", "DO", "REVIEW", "NEEDS_REVISION", "APPROVED"];
