import type { TaskInstance, TaskStatus, TaskSubmission } from "@/lib/types/state";
import { generateId } from "@/lib/utils";

export function createTaskInstance(templateId: string): TaskInstance {
  const now = new Date().toISOString();
  return {
    id: generateId("task"),
    templateId,
    status: "NEW",
    submission: { text: "", links: [] },
    rubricChecks: {},
    reviewNotes: "",
    history: [{ status: "NEW", at: now }],
    createdAt: now,
    updatedAt: now,
  };
}

function transition(instance: TaskInstance, status: TaskStatus, note?: string): TaskInstance {
  const now = new Date().toISOString();
  return {
    ...instance,
    status,
    updatedAt: now,
    history: [...instance.history, { status, at: now, note }],
  };
}

export function startTask(instance: TaskInstance): TaskInstance {
  if (instance.status !== "NEW") return instance;
  return transition(instance, "DO");
}

export function submitForReview(
  instance: TaskInstance,
  submission: TaskSubmission
): TaskInstance {
  return transition({ ...instance, submission }, "REVIEW");
}

export function toggleRubricCheck(instance: TaskInstance, index: number): TaskInstance {
  return {
    ...instance,
    rubricChecks: { ...instance.rubricChecks, [index]: !instance.rubricChecks[index] },
  };
}

export function approveTask(instance: TaskInstance): TaskInstance {
  if (instance.status !== "REVIEW") return instance;
  return transition(instance, "APPROVED");
}

export function sendForRevision(instance: TaskInstance, note: string): TaskInstance {
  if (instance.status !== "REVIEW") return instance;
  return transition({ ...instance, reviewNotes: note }, "NEEDS_REVISION");
}

export function resumeAfterRevision(instance: TaskInstance): TaskInstance {
  if (instance.status !== "NEEDS_REVISION") return instance;
  return transition(instance, "DO");
}

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  NEW: "Belum Dimulai",
  DO: "Dikerjakan",
  REVIEW: "Ditinjau",
  NEEDS_REVISION: "Perlu Revisi",
  APPROVED: "Disetujui",
};
