"use client";

import { Loader2 } from "lucide-react";

export default function ArticleListSkeleton() {
  return (
    <div className="space-y-8">
      {/* Featured Skeleton */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 animate-pulse">
        <div className="grid md:grid-cols-2">
          <div className="h-64 md:h-80 bg-gray-200" />
          <div className="p-8 md:p-10 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-6 w-20 bg-gray-200 rounded-full" />
            </div>
            <div className="h-8 w-full bg-gray-200 rounded" />
            <div className="h-8 w-3/4 bg-gray-200 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>
            <div className="h-5 w-36 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-pulse"
          >
            <div className="h-48 bg-gray-200" />
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
              <div className="h-6 w-full bg-gray-200 rounded" />
              <div className="h-6 w-3/4 bg-gray-200 rounded" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
              </div>
              <div className="h-4 w-28 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
    </div>
  );
}

export function EmptyState({ message = "Tidak ada berita ditemukan" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Tidak Ada Berita
      </h3>
      <p className="text-gray-500 max-w-md">{message}</p>
    </div>
  );
}
