import type { NetworkingTaskTemplate } from "@/lib/types/content";

export const NETWORKING_TASKS: NetworkingTaskTemplate[] = [
  {
    id: "net-01-optimize-linkedin",
    title: "Optimalkan Profil LinkedIn untuk Role SEO",
    category: "profile",
    objective: "Membuat profil LinkedIn yang jelas menunjukkan minat dan kemampuan SEO-mu.",
    instructions: [
      "Perbarui headline dengan menyebutkan 'SEO' dan fokus yang kamu incar.",
      "Tulis ringkasan (About) yang menyebutkan skill dan project yang sedang kamu kerjakan.",
      "Tambahkan minimal satu project dari portofolio ke bagian Featured/Projects.",
    ],
  },
  {
    id: "net-02-find-5-professionals",
    title: "Temukan 5 Profesional SEO yang Relevan",
    category: "outreach",
    objective: "Membangun daftar awal orang-orang yang bisa diikuti dan dipelajari.",
    instructions: [
      "Cari 5 SEO specialist/praktisi di LinkedIn (Indonesia atau global) yang aktif membagikan insight.",
      "Ikuti/connect dengan masing-masing.",
      "Catat nama dan alasan kamu tertarik mengikuti mereka.",
    ],
  },
  {
    id: "net-03-meaningful-comments",
    title: "Tulis Komentar Bermakna di 3 Postingan SEO",
    category: "community",
    objective: "Mulai terlibat aktif di komunitas, bukan hanya menjadi pembaca pasif.",
    instructions: [
      "Temukan 3 postingan tentang SEO yang relevan dengan yang sedang kamu pelajari.",
      "Tulis komentar yang menambahkan perspektif atau pertanyaan, bukan sekadar 'setuju!' atau emoji.",
    ],
  },
  {
    id: "net-04-connect-practitioners",
    title: "Connect dengan 5 Praktisi SEO Baru",
    category: "outreach",
    objective: "Memperluas jaringan profesional secara bertahap dan personal.",
    instructions: [
      "Kirim 5 permintaan koneksi ke praktisi SEO.",
      "Sertakan pesan singkat yang personal — jelaskan kenapa kamu ingin terhubung.",
    ],
  },
  {
    id: "net-05-reach-out-juniors",
    title: "Sapa 2 SEO Specialist Junior Lainnya",
    category: "community",
    objective: "Membangun relasi dengan sesama pemula yang bisa saling mendukung proses belajar.",
    instructions: [
      "Cari 2 orang yang juga sedang belajar/memulai karier SEO.",
      "Ajak berkenalan dan bertukar insight tentang proses belajar masing-masing.",
    ],
  },
  {
    id: "net-06-informational-interview",
    title: "Minta 1 Informational Interview",
    category: "outreach",
    objective: "Mendapatkan wawasan langsung dari orang yang sudah bekerja sebagai SEO specialist.",
    instructions: [
      "Pilih satu SEO specialist yang pekerjaannya kamu kagumi.",
      "Kirim pesan sopan meminta waktu 15-20 menit untuk ngobrol seputar pekerjaannya (informational interview).",
      "Siapkan 3-5 pertanyaan sebelum sesi berlangsung.",
    ],
  },
  {
    id: "net-07-join-community",
    title: "Ikut Serta di Komunitas SEO",
    category: "community",
    objective: "Terlibat aktif di ruang diskusi tempat SEO specialist berkumpul.",
    instructions: [
      "Gabung ke minimal satu komunitas SEO (grup Facebook, Slack, Discord, atau forum lokal).",
      "Perkenalkan diri dan ceritakan sedang belajar apa saat ini.",
    ],
  },
  {
    id: "net-08-share-insight",
    title: "Bagikan 1 Insight dari Project/Belajarmu",
    category: "learning",
    objective: "Melatih diri untuk mengomunikasikan pembelajaran secara publik — skill penting untuk personal branding.",
    instructions: [
      "Pilih satu insight menarik dari lesson atau tugas yang baru kamu selesaikan.",
      "Tulis post singkat (LinkedIn atau komunitas) yang membagikan insight tersebut dengan bahasamu sendiri.",
    ],
  },
  {
    id: "net-09-attend-event",
    title: "Hadiri 1 Event/Webinar SEO",
    category: "learning",
    objective: "Belajar dari sumber lain di luar kurikulum dan memperluas koneksi secara langsung.",
    instructions: [
      "Cari webinar atau meetup SEO (online/offline) yang akan datang.",
      "Hadiri dan catat minimal 2 poin pembelajaran baru dari sesi tersebut.",
    ],
  },
];
