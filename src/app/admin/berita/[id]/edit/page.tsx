"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { AdminHeader } from "../../../components/AdminHeader";
import { NewsForm } from "../../../components/NewsForm";
import { mockArticles } from "../../../data/mock-data";
import type { NewsArticle } from "../../../types";

export default function EditBeritaPage() {
  const params = useParams();
  const articleId = params.id as string;

  const article = React.useMemo(() => {
    return mockArticles.find((a) => a.id === articleId);
  }, [articleId]);

  const handleSubmit = async (data: Partial<NewsArticle>) => {
    // In production, this would update in database
    console.log("Updating article:", articleId, data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  if (!article) {
    return (
      <>
        <AdminHeader title="Berita Tidak Ditemukan" />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
              <p className="text-muted-foreground">Berita tidak ditemukan</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Edit Berita" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl">
          <NewsForm article={article} onSubmit={handleSubmit} isEditing />
        </div>
      </main>
    </>
  );
}
