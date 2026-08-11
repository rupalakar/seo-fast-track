"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { TASK_TEMPLATES } from "@/content/tasks";
import { LEVELS } from "@/content/levels";
import { useTasksStore } from "@/lib/store";
import { TASK_STATUS_ORDER } from "@/lib/domain/labels";
import { TASK_STATUS_LABEL } from "@/lib/domain/taskStateMachine";
import { TaskCard } from "@/components/tasks/task-card";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import type { TaskStatus } from "@/lib/types/state";

export default function TasksPage() {
  const searchParams = useSearchParams();
  const levelFilter = searchParams.get("level");
  const instances = useTasksStore((s) => s.instances);

  const templates = useMemo(
    () => (levelFilter ? TASK_TEMPLATES.filter((t) => t.levelId === levelFilter) : TASK_TEMPLATES),
    [levelFilter]
  );

  const byStatus: Record<TaskStatus, typeof TASK_TEMPLATES> = {
    NEW: [],
    DO: [],
    REVIEW: [],
    NEEDS_REVISION: [],
    APPROVED: [],
  };
  templates.forEach((t) => {
    const status = instances[t.id]?.status ?? "NEW";
    byStatus[status].push(t);
  });

  const levelTitle = levelFilter ? LEVELS.find((l) => l.id === levelFilter)?.title : null;

  return (
    <div>
      <PageHeader
        title="Tugas Praktik"
        description={
          levelTitle
            ? `Menampilkan tugas untuk: ${levelTitle}`
            : "Alur kerja: Belum Dimulai → Dikerjakan → Ditinjau → Disetujui."
        }
      />
      {templates.length === 0 ? (
        <EmptyState title="Tidak ada tugas untuk filter ini." />
      ) : (
        <div className="grid gap-4 overflow-x-auto sm:grid-cols-2 lg:grid-cols-5">
          {TASK_STATUS_ORDER.map((status) => (
            <div key={status} className="min-w-[220px]">
              <div className="mb-2 flex items-center justify-between px-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {TASK_STATUS_LABEL[status]}
                </p>
                <span className="text-xs text-zinc-400">{byStatus[status].length}</span>
              </div>
              <div className="space-y-2">
                {byStatus[status].map((template) => (
                  <TaskCard key={template.id} template={template} status={status} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
