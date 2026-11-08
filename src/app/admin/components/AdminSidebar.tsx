"use client";

import * as React from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  PlusCircle,
  Settings,
  FileText,
  LogOut,
  ChevronDown,
  School,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { authClient } from "@/lib/auth-client";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
];

const newsMenuItems = [
  {
    title: "Semua Berita",
    url: "/admin/berita",
    icon: Newspaper,
  },
  {
    title: "Tambah Berita",
    url: "/admin/berita/tambah",
    icon: PlusCircle,
  },
  {
    title: "Kategori",
    url: "/admin/berita/kategori",
    icon: FileText,
  },
];

const settingsMenuItems = [
  {
    title: "Pengaturan",
    url: "/admin/pengaturan",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const handleSignOut = async () => {
    await authClient.signOut(redirect("/auth"));
  };

  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();

  const pathname = usePathname();
  const [newsOpen, setNewsOpen] = React.useState(true);

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <School className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">SMKS YP 17 Cilegon</span>
            <span className="text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-medium text-muted-foreground">
            Menu Utama
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="h-10"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* News Collapsible Menu */}
              <Collapsible
                open={newsOpen}
                onOpenChange={setNewsOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="h-10 w-full justify-between">
                      <div className="flex items-center gap-2">
                        <Newspaper className="h-4 w-4" />
                        <span>Berita</span>
                      </div>
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {newsMenuItems.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === item.url}
                          >
                            <Link href={item.url}>
                              <item.icon className="h-3.5 w-3.5" />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-medium text-muted-foreground">
            Pengaturan
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="h-10"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
            <AvatarFallback className="bg-primary/10 text-primary">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col">
            <span className="text-sm font-medium">
              {session?.user?.name ||
                (isPending ? "Memuat..." : "Administrator")}
            </span>
            <span className="text-xs text-muted-foreground">
              {session?.user?.email ||
                (isPending ? "Memuat..." : "admin@smkyp17.sch.id")}
            </span>
          </div>
          <button
            onClick={handleSignOut}
            className="rounded-md p-2 hover:bg-accent"
            aria-label="Keluar"
          >
            <LogOut className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
