"use client";

import { useState } from "react";
import { NETWORKING_TASKS } from "@/content/networking-tasks";
import { useNetworkingStore } from "@/lib/store";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActivityFormDialog } from "@/components/networking/activity-form-dialog";
import { formatDate } from "@/lib/utils";
import { CheckCircle2, Circle, Plus, Trash2 } from "lucide-react";

const CATEGORY_LABEL: Record<string, string> = {
  profile: "Profil",
  outreach: "Outreach",
  community: "Komunitas",
  learning: "Belajar & Berbagi",
};

export default function NetworkingPage() {
  const items = useNetworkingStore((s) => s.items);
  const addItem = useNetworkingStore((s) => s.addItem);
  const toggleDone = useNetworkingStore((s) => s.toggleDone);
  const removeItem = useNetworkingStore((s) => s.removeItem);

  const [dialogTemplateTitle, setDialogTemplateTitle] = useState<string | null>(null);
  const [dialogTemplateId, setDialogTemplateId] = useState<string | undefined>(undefined);
  const [customOpen, setCustomOpen] = useState(false);

  const loggedTemplateIds = new Set(items.map((i) => i.templateId).filter(Boolean));
  const suggested = NETWORKING_TASKS.filter((t) => !loggedTemplateIds.has(t.id));

  function logActivity(values: { title: string; notes: string; date: string }) {
    addItem({
      templateId: dialogTemplateId,
      title: values.title,
      notes: values.notes,
      date: values.date,
      done: true,
    });
    setDialogTemplateTitle(null);
    setDialogTemplateId(undefined);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Networking"
        description="Fokus pada aktivitas profesional yang bermakna, bukan sekadar angka koneksi."
        action={
          <Button variant="outline" onClick={() => setCustomOpen(true)}>
            <Plus className="h-4 w-4" /> Aktivitas Custom
          </Button>
        }
      />

      {suggested.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 text-sm font-semibold text-zinc-900">Aktivitas yang Disarankan</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {suggested.map((task) => (
              <Card key={task.id}>
                <CardHeader>
                  <CardTitle className="text-sm">{task.title}</CardTitle>
                  <CardDescription>{CATEGORY_LABEL[task.category]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 text-sm text-zinc-600">{task.objective}</p>
                  <Button
                    size="sm"
                    onClick={() => {
                      setDialogTemplateTitle(task.title);
                      setDialogTemplateId(task.id);
                    }}
                  >
                    Catat sebagai Selesai
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-3 text-sm font-semibold text-zinc-900">Log Aktivitas</h2>
        {items.length === 0 ? (
          <EmptyState title="Belum ada aktivitas networking yang dicatat." />
        ) : (
          <div className="space-y-2">
            {[...items].reverse().map((activity) => (
              <Card key={activity.id}>
                <CardContent className="flex items-start gap-3 p-4">
                  <button onClick={() => toggleDone(activity.id)} className="mt-0.5 shrink-0">
                    {activity.done ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Circle className="h-4 w-4 text-zinc-300" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-zinc-900">{activity.title}</p>
                    {activity.notes && <p className="mt-0.5 text-sm text-zinc-500">{activity.notes}</p>}
                    <p className="mt-1 text-xs text-zinc-400">{formatDate(activity.date)}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(activity.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ActivityFormDialog
        open={dialogTemplateTitle !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDialogTemplateTitle(null);
            setDialogTemplateId(undefined);
          }
        }}
        title="Catat Aktivitas"
        initialTitle={dialogTemplateTitle ?? ""}
        lockTitle
        onSubmit={logActivity}
      />
      <ActivityFormDialog
        open={customOpen}
        onOpenChange={setCustomOpen}
        title="Tambah Aktivitas Custom"
        description="Catat aktivitas networking lain yang tidak ada di daftar saran."
        onSubmit={(values) => {
          addItem({ title: values.title, notes: values.notes, date: values.date, done: true });
          setCustomOpen(false);
        }}
      />
    </div>
  );
}
