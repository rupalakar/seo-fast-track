"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LEVELS } from "@/content/levels";
import { SKILLS } from "@/content/skills";
import { useLessonsStore } from "@/lib/store/lessonsRemote";
import type { Lesson, LevelId, SkillId } from "@/lib/types/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BlocksEditor } from "@/components/admin/blocks-editor";
import { ResourcesEditor } from "@/components/admin/resources-editor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function LessonForm({ initial }: { initial?: Lesson }) {
  const router = useRouter();
  const upsertLesson = useLessonsStore((s) => s.upsertLesson);
  const deleteLesson = useLessonsStore((s) => s.deleteLesson);

  const isNew = !initial;
  const [id, setId] = useState(initial?.id ?? "");
  const [levelId, setLevelId] = useState<LevelId>(initial?.levelId ?? LEVELS[0].id);
  const [skillId, setSkillId] = useState<SkillId>(initial?.skillId ?? SKILLS[0].id);
  const [order, setOrder] = useState(initial?.order ?? 1);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [estMinutes, setEstMinutes] = useState(initial?.estMinutes ?? 10);
  const [blocks, setBlocks] = useState(initial?.blocks ?? []);
  const [resources, setResources] = useState(initial?.resources ?? []);
  const [videoSearchQuery, setVideoSearchQuery] = useState(initial?.videoSearchQuery ?? "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const effectiveId = isNew ? id || slugify(title) : id;
  const canSave = effectiveId.trim() && title.trim() && summary.trim();

  async function handleSave() {
    setSaving(true);
    setError(null);
    const { error } = await upsertLesson({
      id: effectiveId,
      levelId,
      skillId,
      order,
      title,
      summary,
      estMinutes,
      blocks,
      resources,
      videoSearchQuery: videoSearchQuery || undefined,
    });
    setSaving(false);
    if (error) {
      setError(error);
      return;
    }
    router.push("/admin/lessons");
  }

  async function handleDelete() {
    if (!initial) return;
    const { error } = await deleteLesson(initial.id);
    if (error) {
      setError(error);
      setDeleteOpen(false);
      return;
    }
    router.push("/admin/lessons");
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="lesson-id">ID (slug unik)</Label>
          <Input
            id="lesson-id"
            className="mt-1.5"
            value={effectiveId}
            disabled={!isNew}
            onChange={(e) => setId(slugify(e.target.value))}
            placeholder="contoh: fund-06-topik-baru"
          />
        </div>
        <div>
          <Label htmlFor="lesson-order">Urutan</Label>
          <Input
            id="lesson-order"
            type="number"
            className="mt-1.5"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Level</Label>
          <Select value={levelId} onValueChange={(v) => setLevelId(v as LevelId)}>
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LEVELS.map((l) => (
                <SelectItem key={l.id} value={l.id}>
                  {l.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Skill</Label>
          <Select value={skillId} onValueChange={(v) => setSkillId(v as SkillId)}>
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SKILLS.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="lesson-title">Judul</Label>
        <Input id="lesson-title" className="mt-1.5" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <Label htmlFor="lesson-summary">Ringkasan</Label>
        <Textarea
          id="lesson-summary"
          className="mt-1.5"
          rows={2}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="lesson-est">Estimasi Waktu (menit)</Label>
        <Input
          id="lesson-est"
          type="number"
          className="mt-1.5 w-32"
          value={estMinutes}
          onChange={(e) => setEstMinutes(Number(e.target.value))}
        />
      </div>

      <div>
        <Label className="mb-2 block">Isi Materi (teks)</Label>
        <BlocksEditor blocks={blocks} onChange={setBlocks} />
      </div>

      <div>
        <Label className="mb-2 block">Materi Pendukung (artikel, YouTube, PDF, video)</Label>
        <ResourcesEditor resources={resources} onChange={setResources} />
      </div>

      <div>
        <Label htmlFor="lesson-video-query">
          Kata Kunci Pencarian YouTube (fallback jika belum ada link video eksplisit)
        </Label>
        <Input
          id="lesson-video-query"
          className="mt-1.5"
          value={videoSearchQuery}
          onChange={(e) => setVideoSearchQuery(e.target.value)}
          placeholder="contoh: cara riset keyword SEO untuk pemula"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between border-t border-zinc-200 pt-4">
        {!isNew ? (
          <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="h-4 w-4" /> Hapus Lesson
          </Button>
        ) : (
          <span />
        )}
        <Button onClick={handleSave} disabled={!canSave || saving}>
          {saving ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus lesson ini?</DialogTitle>
            <DialogDescription>
              &ldquo;{title}&rdquo; akan dihapus permanen dan tidak lagi muncul di halaman Belajar
              untuk semua user.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Ya, Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
