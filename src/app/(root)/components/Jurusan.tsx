import {
  GraduationCap,
  Microscope,
  Calculator,
  Globe,
  Car,
  Brush,
  Computer,
} from "lucide-react";

export default function Jurusan() {
  const jurusanData = [
    {
      icon: Microscope,
      name: "AK (Akuntansi dan Keuangan)",
      description:
        "Program studi yang fokus pada pengelolaan keuangan, akuntansi, dan perpajakan. Cocok untuk siswa yang tertarik di bidang bisnis, keuangan, dan administrasi.",
      subjects: ["Akuntansi", "Ekonomi", "Perpajakan", "Manajemen"],
      color: "blue",
      bgGradient: "from-blue-500 to-blue-700",
    },
    {
      icon: Globe,
      name: "APH (Akomodasi Perhotelan)",
      description:
        "Program studi yang mempersiapkan siswa untuk karir di industri perhotelan dan pariwisata. Cocok untuk siswa yang memiliki minat dalam layanan pelanggan, manajemen hotel, dan pariwisata.",
      subjects: [
        "Manajemen Hotel",
        "Layanan Pelanggan",
        "Pariwisata",
        "Administrasi Perhotelan",
      ],
      color: "amber",
      bgGradient: "from-amber-500 to-amber-700",
    },
    {
      icon: Calculator,
      name: "MP (Marketting Pemasaran)",
      description:
        "Program studi yang menekankan pada strategi pemasaran, riset pasar, dan pengembangan produk. Ideal bagi siswa yang berminat dalam dunia bisnis, penjualan, dan komunikasi pemasaran.",
      subjects: ["Pemasaran", "Riset Pasar", "Manajemen Bisnis", "Periklanan"],
      color: "green",
      bgGradient: "from-green-500 to-green-700",
    },
    {
      icon: Computer,
      name: "TKJ (Teknik Komputer dan Jaringan)",
      description:
        "Program studi yang menekankan pada pengembangan perangkat lunak, jaringan komputer, dan sistem informasi. Ideal bagi siswa yang berminat dalam dunia teknologi informasi dan komunikasi.",
      subjects: [
        "Pemrograman",
        "Jaringan Komputer",
        "Sistem Operasi",
        "Keamanan Jaringan",
      ],
      color: "purple",
      bgGradient: "from-purple-500 to-purple-700",
    },
    {
      icon: Calculator,
      name: "AP (Administrasi Perkantoran)",
      description:
        "Program studi yang menekankan pada pengembangan perangkat lunak, jaringan komputer, dan sistem informasi. Ideal bagi siswa yang berminat dalam dunia teknologi informasi dan komunikasi.",
      subjects: [
        "Pengelolaan Arsip",
        "Komunikasi Bisnis",
        "Manajemen Perkantoran",
        "Teknologi Informasi Perkantoran",
      ],
      color: "red",
      bgGradient: "from-red-500 to-red-700",
    },
    {
      icon: Car,
      name: "TKR (Teknik Kendaraan Ringan)",
      description:
        "Program studi yang menekankan pada pengembangan perangkat lunak, jaringan komputer, dan sistem informasi. Ideal bagi siswa yang berminat dalam dunia teknologi informasi dan komunikasi.",
      subjects: [
        "Teknologi Otomotif",
        "Perawatan Kendaraan",
        "Sistem Bahan Bakar",
        "Diagnostik Kendaraan",
      ],
      color: "sky",
      bgGradient: "from-sky-500 to-sky-700",
    },
    {
      icon: Brush,
      name: "TKK (Tata Kecantikan Kulit)",
      description:
        "Program studi yang menekankan pada pengembangan perangkat lunak, jaringan komputer, dan sistem informasi. Ideal bagi siswa yang berminat dalam dunia teknologi informasi dan komunikasi.",
      subjects: [
        "Perawatan Kulit",
        "Teknik Makeup",
        "Manajemen Salon",
        "Kesehatan dan Kebersihan",
      ],
      color: "cyan",
      bgGradient: "from-cyan-500 to-cyan-700",
    },
  ];

  return (
    <section
      id="jurusan"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">
              Program Studi
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Jurusan Tersedia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilih jurusan yang sesuai dengan minat dan bakat Anda untuk masa
            depan yang lebih cerah
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {jurusanData.map((jurusan, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div
                className={`bg-gradient-to-br ${jurusan.bgGradient} p-8 text-white`}
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <jurusan.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{jurusan.name}</h3>
              </div>

              <div className="p-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {jurusan.description}
                </p>

                <div className="space-y-3">
                  <p className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                    Mata Pelajaran Utama
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {jurusan.subjects.map((subject, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 bg-${jurusan.color}-50 text-${jurusan.color}-700 rounded-lg text-sm font-medium`}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Kenapa Memilih Jurusan di SMKS YP 17 Cilegon?
              </h3>
              <ul className="space-y-4">
                {[
                  "Kurikulum yang terintegrasi dengan standar nasional dan internasional",
                  "Guru-guru berpengalaman dan berkompeten di bidangnya",
                  "Fasilitas laboratorium dan perpustakaan yang lengkap",
                  "Program bimbingan karir dan konseling akademik",
                  "Kerjasama dengan industri untuk magang dan pelatihan kerja",
                  "Track record lulusan yang diterima di PTN favorit dan dunia kerja",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8500285/pexels-photo-8500285.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students in classroom"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white rounded-2xl p-6 shadow-xl max-w-xs">
                <p className="text-3xl font-bold mb-1">95%</p>
                <p className="text-blue-100">
                  Lulusan diterima di PTN favorit dan dunia kerja
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
