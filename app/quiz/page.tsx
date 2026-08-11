"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUIZ_QUESTIONS } from "@/content/quiz-questions";
import { scoreQuiz, SECTION_LABELS } from "@/lib/domain/placementEngine";
import { useQuizStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function QuizPage() {
  const router = useRouter();
  const setAttempt = useQuizStore((s) => s.setAttempt);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUIZ_QUESTIONS.length).fill(null)
  );

  const question = QUIZ_QUESTIONS[index];
  const isLast = index === QUIZ_QUESTIONS.length - 1;
  const selected = answers[index];
  const progressPct = Math.round(((index + 1) / QUIZ_QUESTIONS.length) * 100);

  function selectOption(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optionIndex;
      return next;
    });
  }

  function handleNext() {
    if (selected === null) return;
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    const attempt = scoreQuiz(answers);
    setAttempt(attempt);
    router.push("/quiz/result");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-10">
      <div className="w-full max-w-xl">
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between text-xs text-zinc-500">
            <span>
              Pertanyaan {index + 1} dari {QUIZ_QUESTIONS.length}
            </span>
            <Badge variant="secondary">{SECTION_LABELS[question.section]}</Badge>
          </div>
          <Progress value={progressPct} />
        </div>
        <Card className="p-6">
          <h1 className="mb-5 text-base font-semibold text-zinc-900">{question.question}</h1>
          <div className="space-y-2">
            {question.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => selectOption(i)}
                className={cn(
                  "w-full rounded-md border px-4 py-3 text-left text-sm transition-colors",
                  selected === i
                    ? "border-zinc-900 bg-zinc-900 text-zinc-50"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
            >
              Kembali
            </Button>
            <Button onClick={handleNext} disabled={selected === null}>
              {isLast ? "Lihat Hasil" : "Selanjutnya"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
