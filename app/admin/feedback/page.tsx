"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface FeedbackRow {
  id: string;
  lesson_id: string;
  lesson_title: string;
  user_email: string;
  note: string;
  status: "open" | "resolved";
  created_at: string;
}

export default function AdminFeedbackPage() {
  const [rows, setRows] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();
    supabase
      .from("lesson_feedback")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        setLoading(false);
        if (error) {
          setError(error.message);
          return;
        }
        setRows(data ?? []);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function resolve(id: string) {
    const supabase = createClient();
    await supabase.from("lesson_feedback").update({ status: "resolved" }).eq("id", id);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "resolved" } : r)));
  }

  const openRows = rows.filter((r) => r.status === "open");
  const resolvedRows = rows.filter((r) => r.status === "resolved");

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Feedback Materi"
        description="Masukan dari user tentang lesson yang perlu diupdate."
      />

      {loading && <p className="text-sm text-zinc-400">Memuat...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && rows.length === 0 && (
        <EmptyState title="Belum ada feedback yang masuk." />
      )}

      {openRows.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Belum Ditinjau ({openRows.length})
          </h2>
          <div className="space-y-2">
            {openRows.map((row) => (
              <Card key={row.id}>
                <CardContent className="p-4">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <Link
                      href={`/admin/lessons/${row.lesson_id}`}
                      className="text-sm font-medium text-zinc-900 hover:underline"
                    >
                      {row.lesson_title}
                    </Link>
                    <Badge variant="warning">Open</Badge>
                  </div>
                  <p className="text-sm text-zinc-700">{row.note}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-zinc-400">
                      {row.user_email} &middot; {formatDate(row.created_at)}
                    </p>
                    <Button size="sm" variant="outline" onClick={() => resolve(row.id)}>
                      Tandai Selesai
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {resolvedRows.length > 0 && (
        <div>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Sudah Ditinjau ({resolvedRows.length})
          </h2>
          <div className="space-y-2">
            {resolvedRows.map((row) => (
              <Card key={row.id} className="opacity-60">
                <CardContent className="p-4">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-zinc-900">{row.lesson_title}</span>
                    <Badge variant="success">Resolved</Badge>
                  </div>
                  <p className="text-sm text-zinc-700">{row.note}</p>
                  <p className="mt-2 text-xs text-zinc-400">
                    {row.user_email} &middot; {formatDate(row.created_at)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
