import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OnboardingProfile } from "@/lib/types/state";

interface OnboardingState {
  profile: OnboardingProfile | null;
  setProfile: (profile: OnboardingProfile) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      reset: () => set({ profile: null }),
    }),
    { name: "seo-ft/onboarding", skipHydration: true }
  )
);
