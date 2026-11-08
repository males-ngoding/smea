export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: Category;
  author: Author;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  status: "published" | "draft" | "archived";
  viewCount: number;
}

export interface Author {
  id: string;
  name: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  articleCount?: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ArticleListResponse {
  articles: Article[];
  pagination: PaginationInfo;
}

export interface ArticleFilters {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}
