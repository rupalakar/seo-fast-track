import { create } from "zustand";
import type { TaskInstance, TaskSubmission } from "@/lib/types/state";
import {
  approveTask,
  createTaskInstance,
  resumeAfterRevision,
  sendForRevision,
  startTask,
  submitForReview,
  toggleRubricCheck,
} from "@/lib/domain/taskStateMachine";

interface TasksState {
  instances: Record<string, TaskInstance>; // keyed by templateId
  getOrCreate: (templateId: string) => TaskInstance;
  start: (templateId: string) => void;
  submit: (templateId: string, submission: TaskSubmission) => void;
  toggleRubric: (templateId: string, index: number) => void;
  approve: (templateId: string) => void;
  requestRevision: (templateId: string, note: string) => void;
  resume: (templateId: string) => void;
  reset: () => void;
}

export const useTasksStore = create<TasksState>()((set, get) => ({
  instances: {},
  getOrCreate: (templateId) => {
    const existing = get().instances[templateId];
    if (existing) return existing;
    const created = createTaskInstance(templateId);
    set((s) => ({ instances: { ...s.instances, [templateId]: created } }));
    return created;
  },
  start: (templateId) => {
    const instance = get().getOrCreate(templateId);
    set((s) => ({
      instances: { ...s.instances, [templateId]: startTask(instance) },
    }));
  },
  submit: (templateId, submission) => {
    const instance = get().getOrCreate(templateId);
    set((s) => ({
      instances: {
        ...s.instances,
        [templateId]: submitForReview(instance, submission),
      },
    }));
  },
  toggleRubric: (templateId, index) => {
    const instance = get().getOrCreate(templateId);
    set((s) => ({
      instances: {
        ...s.instances,
        [templateId]: toggleRubricCheck(instance, index),
      },
    }));
  },
  approve: (templateId) => {
    const instance = get().getOrCreate(templateId);
    set((s) => ({
      instances: { ...s.instances, [templateId]: approveTask(instance) },
    }));
  },
  requestRevision: (templateId, note) => {
    const instance = get().getOrCreate(templateId);
    set((s) => ({
      instances: {
        ...s.instances,
        [templateId]: sendForRevision(instance, note),
      },
    }));
  },
  resume: (templateId) => {
    const instance = get().getOrCreate(templateId);
    set((s) => ({
      instances: { ...s.instances, [templateId]: resumeAfterRevision(instance) },
    }));
  },
  reset: () => set({ instances: {} }),
}));
