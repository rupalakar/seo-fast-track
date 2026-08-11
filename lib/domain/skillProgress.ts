import type { Lesson, SkillId } from "@/lib/types/content";
import type { LessonStatus, TaskInstance } from "@/lib/types/state";
import { TASK_TEMPLATES } from "@/content/tasks";

export interface SkillProgress {
  skillId: SkillId;
  percent: number;
  label: "Belum Mulai" | "Sedang Berjalan" | "Cukup Kuat";
  lessonsCompleted: number;
  lessonsTotal: number;
  tasksApproved: number;
  tasksTotal: number;
}

function labelFor(percent: number): SkillProgress["label"] {
  if (percent <= 0) return "Belum Mulai";
  if (percent < 60) return "Sedang Berjalan";
  return "Cukup Kuat";
}

export function computeSkillProgress(
  skillId: SkillId,
  lessonStatus: Record<string, LessonStatus>,
  taskInstances: Record<string, TaskInstance>,
  lessons: Lesson[]
): SkillProgress {
  const skillLessons = lessons.filter((l) => l.skillId === skillId);
  const skillTasks = TASK_TEMPLATES.filter((t) => t.skillId === skillId);

  const lessonsTotal = skillLessons.length;
  const lessonsCompleted = skillLessons.filter(
    (l) => lessonStatus[l.id] === "completed"
  ).length;

  const tasksTotal = skillTasks.length;
  const tasksApproved = skillTasks.filter(
    (t) => taskInstances[t.id]?.status === "APPROVED"
  ).length;

  const lessonRatio = lessonsTotal > 0 ? lessonsCompleted / lessonsTotal : null;
  const taskRatio = tasksTotal > 0 ? tasksApproved / tasksTotal : null;

  let percent: number;
  if (lessonRatio !== null && taskRatio !== null) {
    percent = 0.3 * lessonRatio + 0.7 * taskRatio;
  } else if (taskRatio !== null) {
    percent = taskRatio;
  } else if (lessonRatio !== null) {
    percent = lessonRatio;
  } else {
    percent = 0;
  }
  percent = Math.round(percent * 100);

  return {
    skillId,
    percent,
    label: labelFor(percent),
    lessonsCompleted,
    lessonsTotal,
    tasksApproved,
    tasksTotal,
  };
}
