"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { useRouter, notFound } from "next/navigation";
import { LEVELS } from "@/content/levels";
import { LESSONS } from "@/content/lessons";
import { useProgressStore } from "@/lib/store";
import { ContentBlockRenderer } from "@/components/learn/content-block";
import { AskAiWidget } from "@/components/ai/ask-ai-widget";
import { lessonToPlainText } from "@/lib/domain/pageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, ExternalLink, Video } from "lucide-react";

export default function LessonPage({
  params,
}: {
  params: Promise<{ levelId: string; lessonId: string }>;
}) {
  const { levelId, lessonId } = use(params);
  const router = useRouter();
  const level = LEVELS.find((l) => l.id === levelId);
  const lesson = LESSONS.find((l) => l.id === lessonId && l.levelId === levelId);
  const lessonStatus = useProgressStore((s) => s.lessonStatus);
  const setLessonStatus = useProgressStore((s) => s.setLessonStatus);

  const status = lesson ? lessonStatus[lesson.id] ?? "not_started" : "not_started";

  useEffect(() => {
    if (lesson && status === "not_started") {
      setLessonStatus(lesson.id, "in_progress");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.id]);

  if (!level || !lesson) notFound();

  const levelLessons = LESSONS.filter((l) => l.levelId === level.id).sort(
    (a, b) => a.order - b.order
  );
  const currentIndex = levelLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = levelLessons[currentIndex - 1];
  const nextLesson = levelLessons[currentIndex + 1];

  function handleComplete() {
    setLessonStatus(lesson!.id, "completed");
    if (nextLesson) {
      router.push(`/learn/${level!.id}/${nextLesson.id}`);
    } else {
      router.push(`/learn/${level!.id}`);
    }
  }

  return (
    <div className="mx-auto max-w-2xl pb-16">
      <Link
        href={`/learn/${level.id}`}
        className="mb-4 inline-block text-xs text-zinc-500 hover:underline"
      >
        &larr; {level.title}
      </Link>

      <div className="mb-1 flex items-center gap-2">
        <Badge variant="secondary">{lesson.estMinutes} menit</Badge>
        {status === "completed" && (
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="h-3 w-3" /> Selesai
          </Badge>
        )}
      </div>
      <h1 className="mt-2 text-xl font-semibold text-zinc-900">{lesson.title}</h1>
      <p className="mt-1 text-sm text-zinc-500">{lesson.summary}</p>

      <Separator className="my-6" />

      <div>
        {lesson.blocks.map((block, i) => (
          <ContentBlockRenderer key={i} block={block} />
        ))}
      </div>

      {lesson.videoSearchQuery && (
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
            lesson.videoSearchQuery
          )}&hl=id&gl=ID`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 flex items-center gap-2.5 rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 hover:border-zinc-400"
        >
          <Video className="h-4 w-4 shrink-0 text-red-600" />
          Cari video penjelasan (Bahasa Indonesia) untuk topik ini
        </a>
      )}

      {lesson.sources.length > 0 && (
        <div className="mt-6 rounded-md border border-zinc-200 bg-zinc-50 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Sumber
          </p>
          <div className="space-y-1">
            {lesson.sources.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm text-zinc-600 hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="outline"
          disabled={!prevLesson}
          onClick={() => prevLesson && router.push(`/learn/${level.id}/${prevLesson.id}`)}
        >
          Sebelumnya
        </Button>
        <Button onClick={handleComplete}>
          {status === "completed" ? "Sudah Selesai — Lanjut" : "Tandai Selesai"}
        </Button>
      </div>

      <AskAiWidget pageTitle={lesson.title} pageContext={lessonToPlainText(lesson)} />
    </div>
  );
}
