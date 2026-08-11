"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/lib/store";
import { SECTION_LABELS, SECTION_THRESHOLDS } from "@/lib/domain/placementEngine";
import { LEVELS } from "@/content/levels";
import type { QuizSection } from "@/lib/types/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";

const SECTION_ORDER: QuizSection[] = ["A", "B", "C", "D", "E"];

export default function QuizResultPage() {
  const router = useRouter();
  const attempt = useQuizStore((s) => s.latestAttempt);

  useEffect(() => {
    if (!attempt) router.replace("/quiz");
  }, [attempt, router]);

  if (!attempt) return null;

  const masteredSections = SECTION_ORDER.filter((s) => attempt.mastered[s]);
  const firstGap = SECTION_ORDER.find((s) => !attempt.mastered[s]);
  const placementLevel = LEVELS.find((l) => l.id === attempt.placementLevelId);

  const headline =
    masteredSections.length === 0
      ? `Mari kita mulai dari dasar: ${SECTION_LABELS[SECTION_ORDER[0]]}.`
      : firstGap
      ? `Kamu kuat di ${masteredSections.map((s) => SECTION_LABELS[s]).join(", ")}. Yuk fokus dulu di ${SECTION_LABELS[firstGap]}.`
      : "Kamu sudah menguasai semua dasar-dasar. Saatnya menuju Capstone Project!";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          <p className="text-sm font-medium text-zinc-500">Hasil Screening Quiz</p>
          <h1 className="mt-2 text-xl font-semibold text-zinc-900">{headline}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rincian per Bagian</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {SECTION_ORDER.map((section) => {
              const score = attempt.sectionScores[section];
              const total = attempt.sectionTotals[section];
              const mastered = attempt.mastered[section];
              const thresholdPct = Math.round(SECTION_THRESHOLDS[section] * total);
              return (
                <div
                  key={section}
                  className="flex items-center justify-between rounded-md border border-zinc-200 px-4 py-3"
                >
                  <div className="flex items-center gap-2.5">
                    {mastered ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Circle className="h-4 w-4 text-zinc-300" />
                    )}
                    <span className="text-sm font-medium text-zinc-800">
                      {SECTION_LABELS[section]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-500">
                      {score}/{total} (min {thresholdPct})
                    </span>
                    <Badge variant={mastered ? "success" : "outline"}>
                      {mastered ? "Mastered" : "Perlu belajar"}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {placementLevel && (
          <Card className="mt-4">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                  Titik mulai kamu
                </p>
                <p className="mt-1 text-base font-semibold text-zinc-900">
                  {placementLevel.title}
                </p>
                <p className="mt-1 text-sm text-zinc-500">{placementLevel.description}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <p className="mt-4 text-center text-xs text-zinc-400">
          Level yang sudah kamu kuasai tidak dikunci — lesson-nya jadi opsional, tapi tugas
          praktiknya tetap tersedia agar kamu punya bukti kerja di setiap skill.
        </p>

        <div className="mt-6 flex justify-center">
          <Button size="lg" onClick={() => router.push("/dashboard")}>
            Lihat Dashboard Saya
          </Button>
        </div>
      </div>
    </div>
  );
}
