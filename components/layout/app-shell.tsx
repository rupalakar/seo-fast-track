"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppHydrated } from "@/lib/store/useHydration";
import { useOnboardingStore } from "@/lib/store";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";

const ONBOARDING_EXEMPT_ROUTES = ["/onboarding", "/quiz"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const hydrated = useAppHydrated();
  const pathname = usePathname();
  const router = useRouter();
  const profile = useOnboardingStore((s) => s.profile);

  const isExempt = ONBOARDING_EXEMPT_ROUTES.some((r) => pathname.startsWith(r));

  useEffect(() => {
    if (!hydrated) return;
    if (!profile && !isExempt) {
      router.replace("/onboarding");
    }
  }, [hydrated, profile, isExempt, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-sm text-zinc-400">Memuat...</p>
      </div>
    );
  }

  if (isExempt) {
    return <main className="flex-1">{children}</main>;
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-sm text-zinc-400">Mengalihkan ke onboarding...</p>
      </div>
    );
  }

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
