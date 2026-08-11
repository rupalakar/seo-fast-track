"use client";

import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import { SKILLS } from "@/content/skills";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default function PortfolioPage() {
  const items = usePortfolioStore((s) => s.items);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Portofolio"
        description="Bukti kerja nyata dari tugas-tugas yang sudah disetujui."
      />
      {items.length === 0 ? (
        <EmptyState
          title="Belum ada portofolio"
          description="Selesaikan dan setujui tugas praktik, lalu tambahkan sebagai bukti portofolio dari halaman detail tugas."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {[...items].reverse().map((item) => (
            <Link key={item.id} href={`/portfolio/${item.id}`}>
              <Card className="h-full transition-colors hover:border-zinc-400">
                <CardHeader>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  {item.business && <p className="text-xs text-zinc-500">{item.business}</p>}
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-zinc-600">{item.problem}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.skillsDemonstrated.slice(0, 3).map((skillId) => {
                      const skill = SKILLS.find((s) => s.id === skillId);
                      return skill ? (
                        <Badge key={skillId} variant="secondary">
                          {skill.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                  <p className="mt-3 text-xs text-zinc-400">{formatDate(item.createdAt)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
