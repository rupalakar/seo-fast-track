"use client";

import Link from "next/link";
import { LEVELS } from "@/content/levels";
import { useLessonsStore } from "@/lib/store/lessonsRemote";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";

export default function AdminLessonsPage() {
  const lessons = useLessonsStore((s) => s.lessons);
  const loading = useLessonsStore((s) => s.loading);

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Kelola Materi"
        description="Semua lesson yang tampil di halaman Belajar."
        action={
          <Button asChild>
            <Link href="/admin/lessons/new">
              <Plus className="h-4 w-4" /> Lesson Baru
            </Link>
          </Button>
        }
      />

      {loading && lessons.length === 0 && <p className="text-sm text-zinc-400">Memuat...</p>}

      <div className="space-y-6">
        {LEVELS.map((level) => {
          const levelLessons = lessons
            .filter((l) => l.levelId === level.id)
            .sort((a, b) => a.order - b.order);
          if (levelLessons.length === 0) return null;
          return (
            <div key={level.id}>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {level.title}
              </h2>
              <div className="space-y-1.5">
                {levelLessons.map((lesson) => (
                  <Link key={lesson.id} href={`/admin/lessons/${lesson.id}`}>
                    <Card className="transition-colors hover:border-zinc-400">
                      <CardContent className="flex items-center justify-between gap-3 p-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-zinc-900">
                            {lesson.title}
                          </p>
                          <p className="truncate text-xs text-zinc-500">{lesson.summary}</p>
                        </div>
                        <Pencil className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
