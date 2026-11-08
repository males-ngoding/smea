"use client";

import * as React from "react";
import { AdminHeader } from "../../components/AdminHeader";
import { NewsForm } from "../../components/NewsForm";
import type { NewsArticle } from "../../types";

export default function TambahBeritaPage() {
  const handleSubmit = async (data: Partial<NewsArticle>) => {
    // In production, this would save to database
    console.log("Saving article:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <>
      <AdminHeader title="Tambah Berita" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl">
          <NewsForm onSubmit={handleSubmit} />
        </div>
      </main>
    </>
  );
}
