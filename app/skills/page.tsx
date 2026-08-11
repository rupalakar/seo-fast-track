"use client";

import { SKILLS } from "@/content/skills";
import { useProgressStore, useTasksStore } from "@/lib/store";
import { useLessonsStore } from "@/lib/store/lessonsRemote";
import { computeSkillProgress } from "@/lib/domain/skillProgress";
import { PageHeader } from "@/components/layout/page-header";
import { SkillBar } from "@/components/skills/skill-bar";

export default function SkillsPage() {
  const lessonStatus = useProgressStore((s) => s.lessonStatus);
  const instances = useTasksStore((s) => s.instances);
  const lessons = useLessonsStore((s) => s.lessons);

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Peta Skill"
        description="Progress dihitung dari lesson yang selesai dan tugas praktik yang disetujui — bukti kerja lebih berbobot daripada sekadar membaca materi."
      />
      <div className="space-y-3">
        {SKILLS.map((skill) => (
          <SkillBar
            key={skill.id}
            skill={skill}
            progress={computeSkillProgress(skill.id, lessonStatus, instances, lessons)}
          />
        ))}
      </div>
    </div>
  );
}
