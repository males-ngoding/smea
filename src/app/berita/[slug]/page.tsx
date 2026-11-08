"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Eye,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Clock,
  ChevronRight,
} from "lucide-react";
import { BeritaNavbar } from "../components";
import { Article } from "../types";
import {
  getArticleBySlug,
  getRelatedArticles,
  getLatestArticles,
} from "../services/article-service";
import { formatDate } from "../data/mock-data";

// Skeleton component for loading state
function ArticleDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="animate-pulse">
        {/* Hero Skeleton */}
        <div className="relative h-[50vh] bg-gray-300" />

        {/* Content Skeleton */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 -mt-32 relative z-10">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-6 w-24 bg-gray-200 rounded-full" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
            <div className="h-10 w-full bg-gray-200 rounded mb-4" />
            <div className="h-10 w-3/4 bg-gray-200 rounded mb-8" />
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 w-full bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Share buttons component
function ShareButtons({ title, url }: { title: string; url: string }) {
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank",
    );
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link berhasil disalin!");
    } catch {
      console.error("Failed to copy link");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500 mr-2">Bagikan:</span>
      <button
        onClick={shareOnFacebook}
        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </button>
      <button
        onClick={shareOnTwitter}
        className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>
      <button
        onClick={copyToClipboard}
        className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        aria-label="Copy link"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
}

// Related article card component
function RelatedArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/berita/${article.slug}`}
      className="group flex gap-4 bg-white rounded-xl p-4 hover:shadow-md transition-all border border-gray-100"
    >
      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <span className="text-xs text-blue-600 font-medium mb-1">
          {article.category.name}
        </span>
        <h4 className="font-semibold text-gray-900 line-clamp-2 text-sm group-hover:text-blue-600 transition-colors">
          {article.title}
        </h4>
        <span className="text-xs text-gray-500 mt-1">
          {formatDate(article.publishedAt)}
        </span>
      </div>
    </Link>
  );
}

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  const fetchArticle = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getArticleBySlug(slug);
      if (!data) {
        setNotFoundState(true);
        return;
      }
      setArticle(data);

      // Fetch related and latest articles
      const [related, latest] = await Promise.all([
        getRelatedArticles(data.category.slug, data.id, 3),
        getLatestArticles(5),
      ]);
      setRelatedArticles(related);
      setLatestArticles(latest.filter((a) => a.id !== data.id).slice(0, 4));
    } catch (error) {
      console.error("Error fetching article:", error);
      setNotFoundState(true);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  if (notFoundState) {
    notFound();
  }

  if (isLoading || !article) {
    return <ArticleDetailSkeleton />;
  }

  // Calculate reading time (average 200 words per minute)
  const wordCount = article.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-gray-50">
      <BeritaNavbar />

      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
          <nav className="flex items-center space-x-2 text-white/80 text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/berita" className="hover:text-white transition-colors">
              Berita
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white truncate max-w-[150px] md:max-w-none">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8 -mt-40 relative z-10">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-6 md:p-10">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {article.category.name}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <Eye className="w-4 h-4" />
                    <span>
                      {article.viewCount.toLocaleString("id-ID")} views
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime} menit baca</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {article.title}
                </h1>

                {/* Author */}
                <div className="flex items-center space-x-3 pb-6 border-b border-gray-200 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {article.author.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {article.author.name}
                    </p>
                    <p className="text-sm text-gray-500">Penulis</p>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Share & Navigation */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <Link
                      href="/berita"
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Kembali ke Daftar Berita</span>
                    </Link>
                    <ShareButtons title={article.title} url={currentUrl} />
                  </div>
                </div>
              </div>
            </article>

            {/* Related Articles - Mobile */}
            {relatedArticles.length > 0 && (
              <div className="lg:hidden mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Berita Terkait
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((item) => (
                    <RelatedArticleCard key={item.id} article={item} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-8">
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  Berita Terkait
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((item) => (
                    <RelatedArticleCard key={item.id} article={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Latest Articles */}
            {latestArticles.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  Berita Terbaru
                </h3>
                <div className="space-y-4">
                  {latestArticles.map((item) => (
                    <RelatedArticleCard key={item.id} article={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Tautan Cepat</h3>
              <div className="space-y-3">
                <Link
                  href="/"
                  className="flex items-center space-x-2 hover:bg-white/10 p-2 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>Beranda</span>
                </Link>
                <Link
                  href="/#jurusan"
                  className="flex items-center space-x-2 hover:bg-white/10 p-2 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>Jurusan</span>
                </Link>
                <Link
                  href="/#kontak"
                  className="flex items-center space-x-2 hover:bg-white/10 p-2 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>Kontak</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">YP17</span>
                </div>
                <div>
                  <h3 className="font-bold">SMK YP 17 Cilegon</h3>
                  <p className="text-sm text-gray-400">
                    Membangun Generasi Unggul
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SMK YP 17 Cilegon. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
