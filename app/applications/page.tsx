"use client";

import { useState } from "react";
import { useApplicationsStore, usePortfolioStore } from "@/lib/store";
import { APPLICATION_STATUS_LABELS } from "@/lib/domain/labels";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ApplicationFormDialog,
  type ApplicationFormValues,
} from "@/components/applications/application-form-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { ApplicationStatus, JobApplication } from "@/lib/types/state";

export default function ApplicationsPage() {
  const items = useApplicationsStore((s) => s.items);
  const addItem = useApplicationsStore((s) => s.addItem);
  const updateItem = useApplicationsStore((s) => s.updateItem);
  const removeItem = useApplicationsStore((s) => s.removeItem);
  const portfolioItems = usePortfolioStore((s) => s.items);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<JobApplication | null>(null);

  function handleSubmit(values: ApplicationFormValues) {
    if (editing) {
      updateItem(editing.id, { ...values, followUpDate: values.followUpDate || undefined });
    } else {
      addItem({ ...values, followUpDate: values.followUpDate || undefined });
    }
    setDialogOpen(false);
    setEditing(null);
  }

  return (
    <div>
      <PageHeader
        title="Lamaran Kerja"
        description="Lacak progres lamaranmu dari applied sampai offer."
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Tambah Lamaran
          </Button>
        }
      />

      {items.length === 0 ? (
        <EmptyState
          title="Belum ada lamaran yang dicatat"
          description="Mulai lamar dan catat progresnya di sini agar kamu tahu mana yang perlu di-follow up."
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-4 py-2.5">Perusahaan</th>
                <th className="px-4 py-2.5">Posisi</th>
                <th className="px-4 py-2.5">Sumber</th>
                <th className="px-4 py-2.5">Tanggal Lamar</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5">Portofolio</th>
                <th className="px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {[...items].reverse().map((app) => (
                <tr key={app.id} className="border-b border-zinc-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-zinc-900">{app.company}</td>
                  <td className="px-4 py-3 text-zinc-700">{app.position}</td>
                  <td className="px-4 py-3 text-zinc-500">{app.source || "-"}</td>
                  <td className="px-4 py-3 text-zinc-500">{formatDate(app.applicationDate)}</td>
                  <td className="px-4 py-3">
                    <Select
                      value={app.status}
                      onValueChange={(v) => updateItem(app.id, { status: v as ApplicationStatus })}
                    >
                      <SelectTrigger className="h-8 w-36 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(APPLICATION_STATUS_LABELS) as ApplicationStatus[]).map((s) => (
                          <SelectItem key={s} value={s}>
                            {APPLICATION_STATUS_LABELS[s]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {app.portfolioItemIds.map((id) => {
                        const p = portfolioItems.find((pi) => pi.id === id);
                        return p ? (
                          <Badge key={id} variant="secondary">
                            {p.title}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditing(app);
                          setDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(app.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ApplicationFormDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditing(null);
        }}
        initial={editing}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
