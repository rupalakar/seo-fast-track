import type { Level } from "@/lib/types/content";

export const LEVELS: Level[] = [
  {
    id: "level-0-fundamentals",
    order: 0,
    title: "Level 0 — SEO Fundamentals",
    description: "Memahami dasar cara kerja Google menemukan, membaca, dan mengurutkan halaman.",
    skillIds: ["fundamentals"],
  },
  {
    id: "level-1-keyword",
    order: 1,
    title: "Level 1 — Keyword & Search Intent",
    description: "Riset keyword dan memahami maksud pencarian pengguna.",
    skillIds: ["keyword-research", "search-intent"],
    projectTitle: "Project: Keyword Map",
  },
  {
    id: "level-2-onpage",
    order: 2,
    title: "Level 2 — On-Page SEO",
    description: "Mengoptimasi title, meta description, heading, dan konten di halaman.",
    skillIds: ["on-page-seo", "content-seo"],
    projectTitle: "Project: Optimize 3 Pages",
  },
  {
    id: "level-3-technical",
    order: 3,
    title: "Level 3-Lite — Technical SEO Basics",
    description: "Crawling, indexing, robots.txt, XML sitemap, HTTP status code, dan Search Console coverage.",
    skillIds: ["technical-seo"],
  },
  {
    id: "level-5-measurement",
    order: 4,
    title: "Level 5-Lite — Measurement Basics",
    description: "Membaca data dari Google Search Console dan GA4 untuk mengukur performa SEO.",
    skillIds: ["analytics"],
  },
  {
    id: "capstone",
    order: 5,
    title: "Capstone — SEO Audit Lengkap",
    description: "Satu audit SEO end-to-end untuk website nyata sebagai bukti kerja utama.",
    skillIds: ["seo-strategy"],
    projectTitle: "Project: Full SEO Audit",
  },
];
