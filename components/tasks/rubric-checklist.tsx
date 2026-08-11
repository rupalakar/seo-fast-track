"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function RubricChecklist({
  rubric,
  checks,
  onToggle,
  onApprove,
  onRequestRevision,
}: {
  rubric: string[];
  checks: Record<number, boolean>;
  onToggle: (index: number) => void;
  onApprove: () => void;
  onRequestRevision: (note: string) => void;
}) {
  const [note, setNote] = useState("");
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const allChecked = rubric.every((_, i) => checks[i]);

  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-500">
        Tinjau hasil kerjamu sendiri terhadap rubrik berikut sebelum menyetujui tugas ini.
      </p>
      <div className="space-y-2.5">
        {rubric.map((item, i) => (
          <label key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
            <Checkbox checked={!!checks[i]} onCheckedChange={() => onToggle(i)} className="mt-0.5" />
            {item}
          </label>
        ))}
      </div>

      {!showRevisionForm ? (
        <div className="flex items-center gap-2">
          <Button onClick={onApprove} disabled={!allChecked}>
            Setujui Tugas Ini
          </Button>
          <Button variant="outline" onClick={() => setShowRevisionForm(true)}>
            Kirim Balik untuk Revisi
          </Button>
        </div>
      ) : (
        <div className="space-y-2 rounded-md border border-zinc-200 p-3">
          <Label htmlFor="revision-note">Apa yang perlu diperbaiki?</Label>
          <Textarea
            id="revision-note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Contoh: rekomendasi belum spesifik, tambahkan bukti untuk 2 halaman lagi..."
          />
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              onClick={() => onRequestRevision(note)}
              disabled={!note.trim()}
            >
              Kirim untuk Revisi
            </Button>
            <Button variant="ghost" onClick={() => setShowRevisionForm(false)}>
              Batal
            </Button>
          </div>
        </div>
      )}

      {!allChecked && !showRevisionForm && (
        <p className="text-xs text-amber-600">
          Centang semua poin rubrik untuk bisa menyetujui, atau kirim balik untuk revisi.
        </p>
      )}
    </div>
  );
}
