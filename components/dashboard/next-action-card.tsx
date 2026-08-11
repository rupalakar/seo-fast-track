import Link from "next/link";
import type { NextAction } from "@/lib/domain/nextAction";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function NextActionCard({ action, focusLabel }: { action: NextAction; focusLabel?: string }) {
  return (
    <div className="rounded-xl border border-zinc-900 bg-zinc-900 p-6 text-zinc-50">
      {focusLabel && (
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
          Fokus saat ini: {focusLabel}
        </p>
      )}
      <h2 className="text-lg font-semibold">{action.label}</h2>
      <p className="mt-1 text-sm text-zinc-300">{action.description}</p>
      <Button asChild variant="secondary" className="mt-4">
        <Link href={action.href}>
          Lanjutkan <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
