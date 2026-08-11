"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSupabaseUser } from "@/lib/supabase/useUser";
import { hydrateAllStoresFromCloud, attachCloudSync, detachCloudSync } from "@/lib/supabase/sync";
import { resetAllData } from "@/lib/store/exportImport";
import { useOnboardingStore } from "@/lib/store";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";

const ONBOARDING_EXEMPT_ROUTES = ["/onboarding", "/quiz"];
const PUBLIC_ROUTES = ["/login"];

function LoadingScreen({ label }: { label: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <p className="text-sm text-zinc-400">{label}</p>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const user = useSupabaseUser();
  const pathname = usePathname();
  const router = useRouter();
  const profile = useOnboardingStore((s) => s.profile);

  const [syncedForUserId, setSyncedForUserId] = useState<string | null>(null);
  // Tracks whose data is currently loaded locally, so we can tell "still the
  // same user" apart from "a different user just signed in on this browser"
  // apart from "nobody was signed in yet" — each needs different handling.
  const loadedUserId = useRef<string | null>(null);

  const isPublic = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));
  const isOnboardingExempt = ONBOARDING_EXEMPT_ROUTES.some((r) => pathname.startsWith(r));
  const synced = user ? syncedForUserId === user.id : false;

  // Single source of truth for cloud sync: hydrate + attach whenever the
  // signed-in user differs from whoever's data is currently loaded, and wipe
  // local state on sign-out (or account switch) so stale data never leaks
  // between accounts sharing a browser.
  useEffect(() => {
    if (user === undefined) return; // auth state still loading

    if (!user) {
      if (loadedUserId.current !== null) {
        detachCloudSync();
        resetAllData();
        loadedUserId.current = null;
        setSyncedForUserId(null);
      }
      return;
    }

    if (loadedUserId.current === user.id) return; // already loaded for this user

    let cancelled = false;
    if (loadedUserId.current !== null) {
      // Switching accounts without an intervening sign-out — clear the
      // previous user's data before pulling in the new one's.
      detachCloudSync();
      resetAllData();
    }
    loadedUserId.current = user.id;

    hydrateAllStoresFromCloud(user.id).then(() => {
      if (cancelled) return;
      attachCloudSync(user.id);
      setSyncedForUserId(user.id);
    });
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Redirects. AppShell is the only place that navigates based on auth/
  // onboarding state — pages that trigger sign-in/out just let this effect
  // react, instead of also redirecting themselves, to avoid both racing.
  useEffect(() => {
    if (user === undefined) return;
    if (!user) {
      if (!isPublic) router.replace("/login");
      return;
    }
    if (isPublic) {
      router.replace("/dashboard");
      return;
    }
    if (synced && !profile && !isOnboardingExempt) {
      router.replace("/onboarding");
    }
  }, [user, isPublic, isOnboardingExempt, synced, profile, router]);

  if (user === undefined) return <LoadingScreen label="Memuat..." />;

  if (!user) {
    if (isPublic) return <main className="flex-1">{children}</main>;
    return <LoadingScreen label="Mengalihkan ke login..." />;
  }

  if (isPublic) return <LoadingScreen label="Mengalihkan..." />;
  if (!synced) return <LoadingScreen label="Menyinkronkan data..." />;
  if (isOnboardingExempt) return <main className="flex-1">{children}</main>;
  if (!profile) return <LoadingScreen label="Mengalihkan ke onboarding..." />;

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-4 py-6 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
