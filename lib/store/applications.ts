import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { JobApplication } from "@/lib/types/state";
import { generateId } from "@/lib/utils";

interface ApplicationsState {
  items: JobApplication[];
  addItem: (item: Omit<JobApplication, "id">) => JobApplication;
  updateItem: (id: string, patch: Partial<JobApplication>) => void;
  removeItem: (id: string) => void;
  reset: () => void;
}

export const useApplicationsStore = create<ApplicationsState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const newItem: JobApplication = { ...item, id: generateId("app") };
        set({ items: [...get().items, newItem] });
        return newItem;
      },
      updateItem: (id, patch) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
        })),
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      reset: () => set({ items: [] }),
    }),
    { name: "seo-ft/applications", skipHydration: true }
  )
);
