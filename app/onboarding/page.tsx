"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/lib/store";
import { GOAL_LABELS, EXPERIENCE_LABELS, WEEKLY_HOURS_LABELS } from "@/lib/domain/labels";
import type { Goal, ExperienceLevel, WeeklyHours } from "@/lib/types/state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function OptionGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: [T, string][];
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={cn(
            "rounded-md border px-4 py-3 text-left text-sm font-medium transition-colors",
            value === key
              ? "border-zinc-900 bg-zinc-900 text-zinc-50"
              : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const setProfile = useOnboardingStore((s) => s.setProfile);

  const [goal, setGoal] = useState<Goal | null>(null);
  const [experience, setExperience] = useState<ExperienceLevel | null>(null);
  const [weeklyHours, setWeeklyHours] = useState<WeeklyHours | null>(null);
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Apa tujuan utamamu belajar SEO?",
      body: (
        <OptionGroup
          options={Object.entries(GOAL_LABELS) as [Goal, string][]}
          value={goal}
          onChange={setGoal}
        />
      ),
      valid: !!goal,
    },
    {
      title: "Seberapa jauh pengalaman SEO kamu saat ini?",
      body: (
        <OptionGroup
          options={Object.entries(EXPERIENCE_LABELS) as [ExperienceLevel, string][]}
          value={experience}
          onChange={setExperience}
        />
      ),
      valid: !!experience,
    },
    {
      title: "Berapa waktu belajar yang bisa kamu sediakan tiap minggu?",
      body: (
        <OptionGroup
          options={Object.entries(WEEKLY_HOURS_LABELS) as [WeeklyHours, string][]}
          value={weeklyHours}
          onChange={setWeeklyHours}
        />
      ),
      valid: !!weeklyHours,
    },
  ];

  const isLast = step === steps.length - 1;
  const current = steps[step];

  function handleNext() {
    if (!current.valid) return;
    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }
    if (!goal || !experience || !weeklyHours) return;
    setProfile({ goal, experience, weeklyHours, completedAt: new Date().toISOString() });
    router.push("/quiz");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold tracking-tight text-zinc-900">SEO Fast-Track</p>
          <p className="mt-1 text-xs text-zinc-500">Langkah {step + 1} dari {steps.length}</p>
        </div>
        <Card className="p-6">
          <h1 className="mb-5 text-lg font-semibold text-zinc-900">{current.title}</h1>
          {current.body}
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              Kembali
            </Button>
            <Button onClick={handleNext} disabled={!current.valid}>
              {isLast ? "Lanjut ke Screening Quiz" : "Lanjut"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
