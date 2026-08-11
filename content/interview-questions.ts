import type { InterviewQuestion } from "@/lib/types/content";

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: "iq-01-crawling-vs-indexing",
    question: "Jelaskan perbedaan crawling dan indexing.",
    relatedSkillId: "fundamentals",
    tips: [
      "Definisikan dulu masing-masing secara singkat sebelum membandingkan.",
      "Beri contoh: halaman bisa di-crawl tapi tidak di-index (misalnya karena noindex).",
    ],
  },
  {
    id: "iq-02-impressions-up-clicks-down",
    question: "Kenapa impressions bisa naik sementara klik justru turun?",
    relatedSkillId: "analytics",
    tips: [
      "Sebutkan beberapa kemungkinan: posisi turun, title/meta kurang menarik, muncul di query yang kurang relevan.",
      "Jelaskan bagaimana kamu akan memverifikasi hipotesis tersebut dengan data GSC.",
    ],
  },
  {
    id: "iq-03-why-this-keyword",
    question: "Kenapa kamu memilih keyword ini untuk project-mu?",
    relatedSkillId: "keyword-research",
    tips: [
      "Kaitkan jawabanmu dengan portofolio nyata — sebutkan project keyword map yang pernah kamu buat.",
      "Sertakan alasan berbasis data: search volume, intent, atau relevansi bisnis.",
    ],
  },
  {
    id: "iq-04-diagnose-indexing-problem",
    question: "Bagaimana caramu mendiagnosis masalah indexing pada sebuah halaman?",
    relatedSkillId: "technical-seo",
    tips: [
      "Sebutkan urutan langkah: cek robots.txt, cek tag noindex, cek laporan Coverage di GSC, cek internal link ke halaman tersebut.",
      "Tunjukkan bahwa kamu berpikir sistematis, bukan menebak-nebak.",
    ],
  },
  {
    id: "iq-05-why-change-title",
    question: "Kenapa kamu mengubah title tag pada halaman ini?",
    relatedSkillId: "on-page-seo",
    tips: [
      "Jelaskan alasan berbasis keyword/intent, bukan sekadar 'biar lebih bagus'.",
      "Sebutkan before/after dari project Optimize 3 Pages jika relevan.",
    ],
  },
  {
    id: "iq-06-what-to-check-gsc",
    question: "Apa saja yang akan kamu cek pertama kali di Google Search Console untuk website baru?",
    relatedSkillId: "analytics",
    tips: [
      "Sebutkan: laporan Coverage/Pages, laporan Performance, dan status sitemap.",
      "Jelaskan urutan prioritasnya dan alasannya.",
    ],
  },
  {
    id: "iq-07-prioritize-seo-issues",
    question: "Bagaimana caramu memprioritaskan masalah SEO yang ditemukan saat audit?",
    relatedSkillId: "seo-strategy",
    tips: [
      "Sebutkan kerangka sederhana: dampak vs effort.",
      "Beri contoh nyata dari capstone project audit-mu.",
    ],
  },
  {
    id: "iq-08-explain-seo-to-non-technical",
    question: "Bagaimana kamu menjelaskan SEO ke orang yang tidak paham teknis (misalnya pemilik bisnis)?",
    relatedSkillId: "seo-strategy",
    tips: [
      "Hindari jargon teknis, gunakan analogi sederhana.",
      "Fokus ke dampak bisnis: lebih banyak pengunjung yang relevan, bukan hanya 'ranking naik'.",
    ],
  },
  {
    id: "iq-09-walk-through-project",
    question: "Ceritakan satu project SEO yang pernah kamu kerjakan, dari awal sampai hasilnya.",
    relatedSkillId: "seo-strategy",
    tips: [
      "Gunakan struktur: masalah → pendekatan → temuan → rekomendasi → hasil (jika ada).",
      "Pilih project dari portofolio yang paling kuat buktinya.",
    ],
  },
];
