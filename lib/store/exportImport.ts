import { useOnboardingStore } from "./onboarding";
import { useQuizStore } from "./quiz";
import { useProgressStore } from "./progress";
import { useTasksStore } from "./tasks";
import { usePortfolioStore } from "./portfolio";
import { useApplicationsStore } from "./applications";
import { useNetworkingStore } from "./networking";
import { useInterviewStore } from "./interview";

type DomainKey =
  | "onboarding"
  | "quiz"
  | "progress"
  | "tasks"
  | "portfolio"
  | "applications"
  | "networking"
  | "interview";

export interface ExportedData {
  schema: "seo-fast-track/export";
  exportedAt: string;
  data: Partial<Record<DomainKey, unknown>>;
}

export function exportAllData(): ExportedData {
  return {
    schema: "seo-fast-track/export",
    exportedAt: new Date().toISOString(),
    data: {
      onboarding: useOnboardingStore.getState(),
      quiz: useQuizStore.getState(),
      progress: useProgressStore.getState(),
      tasks: useTasksStore.getState(),
      portfolio: usePortfolioStore.getState(),
      applications: useApplicationsStore.getState(),
      networking: useNetworkingStore.getState(),
      interview: useInterviewStore.getState(),
    },
  };
}

export function importAllData(payload: ExportedData) {
  if (!payload || payload.schema !== "seo-fast-track/export" || !payload.data) {
    throw new Error("File tidak valid.");
  }
  const d = payload.data;
  if (d.onboarding && typeof d.onboarding === "object") useOnboardingStore.setState(d.onboarding as never);
  if (d.quiz && typeof d.quiz === "object") useQuizStore.setState(d.quiz as never);
  if (d.progress && typeof d.progress === "object") useProgressStore.setState(d.progress as never);
  if (d.tasks && typeof d.tasks === "object") useTasksStore.setState(d.tasks as never);
  if (d.portfolio && typeof d.portfolio === "object") usePortfolioStore.setState(d.portfolio as never);
  if (d.applications && typeof d.applications === "object")
    useApplicationsStore.setState(d.applications as never);
  if (d.networking && typeof d.networking === "object") useNetworkingStore.setState(d.networking as never);
  if (d.interview && typeof d.interview === "object") useInterviewStore.setState(d.interview as never);
}

export function resetAllData() {
  useOnboardingStore.getState().reset();
  useQuizStore.getState().reset();
  useProgressStore.getState().reset();
  useTasksStore.getState().reset();
  usePortfolioStore.getState().reset();
  useApplicationsStore.getState().reset();
  useNetworkingStore.getState().reset();
  useInterviewStore.getState().reset();
}
