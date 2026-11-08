import type { NewsArticle, DashboardStats } from "../types";

export const mockStats: DashboardStats = {
  totalNews: 156,
  publishedNews: 142,
  draftNews: 14,
  totalViews: 45320,
  newsThisMonth: 12,
  newsGrowth: 8.5,
};

export const mockArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Kegiatan Pramuka Semester Genap 2026",
    slug: "kegiatan-pramuka-semester-genap-2026",
    excerpt:
      "Kegiatan pramuka semester genap tahun 2026 akan dilaksanakan dengan berbagai rangkaian acara menarik untuk siswa-siswi.",
    content:
      "Kegiatan pramuka semester genap tahun 2026 akan dilaksanakan dengan berbagai rangkaian acara menarik untuk siswa-siswi. Program ini bertujuan untuk meningkatkan keterampilan dan kemandirian siswa.",
    category: "ekstrakurikuler",
    status: "published",
    featuredImage: "/images/pramuka.jpg",
    author: "Admin",
    publishedAt: new Date("2026-01-18"),
    createdAt: new Date("2026-01-18"),
    updatedAt: new Date("2026-01-18"),
    views: 234,
  },
  {
    id: "2",
    title: "Pengumuman Jadwal Ujian Akhir Semester",
    slug: "pengumuman-jadwal-ujian-akhir-semester",
    excerpt:
      "Jadwal ujian akhir semester genap tahun ajaran 2025/2026 telah dirilis. Siswa diharapkan mempersiapkan diri dengan baik.",
    content:
      "Jadwal ujian akhir semester genap tahun ajaran 2025/2026 telah dirilis. Siswa diharapkan mempersiapkan diri dengan baik untuk menghadapi ujian.",
    category: "pengumuman",
    status: "published",
    author: "Admin",
    publishedAt: new Date("2026-01-17"),
    createdAt: new Date("2026-01-17"),
    updatedAt: new Date("2026-01-17"),
    views: 567,
  },
  {
    id: "3",
    title: "Prestasi Siswa di Kompetisi Nasional Robotik",
    slug: "prestasi-siswa-kompetisi-nasional-robotik",
    excerpt:
      "Tim robotik SMK YP 17 berhasil meraih juara 2 dalam Kompetisi Nasional Robotik yang diselenggarakan di Jakarta.",
    content:
      "Tim robotik SMK YP 17 Cilegon berhasil meraih juara 2 dalam Kompetisi Nasional Robotik yang diselenggarakan di Jakarta pada tanggal 15 Januari 2026.",
    category: "prestasi",
    status: "published",
    featuredImage: "/images/robotik.jpg",
    author: "Admin",
    publishedAt: new Date("2026-01-16"),
    createdAt: new Date("2026-01-16"),
    updatedAt: new Date("2026-01-16"),
    views: 892,
  },
  {
    id: "4",
    title: "Workshop Kewirausahaan untuk Siswa Kelas 12",
    slug: "workshop-kewirausahaan-siswa-kelas-12",
    excerpt:
      "Workshop kewirausahaan akan diadakan untuk mempersiapkan siswa kelas 12 menghadapi dunia kerja dan bisnis.",
    content:
      "Workshop kewirausahaan akan diadakan untuk mempersiapkan siswa kelas 12 menghadapi dunia kerja dan bisnis. Acara ini menghadirkan narasumber dari berbagai perusahaan.",
    category: "kegiatan",
    status: "draft",
    author: "Admin",
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-15"),
    views: 0,
  },
  {
    id: "5",
    title: "Pembukaan Pendaftaran Siswa Baru 2026/2027",
    slug: "pembukaan-pendaftaran-siswa-baru-2026-2027",
    excerpt:
      "Pendaftaran siswa baru tahun ajaran 2026/2027 telah dibuka. Segera daftarkan putra-putri Anda.",
    content:
      "Pendaftaran siswa baru tahun ajaran 2026/2027 telah dibuka. Pendaftaran dapat dilakukan secara online melalui website resmi sekolah.",
    category: "pengumuman",
    status: "published",
    author: "Admin",
    publishedAt: new Date("2026-01-14"),
    createdAt: new Date("2026-01-14"),
    updatedAt: new Date("2026-01-14"),
    views: 1245,
  },
  {
    id: "6",
    title: "Kegiatan Bakti Sosial di Panti Asuhan",
    slug: "kegiatan-bakti-sosial-panti-asuhan",
    excerpt:
      "Siswa SMK YP 17 mengadakan kegiatan bakti sosial di Panti Asuhan Harapan Bangsa sebagai bentuk kepedulian sosial.",
    content:
      "Siswa SMK YP 17 Cilegon mengadakan kegiatan bakti sosial di Panti Asuhan Harapan Bangsa. Kegiatan ini merupakan bagian dari program pembentukan karakter siswa.",
    category: "kegiatan",
    status: "published",
    featuredImage: "/images/baksos.jpg",
    author: "Admin",
    publishedAt: new Date("2026-01-13"),
    createdAt: new Date("2026-01-13"),
    updatedAt: new Date("2026-01-13"),
    views: 423,
  },
  {
    id: "7",
    title: "Perubahan Jadwal Akademik Semester Genap",
    slug: "perubahan-jadwal-akademik-semester-genap",
    excerpt:
      "Terdapat perubahan jadwal akademik untuk semester genap. Siswa dan orang tua diharapkan memperhatikan jadwal terbaru.",
    content:
      "Terdapat perubahan jadwal akademik untuk semester genap tahun ajaran 2025/2026. Perubahan ini berlaku efektif mulai tanggal 20 Januari 2026.",
    category: "akademik",
    status: "draft",
    author: "Admin",
    createdAt: new Date("2026-01-12"),
    updatedAt: new Date("2026-01-12"),
    views: 0,
  },
];
