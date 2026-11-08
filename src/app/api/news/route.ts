import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/drizzle";
import { articles } from "@/db/schema";
import { desc, eq, like, and, sql } from "drizzle-orm";

// ==================== VALIDATION SCHEMA ====================

const createNewsSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title too long"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  image: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

// ==================== HELPER FUNCTIONS ====================

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ==================== GET: Fetch all articles ====================

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const statusFilter = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    // Build where conditions array
    const whereConditions = [];

    if (category && category !== "semua") {
      whereConditions.push(eq(articles.categoryId, category));
    }

    if (statusFilter) {
      whereConditions.push(eq(articles.status, statusFilter));
    }

    if (search) {
      whereConditions.push(like(articles.title, `%${search}%`));
    }

    // Build final where clause
    const whereClause =
      whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // Get articles
    const result = await db
      .select()
      .from(articles)
      .where(whereClause)
      .orderBy(desc(articles.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(articles)
      .where(whereClause);

    const totalItems = countResult[0]?.count || 0;
    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      ok: true,
      data: result,
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
      {
        ok: false,
        error: "INTERNAL_ERROR",
        message: "Failed to fetch articles",
      },
      { status: 500 },
    );
  }
}

// ==================== POST: Create new article ====================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = createNewsSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "VALIDATION_ERROR",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { title, content, excerpt, image, categoryId, status } =
      validation.data;

    // Generate unique slug
    let slug = generateSlug(title);

    // Check if slug exists
    const existingArticle = await db
      .select({ slug: articles.slug })
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);

    if (existingArticle.length > 0) {
      slug = `${slug}-${Date.now()}`;
    }

    // Insert to database
    const [newArticle] = await db
      .insert(articles)
      .values({
        title,
        slug,
        content,
        excerpt: excerpt || title.substring(0, 150),
        image: image || null,
        categoryId: categoryId || null,
        status,
        authorId: null, // Will be set when auth is implemented
        publishedAt: status === "published" ? new Date() : null,
        views: 0,
      })
      .returning();

    return NextResponse.json(
      {
        ok: true,
        data: newArticle,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "INTERNAL_ERROR",
        message: "Failed to create article",
      },
      { status: 500 },
    );
  }
}
