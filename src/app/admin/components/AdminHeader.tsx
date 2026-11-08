"use client";

import * as React from "react";
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AdminHeaderProps {
  title?: string;
}

export function AdminHeader({ title = "Dashboard" }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-2">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </SidebarTrigger>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex flex-1 items-center gap-4">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Cari..." className="w-64 pl-9" />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                3
              </Badge>
              <span className="sr-only">Notifikasi</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="text-sm font-medium">
                Berita baru dipublikasikan
              </span>
              <span className="text-xs text-muted-foreground">
                &quot;Kegiatan Pramuka 2026&quot; telah dipublikasikan
              </span>
              <span className="text-xs text-muted-foreground">
                2 menit yang lalu
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="text-sm font-medium">Komentar baru</span>
              <span className="text-xs text-muted-foreground">
                Ada 5 komentar baru menunggu moderasi
              </span>
              <span className="text-xs text-muted-foreground">
                1 jam yang lalu
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="text-sm font-medium">Update sistem</span>
              <span className="text-xs text-muted-foreground">
                Sistem telah diperbarui ke versi 2.0
              </span>
              <span className="text-xs text-muted-foreground">Kemarin</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary">
              Lihat semua notifikasi
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
