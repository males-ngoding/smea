export interface NewsArticle {
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

export type NewsStatus = "draft" | "published" | "archived";

export type NewsCategory =
  | "pengumuman"
  | "kegiatan"
  | "prestasi"
  | "akademik"
  | "ekstrakurikuler";

export interface DashboardStats {
  totalNews: number;
  publishedNews: number;
  draftNews: number;
  totalViews: number;
  newsThisMonth: number;
  newsGrowth: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "editor" | "author";
}
