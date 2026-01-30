'use client';

import { useState } from "react";
import Link from "next/link";

type Guide = {
  title: string;
  description: string;
  link: string;
  category: string;
};

const categories = ["All", "Breeder", "Health", "Training", "Grooming", "Nutrition"] as const;

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
          <article key={guide.link} className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
            <h3 className="text-xl font-semibold text-amber-900 mb-2">
              {guide.title}
            </h3>
            <p className="text-gray-700 mb-4">{guide.description}</p>
            <Link href={guide.link} className="text-amber-700 font-semibold hover:underline">
              Read guide
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
