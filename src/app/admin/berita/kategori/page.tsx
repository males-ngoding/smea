"use client";

import * as React from "react";
import { PlusCircle, Pencil, Trash2, MoreHorizontal } from "lucide-react";

import { AdminHeader } from "../../components/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  newsCount: number;
}

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Pengumuman",
    slug: "pengumuman",
    description: "Informasi dan pengumuman resmi dari sekolah",
    newsCount: 45,
  },
  {
    id: "2",
    name: "Kegiatan",
    slug: "kegiatan",
    description: "Berita tentang kegiatan dan acara sekolah",
    newsCount: 38,
  },
  {
    id: "3",
    name: "Prestasi",
    slug: "prestasi",
    description: "Pencapaian dan prestasi siswa serta sekolah",
    newsCount: 28,
  },
  {
    id: "4",
    name: "Akademik",
    slug: "akademik",
    description: "Informasi terkait akademik dan pembelajaran",
    newsCount: 25,
  },
  {
    id: "5",
    name: "Ekstrakurikuler",
    slug: "ekstrakurikuler",
    description: "Berita seputar kegiatan ekstrakurikuler",
    newsCount: 20,
  },
];

export default function KategoriPage() {
  const [categories, setCategories] = React.useState(initialCategories);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<Category | null>(
    null,
  );
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    name: "",
    slug: "",
    description: "",
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const handleOpenDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description,
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", slug: "", description: "" });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, ...formData } : cat,
        ),
      );
    } else {
      setCategories((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          ...formData,
          newsCount: 0,
        },
      ]);
    }
    setIsDialogOpen(false);
    setFormData({ name: "", slug: "", description: "" });
    setEditingCategory(null);
  };

  const handleDelete = () => {
    if (deleteId) {
      setCategories((prev) => prev.filter((cat) => cat.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <>
      <AdminHeader title="Kategori" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Kategori Berita
              </h2>
              <p className="text-muted-foreground">
                Kelola kategori untuk mengorganisasi berita
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Tambah Kategori
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingCategory
                      ? "Perbarui informasi kategori"
                      : "Isi form untuk membuat kategori baru"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Kategori</Label>
                    <Input
                      id="name"
                      placeholder="Masukkan nama kategori"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      placeholder="nama-kategori"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          slug: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      placeholder="Deskripsi singkat kategori"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button onClick={handleSubmit}>
                    {editingCategory ? "Simpan" : "Tambah"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Kategori</CardTitle>
              <CardDescription>
                Total {categories.length} kategori tersedia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead className="text-right">Berita</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{category.slug}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground">
                        {category.description}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {category.newsCount}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Buka menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleOpenDialog(category)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => setDeleteId(category.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Kategori?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Kategori akan dihapus secara
              permanen. Berita dengan kategori ini akan menjadi tidak
              terkategorikan.
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
    </>
  );
}
