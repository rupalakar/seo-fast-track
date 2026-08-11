import type { ContentBlock } from "@/lib/types/content";
import { Info, Lightbulb, TriangleAlert, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const CALLOUT_STYLES = {
  info: { icon: Info, className: "border-blue-200 bg-blue-50 text-blue-900" },
  tip: { icon: Lightbulb, className: "border-emerald-200 bg-emerald-50 text-emerald-900" },
  warning: { icon: TriangleAlert, className: "border-amber-200 bg-amber-50 text-amber-900" },
};

export function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="mt-6 mb-2 text-base font-semibold text-zinc-900">{block.text}</h2>;
    case "paragraph":
      return <p className="mb-4 text-sm leading-relaxed text-zinc-700">{block.text}</p>;
    case "list":
      return (
        <ul className="mb-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-zinc-700">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "callout": {
      const { icon: Icon, className } = CALLOUT_STYLES[block.tone];
      return (
        <div className={cn("mb-4 flex gap-2.5 rounded-md border px-4 py-3 text-sm", className)}>
          <Icon className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{block.text}</p>
        </div>
      );
    }
    case "source":
      return (
        <a
          href={block.url}
          target="_blank"
          rel="noreferrer"
          className="mb-2 flex items-center gap-1.5 text-sm text-zinc-600 underline-offset-2 hover:underline"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {block.label}
        </a>
      );
    default:
      return null;
  }
}
