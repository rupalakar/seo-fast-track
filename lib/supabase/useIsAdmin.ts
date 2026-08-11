"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "./client";

export interface AdminStatus {
  isAdmin: boolean;
  loading: boolean;
}

export function useIsAdminStatus(user: User | null | undefined): AdminStatus {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    if (!user) {
      Promise.resolve().then(() => {
        if (cancelled) return;
        setIsAdmin(false);
        setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }

    const supabase = createClient();
    supabase.rpc("is_admin").then(({ data, error }) => {
      if (cancelled) return;
      if (error) {
        console.error("is_admin check failed:", error.message);
        setIsAdmin(false);
      } else {
        setIsAdmin(Boolean(data));
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [user]);

  return { isAdmin, loading };
}

/** Convenience version for UI that just wants to show/hide something once known. */
export function useIsAdmin(user: User | null | undefined): boolean {
  return useIsAdminStatus(user).isAdmin;
}
