"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { usePortfolioStore } from "@/lib/store";
import { SKILLS } from "@/content/skills";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { Printer } from "lucide-react";

const SECTIONS: { key: "problem" | "approach" | "findings" | "recommendations" | "result"; label: string }[] = [
  { key: "problem", label: "Masalah" },
  { key: "approach", label: "Pendekatan" },
  { key: "findings", label: "Temuan" },
  { key: "recommendations", label: "Rekomendasi" },
  { key: "result", label: "Hasil" },
];

export default function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = use(params);
  const item = usePortfolioStore((s) => s.items.find((i) => i.id === itemId));

  if (!item) notFound();

  return (
    <div className="mx-auto max-w-2xl pb-16">
      <div className="no-print mb-4 flex items-center justify-between">
        <Link href="/portfolio" className="text-xs text-zinc-500 hover:underline">
          &larr; Portofolio
        </Link>
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          <Printer className="h-3.5 w-3.5" /> Cetak / Simpan PDF
        </Button>
      </div>

      <p className="text-xs text-zinc-400">{formatDate(item.createdAt)}</p>
      <h1 className="mt-1 text-xl font-semibold text-zinc-900">{item.title}</h1>
      {item.business && <p className="mt-1 text-sm text-zinc-500">{item.business}</p>}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.skillsDemonstrated.map((skillId) => {
          const skill = SKILLS.find((s) => s.id === skillId);
          return skill ? (
            <Badge key={skillId} variant="secondary">
              {skill.name}
            </Badge>
          ) : null;
        })}
      </div>

      <Separator className="my-6" />

      <div className="space-y-5">
        {SECTIONS.map(
          ({ key, label }) =>
            item[key] && (
              <div key={key}>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {label}
                </p>
                <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-zinc-700">
                  {item[key]}
                </p>
              </div>
            )
        )}

        {item.toolsUsed.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Tools yang Digunakan
            </p>
            <p className="mt-1.5 text-sm text-zinc-700">{item.toolsUsed.join(", ")}</p>
          </div>
        )}

        {item.evidenceLinks.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Bukti / Evidence
              </p>
              <div className="space-y-1">
                {item.evidenceLinks.map((link) => (
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm text-zinc-600 underline-offset-2 hover:underline"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
