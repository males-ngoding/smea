"use server";

import { db } from "@/drizzle/index";
import { articles } from "@/db/schema";
import { count, sum, eq, gte, and, sql } from "drizzle-orm";
import type { DashboardStats } from "../types";

/**
 * Fetch dashboard statistics from database
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Get total articles count
    const totalResult = await db.select({ count: count() }).from(articles);
    const totalNews = totalResult[0]?.count ?? 0;

    // Get published articles count
    const publishedResult = await db
      .select({ count: count() })
      .from(articles)
      .where(eq(articles.status, "published"));
    const publishedNews = publishedResult[0]?.count ?? 0;

    // Get draft articles count
    const draftResult = await db
      .select({ count: count() })
      .from(articles)
      .where(eq(articles.status, "draft"));
    const draftNews = draftResult[0]?.count ?? 0;

    // Get total views
    const viewsResult = await db
      .select({ totalViews: sum(articles.views) })
      .from(articles);
    const totalViews = Number(viewsResult[0]?.totalViews ?? 0);

    // Get articles created this month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const thisMonthResult = await db
      .select({ count: count() })
      .from(articles)
      .where(gte(articles.createdAt, startOfMonth));
    const newsThisMonth = thisMonthResult[0]?.count ?? 0;

    // Calculate growth percentage (compare this month vs last month)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const lastMonthResult = await db
      .select({ count: count() })
      .from(articles)
      .where(
        and(
          gte(articles.createdAt, startOfLastMonth),
          sql`${articles.createdAt} <= ${endOfLastMonth}`,
        ),
      );
    const newsLastMonth = lastMonthResult[0]?.count ?? 0;

    // Calculate growth percentage
    let newsGrowth = 0;
    if (newsLastMonth > 0) {
      newsGrowth = ((newsThisMonth - newsLastMonth) / newsLastMonth) * 100;
      newsGrowth = Math.round(newsGrowth * 10) / 10; // Round to 1 decimal
    } else if (newsThisMonth > 0) {
      newsGrowth = 100; // If no articles last month but has this month, 100% growth
    }

    return {
      totalNews,
      publishedNews,
      draftNews,
      totalViews,
      newsThisMonth,
      newsGrowth,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    // Return default values on error
    return {
      totalNews: 0,
      publishedNews: 0,
      draftNews: 0,
      totalViews: 0,
      newsThisMonth: 0,
      newsGrowth: 0,
    };
  }
}
