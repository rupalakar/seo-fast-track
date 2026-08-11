"use client";

import type { LessonResource, LessonResourceType } from "@/lib/types/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

const TYPE_LABEL: Record<LessonResourceType, string> = {
  article: "Artikel",
  youtube: "Video YouTube",
  pdf: "PDF",
  video: "Video Lain",
};

export function ResourcesEditor({
  resources,
  onChange,
}: {
  resources: LessonResource[];
  onChange: (resources: LessonResource[]) => void;
}) {
  function update(i: number, patch: Partial<LessonResource>) {
    onChange(resources.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }
  function remove(i: number) {
    onChange(resources.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...resources, { type: "article", label: "", url: "" }]);
  }

  return (
    <div className="space-y-2">
      {resources.map((resource, i) => (
        <div key={i} className="flex items-center gap-2">
          <Select
            value={resource.type}
            onValueChange={(type) => update(i, { type: type as LessonResourceType })}
          >
            <SelectTrigger className="h-9 w-36 shrink-0 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(TYPE_LABEL) as LessonResourceType[]).map((t) => (
                <SelectItem key={t} value={t}>
                  {TYPE_LABEL[t]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Label"
            className="w-40"
            value={resource.label}
            onChange={(e) => update(i, { label: e.target.value })}
          />
          <Input
            placeholder="https://..."
            value={resource.url}
            onChange={(e) => update(i, { url: e.target.value })}
          />
          <Button variant="ghost" size="icon" onClick={() => remove(i)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={add}>
        <Plus className="h-3.5 w-3.5" /> Tambah Materi (link/PDF/video)
      </Button>
    </div>
  );
}
