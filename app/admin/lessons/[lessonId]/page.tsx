"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLessonsStore } from "@/lib/store/lessonsRemote";
import { PageHeader } from "@/components/layout/page-header";
import { LessonForm } from "@/components/admin/lesson-form";

export default function EditLessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = use(params);
  const lesson = useLessonsStore((s) => s.lessons.find((l) => l.id === lessonId));
  const loaded = useLessonsStore((s) => s.loaded);

  if (!lesson) {
    if (!loaded) return null;
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl pb-16">
      <Link href="/admin/lessons" className="mb-4 inline-block text-xs text-zinc-500 hover:underline">
        &larr; Kelola Materi
      </Link>
      <PageHeader title={`Edit: ${lesson.title}`} />
      <LessonForm initial={lesson} />
    </div>
  );
}
