import type { Lesson } from "@/lib/types/content";

const GOOGLE_HOW_SEARCH_WORKS = {
  type: "article",
  label: "Google — How Search Works",
  url: "https://developers.google.com/search/docs/fundamentals/how-search-works",
} as const;
const GOOGLE_SEO_STARTER = {
  type: "article",
  label: "Google — SEO Starter Guide",
  url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
} as const;
const GOOGLE_CRAWLING_INDEXING = {
  type: "article",
  label: "Google — Crawling and Indexing",
  url: "https://developers.google.com/search/docs/crawling-indexing",
} as const;
const GOOGLE_ROBOTS = {
  type: "article",
  label: "Google — Robots.txt Introduction",
  url: "https://developers.google.com/search/docs/crawling-indexing/robots/intro",
} as const;
const GOOGLE_SITEMAPS = {
  type: "article",
  label: "Google — Build and Submit a Sitemap",
  url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap",
} as const;
const GOOGLE_SEARCH_CONSOLE_COVERAGE = {
  type: "article",
  label: "Search Console Help — Index Coverage Report",
  url: "https://support.google.com/webmasters/answer/7440203",
} as const;
const GOOGLE_TITLE_LINKS = {
  type: "article",
  label: "Google — Influence Your Title Links",
  url: "https://developers.google.com/search/docs/appearance/title-link",
} as const;
const GOOGLE_SNIPPETS = {
  type: "article",
  label: "Google — Control Your Snippets",
  url: "https://developers.google.com/search/docs/appearance/snippet",
} as const;
const GA4_INTRO = {
  type: "article",
  label: "Google Analytics Help — GA4 Introduction",
  url: "https://support.google.com/analytics/answer/10089681",
} as const;
const GSC_PERFORMANCE = {
  type: "article",
  label: "Search Console Help — Performance Report",
  url: "https://support.google.com/webmasters/answer/7042828",
} as const;
const PAGESPEED_INSIGHTS = {
  type: "article",
  label: "PageSpeed Insights — About",
  url: "https://developers.google.com/speed/docs/insights/v5/about",
} as const;

export const LESSONS: Lesson[] = [
  // ---- LEVEL 0 — SEO Fundamentals (5) ----
  {
    id: "fund-01-how-search-works",
    levelId: "level-0-fundamentals",
    skillId: "fundamentals",
    order: 1,
    title: "Bagaimana Cara Kerja Mesin Pencari",
    summary: "Tiga tahap utama: crawling, indexing, dan ranking.",
    estMinutes: 12,
    blocks: [
      {
        type: "paragraph",
        text: "Sebelum belajar teknik SEO, kamu perlu paham dasar cara kerja Google. Ada tiga tahap utama yang dilalui setiap halaman web sebelum bisa muncul di hasil pencarian.",
      },
      {
        type: "list",
        items: [
          "Crawling = proses Google menemukan dan membaca halaman website menggunakan program bernama Googlebot.",
          "Indexing = proses Google menyimpan informasi halaman yang sudah di-crawl ke dalam database besar (index).",
          "Ranking = proses Google mengurutkan halaman yang relevan berdasarkan query pencarian pengguna.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Halaman yang belum di-crawl tidak akan pernah muncul di hasil pencarian, sekalipun kontennya bagus.",
      },
      { type: "heading", text: "Kenapa ini penting" },
      {
        type: "paragraph",
        text: "Sebagian besar masalah SEO sebenarnya adalah masalah di salah satu dari tiga tahap ini. Memahami urutannya membantumu mendiagnosis masalah dengan lebih cepat di pekerjaan nanti.",
      },
    ],
    resources: [GOOGLE_HOW_SEARCH_WORKS],
    videoSearchQuery: "cara kerja google mencari halaman crawling indexing ranking",
  },
  {
    id: "fund-02-ranking-factors",
    levelId: "level-0-fundamentals",
    skillId: "fundamentals",
    order: 2,
    title: "Faktor yang Mempengaruhi Ranking",
    summary: "Relevansi, kualitas konten, dan pengalaman pengguna sebagai fondasi ranking.",
    estMinutes: 10,
    blocks: [
      {
        type: "paragraph",
        text: "Google tidak pernah mempublikasikan daftar lengkap algoritma rankingnya. Namun secara umum, Google menilai relevansi konten terhadap query, kualitas dan keahlian konten, serta pengalaman pengguna di halaman.",
      },
      {
        type: "list",
        items: [
          "Relevansi — apakah konten benar-benar menjawab apa yang dicari pengguna.",
          "Kualitas — apakah konten akurat, lengkap, dan dapat dipercaya.",
          "Pengalaman pengguna — kecepatan halaman, kemudahan navigasi, tampilan di perangkat mobile.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "Hindari mempercayai mitos SEO seperti 'keyword density 3% wajib' atau 'meta keywords mempengaruhi ranking'. Google sudah mengonfirmasi keduanya tidak berlaku.",
      },
    ],
    resources: [GOOGLE_SEO_STARTER],
    videoSearchQuery: "faktor ranking google SEO penjelasan",
  },
  {
    id: "fund-03-white-hat-black-hat",
    levelId: "level-0-fundamentals",
    skillId: "fundamentals",
    order: 3,
    title: "White Hat vs Black Hat SEO",
    summary: "Kenapa mengikuti panduan resmi Google jauh lebih aman untuk karier jangka panjang.",
    estMinutes: 8,
    blocks: [
      {
        type: "paragraph",
        text: "White hat SEO artinya mengikuti panduan resmi mesin pencari: membuat konten berkualitas untuk manusia, bukan untuk 'mengakali' algoritma. Black hat SEO adalah taktik yang melanggar panduan, misalnya keyword stuffing, cloaking, atau membeli banyak backlink secara massal.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Sebagai SEO specialist pemula, fokuslah 100% pada praktik white hat. Ini yang akan dipercaya oleh employer dan klien.",
      },
    ],
    resources: [GOOGLE_SEO_STARTER],
    videoSearchQuery: "white hat vs black hat SEO penjelasan",
  },
  {
    id: "fund-04-seo-vs-sem",
    levelId: "level-0-fundamentals",
    skillId: "fundamentals",
    order: 4,
    title: "SEO vs SEM: Apa Bedanya",
    summary: "Organic traffic vs paid traffic, dan kenapa SEO adalah investasi jangka panjang.",
    estMinutes: 8,
    blocks: [
      {
        type: "paragraph",
        text: "SEO (Search Engine Optimization) berfokus pada organic traffic — trafik gratis dari hasil pencarian alami. SEM (Search Engine Marketing) mencakup iklan berbayar seperti Google Ads.",
      },
      {
        type: "list",
        items: [
          "SEO: butuh waktu untuk terlihat hasilnya, tapi trafiknya bertahan lebih lama tanpa biaya per klik.",
          "SEM: hasil cepat terlihat, tapi trafik berhenti begitu budget iklan habis.",
        ],
      },
    ],
    resources: [GOOGLE_HOW_SEARCH_WORKS],
    videoSearchQuery: "perbedaan SEO dan SEM",
  },
  {
    id: "fund-05-seo-role-in-business",
    levelId: "level-0-fundamentals",
    skillId: "fundamentals",
    order: 5,
    title: "Peran SEO dalam Bisnis",
    summary: "Bagaimana SEO specialist memberikan dampak nyata, bukan sekadar 'naikkan ranking'.",
    estMinutes: 8,
    blocks: [
      {
        type: "paragraph",
        text: "SEO yang baik bukan cuma soal ranking nomor satu di Google. Tujuan akhirnya adalah mendatangkan pengunjung yang tepat, yang kemudian menjadi lead atau pelanggan.",
      },
      {
        type: "callout",
        tone: "info",
        text: "Saat interview nanti, kamu akan sering ditanya 'dampak apa yang kamu hasilkan', bukan hanya 'apa yang kamu kerjakan'. Mulai biasakan berpikir dengan kerangka ini sejak sekarang.",
      },
    ],
    resources: [GOOGLE_SEO_STARTER],
    videoSearchQuery: "peran SEO untuk bisnis penjelasan",
  },

  // ---- LEVEL 1 — Keyword & Search Intent (5) ----
  {
    id: "kw-01-what-is-keyword-research",
    levelId: "level-1-keyword",
    skillId: "keyword-research",
    order: 1,
    title: "Apa Itu Keyword Research",
    summary: "Menemukan kata/frasa yang benar-benar dicari target audiens.",
    estMinutes: 10,
    blocks: [
      {
        type: "paragraph",
        text: "Keyword research adalah proses menemukan kata atau frasa yang digunakan orang saat mencari sesuatu di mesin pencari, lalu memilih mana yang paling relevan dan realistis untuk ditargetkan.",
      },
      {
        type: "list",
        items: [
          "Search volume — perkiraan berapa kali keyword dicari per bulan.",
          "Keyword difficulty — perkiraan seberapa sulit bersaing untuk keyword tersebut.",
          "Relevansi — apakah keyword benar-benar sesuai dengan bisnis/produk.",
        ],
      },
    ],
    resources: [GOOGLE_SEO_STARTER],
    videoSearchQuery: "cara riset keyword SEO untuk pemula",
  },
  {
    id: "kw-02-short-tail-long-tail",
    levelId: "level-1-keyword",
    skillId: "keyword-research",
    order: 2,
    title: "Short-Tail vs Long-Tail Keyword",
    summary: "Kenapa keyword pemula sebaiknya mulai dari long-tail dulu.",
    estMinutes: 8,
    blocks: [
      {
        type: "paragraph",
        text: "Short-tail keyword itu pendek dan umum (contoh: 'sepatu lari'), volumenya besar tapi persaingannya sangat ketat. Long-tail keyword lebih panjang dan spesifik (contoh: 'sepatu lari trail untuk pemula wanita'), volumenya lebih kecil tapi persaingan lebih rendah dan intent-nya lebih jelas.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Untuk website baru atau kecil, long-tail keyword biasanya lebih realistis untuk ditargetkan lebih dulu.",
      },
    ],
    resources: [GOOGLE_SEO_STARTER],
    videoSearchQuery: "long tail keyword vs short tail keyword",
  },
  {
    id: "kw-03-search-intent-types",
    levelId: "level-1-keyword",
    skillId: "search-intent",
    order: 3,
    title: "4 Jenis Search Intent",
    summary: "Informational, navigational, commercial, dan transactional intent.",
    estMinutes: 10,
    blocks: [
      {
        type: "list",
        items: [
          "Informational — pengguna mencari informasi/jawaban (contoh: 'apa itu SEO').",
          "Navigational — pengguna mencari website/brand tertentu (contoh: 'login gmail').",
          "Commercial — pengguna membandingkan sebelum membeli (contoh: 'review sepatu lari terbaik').",
          "Transactional — pengguna siap melakukan aksi/pembelian (contoh: 'beli sepatu lari online').",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "Menargetkan keyword dengan intent yang salah adalah salah satu penyebab utama konten tidak pernah ranking, sekalipun sudah dioptimasi dengan baik.",
      },
    ],
    resources: [GOOGLE_SEO_STARTER],
    videoSearchQuery: "jenis search intent SEO penjelasan",
  },
  {
    id: "kw-04-reading-serp-for-intent",
    levelId: "level-1-keyword",
    skillId: "search-intent",
    order: 4,
    title: "Membaca SERP untuk Mengenali Intent",
    summary: "Cara tercepat memastikan intent: lihat langsung 10 hasil teratas di Google.",
    estMinutes: 8,
    blocks: [
      {
        type: "paragraph",
        text: "Cara paling praktis mengenali search intent sebuah keyword adalah dengan langsung mengetiknya di Google dan mengamati jenis hasil yang muncul di halaman pertama (SERP).",
      },
      {
        type: "list",
        items: [
          "Banyak artikel 'cara/panduan' → intent informational.",
          "Banyak halaman produk/kategori toko → intent transactional.",
          "Banyak artikel 'review/perbandingan' → intent commercial.",
        ],
      },
    ],
    resources: [GOOGLE_SEO_STARTER],
    videoSearchQuery: "cara analisis SERP google",
  },
  {
    id: "kw-05-keyword-mapping",
    levelId: "level-1-keyword",
    skillId: "keyword-research",
    order: 5,
    title: "Menyusun Keyword Map",
    summary: "Mengelompokkan keyword ke halaman yang tepat agar tidak saling bersaing.",
    estMinutes: 12,
    blocks: [
      {
        type: "paragraph",
        text: "Keyword map adalah dokumen yang memetakan setiap keyword (atau kelompok keyword) ke satu halaman spesifik di website. Tujuannya agar setiap halaman punya fokus yang jelas dan tidak terjadi keyword cannibalization (dua halaman bersaing untuk keyword yang sama).",
      },
      {
        type: "list",
        items: [
          "Kelompokkan keyword berdasarkan kemiripan intent.",
          "Tentukan satu halaman utama (atau halaman baru) untuk setiap kelompok.",
          "Catat search volume dan prioritas untuk membantu perencanaan konten.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        text: "Project praktik di level ini adalah membuat Keyword Map sungguhan — ini akan jadi salah satu bukti kerja pertamamu.",
      },
    ],
    resources: [GOOGLE_SEO_STARTER],
    videoSearchQuery: "cara membuat keyword mapping SEO",
  },

  // ---- LEVEL 2 — On-Page SEO (5) ----
  {
    id: "op-01-title-tag",
    levelId: "level-2-onpage",
    skillId: "on-page-seo",
    order: 1,
    title: "Menulis Title Tag yang Efektif",
    summary: "Title tag adalah elemen on-page paling berpengaruh terhadap klik.",
    estMinutes: 10,
    blocks: [
      {
        type: "paragraph",
        text: "Title tag adalah judul halaman yang muncul di tab browser dan sering dijadikan judul di hasil pencarian. Title yang baik jelas, mengandung keyword utama, dan mendorong orang untuk klik.",
      },
      {
        type: "list",
        items: [
          "Tempatkan keyword utama sedekat mungkin dengan awal title.",
          "Buat setiap halaman punya title yang unik.",
          "Jaga panjang title agar tidak terpotong di hasil pencarian (idealnya di bawah ~60 karakter).",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Google terkadang menulis ulang title link secara otomatis jika dianggap kurang relevan dengan query pengguna — ini normal dan bukan berarti title kamu salah.",
      },
    ],
    resources: [GOOGLE_TITLE_LINKS],
    videoSearchQuery: "cara menulis title tag SEO",
  },
  {
    id: "op-02-meta-description",
    levelId: "level-2-onpage",
    skillId: "on-page-seo",
    order: 2,
    title: "Menulis Meta Description",
    summary: "Bukan faktor ranking langsung, tapi mempengaruhi CTR.",
    estMinutes: 8,
    blocks: [
      {
        type: "paragraph",
        text: "Meta description adalah ringkasan halaman yang bisa tampil di bawah title link di hasil pencarian. Meta description tidak secara langsung mempengaruhi ranking, tapi mempengaruhi apakah orang mau klik atau tidak.",
      },
      {
        type: "list",
        items: [
          "Tulis ringkas dan menjelaskan isi halaman dengan jujur.",
          "Sertakan keyword utama secara natural.",
          "Sertakan ajakan bertindak (call-to-action) bila relevan.",
        ],
      },
    ],
    resources: [GOOGLE_SNIPPETS],
    videoSearchQuery: "cara menulis meta description SEO",
  },
  {
    id: "op-03-heading-structure",
    levelId: "level-2-onpage",
    skillId: "on-page-seo",
    order: 3,
    title: "Struktur Heading (H1–H3)",
    summary: "Heading membantu pengguna dan mesin pencari memahami struktur konten.",
    estMinutes: 8,
    blocks: [
      {
        type: "list",
        items: [
          "Gunakan satu H1 per halaman yang menjelaskan topik utama.",
          "Gunakan H2/H3 untuk memecah konten menjadi sub-topik yang mudah dipindai (scannable).",
          "Jangan gunakan heading hanya untuk styling teks besar — gunakan sesuai struktur konten.",
        ],
      },
    ],
    resources: [GOOGLE_SEO_STARTER],
    videoSearchQuery: "struktur heading H1 H2 H3 SEO",
  },
  {
    id: "op-04-internal-linking",
    levelId: "level-2-onpage",
    skillId: "on-page-seo",
    order: 4,
    title: "Dasar Internal Linking",
    summary: "Menghubungkan halaman agar Google dan pengguna lebih mudah menemukan konten penting.",
    estMinutes: 10,
    blocks: [
      {
        type: "paragraph",
        text: "Internal link adalah tautan dari satu halaman ke halaman lain di website yang sama. Internal linking yang baik membantu Googlebot menemukan halaman baru dan membantu pengguna menavigasi konten terkait.",
      },
      {
        type: "list",
        items: [
          "Gunakan anchor text yang deskriptif, hindari 'klik di sini'.",
          "Tautkan ke halaman yang relevan secara konteks.",
          "Pastikan halaman penting tidak menjadi 'orphan page' (tidak ditautkan dari halaman manapun).",
        ],
      },
    ],
    resources: [GOOGLE_SEO_STARTER],
    videoSearchQuery: "internal linking SEO penjelasan",
  },
  {
    id: "op-05-content-quality",
    levelId: "level-2-onpage",
    skillId: "content-seo",
    order: 5,
    title: "Menulis Konten yang Selaras dengan Intent",
    summary: "Kualitas konten dinilai dari seberapa baik ia menjawab kebutuhan pencari.",
    estMinutes: 10,
    blocks: [
      {
        type: "paragraph",
        text: "Konten yang bagus untuk SEO adalah konten yang menjawab pertanyaan pengguna secara lengkap dan sesuai dengan search intent-nya — bukan sekadar konten yang panjang.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Sebelum menulis atau mengedit konten, selalu cek dulu search intent keyword targetnya melalui SERP.",
      },
    ],
    resources: [GOOGLE_SEO_STARTER],
    videoSearchQuery: "cara menulis konten SEO friendly",
  },

  // ---- LEVEL 3-LITE — Technical SEO Basics (3) ----
  {
    id: "tech-01-crawling-indexing-deep-dive",
    levelId: "level-3-technical",
    skillId: "technical-seo",
    order: 1,
    title: "Crawling dan Indexing Lebih Dalam",
    summary: "Kenapa halaman bisa tidak ter-crawl atau tidak ter-index.",
    estMinutes: 12,
    blocks: [
      {
        type: "paragraph",
        text: "Halaman tidak akan muncul di hasil pencarian jika belum di-crawl dan di-index oleh Google. Beberapa penyebab umum: halaman diblokir robots.txt, halaman memiliki tag noindex, atau halaman tidak ditemukan sama sekali karena tidak ada link yang mengarah ke sana.",
      },
      {
        type: "list",
        items: [
          "Crawl budget — jumlah halaman yang bisa/mau di-crawl Googlebot dalam periode tertentu.",
          "Noindex — instruksi eksplisit agar halaman tidak dimasukkan ke index.",
          "Canonical tag — memberi tahu Google versi halaman mana yang dianggap 'utama' jika ada duplikasi.",
        ],
      },
    ],
    resources: [GOOGLE_CRAWLING_INDEXING],
    videoSearchQuery: "crawling dan indexing google penjelasan lengkap",
  },
  {
    id: "tech-02-robots-sitemap",
    levelId: "level-3-technical",
    skillId: "technical-seo",
    order: 2,
    title: "robots.txt dan XML Sitemap",
    summary: "Dua file dasar yang wajib dipahami setiap SEO specialist.",
    estMinutes: 12,
    blocks: [
      {
        type: "paragraph",
        text: "robots.txt adalah file di root domain (contoh: domain.com/robots.txt) yang memberi instruksi ke crawler halaman mana yang boleh atau tidak boleh di-crawl. XML sitemap adalah daftar halaman yang ingin kamu beri tahu ke Google agar mudah ditemukan.",
      },
      {
        type: "list",
        items: [
          "robots.txt mengatur crawling, bukan indexing — halaman yang diblokir robots.txt tetap bisa muncul di index tanpa deskripsi jika ada link ke sana.",
          "Sitemap sebaiknya hanya berisi halaman yang ingin diindex (URL kanonis, status 200).",
          "Submit sitemap melalui Google Search Console agar Google tahu keberadaannya.",
        ],
      },
    ],
    resources: [GOOGLE_ROBOTS, GOOGLE_SITEMAPS],
    videoSearchQuery: "robots txt dan sitemap xml tutorial",
  },
  {
    id: "tech-03-http-status-gsc-coverage",
    levelId: "level-3-technical",
    skillId: "technical-seo",
    order: 3,
    title: "HTTP Status Code dan Search Console Coverage",
    summary: "Mengenali kode status penting dan cara membaca laporan Coverage di GSC.",
    estMinutes: 12,
    blocks: [
      {
        type: "list",
        items: [
          "200 OK — halaman berhasil diakses secara normal.",
          "301 Redirect — halaman dipindahkan permanen ke URL lain.",
          "404 Not Found — halaman tidak ditemukan.",
          "5xx — server error, biasanya masalah di sisi hosting/server.",
        ],
      },
      {
        type: "paragraph",
        text: "Laporan Coverage (Pages) di Google Search Console menunjukkan halaman mana yang berhasil diindex, dan halaman mana yang gagal diindex beserta alasannya. Ini adalah salah satu tool paling penting untuk technical SEO audit.",
      },
    ],
    resources: [GOOGLE_SEARCH_CONSOLE_COVERAGE],
    videoSearchQuery: "http status code dan google search console coverage",
  },

  // ---- LEVEL 5-LITE — Measurement Basics (3) ----
  {
    id: "meas-01-gsc-basics",
    levelId: "level-5-measurement",
    skillId: "analytics",
    order: 1,
    title: "Dasar Google Search Console",
    summary: "Impressions, klik, CTR, dan posisi rata-rata.",
    estMinutes: 12,
    blocks: [
      {
        type: "list",
        items: [
          "Impressions — berapa kali halamanmu muncul di hasil pencarian.",
          "Clicks — berapa kali orang mengklik halamanmu dari hasil pencarian.",
          "CTR (Click-Through Rate) — persentase klik dibagi impressions.",
          "Average position — rata-rata posisi peringkat halamanmu untuk sebuah query.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "Impressions naik tapi klik turun bisa berarti banyak hal — posisi turun, title/meta kurang menarik, atau muncul di query yang kurang relevan. Ini pertanyaan interview yang cukup umum.",
      },
    ],
    resources: [GSC_PERFORMANCE],
    videoSearchQuery: "tutorial google search console untuk pemula",
  },
  {
    id: "meas-02-ga4-basics",
    levelId: "level-5-measurement",
    skillId: "analytics",
    order: 2,
    title: "Dasar Google Analytics 4 (GA4)",
    summary: "Memahami organic traffic dan metrik dasar di GA4.",
    estMinutes: 12,
    blocks: [
      {
        type: "paragraph",
        text: "GA4 membantu kamu melihat apa yang terjadi setelah pengguna mendarat di website — dari mana mereka datang (termasuk organic search), halaman apa yang mereka lihat, dan apakah mereka melakukan konversi.",
      },
      {
        type: "list",
        items: [
          "Organic traffic — pengunjung yang datang dari hasil pencarian alami (bukan iklan).",
          "Engagement rate — persentase sesi yang dianggap 'terlibat' (misalnya berlangsung cukup lama atau ada konversi).",
          "Conversion — aksi penting yang diselesaikan pengguna (contoh: submit form, pembelian).",
        ],
      },
    ],
    resources: [GA4_INTRO],
    videoSearchQuery: "tutorial google analytics 4 untuk pemula",
  },
  {
    id: "meas-03-connecting-gsc-ga4-to-decisions",
    levelId: "level-5-measurement",
    skillId: "analytics",
    order: 3,
    title: "Dari Data ke Keputusan SEO",
    summary: "Menggabungkan data GSC dan GA4, plus mengenal PageSpeed Insights.",
    estMinutes: 10,
    blocks: [
      {
        type: "paragraph",
        text: "Data GSC memberi tahu bagaimana performa halamanmu di hasil pencarian, sedangkan GA4 memberi tahu apa yang terjadi setelah pengguna klik masuk. SEO specialist yang baik menggabungkan keduanya untuk membuat rekomendasi.",
      },
      {
        type: "paragraph",
        text: "PageSpeed Insights adalah tool untuk mengecek kecepatan dan pengalaman halaman, yang juga berkaitan dengan pengalaman pengguna secara keseluruhan.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Contoh alur berpikir: impressions tinggi tapi CTR rendah di GSC → cek title/meta description → bandingkan dengan engagement rate di GA4 setelah klik masuk.",
      },
    ],
    resources: [GSC_PERFORMANCE, GA4_INTRO, PAGESPEED_INSIGHTS],
    videoSearchQuery: "cara analisis data google search console dan GA4",
  },
];
