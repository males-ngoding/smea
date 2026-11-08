import { NextResponse } from "next/server";
import { db } from "@/drizzle";
import { articles, categories, user } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "4");

  const results = await db
    .select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      excerpt: articles.excerpt,
      image: articles.image,
      publishedAt: articles.publishedAt,
      createdAt: articles.createdAt,
      category: {
        name: categories.name,
        slug: categories.slug,
      },
      author: {
        name: user.name,
        image: user.image,
      },
    })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .leftJoin(user, eq(articles.authorId, user.id))
    .where(eq(articles.status, "published"))
    .orderBy(desc(articles.publishedAt))
    .limit(limit);

  const formattedData = results.map((article) => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt || "",
    image: article.image || "/placeholder-news.jpg",
    date: article.publishedAt
      ? new Date(article.publishedAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : new Date(article.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
    category: article.category?.name || "Berita Umum",
    categorySlug: article.category?.slug || "umum",
    author: article.author?.name
      ? {
          name: article.author.name,
          image: article.author.image || null,
        }
      : undefined,
  }));

  return NextResponse.json(formattedData);
}
