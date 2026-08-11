import { create } from "zustand";
import type { PortfolioItem } from "@/lib/types/state";
import { generateId } from "@/lib/utils";

interface PortfolioState {
  items: PortfolioItem[];
  addItem: (item: Omit<PortfolioItem, "id" | "createdAt">) => PortfolioItem;
  updateItem: (id: string, patch: Partial<PortfolioItem>) => void;
  removeItem: (id: string) => void;
  reset: () => void;
}

export const usePortfolioStore = create<PortfolioState>()((set, get) => ({
  items: [],
  addItem: (item) => {
    const newItem: PortfolioItem = {
      ...item,
      id: generateId("pf"),
      createdAt: new Date().toISOString(),
    };
    set({ items: [...get().items, newItem] });
    return newItem;
  },
  updateItem: (id, patch) =>
    set((s) => ({
      items: s.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
    })),
  removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  reset: () => set({ items: [] }),
}));
