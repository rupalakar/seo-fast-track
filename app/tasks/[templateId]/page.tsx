"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TASK_TEMPLATES } from "@/content/tasks";
import { LEVELS } from "@/content/levels";
import { SKILLS } from "@/content/skills";
import { usePortfolioStore, useTasksStore } from "@/lib/store";
import { TASK_STATUS_LABEL } from "@/lib/domain/taskStateMachine";
import { TASK_STATUS_BADGE_VARIANT } from "@/lib/domain/taskStatusStyle";
import { EvidenceForm } from "@/components/tasks/evidence-form";
import { RubricChecklist } from "@/components/tasks/rubric-checklist";
import { HistoryTimeline } from "@/components/tasks/history-timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Clock, Wrench } from "lucide-react";

export default function TaskDetailPage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = use(params);
  const template = TASK_TEMPLATES.find((t) => t.id === templateId);

  const instance = useTasksStore((s) => s.instances[templateId]);
  const start = useTasksStore((s) => s.start);
  const submit = useTasksStore((s) => s.submit);
  const toggleRubric = useTasksStore((s) => s.toggleRubric);
  const approve = useTasksStore((s) => s.approve);
  const requestRevision = useTasksStore((s) => s.requestRevision);
  const resume = useTasksStore((s) => s.resume);
  const portfolioItems = usePortfolioStore((s) => s.items);

  if (!template) notFound();

  const status = instance?.status ?? "NEW";
  const level = LEVELS.find((l) => l.id === template.levelId);
  const skill = SKILLS.find((s) => s.id === template.skillId);
  const alreadyInPortfolio = portfolioItems.some((p) =>
    p.sourceTaskInstanceIds.includes(instance?.id ?? "")
  );

  return (
    <div className="mx-auto max-w-2xl pb-16">
      <Link href="/tasks" className="mb-4 inline-block text-xs text-zinc-500 hover:underline">
        &larr; Semua tugas
      </Link>

      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Badge variant={TASK_STATUS_BADGE_VARIANT[status]}>{TASK_STATUS_LABEL[status]}</Badge>
        {level && <Badge variant="outline">{level.title}</Badge>}
        {skill && <Badge variant="outline">{skill.name}</Badge>}
        {template.portfolioEligible && (
          <Badge variant="secondary" className="gap-1">
            <Briefcase className="h-3 w-3" /> Portfolio eligible
          </Badge>
        )}
      </div>
      <h1 className="text-xl font-semibold text-zinc-900">{template.title}</h1>
      <p className="mt-1 text-sm text-zinc-500">{template.objective}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Kenapa ini penting</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-600">{template.why}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Detail Tugas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-sm text-zinc-600">
            <p className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {template.estMinutes} menit
            </p>
            <p className="flex items-center gap-1.5">
              <Wrench className="h-3.5 w-3.5" /> {template.tools.join(", ")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-sm">Instruksi</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal space-y-1.5 pl-4 text-sm text-zinc-700">
            {template.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-zinc-600">
            <span className="font-medium text-zinc-800">Output yang diharapkan: </span>
            {template.expectedOutput}
          </p>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      {status === "NEW" && (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-zinc-600">Siap mulai mengerjakan tugas ini?</p>
          <Button onClick={() => start(templateId)}>Mulai Kerjakan</Button>
        </div>
      )}

      {(status === "DO" || status === "NEEDS_REVISION") && (
        <div>
          {status === "NEEDS_REVISION" && instance?.reviewNotes && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              <p className="font-medium">Catatan revisi:</p>
              <p className="mt-1">{instance.reviewNotes}</p>
            </div>
          )}
          <h2 className="mb-3 text-sm font-semibold text-zinc-900">Submit Bukti Pengerjaan</h2>
          <EvidenceForm
            initial={instance?.submission ?? { text: "", links: [] }}
            evidenceType={template.evidenceType}
            submitLabel={status === "NEEDS_REVISION" ? "Kirim Ulang untuk Ditinjau" : "Kirim untuk Ditinjau"}
            onSubmit={(submission) => {
              if (status === "NEEDS_REVISION") resume(templateId);
              submit(templateId, submission);
            }}
          />
        </div>
      )}

      {status === "REVIEW" && instance && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-zinc-900">Bukti yang Dikirim</h2>
          <Card className="mb-4">
            <CardContent className="space-y-2 p-4 text-sm text-zinc-700">
              {instance.submission.text && <p>{instance.submission.text}</p>}
              {instance.submission.links.map((link) => (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-zinc-500 underline-offset-2 hover:underline"
                >
                  {link}
                </a>
              ))}
            </CardContent>
          </Card>
          <h2 className="mb-3 text-sm font-semibold text-zinc-900">Self-Review — Rubrik</h2>
          <RubricChecklist
            rubric={template.rubric}
            checks={instance.rubricChecks}
            onToggle={(i) => toggleRubric(templateId, i)}
            onApprove={() => approve(templateId)}
            onRequestRevision={(note) => requestRevision(templateId, note)}
          />
        </div>
      )}

      {status === "APPROVED" && instance && (
        <div>
          <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            Tugas ini sudah disetujui. Kerja bagus!
          </div>
          {template.portfolioEligible && (
            <div className="mb-4">
              {alreadyInPortfolio ? (
                <Badge variant="secondary">Sudah ditambahkan ke portofolio</Badge>
              ) : (
                <Button asChild>
                  <Link href={`/portfolio/new?taskId=${templateId}`}>
                    Tambahkan ke Portofolio
                  </Link>
                </Button>
              )}
            </div>
          )}
          <h2 className="mb-3 text-sm font-semibold text-zinc-900">Bukti yang Disetujui</h2>
          <Card>
            <CardContent className="space-y-2 p-4 text-sm text-zinc-700">
              {instance.submission.text && <p>{instance.submission.text}</p>}
              {instance.submission.links.map((link) => (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-zinc-500 underline-offset-2 hover:underline"
                >
                  {link}
                </a>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {instance && instance.history.length > 0 && (
        <>
          <Separator className="my-6" />
          <h2 className="mb-3 text-sm font-semibold text-zinc-900">Riwayat</h2>
          <HistoryTimeline history={instance.history} />
        </>
      )}
    </div>
  );
}
