'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Guide = {
  title: string;
  description: string;
  slug: string;
  category: string;
  date?: string;
  featuredImage?: string;
  featuredAlt?: string;
};

const categories = ["All", "Adoption", "Puppy", "Training", "Grooming", "Nutrition", "Breeder", "Health"] as const;

export function GuidesCategoryFilter({ guides }: { guides: Guide[] }) {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");

  const visibleGuides =
    activeCategory === "All"
      ? guides
      : guides.filter((guide) => guide.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          const count = category === "All" ? guides.length : guides.filter((g) => g.category === category).length;
          if (count === 0) return null;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full border transition ${
                isActive
                  ? "bg-amber-700 text-white border-amber-700"
                  : "bg-white text-amber-800 border-amber-200 hover:bg-amber-50"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <h2 className="text-2xl font-playfair font-semibold text-amber-900 mb-6">
        Pillar Guides
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleGuides.map((guide) => (
          <article key={guide.slug} className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
            {guide.featuredImage && (
              <div className="relative h-48 bg-amber-100">
                <Image
                  src={guide.featuredImage}
                  alt={guide.featuredAlt ?? guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              {guide.slug === "best-dog-food-golden-retrievers-2026" && (
                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded mb-2">
                  Flagship Guide
                </span>
              )}
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                {guide.title}
              </h3>
              <p className="text-gray-700 mb-4 line-clamp-3">{guide.description}</p>
              <Link href={`/guides/${guide.slug}`} className="text-amber-700 font-semibold hover:underline">
                Read guide
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
