"use client";

import * as React from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ExternalLink,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import type { NewsArticle } from "../types";

interface NewsTableProps {
  articles: NewsArticle[];
  onDelete?: (id: string) => void;
}

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

export function NewsTable({ articles, onDelete }: NewsTableProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Judul</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Belum ada berita.
              </TableCell>
            </TableRow>
          ) : (
            articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Link
                      href={`/admin/berita/${article.id}`}
                      className="font-medium hover:underline line-clamp-1"
                    >
                      {article.title}
                    </Link>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {article.excerpt}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {categoryLabels[article.category]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariants[article.status]}>
                    {statusLabels[article.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {article.publishedAt
                    ? formatDate(article.publishedAt)
                    : formatDate(article.createdAt)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {article.views.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Buka menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/berita/${article.slug}`} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Lihat
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/berita/${article.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Detail
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/berita/${article.id}/edit`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Berita?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tindakan ini tidak dapat dibatalkan. Berita &quot;
                              {article.title}&quot; akan dihapus secara
                              permanen.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete?.(article.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
