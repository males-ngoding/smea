import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/drizzle";
import { articles } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

// ==================== VALIDATION SCHEMA ====================

const updateNewsSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  image: z.string().optional().nullable(),
  categoryId: z.string().uuid().optional().nullable(),
  status: z.enum(["draft", "published", "archived"]).optional(),
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

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ==================== GET: Fetch single article ====================

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const [article] = await db
      .select()
      .from(articles)
      .where(eq(articles.id, id))
      .limit(1);

    if (!article) {
      return NextResponse.json(
        { ok: false, error: "NOT_FOUND", message: "Article not found" },
        { status: 404 },
      );
    }

    // Increment view count
    await db
      .update(articles)
      .set({ views: sql`${articles.views} + 1` })
      .where(eq(articles.id, id));

    return NextResponse.json({ ok: true, data: article });
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "INTERNAL_ERROR",
        message: "Failed to fetch article",
      },
      { status: 500 },
    );
  }
}

// ==================== PUT: Update article ====================

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validation = updateNewsSchema.safeParse(body);

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

    // Check if article exists
    const [existing] = await db
      .select()
      .from(articles)
      .where(eq(articles.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "NOT_FOUND", message: "Article not found" },
        { status: 404 },
      );
    }

    const updateData = validation.data;

    // Generate new slug if title changed
    let slug = existing.slug;
    if (updateData.title && updateData.title !== existing.title) {
      slug = generateSlug(updateData.title);
      const existingSlug = await db
        .select({ id: articles.id })
        .from(articles)
        .where(eq(articles.slug, slug))
        .limit(1);

      if (existingSlug.length > 0 && existingSlug[0].id !== id) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    // Determine publishedAt
    let publishedAt = existing.publishedAt;
    if (updateData.status === "published" && !existing.publishedAt) {
      publishedAt = new Date();
    } else if (updateData.status && updateData.status !== "published") {
      publishedAt = null;
    }

    // Update article
    const [updatedArticle] = await db
      .update(articles)
      .set({
        ...updateData,
        slug,
        publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(articles.id, id))
      .returning();

    return NextResponse.json({ ok: true, data: updatedArticle });
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "INTERNAL_ERROR",
        message: "Failed to update article",
      },
      { status: 500 },
    );
  }
}

// ==================== DELETE: Delete article ====================

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check if article exists
    const [existing] = await db
      .select({ id: articles.id })
      .from(articles)
      .where(eq(articles.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "NOT_FOUND", message: "Article not found" },
        { status: 404 },
      );
    }

    // Delete article
    await db.delete(articles).where(eq(articles.id, id));

    return NextResponse.json({
      ok: true,
      message: "Article deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "INTERNAL_ERROR",
        message: "Failed to delete article",
      },
      { status: 500 },
    );
  }
}
