import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle";
import { eq, sql } from "drizzle-orm";
import { articles, categories, user } from "@/db/schema";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/berita/[slug]
 * Fetch a single article by slug
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const [article] = await db
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
      .where(eq(articles.slug, slug))
      .limit(1);

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Increment view count
    await db
      .update(articles)
      .set({ views: sql`${articles.views} + 1` })
      .where(eq(articles.slug, slug));

    // Transform to match frontend types
    const transformedArticle = {
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
    };

    return NextResponse.json(transformedArticle);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * PUT /api/berita/[slug]
 * Update an article (Admin only)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const body = await request.json();

    // TODO: Add authentication check

    const { title, excerpt, content, image, categoryId, status } = body;

    const [updatedArticle] = await db
      .update(articles)
      .set({
        title,
        excerpt,
        content,
        image,
        categoryId,
        status,
        updatedAt: new Date(),
        publishedAt: status === "published" ? new Date() : null,
      })
      .where(eq(articles.slug, slug))
      .returning();

    if (!updatedArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/berita/[slug]
 * Delete an article (Admin only)
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    // TODO: Add authentication check

    const [deletedArticle] = await db
      .delete(articles)
      .where(eq(articles.slug, slug))
      .returning();

    if (!deletedArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
