"use client";

import { useState, useEffect, useCallback } from "react";
import { Newspaper } from "lucide-react";
import {
  BeritaNavbar,
  SearchBar,
  CategoryFilter,
  ArticleCard,
  Pagination,
  ArticleListSkeleton,
  EmptyState,
} from "./components";
import { Article, Category, PaginationInfo } from "./types";
import { getArticles, getCategories } from "./services/article-service";

export default function BeritaPage() {
  // State
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [activeCategory, setActiveCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch articles
  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getArticles({
        category: activeCategory,
        search: searchQuery,
        page: currentPage,
        limit: 9,
      });
      setArticles(response.articles);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory, searchQuery, currentPage]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch articles when filters change
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Handlers
  const handleCategoryChange = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    setCurrentPage(1); // Reset to first page
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get featured article (first article)
  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <BeritaNavbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Newspaper className="w-4 h-4" />
              <span className="text-sm font-medium">Berita & Informasi</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Berita Terkini
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Informasi terbaru seputar kegiatan, prestasi, dan perkembangan SMK
              YP 17 Cilegon
            </p>

            {/* Search Bar */}
            <div className="flex justify-center">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Cari berita atau artikel..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Kategori
          </h2>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Articles */}
        {isLoading ? (
          <ArticleListSkeleton />
        ) : articles.length === 0 ? (
          <EmptyState
            message={
              searchQuery
                ? `Tidak ada berita yang cocok dengan "${searchQuery}"`
                : "Tidak ada berita dalam kategori ini"
            }
          />
        ) : (
          <div className="space-y-10">
            {/* Featured Article */}
            {featuredArticle && (
              <ArticleCard article={featuredArticle} variant="featured" />
            )}

            {/* Article Grid */}
            {gridArticles.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="pt-8">
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
