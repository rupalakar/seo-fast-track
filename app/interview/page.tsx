"use client";

import { INTERVIEW_QUESTIONS } from "@/content/interview-questions";
import { useInterviewStore } from "@/lib/store";
import { PageHeader } from "@/components/layout/page-header";
import { InterviewQuestionCard } from "@/components/interview/question-card";

export default function InterviewPage() {
  const logs = useInterviewStore((s) => s.logs);
  const setLog = useInterviewStore((s) => s.setLog);

  const practicedCount = Object.keys(logs).length;

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Persiapan Interview"
        description={`Latih jawabanmu agar siap mempertahankan portofolio saat interview. ${practicedCount}/${INTERVIEW_QUESTIONS.length} pertanyaan sudah dilatih.`}
      />
      <div className="space-y-2">
        {INTERVIEW_QUESTIONS.map((q) => (
          <InterviewQuestionCard
            key={q.id}
            question={q}
            log={logs[q.id]}
            onSave={(values) => setLog(q.id, values)}
          />
        ))}
      </div>
    </div>
  );
}
