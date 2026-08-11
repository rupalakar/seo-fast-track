import Link from "next/link";
import type { TaskTemplate } from "@/lib/types/content";
import type { TaskStatus } from "@/lib/types/state";
import { TASK_STATUS_LABEL } from "@/lib/domain/taskStateMachine";
import { TASK_STATUS_BADGE_VARIANT } from "@/lib/domain/taskStatusStyle";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Clock } from "lucide-react";

export function TaskCard({
  template,
  status,
}: {
  template: TaskTemplate;
  status: TaskStatus;
}) {
  return (
    <Link href={`/tasks/${template.id}`}>
      <Card className="transition-colors hover:border-zinc-400">
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <Badge variant={TASK_STATUS_BADGE_VARIANT[status]}>{TASK_STATUS_LABEL[status]}</Badge>
            {template.portfolioEligible && (
              <Briefcase className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
            )}
          </div>
          <p className="text-sm font-medium text-zinc-900">{template.title}</p>
          <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{template.objective}</p>
          <div className="mt-3 flex items-center gap-1 text-xs text-zinc-400">
            <Clock className="h-3 w-3" />
            {template.estMinutes} menit
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
