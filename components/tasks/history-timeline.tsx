import type { TaskHistoryEntry } from "@/lib/types/state";
import { TASK_STATUS_LABEL } from "@/lib/domain/taskStateMachine";
import { formatDate } from "@/lib/utils";

export function HistoryTimeline({ history }: { history: TaskHistoryEntry[] }) {
  return (
    <ol className="space-y-3">
      {history.map((entry, i) => (
        <li key={i} className="flex items-start gap-3 text-sm">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
          <div>
            <p className="font-medium text-zinc-800">
              {TASK_STATUS_LABEL[entry.status]}{" "}
              <span className="font-normal text-zinc-400">— {formatDate(entry.at)}</span>
            </p>
            {entry.note && <p className="mt-0.5 text-zinc-500">{entry.note}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
