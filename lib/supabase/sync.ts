"use client";

import { createClient } from "./client";
import { useOnboardingStore } from "@/lib/store/onboarding";
import { useQuizStore } from "@/lib/store/quiz";
import { useProgressStore } from "@/lib/store/progress";
import { useTasksStore } from "@/lib/store/tasks";
import { usePortfolioStore } from "@/lib/store/portfolio";
import { useApplicationsStore } from "@/lib/store/applications";
import { useNetworkingStore } from "@/lib/store/networking";
import { useInterviewStore } from "@/lib/store/interview";
import { importAllData, type ExportedData, type DomainKey } from "@/lib/store/exportImport";

const DEBOUNCE_MS = 400;

async function upsertDomain(userId: string, domain: DomainKey, data: unknown) {
  const supabase = createClient();
  const { error } = await supabase
    .from("app_state")
    .upsert({ user_id: userId, domain, data: data as object }, { onConflict: "user_id,domain" });
  if (error) console.error(`Cloud sync failed for ${domain}:`, error.message);
}

/** Fetches every domain row for this user and hydrates all local stores from it. */
export async function hydrateAllStoresFromCloud(userId: string) {
  const supabase = createClient();
  const { data: rows, error } = await supabase
    .from("app_state")
    .select("domain, data")
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to hydrate from cloud:", error.message);
    return;
  }

  const data: Partial<Record<DomainKey, unknown>> = {};
  (rows ?? []).forEach((row) => {
    data[row.domain as DomainKey] = row.data;
  });

  const payload: ExportedData = {
    schema: "seo-fast-track/export",
    exportedAt: new Date().toISOString(),
    data,
  };
  importAllData(payload);
}

function subscribeWithSync<T>(
  store: { subscribe: (listener: (state: T) => void) => () => void },
  domain: DomainKey,
  userId: string
): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return store.subscribe((state) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => upsertDomain(userId, domain, state), DEBOUNCE_MS);
  });
}

let unsubscribers: Array<() => void> = [];

/** Starts pushing every local store change to Supabase for this user. Call once, after hydration. */
export function attachCloudSync(userId: string) {
  detachCloudSync();
  unsubscribers = [
    subscribeWithSync(useOnboardingStore, "onboarding", userId),
    subscribeWithSync(useQuizStore, "quiz", userId),
    subscribeWithSync(useProgressStore, "progress", userId),
    subscribeWithSync(useTasksStore, "tasks", userId),
    subscribeWithSync(usePortfolioStore, "portfolio", userId),
    subscribeWithSync(useApplicationsStore, "applications", userId),
    subscribeWithSync(useNetworkingStore, "networking", userId),
    subscribeWithSync(useInterviewStore, "interview", userId),
  ];
}

export function detachCloudSync() {
  unsubscribers.forEach((unsub) => unsub());
  unsubscribers = [];
}
