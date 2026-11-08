"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";

interface ArticleData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  categorySlug?: string;
  author?: {
    name: string;
    image?: string | null;
  };
}

const NewsHero = () => {
  const [featured, setFeatured] = useState<ArticleData | null>(null);
  const [latest, setLatest] = useState<ArticleData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        // Fetch articles from your existing API
        const response = await fetch("/api/articles?limit=6");

        if (response.ok) {
          const articles = await response.json();

          // Debug: Log fetched articles
          console.log("Fetched articles:", articles);

          if (articles.length > 0) {
            setFeatured(articles[0]); // First article is featured
            setLatest(articles.slice(1, 6)); // Next 5 articles
          }
        } else {
          console.error(
            "Failed to fetch articles:",
            response.status,
            response.statusText,
          );
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return <NewsHeroSkeleton />;
  }

  if (!featured && latest.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="container mx-auto px-4 py-24 lg:py-32" id="home">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Berita Terkini
        </h2>
        <p className="text-gray-600">
          Informasi dan berita terbaru dari SMKS YP 17 Cilegon
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Featured Article - 2/3 width on desktop */}
        <div className="lg:col-span-2">
          {featured && <FeaturedNewsCard article={featured} />}
        </div>

        {/* Latest Articles - 1/3 width on desktop */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Berita Terbaru
            </h3>
            {latest.map((article, index) => (
              <div key={article.id}>
                <LatestNewsCard article={article} />
                {index < latest.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Featured News Card Component
const FeaturedNewsCard = ({ article }: { article: ArticleData }) => {
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Category Badge on Image */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
            {article.category || "Berita"}
          </Badge>
        </div>
      </div>

      <CardHeader className="space-y-2 pb-3">
        <Link href={`/berita/${article.slug}`} className="group">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h2>
        </Link>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-600 line-clamp-3 text-base">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          {article.author && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{article.author.name}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{article.date}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/berita/${article.slug}`} className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto group">
            Baca Selengkapnya
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

// Latest News Card Component
const LatestNewsCard = ({ article }: { article: ArticleData }) => {
  return (
    <Link href={`/berita/${article.slug}`} className="group block">
      <div className="flex gap-4">
        <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="96px"
          />
        </div>

        <div className="flex-1 min-w-0">
          <Badge variant="secondary" className="mb-2 text-xs">
            {article.category || "Berita"}
          </Badge>

          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
            {article.title}
          </h4>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Loading Skeleton Component
const NewsHeroSkeleton = () => {
  return (
    <section className="container mx-auto px-4 py-12 lg:py-16">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-6 w-96" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Featured Skeleton */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border-none shadow-lg">
            <Skeleton className="aspect-video w-full" />
            <CardHeader className="space-y-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-40" />
            </CardFooter>
          </Card>
        </div>

        {/* Latest Skeleton */}
        <div className="lg:col-span-1">
          <Skeleton className="h-7 w-32 mb-4" />
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="w-24 h-24 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Empty State Component
const EmptyState = () => {
  return (
    <section className="container mx-auto px-4 py-12 lg:py-16">
      <Card className="p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-gray-100 p-6">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">
            Belum Ada Berita
          </h3>
          <p className="text-gray-600 max-w-md">
            Saat ini belum ada berita yang tersedia. Silakan cek kembali nanti.
          </p>
        </div>
      </Card>
    </section>
  );
};

export default NewsHero;
