"use client";
import { ArrowRight, Award, Users, BookOpen } from "lucide-react";
import { Link } from "react-scroll";

const Hero = () => {
  return (
    <section
      id="home"
      className="pt-20 bg-gradient-to-br from-blue-50 via-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                Sekolah Unggul Berprestasi
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Selamat Datang di{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                SMKS YP 17 CILEGON
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Membentuk generasi cerdas, berakhlak mulia, dan berprestasi untuk
              masa depan Indonesia yang lebih baik.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="kontak"
                smooth={true}
                duration={500}
                offset={-80}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center space-x-2 shadow-lg shadow-blue-200"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="profil"
                className="px-8 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold border-2 border-gray-200"
              >
                Tentang Kami
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">A</p>
                  <p className="text-sm text-gray-600">Akreditasi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">1200+</h3>
            <p className="text-gray-600">Siswa Aktif</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">85+</h3>
            <p className="text-gray-600">Guru Profesional</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">150+</h3>
            <p className="text-gray-600">Prestasi Diraih</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
