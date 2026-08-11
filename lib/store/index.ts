export { useOnboardingStore } from "./onboarding";
export { useQuizStore } from "./quiz";
export { useProgressStore } from "./progress";
export { useTasksStore } from "./tasks";
export { usePortfolioStore } from "./portfolio";
export { useApplicationsStore } from "./applications";
export { useNetworkingStore } from "./networking";
export { useInterviewStore } from "./interview";

import { useOnboardingStore } from "./onboarding";
import { useQuizStore } from "./quiz";
import { useProgressStore } from "./progress";
import { useTasksStore } from "./tasks";
import { usePortfolioStore } from "./portfolio";
import { useApplicationsStore } from "./applications";
import { useNetworkingStore } from "./networking";
import { useInterviewStore } from "./interview";

// Registry of all persisted stores, used for hydration, export, import, and reset.
export const ALL_STORES = [
  useOnboardingStore,
  useQuizStore,
  useProgressStore,
  useTasksStore,
  usePortfolioStore,
  useApplicationsStore,
  useNetworkingStore,
  useInterviewStore,
] as const;
