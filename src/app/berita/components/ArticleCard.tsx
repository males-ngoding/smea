"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Eye, ArrowRight } from "lucide-react";
import { Article } from "../types";
import { formatDate } from "../data/mock-data";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "horizontal";
}

export default function ArticleCard({
  article,
  variant = "default",
}: ArticleCardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/berita/${article.slug}`}
        className="group block bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
      >
        <div className="grid md:grid-cols-2">
          <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="flex items-center flex-wrap gap-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <span className="w-1 h-1 bg-gray-400 rounded-full" />
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                {article.category.name}
              </span>
              <span className="w-1 h-1 bg-gray-400 rounded-full" />
              <div className="flex items-center space-x-1 text-gray-500">
                <Eye className="w-4 h-4" />
                <span>{article.viewCount.toLocaleString("id-ID")}</span>
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
              {article.excerpt}
            </p>
            <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
              <span>Baca Selengkapnya</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link
        href={`/berita/${article.slug}`}
        className="group flex gap-4 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 p-4"
      >
        <div className="relative w-32 h-24 md:w-40 md:h-28 flex-shrink-0 rounded-xl overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
              {article.category.name}
            </span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm md:text-base">
            {article.title}
          </h3>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={`/berita/${article.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
          {article.category.name}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{article.viewCount.toLocaleString("id-ID")}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors">
          <span>Selengkapnya</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
