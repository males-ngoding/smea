/**
 * News API Service
 * Helper functions untuk call API news dari dashboard
 */

const API_BASE = "/api/news";

// ==================== TYPES ====================

export interface NewsData {
  title: string;
  content: string;
  excerpt?: string;
  image?: string | null;
  categoryId?: string | null;
  status?: "draft" | "published" | "archived";
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  status: string;
  authorId: string;
  categoryId: string | null;
  views: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  ok: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// ==================== API FUNCTIONS ====================

/**
 * Create new news article
 */
export async function createNews(
  data: NewsData,
): Promise<ApiResponse<NewsArticle>> {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

/**
 * Get all news articles with pagination
 */
export async function getNews(params?: {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
}): Promise<PaginatedResponse<NewsArticle>> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.limit) searchParams.set("limit", params.limit.toString());
  if (params?.category) searchParams.set("category", params.category);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.search) searchParams.set("search", params.search);

  const response = await fetch(`${API_BASE}?${searchParams.toString()}`);
  return response.json();
}

/**
 * Get single news article by ID
 */
export async function getNewsById(
  id: string,
): Promise<ApiResponse<NewsArticle>> {
  const response = await fetch(`${API_BASE}/${id}`);
  return response.json();
}

/**
 * Update news article
 */
export async function updateNews(
  id: string,
  data: Partial<Omit<NewsData, "authorId">>,
): Promise<ApiResponse<NewsArticle>> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

/**
 * Delete news article
 */
export async function deleteNews(id: string): Promise<ApiResponse<null>> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  return response.json();
}
