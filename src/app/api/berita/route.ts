import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle";
import { eq, ilike, or, desc, sql, and } from "drizzle-orm";
import { articles, categories, user } from "@/db/schema";

/**
 * GET /api/berita
 * Fetch articles with optional filtering, search, and pagination
 *
 * Query Parameters:
 * - category: Filter by category slug (default: "semua")
 * - search: Search in title and excerpt
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 9)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category") || "semua";
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [eq(articles.status, "published")];

    // Filter by category
    if (category !== "semua") {
      const categoryResult = await db
        .select({ id: categories.id })
        .from(categories)
        .where(eq(categories.slug, category))
        .limit(1);

      if (categoryResult.length > 0) {
        conditions.push(eq(articles.categoryId, categoryResult[0].id));
      }
    }

    // Filter by search
    if (search) {
      conditions.push(
        or(
          ilike(articles.title, `%${search}%`),
          ilike(articles.excerpt, `%${search}%`),
        )!,
      );
    }

    // Get total count for pagination
    const countResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .where(and(...conditions));

    const totalItems = countResult[0]?.count || 0;

    // Get paginated results with category and author info
    const results = await db
      .select({
        id: articles.id,
        title: articles.title,
        slug: articles.slug,
        excerpt: articles.excerpt,
        content: articles.content,
        image: articles.image,
        status: articles.status,
        views: articles.views,
        publishedAt: articles.publishedAt,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
          description: categories.description,
        },
        author: {
          id: user.id,
          name: user.name,
          image: user.image,
        },
      })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .leftJoin(user, eq(articles.authorId, user.id))
      .where(and(...conditions))
      .orderBy(desc(articles.publishedAt))
      .limit(limit)
      .offset(offset);

    const totalPages = Math.ceil(totalItems / limit);

    // Transform results to match frontend types
    const transformedArticles = results.map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt || "",
      content: article.content,
      image: article.image || "/placeholder-news.jpg",
      status: article.status as "published" | "draft" | "archived",
      viewCount: article.views,
      publishedAt:
        article.publishedAt?.toISOString() || article.createdAt.toISOString(),
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
      category: article.category
        ? {
            id: article.category.id!,
            name: article.category.name!,
            slug: article.category.slug!,
            description: article.category.description,
          }
        : {
            id: "uncategorized",
            name: "Uncategorized",
            slug: "uncategorized",
          },
      author: article.author
        ? {
            id: article.author.id!,
            name: article.author.name!,
            image: article.author.image,
          }
        : {
            id: "unknown",
            name: "Admin",
          },
    }));

    return NextResponse.json({
      articles: transformedArticles,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/berita
 * Create a new article (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Add authentication check
    // const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { title, excerpt, content, image, categoryId, status } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Insert into database
    const [newArticle] = await db
      .insert(articles)
      .values({
        title,
        slug,
        excerpt,
        content,
        image,
        categoryId,
        status: status || "draft",
        publishedAt: status === "published" ? new Date() : null,
      })
      .returning();

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
