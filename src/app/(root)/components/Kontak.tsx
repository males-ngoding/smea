import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Send,
} from "lucide-react";

export default function Kontak() {
  return (
    <section
      id="kontak"
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Mail className="w-4 h-4" />
            <span className="font-semibold text-sm">Hubungi Kami</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Kontak</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ada pertanyaan? Jangan ragu untuk menghubungi kami
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Alamat</p>
                    <p className="text-gray-300">
                      Jl. Raden Sastradikarta No.01
                      <br />
                      Kota Cilegon, Banten 42411
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Telepon</p>
                    <p className="text-gray-300">(025) 4391066</p>
                    <p className="text-gray-300">+62 812-3456-7890</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <p className="text-gray-300">smkyp17cilegon@yahoo.co.id</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Ikuti Kami</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 hover:bg-pink-600 rounded-xl flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white/10 hover:bg-red-600 rounded-xl flex items-center justify-center transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Kirim Pesan</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  placeholder="+62 xxx-xxxx-xxxx"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Pesan
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 resize-none"
                  placeholder="Tuliskan pesan Anda..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <span>Kirim Pesan</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <div>
                <p className="font-bold">SMKS YP 17 Cilegon</p>
                <p className="text-sm text-gray-400">Unggul dalam Prestasi</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <a href="#home" className="hover:text-white transition-colors">
                Home
              </a>
              <a href="#profil" className="hover:text-white transition-colors">
                Profil
              </a>
              <a href="#jurusan" className="hover:text-white transition-colors">
                Jurusan
              </a>
              <a
                href="#ekstrakulikuler"
                className="hover:text-white transition-colors"
              >
                Ekstrakulikuler
              </a>
              <a href="#berita" className="hover:text-white transition-colors">
                Berita
              </a>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              &copy; 2024 SMKS YP 17 Cilegon. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
