"use client";

import type { ContentBlock } from "@/lib/types/content";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";

const BLOCK_TYPE_LABEL: Record<ContentBlock["type"], string> = {
  paragraph: "Paragraf",
  heading: "Judul Bagian",
  list: "Daftar (list)",
  callout: "Kotak Catatan (callout)",
  source: "Sumber (legacy)",
};

function emptyBlock(type: ContentBlock["type"]): ContentBlock {
  switch (type) {
    case "paragraph":
      return { type: "paragraph", text: "" };
    case "heading":
      return { type: "heading", text: "" };
    case "list":
      return { type: "list", items: [""] };
    case "callout":
      return { type: "callout", tone: "info", text: "" };
    case "source":
      return { type: "source", label: "", url: "" };
  }
}

export function BlocksEditor({
  blocks,
  onChange,
}: {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}) {
  function update(i: number, block: ContentBlock) {
    onChange(blocks.map((b, idx) => (idx === i ? block : b)));
  }
  function remove(i: number) {
    onChange(blocks.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }
  function addBlock() {
    onChange([...blocks, emptyBlock("paragraph")]);
  }

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => (
        <div key={i} className="rounded-md border border-zinc-200 p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <Select
              value={block.type}
              onValueChange={(type) => update(i, emptyBlock(type as ContentBlock["type"]))}
            >
              <SelectTrigger className="h-8 w-52 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(BLOCK_TYPE_LABEL) as ContentBlock["type"][])
                  .filter((t) => t !== "source")
                  .map((t) => (
                    <SelectItem key={t} value={t}>
                      {BLOCK_TYPE_LABEL[t]}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => move(i, -1)} disabled={i === 0}>
                <ChevronUp className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => move(i, 1)}
                disabled={i === blocks.length - 1}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => remove(i)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {(block.type === "paragraph" || block.type === "heading") && (
            <Textarea
              rows={block.type === "heading" ? 1 : 3}
              value={block.text}
              onChange={(e) => update(i, { ...block, text: e.target.value })}
              placeholder="Isi teks..."
            />
          )}

          {block.type === "list" && (
            <div>
              <Label className="mb-1 block text-xs text-zinc-500">Satu poin per baris</Label>
              <Textarea
                rows={4}
                value={block.items.join("\n")}
                onChange={(e) => update(i, { ...block, items: e.target.value.split("\n") })}
              />
            </div>
          )}

          {block.type === "callout" && (
            <div className="space-y-2">
              <Select
                value={block.tone}
                onValueChange={(tone) =>
                  update(i, { ...block, tone: tone as "info" | "warning" | "tip" })
                }
              >
                <SelectTrigger className="h-8 w-40 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Peringatan</SelectItem>
                  <SelectItem value="tip">Tip</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                rows={2}
                value={block.text}
                onChange={(e) => update(i, { ...block, text: e.target.value })}
              />
            </div>
          )}

          {block.type === "source" && (
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Label"
                value={block.label}
                onChange={(e) => update(i, { ...block, label: e.target.value })}
              />
              <Input
                placeholder="URL"
                value={block.url}
                onChange={(e) => update(i, { ...block, url: e.target.value })}
              />
            </div>
          )}
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addBlock}>
        <Plus className="h-3.5 w-3.5" /> Tambah Bagian
      </Button>
    </div>
  );
}
