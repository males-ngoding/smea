"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, ArrowLeft, ImagePlus, X, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createNews, updateNews } from "../services/news-service";
import type { NewsArticle, NewsCategory, NewsStatus } from "../types";

interface NewsFormProps {
  article?: NewsArticle;
  onSubmit?: (data: Partial<NewsArticle>) => void;
  isEditing?: boolean;
}

const categories: { value: NewsCategory; label: string }[] = [
  { value: "pengumuman", label: "Pengumuman" },
  { value: "kegiatan", label: "Kegiatan" },
  { value: "prestasi", label: "Prestasi" },
  { value: "akademik", label: "Akademik" },
  { value: "ekstrakurikuler", label: "Ekstrakurikuler" },
];

const statuses: { value: NewsStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Dipublikasi" },
  { value: "archived", label: "Diarsipkan" },
];

export function NewsForm({
  article,
  onSubmit,
  isEditing = false,
}: NewsFormProps) {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    title: article?.title || "",
    slug: article?.slug || "",
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    category: article?.category || ("pengumuman" as NewsCategory),
    status: article?.status || ("draft" as NewsStatus),
    featuredImage: article?.featuredImage || "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleSubmit = async (status: NewsStatus) => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (isEditing && article) {
        // Update existing article
        const response = await updateNews(article.id, {
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          image: formData.featuredImage || null,
          status,
        });

        if (!response.ok) {
          throw new Error(response.message || "Failed to update article");
        }
      } else {
        // Create new article
        const response = await createNews({
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          image: formData.featuredImage || null,
          status,
          // authorId akan di-handle di backend (nullable untuk development)
        });

        if (!response.ok) {
          throw new Error(response.message || "Failed to create article");
        }
      }

      // Call optional onSubmit callback
      await onSubmit?.({ ...formData, status });

      router.push("/admin/berita");
    } catch (err) {
      console.error("Error saving article:", err);
      setError(err instanceof Error ? err.message : "Gagal menyimpan berita");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Kembali</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {isEditing ? "Edit Berita" : "Tambah Berita Baru"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEditing
                ? "Perbarui informasi berita"
                : "Isi form di bawah untuk membuat berita baru"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={isSubmitting}
            onClick={() => handleSubmit("draft")}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Simpan Draft
          </Button>
          <Button
            disabled={isSubmitting}
            onClick={() => handleSubmit("published")}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Eye className="mr-2 h-4 w-4" />
            )}
            Publikasikan
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Konten Berita</CardTitle>
              <CardDescription>
                Masukkan judul, ringkasan, dan isi berita
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Berita</Label>
                <Input
                  id="title"
                  placeholder="Masukkan judul berita..."
                  value={formData.title}
                  onChange={handleTitleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug URL</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    /berita/
                  </span>
                  <Input
                    id="slug"
                    placeholder="judul-berita"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Ringkasan</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Tulis ringkasan singkat berita..."
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      excerpt: e.target.value,
                    }))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Ringkasan akan ditampilkan di halaman daftar berita
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="content">Isi Berita</Label>
                <Tabs defaultValue="write">
                  <TabsList className="mb-2">
                    <TabsTrigger value="write">Tulis</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="write">
                    <Textarea
                      id="content"
                      placeholder="Tulis isi berita lengkap di sini..."
                      rows={15}
                      value={formData.content}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      className="font-mono text-sm"
                    />
                  </TabsContent>
                  <TabsContent value="preview">
                    <div className="min-h-[360px] rounded-md border p-4 prose prose-sm max-w-none">
                      {formData.content ? (
                        <div className="whitespace-pre-wrap">
                          {formData.content}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          Belum ada konten untuk ditampilkan
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Category */}
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan</CardTitle>
              <CardDescription>Kategori dan status berita</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: NewsStatus) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              status.value === "published"
                                ? "default"
                                : status.value === "draft"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {status.label}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: NewsCategory) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Gambar Utama</CardTitle>
              <CardDescription>
                Upload gambar untuk thumbnail berita
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formData.featuredImage ? (
                <div className="relative aspect-video overflow-hidden rounded-lg border">
                  <img
                    src={formData.featuredImage}
                    alt="Featured"
                    className="h-full w-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, featuredImage: "" }))
                    }
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Hapus gambar</span>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
                  <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="mb-2 text-sm font-medium">Upload Gambar</p>
                  <p className="text-xs text-muted-foreground">
                    Drag & drop atau klik untuk upload
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    className="mt-4 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // In production, upload to server and get URL
                        const url = URL.createObjectURL(file);
                        setFormData((prev) => ({
                          ...prev,
                          featuredImage: url,
                        }));
                      }
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info */}
          {isEditing && article && (
            <Card>
              <CardHeader>
                <CardTitle>Informasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dibuat</span>
                  <span>
                    {new Intl.DateTimeFormat("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(article.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Diperbarui</span>
                  <span>
                    {new Intl.DateTimeFormat("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(article.updatedAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Views</span>
                  <span>{article.views.toLocaleString("id-ID")}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
