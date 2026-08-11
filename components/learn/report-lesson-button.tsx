"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function ReportLessonButton({
  lessonId,
  lessonTitle,
}: {
  lessonId: string;
  lessonTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!note.trim()) return;
    setSubmitting(true);
    setError(null);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("Kamu harus login dulu.");
      setSubmitting(false);
      return;
    }
    const { error: insertError } = await supabase.from("lesson_feedback").insert({
      lesson_id: lessonId,
      lesson_title: lessonTitle,
      user_id: user.id,
      user_email: user.email ?? "",
      note: note.trim(),
    });
    setSubmitting(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setDone(true);
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="shrink-0 text-zinc-400"
        onClick={() => setOpen(true)}
      >
        <Flag className="h-3.5 w-3.5" /> Materi ini perlu diupdate
      </Button>
      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) {
            setDone(false);
            setNote("");
            setError(null);
          }
        }}
      >
        <DialogContent>
          {done ? (
            <div className="py-2 text-center">
              <p className="text-sm font-medium text-zinc-900">Terima kasih!</p>
              <p className="mt-1 text-sm text-zinc-500">
                Catatanmu sudah dikirim ke admin untuk ditinjau.
              </p>
              <Button className="mt-4" variant="outline" onClick={() => setOpen(false)}>
                Tutup
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Materi ini perlu diupdate?</DialogTitle>
                <DialogDescription>
                  Kasih tau bagian mana yang membingungkan, kurang lengkap, atau sudah tidak
                  relevan — admin akan meninjaunya.
                </DialogDescription>
              </DialogHeader>
              <Textarea
                rows={4}
                placeholder="Contoh: bagian robots.txt masih kurang jelas, butuh contoh nyata..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              <DialogFooter>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleSubmit} disabled={submitting || !note.trim()}>
                  {submitting ? "Mengirim..." : "Kirim ke Admin"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
