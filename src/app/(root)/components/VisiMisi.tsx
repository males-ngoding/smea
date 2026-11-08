import { Target, Lightbulb, CheckCircle } from "lucide-react";

export default function VisiMisi() {
  const misiList = [
    "Menyelenggarakan pembelajaran yang inovatif dan berorientasi pada pengembangan potensi siswa",
    "Membentuk karakter siswa yang berakhlak mulia, jujur, disiplin, dan bertanggung jawab",
    "Mengembangkan budaya literasi dan riset dalam lingkungan sekolah",
    "Memfasilitasi pengembangan bakat dan minat siswa melalui program ekstrakulikuler yang variatif",
    "Membangun kerjasama dengan orang tua, masyarakat, dan stakeholder untuk mendukung pendidikan berkualitas",
    "Memanfaatkan teknologi informasi dalam proses pembelajaran dan administrasi sekolah",
  ];

  return (
    <section
      id="visi-misi"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">
              Visi & Misi
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Arah dan Tujuan Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Komitmen kami dalam menciptakan generasi unggul yang siap menghadapi
            tantangan masa depan
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Visi</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Menjadi sekolah menengah atas unggulan yang menghasilkan lulusan
              berprestasi, berakhlak mulia, berwawasan global, dan siap bersaing
              di era digital dengan tetap menjunjung tinggi nilai-nilai budaya
              bangsa.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 md:p-10 shadow-xl text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-6">Misi</h3>
            <ul className="space-y-4">
              {misiList.map((misi, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-white/90 leading-relaxed">{misi}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-4 gap-6">
          {[
            { title: "Akademik", value: "Unggul", color: "blue" },
            { title: "Karakter", value: "Mulia", color: "green" },
            { title: "Kreativitas", value: "Inovatif", color: "amber" },
            { title: "Teknologi", value: "Digital", color: "purple" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow"
            >
              <p className={`text-2xl font-bold text-${item.color}-600 mb-1`}>
                {item.value}
              </p>
              <p className="text-gray-600">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
