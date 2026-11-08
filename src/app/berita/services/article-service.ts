import {
  Article,
  Category,
  ArticleListResponse,
  ArticleFilters,
} from "../types";
import { mockArticles, mockCategories } from "../data/mock-data";

// ============ CONFIGURATION ============
// Set to true to use real API, false to use mock data
const USE_REAL_API = true;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Simulated API delay for mock data
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ============ ARTICLE SERVICES ============

/**
 * Fetch all articles with optional filters
 * Automatically switches between mock data and real API based on USE_REAL_API flag
 */
export async function getArticles(
  filters: ArticleFilters = {},
): Promise<ArticleListResponse> {
  if (USE_REAL_API) {
    return getArticlesFromAPI(filters);
  }
  return getArticlesFromMock(filters);
}

/**
 * Fetch articles from real API
 */
async function getArticlesFromAPI(
  filters: ArticleFilters = {},
): Promise<ArticleListResponse> {
  const { category, search, page = 1, limit = 9 } = filters;

  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (category && category !== "semua") {
    params.append("category", category);
  }

  if (search) {
    params.append("search", search);
  }

  const response = await fetch(`${API_BASE_URL}/berita?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}

/**
 * Fetch articles from mock data
 */
async function getArticlesFromMock(
  filters: ArticleFilters = {},
): Promise<ArticleListResponse> {
  // Simulate API delay
  await delay(500);

  const { category, search, page = 1, limit = 9 } = filters;

  let filteredArticles = [...mockArticles];

  // Filter by category
  if (category && category !== "semua") {
    filteredArticles = filteredArticles.filter(
      (article) => article.category.slug === category,
    );
  }

  // Filter by search query
  if (search) {
    const searchLower = search.toLowerCase();
    filteredArticles = filteredArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower),
    );
  }

  // Calculate pagination
  const totalItems = filteredArticles.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  return {
    articles: paginatedArticles,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

/**
 * Fetch a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (USE_REAL_API) {
    const response = await fetch(`${API_BASE_URL}/berita/${slug}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch article");
    }
    return response.json();
  }

  await delay(300);
  const article = mockArticles.find((a) => a.slug === slug);
  return article || null;
}

/**
 * Fetch related articles (same category, excluding current)
 */
export async function getRelatedArticles(
  categorySlug: string,
  currentArticleId: string,
  limit: number = 3,
): Promise<Article[]> {
  if (USE_REAL_API) {
    const response = await fetch(
      `${API_BASE_URL}/berita?category=${categorySlug}&limit=${limit + 1}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch related articles");
    }
    const data = await response.json();
    return data.articles
      .filter((a: Article) => a.id !== currentArticleId)
      .slice(0, limit);
  }

  await delay(200);
  return mockArticles
    .filter(
      (article) =>
        article.category.slug === categorySlug &&
        article.id !== currentArticleId,
    )
    .slice(0, limit);
}

/**
 * Fetch latest articles
 */
export async function getLatestArticles(limit: number = 5): Promise<Article[]> {
  if (USE_REAL_API) {
    const response = await fetch(`${API_BASE_URL}/berita?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch latest articles");
    }
    const data = await response.json();
    return data.articles;
  }

  await delay(200);
  return mockArticles
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, limit);
}

/**
 * Fetch popular articles (by view count)
 */
export async function getPopularArticles(
  limit: number = 5,
): Promise<Article[]> {
  if (USE_REAL_API) {
    const response = await fetch(
      `${API_BASE_URL}/berita?sortBy=viewCount&limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch popular articles");
    }
    const data = await response.json();
    return data.articles;
  }

  await delay(200);
  return mockArticles.sort((a, b) => b.viewCount - a.viewCount).slice(0, limit);
}

// ============ CATEGORY SERVICES ============

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  if (USE_REAL_API) {
    const response = await fetch(`${API_BASE_URL}/berita/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  }

  await delay(200);
  return mockCategories;
}

/**
 * Fetch category by slug
 */
export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  if (USE_REAL_API) {
    const categories = await getCategories();
    return categories.find((c) => c.slug === slug) || null;
  }

  await delay(100);
  return mockCategories.find((c) => c.slug === slug) || null;
}
