import type { Skill } from "@/lib/types/content";
import type { SkillProgress } from "@/lib/domain/skillProgress";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function SkillBar({ skill, progress }: { skill: Skill; progress: SkillProgress }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-zinc-900">{skill.name}</p>
        <Badge
          variant={
            progress.label === "Cukup Kuat"
              ? "success"
              : progress.label === "Sedang Berjalan"
              ? "warning"
              : "outline"
          }
        >
          {progress.label}
        </Badge>
      </div>
      <p className="mb-2.5 text-xs text-zinc-500">{skill.description}</p>
      <Progress value={progress.percent} />
      <div className="mt-1.5 flex justify-between text-xs text-zinc-400">
        <span>
          {progress.lessonsCompleted}/{progress.lessonsTotal} lesson &middot;{" "}
          {progress.tasksApproved}/{progress.tasksTotal} tugas disetujui
        </span>
        <span>{progress.percent}%</span>
      </div>
    </div>
  );
}
