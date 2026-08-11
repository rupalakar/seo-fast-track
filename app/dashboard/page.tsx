"use client";

import {
  useApplicationsStore,
  useInterviewStore,
  useNetworkingStore,
  useOnboardingStore,
  usePortfolioStore,
  useProgressStore,
  useQuizStore,
  useTasksStore,
} from "@/lib/store";
import { LEVELS } from "@/content/levels";
import { INTERVIEW_QUESTIONS } from "@/content/interview-questions";
import { getNextAction } from "@/lib/domain/nextAction";
import { PageHeader } from "@/components/layout/page-header";
import { NextActionCard } from "@/components/dashboard/next-action-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { ClipboardList, Briefcase, Send, Users, MessageSquare, Target } from "lucide-react";

export default function DashboardPage() {
  const profile = useOnboardingStore((s) => s.profile);
  const attempt = useQuizStore((s) => s.latestAttempt);
  const lessonStatus = useProgressStore((s) => s.lessonStatus);
  const taskInstances = useTasksStore((s) => s.instances);
  const portfolioItems = usePortfolioStore((s) => s.items);
  const applications = useApplicationsStore((s) => s.items);
  const networkingItems = useNetworkingStore((s) => s.items);
  const interviewLogs = useInterviewStore((s) => s.logs);

  const nextAction = getNextAction({ profile, attempt, lessonStatus, taskInstances });
  const focusLevel = attempt ? LEVELS.find((l) => l.id === attempt.placementLevelId) : null;

  const tasksAwaitingReview = Object.values(taskInstances).filter(
    (t) => t.status === "REVIEW"
  ).length;
  const activeApplications = applications.filter((a) => a.status !== "REJECTED").length;
  const networkingDone = networkingItems.filter((n) => n.done).length;
  const interviewPracticed = Object.keys(interviewLogs).length;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Dashboard"
        description="Fokus pada satu langkah berikutnya — bukan menyelesaikan semua sekaligus."
      />

      <NextActionCard action={nextAction} focusLabel={focusLevel?.title} />

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard
          icon={ClipboardList}
          label="Tugas menunggu review"
          value={String(tasksAwaitingReview)}
          href="/tasks"
        />
        <StatCard
          icon={Briefcase}
          label="Portofolio disetujui"
          value={String(portfolioItems.length)}
          href="/portfolio"
        />
        <StatCard
          icon={Send}
          label="Lamaran aktif"
          value={String(activeApplications)}
          href="/applications"
        />
        <StatCard
          icon={Users}
          label="Aktivitas networking"
          value={String(networkingDone)}
          href="/networking"
        />
        <StatCard
          icon={MessageSquare}
          label="Pertanyaan interview dilatih"
          value={`${interviewPracticed}/${INTERVIEW_QUESTIONS.length}`}
          href="/interview"
        />
        <StatCard icon={Target} label="Peta skill" value="Lihat detail" href="/skills" />
      </div>
    </div>
  );
}
