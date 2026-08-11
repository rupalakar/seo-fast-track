"use client";

import Link from "next/link";
import { LEVELS } from "@/content/levels";
import { useProgressStore, useQuizStore } from "@/lib/store";
import { useLessonsStore } from "@/lib/store/lessonsRemote";
import { isSectionMasteredForLevel } from "@/lib/domain/placementEngine";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight } from "lucide-react";

export default function LearnPage() {
  const lessonStatus = useProgressStore((s) => s.lessonStatus);
  const attempt = useQuizStore((s) => s.latestAttempt);
  const allLessons = useLessonsStore((s) => s.lessons);
  const lessonsLoading = useLessonsStore((s) => s.loading && !s.loaded);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Belajar"
        description="Kurikulum fast-track — fokus ke skill yang langsung bisa dipraktikkan."
      />
      {lessonsLoading && <p className="mb-4 text-sm text-zinc-400">Memuat materi...</p>}
      <div className="space-y-3">
        {LEVELS.map((level) => {
          const lessons = allLessons.filter((l) => l.levelId === level.id).sort(
            (a, b) => a.order - b.order
          );
          const completedCount = lessons.filter(
            (l) => lessonStatus[l.id] === "completed"
          ).length;
          const pct = lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0;
          const mastered = isSectionMasteredForLevel(attempt, level.id);
          const isRecommended = attempt?.placementLevelId === level.id;

          return (
            <Link key={level.id} href={`/learn/${level.id}`}>
              <Card className="transition-colors hover:border-zinc-400">
                <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {level.title}
                      {isRecommended && <Badge variant="info">Rekomendasi</Badge>}
                      {mastered && <Badge variant="secondary">Review opsional</Badge>}
                    </CardTitle>
                    <CardDescription className="mt-1">{level.description}</CardDescription>
                    {level.projectTitle && (
                      <p className="mt-1.5 text-xs font-medium text-zinc-500">
                        {level.projectTitle}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-zinc-400" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Progress value={pct} className="flex-1" />
                    <span className="text-xs text-zinc-500">
                      {completedCount}/{lessons.length} lesson
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
