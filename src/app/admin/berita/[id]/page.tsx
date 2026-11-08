"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  ExternalLink,
  Calendar,
  Eye,
  User,
  Tag,
} from "lucide-react";

import { AdminHeader } from "../../components/AdminHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { mockArticles } from "../../data/mock-data";

const statusVariants = {
  published: "default",
  draft: "secondary",
  archived: "outline",
} as const;

const statusLabels = {
  published: "Dipublikasi",
  draft: "Draft",
  archived: "Diarsipkan",
};

const categoryLabels = {
  pengumuman: "Pengumuman",
  kegiatan: "Kegiatan",
  prestasi: "Prestasi",
  akademik: "Akademik",
  ekstrakurikuler: "Ekstrakurikuler",
};

export default function DetailBeritaPage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;

  const article = React.useMemo(() => {
    return mockArticles.find((a) => a.id === articleId);
  }, [articleId]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const handleDelete = () => {
    // In production, delete from database
    console.log("Deleting article:", articleId);
    router.push("/admin/berita");
  };

  if (!article) {
    return (
      <>
        <AdminHeader title="Berita Tidak Ditemukan" />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Berita tidak ditemukan
                </p>
                <Button asChild>
                  <Link href="/admin/berita">Kembali ke Daftar Berita</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Detail Berita" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Kembali</span>
              </Button>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{article.title}</h1>
                  <Badge variant={statusVariants[article.status]}>
                    {statusLabels[article.status]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  /berita/{article.slug}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {article.status === "published" && (
                <Button variant="outline" asChild>
                  <Link href={`/berita/${article.slug}`} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Lihat Halaman
                  </Link>
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href={`/admin/berita/${article.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hapus
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Berita?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini tidak dapat dibatalkan. Berita &quot;
                      {article.title}&quot; akan dihapus secara permanen.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Hapus
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Featured Image */}
              {article.featuredImage && (
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden rounded-lg">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Excerpt */}
              <Card>
                <CardHeader>
                  <CardTitle>Ringkasan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{article.excerpt}</p>
                </CardContent>
              </Card>

              {/* Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Isi Berita</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap">{article.content}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Informasi</CardTitle>
                  <CardDescription>Detail publikasi berita</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Kategori</p>
                      <p className="text-sm font-medium">
                        {categoryLabels[article.category]}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Penulis</p>
                      <p className="text-sm font-medium">{article.author}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {article.publishedAt ? "Dipublikasikan" : "Dibuat"}
                      </p>
                      <p className="text-sm font-medium">
                        {formatDate(article.publishedAt || article.createdAt)}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Total Views
                      </p>
                      <p className="text-sm font-medium">
                        {article.views.toLocaleString("id-ID")} kali dilihat
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timestamps */}
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat</CardTitle>
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
                  {article.publishedAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Dipublikasikan
                      </span>
                      <span>
                        {new Intl.DateTimeFormat("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(article.publishedAt)}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
