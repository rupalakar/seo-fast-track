"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { LessonForm } from "@/components/admin/lesson-form";

export default function NewLessonPage() {
  return (
    <div className="mx-auto max-w-2xl pb-16">
      <Link href="/admin/lessons" className="mb-4 inline-block text-xs text-zinc-500 hover:underline">
        &larr; Kelola Materi
      </Link>
      <PageHeader title="Lesson Baru" />
      <LessonForm />
    </div>
  );
}
