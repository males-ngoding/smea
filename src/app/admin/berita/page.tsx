"use client";

import * as React from "react";
import Link from "next/link";
import { PlusCircle, Search, Filter, Loader2 } from "lucide-react";

import { AdminHeader } from "../components/AdminHeader";
import { NewsTable } from "../components/NewsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { NewsStatus, NewsCategory } from "../types";

// Interface untuk artikel dari API
interface ArticleFromAPI {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  status: string;
  views: number;
  categoryId: string | null;
  authorId: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Interface untuk artikel yang ditransform (compatible dengan NewsArticle)
interface TransformedArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  status: NewsStatus;
  featuredImage?: string;
  author: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  views: number;
}

// Valid categories
const validCategories: NewsCategory[] = [
  "pengumuman",
  "kegiatan",
  "prestasi",
  "akademik",
  "ekstrakurikuler",
];

function isValidCategory(slug: string): slug is NewsCategory {
  return validCategories.includes(slug as NewsCategory);
}

// Fetch articles dari API
async function fetchArticles(params: {
  search?: string;
  status?: string;
  category?: string;
}) {
  const searchParams = new URLSearchParams();

  if (params.search) {
    searchParams.set("search", params.search);
  }
  if (params.status && params.status !== "all") {
    searchParams.set("status", params.status);
  }
  if (params.category && params.category !== "all") {
    searchParams.set("category", params.category);
  }
  searchParams.set("limit", "100"); // Fetch all untuk admin

  const response = await fetch(`/api/news?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
}

// Delete article
async function deleteArticle(id: string) {
  const response = await fetch(`/api/news/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete article");
  }
  return response.json();
}

// Fetch categories dari API
async function fetchCategories() {
  const response = await fetch("/api/berita/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}

export default function BeritaPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<NewsStatus | "all">(
    "all",
  );
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [allArticles, setAllArticles] = React.useState<TransformedArticle[]>(
    [],
  );
  const [categories, setCategories] = React.useState<
    { id: string; name: string; slug: string }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Transform article dari API ke format yang dibutuhkan
  const transformArticle = React.useCallback(
    (article: ArticleFromAPI): TransformedArticle => {
      // Find category name by ID
      const category = categories.find((c) => c.id === article.categoryId);
      const categorySlug = category?.slug || "pengumuman";

      return {
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt || "",
        content: article.content,
        category: isValidCategory(categorySlug) ? categorySlug : "pengumuman",
        status: article.status as NewsStatus,
        featuredImage: article.image || undefined,
        author: "Admin", // Default, bisa diubah jika ada data author
        publishedAt: article.publishedAt
          ? new Date(article.publishedAt)
          : undefined,
        createdAt: new Date(article.createdAt),
        updatedAt: new Date(article.updatedAt),
        views: article.views,
      };
    },
    [categories],
  );

  // Fetch categories on mount
  React.useEffect(() => {
    fetchCategories()
      .then((data) => {
        // Filter out "semua" category
        const filteredCategories = data.filter(
          (cat: { slug: string }) => cat.slug !== "semua",
        );
        setCategories(filteredCategories);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  // Fetch articles
  const loadArticles = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchArticles({});
      const transformed = result.data.map(transformArticle);
      setAllArticles(transformed);
    } catch (err) {
      setError("Gagal memuat data berita");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [transformArticle]);

  // Initial load
  React.useEffect(() => {
    if (categories.length > 0) {
      loadArticles();
    }
  }, [categories, loadArticles]);

  // Filter articles berdasarkan search, status, dan category
  const filteredArticles = React.useMemo(() => {
    return allArticles.filter((article) => {
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || article.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || article.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [allArticles, searchQuery, statusFilter, categoryFilter]);

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      await deleteArticle(id);
      setAllArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (err) {
      console.error("Error deleting article:", err);
      alert("Gagal menghapus berita");
    }
  };

  // Status counts
  const statusCounts = React.useMemo(() => {
    return {
      all: allArticles.length,
      published: allArticles.filter((a) => a.status === "published").length,
      draft: allArticles.filter((a) => a.status === "draft").length,
      archived: allArticles.filter((a) => a.status === "archived").length,
    };
  }, [allArticles]);

  return (
    <>
      <AdminHeader title="Berita" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Semua Berita
              </h2>
              <p className="text-muted-foreground">
                Kelola artikel berita sekolah
              </p>
            </div>
            <Button asChild>
              <Link href="/admin/berita/tambah">
                <PlusCircle className="mr-2 h-4 w-4" />
                Tambah Berita
              </Link>
            </Button>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <Tabs
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as NewsStatus | "all")}
            >
              <TabsList>
                <TabsTrigger value="all">
                  Semua ({statusCounts.all})
                </TabsTrigger>
                <TabsTrigger value="published">
                  Dipublikasi ({statusCounts.published})
                </TabsTrigger>
                <TabsTrigger value="draft">
                  Draft ({statusCounts.draft})
                </TabsTrigger>
                <TabsTrigger value="archived">
                  Diarsipkan ({statusCounts.archived})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari berita..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select
                value={categoryFilter}
                onValueChange={(v) => setCategoryFilter(v)}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Memuat data...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={loadArticles} variant="outline">
                Coba Lagi
              </Button>
            </div>
          ) : (
            <>
              {/* Table */}
              <NewsTable articles={filteredArticles} onDelete={handleDelete} />

              {/* Results Info */}
              <div className="text-sm text-muted-foreground">
                Menampilkan {filteredArticles.length} dari {allArticles.length}{" "}
                berita
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
