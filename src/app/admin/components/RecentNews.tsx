"use client";

import * as React from "react";
import Link from "next/link";
import { Eye, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { NewsArticle } from "../types";

interface RecentNewsProps {
  articles: NewsArticle[];
}

const statusVariants = {
  published: "default",
  draft: "secondary",
  archived: "outline",
} as const;

const statusLabels = {
  published: "Dipublikasi",
  draft: "Draft",
  archived: "Diarsipkan",
};

export function RecentNews({ articles }: RecentNewsProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Berita Terbaru</CardTitle>
          <CardDescription>
            Berita yang baru ditambahkan atau diperbarui
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/berita">
            Lihat Semua
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/admin/berita/${article.id}`}
                className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-accent"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={statusVariants[article.status]}
                      className="text-xs"
                    >
                      {statusLabels[article.status]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {article.publishedAt
                        ? formatDate(article.publishedAt)
                        : formatDate(article.createdAt)}
                    </span>
                  </div>
                  <h4 className="font-medium leading-tight line-clamp-1">
                    {article.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" />
                  {article.views.toLocaleString("id-ID")}
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
