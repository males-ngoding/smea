import { Clock } from "lucide-react";

export default function Sejarah() {
  return (
    <section id="sejarah" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 font-semibold text-sm">
                Sejarah Kami
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Perjalanan Panjang Menuju Keunggulan
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                SMKS YP 17 Cilegon didirikan pada tahun 1985 dengan visi menjadi
                lembaga pendidikan terdepan yang menghasilkan generasi
                berkualitas dan berakhlak mulia. Berawal dari sebuah bangunan
                sederhana dengan 41 ruang kelas, kini telah berkembang menjadi
                institusi pendidikan modern dengan fasilitas lengkap.
              </p>

              <p>
                Melalui dedikasi guru-guru berpengalaman dan dukungan penuh dari
                masyarakat, sekolah kami telah meluluskan ribuan alumni yang
                tersebar di berbagai universitas terkemuka dalam dan luar
                negeri. Banyak di antaranya yang kini menjadi pemimpin di
                berbagai bidang.
              </p>

              <p>
                Prestasi demi prestasi terus diraih, baik di tingkat regional
                maupun nasional. Dari kompetisi akademik, olahraga, hingga seni
                dan budaya, siswa-siswi kami selalu menunjukkan dedikasi dan
                semangat juang yang tinggi.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <p className="text-3xl font-bold text-blue-700 mb-1">1985</p>
                <p className="text-sm text-gray-700">Tahun Berdiri</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <p className="text-3xl font-bold text-green-700 mb-1">38+</p>
                <p className="text-sm text-gray-700">Tahun Pengalaman</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.pexels.com/photos/5212653/pexels-photo-5212653.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="School Building"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
                <img
                  src="https://images.pexels.com/photos/8471831/pexels-photo-8471831.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Students Learning"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="https://images.pexels.com/photos/5212702/pexels-photo-5212702.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Classroom"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
                <img
                  src="https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Library"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
