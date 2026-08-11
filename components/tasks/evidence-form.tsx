"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import type { TaskSubmission } from "@/lib/types/state";
import type { EvidenceType } from "@/lib/types/content";

export function EvidenceForm({
  initial,
  evidenceType,
  submitLabel,
  onSubmit,
}: {
  initial: TaskSubmission;
  evidenceType: EvidenceType;
  submitLabel: string;
  onSubmit: (submission: TaskSubmission) => void;
}) {
  const [text, setText] = useState(initial.text);
  const [links, setLinks] = useState<string[]>(initial.links.length ? initial.links : [""]);

  const showText = evidenceType !== "link";
  const showLinks = evidenceType !== "text";

  function updateLink(i: number, value: string) {
    setLinks((prev) => prev.map((l, idx) => (idx === i ? value : l)));
  }

  function removeLink(i: number) {
    setLinks((prev) => prev.filter((_, idx) => idx !== i));
  }

  function handleSubmit() {
    onSubmit({ text, links: links.map((l) => l.trim()).filter(Boolean) });
  }

  const canSubmit = showText ? text.trim().length > 0 : links.some((l) => l.trim());

  return (
    <div className="space-y-4">
      {showText && (
        <div>
          <Label htmlFor="evidence-text">Deskripsi / Temuan</Label>
          <Textarea
            id="evidence-text"
            className="mt-1.5"
            rows={6}
            placeholder="Tuliskan apa yang kamu kerjakan, temuan, dan hasilnya..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      )}
      {showLinks && (
        <div>
          <Label>Link Bukti (Google Docs, Sheets, screenshot host, dsb.)</Label>
          <div className="mt-1.5 space-y-2">
            {links.map((link, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  placeholder="https://..."
                  value={link}
                  onChange={(e) => updateLink(i, e.target.value)}
                />
                {links.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => removeLink(i)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setLinks((p) => [...p, ""])}>
              <Plus className="h-3.5 w-3.5" /> Tambah Link
            </Button>
          </div>
        </div>
      )}
      <Button onClick={handleSubmit} disabled={!canSubmit}>
        {submitLabel}
      </Button>
    </div>
  );
}
