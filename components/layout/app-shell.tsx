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
  const wasLoggedIn = useRef(false);

  const isPublic = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));
  const isOnboardingExempt = ONBOARDING_EXEMPT_ROUTES.some((r) => pathname.startsWith(r));
  const synced = user ? syncedForUserId === user.id : false;

  // Hydrate from Supabase + attach live sync whenever a new user session starts.
  useEffect(() => {
    if (!user) return;
    if (syncedForUserId === user.id) return;
    let cancelled = false;
    hydrateAllStoresFromCloud(user.id).then(() => {
      if (cancelled) return;
      attachCloudSync(user.id);
      setSyncedForUserId(user.id);
    });
    return () => {
      cancelled = true;
    };
  }, [user, syncedForUserId]);

  // Detach sync and wipe local state on logout so the next login starts clean.
  useEffect(() => {
    if (user === null && wasLoggedIn.current) {
      detachCloudSync();
      resetAllData();
      setSyncedForUserId(null);
    }
    if (user) wasLoggedIn.current = true;
  }, [user]);

  // Redirects.
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
