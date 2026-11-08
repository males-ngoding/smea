"use client";

import { Newspaper, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export default function Berita() {
  const [beritaData, setBeritaData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/api/articles?limit=4");
        const data = await response.json();
        setBeritaData(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();

    // Optional: Auto refresh setiap 30 detik
    const interval = setInterval(fetchArticles, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">Memuat berita...</p>
        </div>
      </section>
    );
  }

  // Jika tidak ada berita, tampilkan pesan
  if (beritaData.length === 0) {
    return (
      <section
        id="berita"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
              <Newspaper className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 font-semibold text-sm">
                Update Terkini
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Berita & Kegiatan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Belum ada berita yang dipublikasikan
            </p>
          </div>
        </div>
      </section>
    );
  }

  const featuredArticle = beritaData[0];
  const otherArticles = beritaData.slice(1);

  return (
    <section
      id="berita"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <Newspaper className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">
              Update Terkini
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Berita & Kegiatan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Informasi terbaru seputar kegiatan, prestasi, dan perkembangan
            sekolah
          </p>
        </div>

        {/* Featured Article */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="md:col-span-2 bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-100">
            <div className="grid md:grid-cols-2">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-80 md:h-full object-cover"
                width={800}
                height={600}
              />
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="inline-flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{featuredArticle.date}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {featuredArticle.category}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredArticle.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>
                <Link
                  href={`/berita/${featuredArticle.slug}`}
                  className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Other Articles */}
        {otherArticles.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map((berita) => (
              <div
                key={berita.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <Image
                  src={berita.image}
                  alt={berita.title}
                  className="w-full h-48 object-cover"
                  width={600}
                  height={400}
                />
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{berita.date}</span>
                  </div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-3">
                    {berita.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {berita.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {berita.excerpt}
                  </p>
                  <Link
                    href={`/berita/${berita.slug}`}
                    className="inline-flex items-center space-x-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors"
                  >
                    <span>Selengkapnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/berita"
            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg inline-block"
          >
            Lihat Semua Berita
          </Link>
        </div>
      </div>
    </section>
  );
}
