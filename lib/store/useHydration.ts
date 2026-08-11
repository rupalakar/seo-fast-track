"use client";

import { useEffect, useState } from "react";
import { ALL_STORES } from "./index";

// All persisted stores use skipHydration so localStorage is never touched
// during SSR. This hook triggers rehydration once on the client and reports
// when every store has finished, so pages can avoid rendering against
// stale/default state before real data loads.
export function useAppHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      ALL_STORES.map(
        (store) =>
          new Promise<void>((resolve) => {
            const result = store.persist.rehydrate();
            if (result) {
              result.then(() => resolve());
            } else {
              resolve();
            }
          })
      )
    ).then(() => {
      if (!cancelled) setHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return hydrated;
}
