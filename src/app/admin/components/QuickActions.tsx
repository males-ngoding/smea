"use client";

import * as React from "react";
import Link from "next/link";
import { PlusCircle, FileText, ImageIcon, Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quickActions = [
  {
    title: "Tambah Berita Baru",
    description: "Buat artikel berita baru",
    icon: PlusCircle,
    href: "/admin/berita/tambah",
    variant: "default" as const,
  },
  {
    title: "Kelola Kategori",
    description: "Atur kategori berita",
    icon: FileText,
    href: "/admin/berita/kategori",
    variant: "outline" as const,
  },
  {
    title: "Media Library",
    description: "Kelola gambar dan media",
    icon: ImageIcon,
    href: "/admin/media",
    variant: "outline" as const,
  },
  {
    title: "Pengaturan",
    description: "Konfigurasi situs",
    icon: Settings,
    href: "/admin/pengaturan",
    variant: "outline" as const,
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aksi Cepat</CardTitle>
        <CardDescription>
          Pintasan untuk tugas yang sering digunakan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant={action.variant}
              className="h-auto justify-start gap-3 px-4 py-3"
              asChild
            >
              <Link href={action.href}>
                <action.icon className="h-5 w-5" />
                <div className="flex flex-col items-start text-left">
                  <span className="font-medium">{action.title}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {action.description}
                  </span>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
