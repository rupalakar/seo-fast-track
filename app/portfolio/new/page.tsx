"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { TASK_TEMPLATES } from "@/content/tasks";
import { SKILLS } from "@/content/skills";
import { usePortfolioStore, useTasksStore } from "@/lib/store";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { SkillId } from "@/lib/types/content";

export default function NewPortfolioItemPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const taskId = searchParams.get("taskId");
  const template = TASK_TEMPLATES.find((t) => t.id === taskId);
  const instance = useTasksStore((s) => (taskId ? s.instances[taskId] : undefined));
  const addItem = usePortfolioStore((s) => s.addItem);

  const [title, setTitle] = useState(template?.title ?? "");
  const [business, setBusiness] = useState("");
  const [problem, setProblem] = useState(template?.objective ?? "");
  const [approach, setApproach] = useState("");
  const [findings, setFindings] = useState(instance?.submission.text ?? "");
  const [recommendations, setRecommendations] = useState("");
  const [result, setResult] = useState("");
  const [evidenceLinks, setEvidenceLinks] = useState(
    (instance?.submission.links ?? []).join("\n")
  );
  const [toolsUsed, setToolsUsed] = useState((template?.tools ?? []).join(", "));
  const [skillsDemonstrated, setSkillsDemonstrated] = useState<SkillId[]>(
    template ? [template.skillId] : []
  );

  function toggleSkill(id: SkillId) {
    setSkillsDemonstrated((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleSave() {
    const item = addItem({
      sourceTaskInstanceIds: instance ? [instance.id] : [],
      title,
      business,
      problem,
      approach,
      findings,
      recommendations,
      result,
      evidenceLinks: evidenceLinks
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
      toolsUsed: toolsUsed
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      skillsDemonstrated,
    });
    router.push(`/portfolio/${item.id}`);
  }

  const canSave = title.trim() && problem.trim() && findings.trim() && recommendations.trim();

  return (
    <div className="mx-auto max-w-2xl pb-16">
      <Link href="/portfolio" className="mb-4 inline-block text-xs text-zinc-500 hover:underline">
        &larr; Portofolio
      </Link>
      <PageHeader
        title="Tambah Bukti Portofolio"
        description="Lengkapi narasi ini agar hasil kerjamu terlihat sebagai bukti kerja nyata, bukan sekadar tugas selesai."
      />
      <Card>
        <CardContent className="space-y-5 p-5">
          <div>
            <Label htmlFor="title">Judul Project</Label>
            <Input id="title" className="mt-1.5" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="business">Bisnis / Website</Label>
            <Input
              id="business"
              className="mt-1.5"
              placeholder="Nama website atau bisnis yang kamu audit/optimasi"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="problem">Masalah</Label>
            <Textarea id="problem" className="mt-1.5" rows={3} value={problem} onChange={(e) => setProblem(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="approach">Pendekatan</Label>
            <Textarea
              id="approach"
              className="mt-1.5"
              rows={3}
              placeholder="Bagaimana kamu mendekati masalah ini?"
              value={approach}
              onChange={(e) => setApproach(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="findings">Temuan</Label>
            <Textarea id="findings" className="mt-1.5" rows={4} value={findings} onChange={(e) => setFindings(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="recommendations">Rekomendasi</Label>
            <Textarea
              id="recommendations"
              className="mt-1.5"
              rows={4}
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="result">Hasil (bila ada)</Label>
            <Textarea
              id="result"
              className="mt-1.5"
              rows={2}
              placeholder="Contoh: belum ada data hasil karena baru direkomendasikan"
              value={result}
              onChange={(e) => setResult(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="evidence">Link Bukti (satu per baris)</Label>
            <Textarea
              id="evidence"
              className="mt-1.5"
              rows={3}
              value={evidenceLinks}
              onChange={(e) => setEvidenceLinks(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="tools">Tools yang Digunakan (pisahkan koma)</Label>
            <Input id="tools" className="mt-1.5" value={toolsUsed} onChange={(e) => setToolsUsed(e.target.value)} />
          </div>
          <div>
            <Label>Skill yang Ditunjukkan</Label>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {SKILLS.map((skill) => (
                <label key={skill.id} className="flex items-center gap-2 text-sm text-zinc-700">
                  <Checkbox
                    checked={skillsDemonstrated.includes(skill.id)}
                    onCheckedChange={() => toggleSkill(skill.id)}
                  />
                  {skill.name}
                </label>
              ))}
            </div>
          </div>
          <Button onClick={handleSave} disabled={!canSave}>
            Simpan ke Portofolio
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
