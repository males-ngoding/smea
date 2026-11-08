"use client";

import {
  Newspaper,
  Eye,
  FileText,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardStats } from "../types";

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Berita",
      value: stats.totalNews,
      icon: Newspaper,
      description: `${stats.newsThisMonth} bulan ini`,
      trend: stats.newsGrowth,
    },
    {
      title: "Berita Dipublikasi",
      value: stats.publishedNews,
      icon: FileText,
      description: "Artikel aktif",
      trend: null,
    },
    {
      title: "Draft",
      value: stats.draftNews,
      icon: FileText,
      description: "Menunggu dipublikasi",
      trend: null,
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString("id-ID"),
      icon: Eye,
      description: "Semua waktu",
      trend: 12.5,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {card.trend !== null && (
                <span
                  className={`flex items-center gap-0.5 ${
                    card.trend >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {card.trend >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {Math.abs(card.trend)}%
                </span>
              )}
              <span>{card.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
