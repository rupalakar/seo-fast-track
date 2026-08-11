import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="h-full transition-colors hover:border-zinc-400">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-zinc-100">
            <Icon className="h-4 w-4 text-zinc-600" />
          </div>
          <div className="min-w-0">
            <p className="text-base font-semibold text-zinc-900">{value}</p>
            <p className="truncate text-xs text-zinc-500">{label}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
