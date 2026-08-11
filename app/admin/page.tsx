"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Flag } from "lucide-react";

export default function AdminHomePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Admin" description="Kelola materi belajar dan tinjau masukan dari user." />
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/admin/lessons">
          <Card className="h-full transition-colors hover:border-zinc-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-4 w-4" /> Kelola Materi
              </CardTitle>
              <CardDescription>Tambah, edit, atau hapus lesson.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/admin/feedback">
          <Card className="h-full transition-colors hover:border-zinc-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Flag className="h-4 w-4" /> Feedback Materi
              </CardTitle>
              <CardDescription>Lihat masukan user tentang materi yang perlu diupdate.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
