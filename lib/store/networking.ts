import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NetworkingActivity } from "@/lib/types/state";
import { generateId } from "@/lib/utils";

interface NetworkingState {
  items: NetworkingActivity[];
  addItem: (item: Omit<NetworkingActivity, "id">) => NetworkingActivity;
  updateItem: (id: string, patch: Partial<NetworkingActivity>) => void;
  removeItem: (id: string) => void;
  toggleDone: (id: string) => void;
  reset: () => void;
}

export const useNetworkingStore = create<NetworkingState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const newItem: NetworkingActivity = { ...item, id: generateId("net") };
        set({ items: [...get().items, newItem] });
        return newItem;
      },
      updateItem: (id, patch) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
        })),
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      toggleDone: (id) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, done: !i.done } : i)),
        })),
      reset: () => set({ items: [] }),
    }),
    { name: "seo-ft/networking", skipHydration: true }
  )
);
