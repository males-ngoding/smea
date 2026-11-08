import { Article, Category } from "../types";

export const mockCategories: Category[] = [
  {
    id: "all",
    name: "Semua",
    slug: "semua",
    articleCount: 12,
  },
  {
    id: "1",
    name: "Pengumuman",
    slug: "pengumuman",
    description: "Pengumuman resmi sekolah",
    articleCount: 4,
  },
  {
    id: "2",
    name: "Kegiatan",
    slug: "kegiatan",
    description: "Kegiatan dan acara sekolah",
    articleCount: 3,
  },
  {
    id: "3",
    name: "Prestasi",
    slug: "prestasi",
    description: "Prestasi siswa dan sekolah",
    articleCount: 3,
  },
  {
    id: "4",
    name: "Akademik",
    slug: "akademik",
    description: "Informasi akademik",
    articleCount: 2,
  },
];

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Siswa SMK YP 17 Raih Juara 1 Olimpiade Sains Nasional",
    slug: "siswa-smk-yp-17-raih-juara-olimpiade-sains",
    excerpt:
      "Tim olimpiade sains berhasil meraih medali emas dalam kompetisi tingkat nasional bidang Fisika dan Matematika. Prestasi gemilang ini menjadi kebanggaan sekolah.",
    content: `<p>Dengan bangga kami mengumumkan bahwa tim olimpiade sains SMK YP 17 Cilegon berhasil meraih prestasi gemilang dalam Olimpiade Sains Nasional 2024.</p>
    <p>Tim yang terdiri dari 5 siswa berprestasi ini berhasil membawa pulang 2 medali emas dan 3 medali perak dalam bidang Fisika dan Matematika.</p>
    <p>Keberhasilan ini merupakan hasil dari kerja keras dan dedikasi tinggi dari para siswa serta bimbingan intensif dari guru-guru pembimbing.</p>`,
    image:
      "https://images.pexels.com/photos/8500309/pexels-photo-8500309.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: {
      id: "3",
      name: "Prestasi",
      slug: "prestasi",
    },
    author: {
      id: "1",
      name: "Admin",
    },
    publishedAt: "2024-12-20T10:00:00Z",
    createdAt: "2024-12-20T09:00:00Z",
    updatedAt: "2024-12-20T10:00:00Z",
    status: "published",
    viewCount: 1250,
  },
  {
    id: "2",
    title: "Pembukaan Laboratorium Komputer Baru dengan Fasilitas Modern",
    slug: "pembukaan-laboratorium-komputer-baru",
    excerpt:
      "Sekolah meresmikan laboratorium komputer dengan 50 unit PC terbaru untuk mendukung pembelajaran digital dan meningkatkan kualitas pendidikan.",
    content: `<p>Dalam rangka meningkatkan kualitas pembelajaran, SMK YP 17 Cilegon meresmikan laboratorium komputer baru dengan fasilitas modern.</p>
    <p>Laboratorium ini dilengkapi dengan 50 unit komputer terbaru dengan spesifikasi tinggi untuk mendukung kegiatan belajar mengajar.</p>`,
    image:
      "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: {
      id: "2",
      name: "Kegiatan",
      slug: "kegiatan",
    },
    author: {
      id: "1",
      name: "Admin",
    },
    publishedAt: "2024-12-15T08:00:00Z",
    createdAt: "2024-12-15T07:00:00Z",
    updatedAt: "2024-12-15T08:00:00Z",
    status: "published",
    viewCount: 890,
  },
  {
    id: "3",
    title: "Pentas Seni dan Budaya Memeriahkan HUT Sekolah ke-38",
    slug: "pentas-seni-budaya-hut-sekolah",
    excerpt:
      "Perayaan HUT sekolah dimeriahkan dengan berbagai penampilan seni dari siswa dan persembahan dari alumni yang memukau seluruh hadirin.",
    content: `<p>Suasana meriah menyelimuti perayaan HUT SMK YP 17 Cilegon yang ke-38 dengan berbagai penampilan seni dan budaya.</p>
    <p>Para siswa menampilkan berbagai pertunjukan mulai dari tari tradisional, musik modern, hingga drama musikal yang memukau seluruh hadirin.</p>`,
    image:
      "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: {
      id: "2",
      name: "Kegiatan",
      slug: "kegiatan",
    },
    author: {
      id: "1",
      name: "Admin",
    },
    publishedAt: "2024-12-10T09:00:00Z",
    createdAt: "2024-12-10T08:00:00Z",
    updatedAt: "2024-12-10T09:00:00Z",
    status: "published",
    viewCount: 1500,
  },
  {
    id: "4",
    title: "Pengumuman Jadwal Ujian Akhir Semester Ganjil 2024/2025",
    slug: "jadwal-ujian-akhir-semester-ganjil",
    excerpt:
      "Jadwal pelaksanaan Ujian Akhir Semester (UAS) Ganjil tahun ajaran 2024/2025 telah dirilis. Siswa diharapkan mempersiapkan diri dengan baik.",
    content: `<p>Kepada seluruh siswa/i SMK YP 17 Cilegon, berikut adalah jadwal UAS Ganjil tahun ajaran 2024/2025.</p>
    <p>Ujian akan dilaksanakan mulai tanggal 9 Desember 2024 hingga 20 Desember 2024. Siswa diharapkan hadir 30 menit sebelum ujian dimulai.</p>`,
    image:
      "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: {
      id: "1",
      name: "Pengumuman",
      slug: "pengumuman",
    },
    author: {
      id: "1",
      name: "Admin",
    },
    publishedAt: "2024-12-05T07:00:00Z",
    createdAt: "2024-12-05T06:00:00Z",
    updatedAt: "2024-12-05T07:00:00Z",
    status: "published",
    viewCount: 2100,
  },
  {
    id: "5",
    title: "Tim Basket Sekolah Juara Tournament Antar SMK Se-Banten",
    slug: "tim-basket-juara-tournament",
    excerpt:
      "Setelah pertandingan sengit, tim basket putra berhasil menjuarai kompetisi basket tingkat Provinsi Banten dengan penampilan memukau.",
    content: `<p>Tim basket SMK YP 17 Cilegon kembali mengukir prestasi gemilang dengan menjuarai Tournament Basket Antar SMK Se-Banten.</p>
    <p>Dalam pertandingan final yang berlangsung sengit, tim berhasil mengalahkan SMK Negeri 1 Serang dengan skor 78-65.</p>`,
    image:
      "https://images.pexels.com/photos/8500285/pexels-photo-8500285.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: {
      id: "3",
      name: "Prestasi",
      slug: "prestasi",
    },
    author: {
      id: "1",
      name: "Admin",
    },
    publishedAt: "2024-12-01T10:00:00Z",
    createdAt: "2024-12-01T09:00:00Z",
    updatedAt: "2024-12-01T10:00:00Z",
    status: "published",
    viewCount: 980,
  },
  {
    id: "6",
    title: "Workshop Persiapan UTBK dan Tips Masuk PTN Favorit",
    slug: "workshop-persiapan-utbk",
    excerpt:
      "Siswa kelas 12 mengikuti workshop intensif persiapan UTBK bersama alumni yang kuliah di PTN top Indonesia.",
    content: `<p>Dalam rangka mempersiapkan siswa kelas 12 menghadapi UTBK, sekolah mengadakan workshop intensif.</p>
    <p>Workshop ini menghadirkan alumni-alumni yang berhasil masuk ke PTN favorit seperti UI, ITB, dan UGM sebagai pemateri.</p>`,
    image:
      "https://images.pexels.com/photos/5212653/pexels-photo-5212653.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: {
      id: "4",
      name: "Akademik",
      slug: "akademik",
    },
    author: {
      id: "1",
      name: "Admin",
    },
    publishedAt: "2024-11-28T08:00:00Z",
    createdAt: "2024-11-28T07:00:00Z",
    updatedAt: "2024-11-28T08:00:00Z",
    status: "published",
    viewCount: 750,
  },
  {
    id: "7",
    title: "Pendaftaran Ekstrakurikuler Semester Genap Dibuka",
    slug: "pendaftaran-ekstrakurikuler-semester-genap",
    excerpt:
      "Pendaftaran kegiatan ekstrakurikuler untuk semester genap 2024/2025 telah dibuka untuk seluruh siswa.",
    content: `<p>Bagi siswa/i yang ingin mengembangkan bakat dan minat, pendaftaran ekstrakurikuler semester genap telah dibuka.</p>
    <p>Tersedia berbagai pilihan ekskul mulai dari olahraga, seni, hingga akademik. Pendaftaran dibuka hingga tanggal 15 Januari 2025.</p>`,
    image:
      "https://images.pexels.com/photos/8471835/pexels-photo-8471835.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: {
      id: "1",
      name: "Pengumuman",
      slug: "pengumuman",
    },
    author: {
      id: "1",
      name: "Admin",
    },
    publishedAt: "2024-11-25T08:00:00Z",
    createdAt: "2024-11-25T07:00:00Z",
    updatedAt: "2024-11-25T08:00:00Z",
    status: "published",
    viewCount: 650,
  },
  {
    id: "8",
    title: "Kunjungan Industri ke PT Krakatau Steel",
    slug: "kunjungan-industri-krakatau-steel",
    excerpt:
      "Siswa jurusan Teknik Mesin melakukan kunjungan industri ke PT Krakatau Steel untuk mempelajari proses produksi baja.",
    content: `<p>Sebagai bagian dari program pembelajaran, siswa jurusan Teknik Mesin melakukan kunjungan industri ke PT Krakatau Steel.</p>
    <p>Dalam kunjungan ini, siswa mempelajari langsung proses produksi baja dari bahan mentah hingga produk jadi.</p>`,
    image:
      "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: {
      id: "2",
      name: "Kegiatan",
      slug: "kegiatan",
    },
    author: {
      id: "1",
      name: "Admin",
    },
    publishedAt: "2024-11-20T10:00:00Z",
    createdAt: "2024-11-20T09:00:00Z",
    updatedAt: "2024-11-20T10:00:00Z",
    status: "published",
    viewCount: 520,
  },
  {
    id: "9",
    title: "Sosialisasi Program Magang di Perusahaan Mitra",
    slug: "sosialisasi-program-magang",
    excerpt:
      "Sekolah mengadakan sosialisasi program magang bekerja sama dengan berbagai perusahaan mitra di wilayah Cilegon dan sekitarnya.",
    content: `<p>Program magang merupakan salah satu program unggulan SMK YP 17 Cilegon untuk mempersiapkan siswa memasuki dunia kerja.</p>
    <p>Tahun ini, sekolah telah menjalin kerja sama dengan lebih dari 20 perusahaan mitra untuk penempatan magang siswa.</p>`,
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: {
      id: "4",
      name: "Akademik",
      slug: "akademik",
    },
    author: {
      id: "1",
      name: "Admin",
    },
    publishedAt: "2024-11-15T08:00:00Z",
    createdAt: "2024-11-15T07:00:00Z",
    updatedAt: "2024-11-15T08:00:00Z",
    status: "published",
    viewCount: 430,
  },
];

// Helper function untuk format tanggal
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// Helper function untuk format tanggal singkat
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
