import { create } from "zustand";
import type { OnboardingProfile } from "@/lib/types/state";

interface OnboardingState {
  profile: OnboardingProfile | null;
  setProfile: (profile: OnboardingProfile) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  reset: () => set({ profile: null }),
}));
