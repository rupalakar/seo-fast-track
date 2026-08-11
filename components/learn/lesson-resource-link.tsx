import { ExternalLink, Video, FileText } from "lucide-react";
import type { LessonResource } from "@/lib/types/content";

const ICON = {
  article: ExternalLink,
  youtube: Video,
  pdf: FileText,
  video: Video,
} as const;

const ICON_COLOR: Record<LessonResource["type"], string> = {
  article: "text-zinc-500",
  youtube: "text-red-600",
  pdf: "text-zinc-500",
  video: "text-zinc-500",
};

const TYPE_LABEL: Record<LessonResource["type"], string> = {
  article: "Artikel",
  youtube: "Video YouTube",
  pdf: "PDF",
  video: "Video",
};

export function LessonResourceLink({ resource }: { resource: LessonResource }) {
  const Icon = ICON[resource.type] ?? ExternalLink;
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1.5 text-sm text-zinc-600 hover:underline"
    >
      <Icon className={`h-3.5 w-3.5 shrink-0 ${ICON_COLOR[resource.type]}`} />
      {resource.label}
      <span className="text-xs text-zinc-400">({TYPE_LABEL[resource.type]})</span>
    </a>
  );
}
