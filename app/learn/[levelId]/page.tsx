"use client";

import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { LEVELS } from "@/content/levels";
import { SKILLS } from "@/content/skills";
import { useProgressStore, useQuizStore } from "@/lib/store";
import { useLessonsStore } from "@/lib/store/lessonsRemote";
import { isSectionMasteredForLevel } from "@/lib/domain/placementEngine";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, CircleDot, ChevronRight } from "lucide-react";
import type { LevelId } from "@/lib/types/content";

export default function LevelPage({ params }: { params: Promise<{ levelId: string }> }) {
  const { levelId } = use(params);
  const level = LEVELS.find((l) => l.id === levelId);
  const lessonStatus = useProgressStore((s) => s.lessonStatus);
  const attempt = useQuizStore((s) => s.latestAttempt);
  const allLessons = useLessonsStore((s) => s.lessons);

  if (!level) notFound();

  const lessons = allLessons
    .filter((l) => l.levelId === level.id)
    .sort((a, b) => a.order - b.order);
  const mastered = isSectionMasteredForLevel(attempt, level.id as LevelId);
  const skillNames = level.skillIds
    .map((id) => SKILLS.find((s) => s.id === id)?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/learn" className="mb-4 inline-block text-xs text-zinc-500 hover:underline">
        &larr; Semua level
      </Link>
      <PageHeader
        title={level.title}
        description={level.description}
        action={
          level.projectTitle ? (
            <Button asChild variant="outline">
              <Link href={`/tasks?level=${level.id}`}>{level.projectTitle}</Link>
            </Button>
          ) : undefined
        }
      />
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
        <span>Skill: {skillNames}</span>
        {mastered && <Badge variant="secondary">Kamu sudah lolos screening quiz di bagian ini</Badge>}
      </div>

      <div className="space-y-2">
        {lessons.map((lesson) => {
          const status = lessonStatus[lesson.id] ?? "not_started";
          const Icon =
            status === "completed" ? CheckCircle2 : status === "in_progress" ? CircleDot : Circle;
          return (
            <Link key={lesson.id} href={`/learn/${level.id}/${lesson.id}`}>
              <Card className="transition-colors hover:border-zinc-400">
                <CardContent className="flex items-center gap-3 p-4">
                  <Icon
                    className={
                      status === "completed"
                        ? "h-4 w-4 shrink-0 text-emerald-600"
                        : "h-4 w-4 shrink-0 text-zinc-300"
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-900">{lesson.title}</p>
                    <p className="truncate text-xs text-zinc-500">{lesson.summary}</p>
                  </div>
                  <span className="shrink-0 text-xs text-zinc-400">{lesson.estMinutes} menit</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
