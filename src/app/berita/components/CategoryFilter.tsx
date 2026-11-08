"use client";

import { Category } from "../types";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categorySlug: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === category.slug
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
          }`}
        >
          {category.name}
          {category.articleCount !== undefined && (
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeCategory === category.slug
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {category.articleCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
