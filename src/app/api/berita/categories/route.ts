import { NextResponse } from "next/server";
import { db } from "@/drizzle";
import { categories, articles } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

/**
 * GET /api/berita/categories
 * Fetch all categories with article count
 */
export async function GET() {
  try {
    // Get categories with article count
    const results = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        articleCount: sql<number>`count(case when ${articles.status} = 'published' then 1 end)::int`,
      })
      .from(categories)
      .leftJoin(articles, eq(categories.id, articles.categoryId))
      .groupBy(categories.id)
      .orderBy(categories.name);

    // Get total published articles count
    const totalArticles = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(articles)
      .where(eq(articles.status, "published"));

    // Add "Semua" category at the beginning
    const allCategories = [
      {
        id: "all",
        name: "Semua",
        slug: "semua",
        description: "Semua kategori berita",
        articleCount: totalArticles[0]?.count || 0,
      },
      ...results.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        articleCount: cat.articleCount || 0,
      })),
    ];

    return NextResponse.json(allCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
