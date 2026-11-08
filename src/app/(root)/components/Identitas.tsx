import { School, MapPin, Phone, Mail, Globe, User } from "lucide-react";

export default function Identitas() {
  const identitasData = [
    { icon: School, label: "Nama Sekolah", value: "SMKS YP 17 CILEGON" },
    {
      icon: MapPin,
      label: "Alamat",
      value:
        "Jl. Raden Sastradikarta No.01, Masigit, Kec. Jombang, Kota Cilegon, Banten. 42411",
    },
    { icon: Phone, label: "Telepon", value: "(025) 4391066" },
    { icon: Mail, label: "Email", value: "smkyp17cilegon@yahoo.co.id" },
    { icon: Globe, label: "Website", value: "http://smkyp17cilegon.sch.id" },
    { icon: User, label: "Kepala Sekolah", value: "Aan Suhanah" },
  ];

  const akreditasiData = [
    { title: "Status Akreditasi", value: "A (Unggul)" },
    { title: "Tahun Akreditasi", value: "2019" },
    { title: "NSS", value: "301016001001" },
    { title: "NPSN", value: "20606247" },
  ];

  return (
    <section id="identitas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <School className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">
              Identitas Sekolah
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Profil Lengkap Sekolah
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Informasi lengkap mengenai identitas dan data sekolah kami
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Data Sekolah
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {identitasData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                    <p className="text-gray-900 font-semibold break-words">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Akreditasi</h3>
              <div className="space-y-4">
                {akreditasiData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                  >
                    <p className="text-white/80 text-sm mb-1">{item.title}</p>
                    <p className="text-white font-bold text-lg">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 border border-green-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Jam Operasional
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Senin - Jumat</span>
                  <span className="font-semibold text-gray-900">
                    07:00 - 15:30
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sabtu</span>
                  <span className="font-semibold text-gray-900">
                    07:00 - 12:00
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Minggu</span>
                  <span className="font-semibold text-red-600">Tutup</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">1200+</p>
              <p className="text-blue-100">Total Siswa</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">85</p>
              <p className="text-blue-100">Tenaga Pengajar</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">36</p>
              <p className="text-blue-100">Ruang Kelas</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">15</p>
              <p className="text-blue-100">Fasilitas Utama</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
