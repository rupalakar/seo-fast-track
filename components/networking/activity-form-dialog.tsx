"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function ActivityFormBody({
  title,
  description,
  initialTitle,
  lockTitle,
  onCancel,
  onSubmit,
}: {
  title: string;
  description?: string;
  initialTitle: string;
  lockTitle: boolean;
  onCancel: () => void;
  onSubmit: (values: { title: string; notes: string; date: string }) => void;
}) {
  const [activityTitle, setActivityTitle] = useState(initialTitle);
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      <div className="space-y-4">
        {!lockTitle && (
          <div>
            <Label htmlFor="activity-title">Aktivitas</Label>
            <Input
              id="activity-title"
              className="mt-1.5"
              value={activityTitle}
              onChange={(e) => setActivityTitle(e.target.value)}
            />
          </div>
        )}
        <div>
          <Label htmlFor="activity-date">Tanggal</Label>
          <Input
            id="activity-date"
            type="date"
            className="mt-1.5"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="activity-notes">Catatan (opsional)</Label>
          <Textarea
            id="activity-notes"
            className="mt-1.5"
            rows={3}
            placeholder="Ceritakan singkat apa yang kamu lakukan/pelajari..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="ghost" onClick={onCancel}>
          Batal
        </Button>
        <Button
          disabled={!activityTitle.trim()}
          onClick={() => onSubmit({ title: activityTitle, notes, date })}
        >
          Catat Aktivitas
        </Button>
      </DialogFooter>
    </>
  );
}

export function ActivityFormDialog({
  open,
  onOpenChange,
  title,
  description,
  initialTitle = "",
  lockTitle = false,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  initialTitle?: string;
  lockTitle?: boolean;
  onSubmit: (values: { title: string; notes: string; date: string }) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {open && (
          <ActivityFormBody
            key={initialTitle}
            title={title}
            description={description}
            initialTitle={initialTitle}
            lockTitle={lockTitle}
            onCancel={() => onOpenChange(false)}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
