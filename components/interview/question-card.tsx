"use client";

import { useState } from "react";
import type { InterviewQuestion } from "@/lib/types/content";
import type { InterviewPracticeLog } from "@/lib/types/state";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const CONFIDENCE_OPTIONS: { value: 1 | 2 | 3; label: string }[] = [
  { value: 1, label: "Belum Yakin" },
  { value: 2, label: "Cukup Yakin" },
  { value: 3, label: "Sangat Yakin" },
];

export function InterviewQuestionCard({
  question,
  log,
  onSave,
}: {
  question: InterviewQuestion;
  log?: InterviewPracticeLog;
  onSave: (values: { notes: string; confidence: 1 | 2 | 3 }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(log?.notes ?? "");
  const [confidence, setConfidence] = useState<1 | 2 | 3>(log?.confidence ?? 1);

  return (
    <Card>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left"
      >
        <div className="flex items-center gap-2.5">
          <p className="text-sm font-medium text-zinc-900">{question.question}</p>
          {log && (
            <Badge variant={log.confidence === 3 ? "success" : log.confidence === 2 ? "warning" : "outline"}>
              {CONFIDENCE_OPTIONS.find((c) => c.value === log.confidence)?.label}
            </Badge>
          )}
        </div>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-zinc-400 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <CardContent className="pt-0">
          <div className="mb-3 rounded-md bg-zinc-50 p-3">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Tips Menjawab
            </p>
            <ul className="list-disc space-y-1 pl-4 text-sm text-zinc-600">
              {question.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
          <Textarea
            rows={4}
            placeholder="Tulis jawaban/catatan latihanmu..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-1.5">
              {CONFIDENCE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setConfidence(opt.value)}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                    confidence === opt.value
                      ? "border-zinc-900 bg-zinc-900 text-zinc-50"
                      : "border-zinc-200 text-zinc-600 hover:border-zinc-400"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <Button size="sm" onClick={() => onSave({ notes, confidence })}>
              Simpan
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
