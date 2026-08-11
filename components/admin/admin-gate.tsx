"use client";

import { useSupabaseUser } from "@/lib/supabase/useUser";
import { useIsAdminStatus } from "@/lib/supabase/useIsAdmin";
import { EmptyState } from "@/components/layout/empty-state";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const user = useSupabaseUser();
  const { isAdmin, loading } = useIsAdminStatus(user);

  if (!user || loading) return null;

  if (!isAdmin) {
    return (
      <EmptyState
        title="Halaman ini khusus admin"
        description="Akun kamu tidak memiliki akses ke bagian ini."
      />
    );
  }

  return <>{children}</>;
}
