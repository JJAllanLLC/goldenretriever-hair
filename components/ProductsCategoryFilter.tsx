'use client';

import { useState } from "react";
import Link from "next/link";

type Product = {
  title: string;
  description: string;
  amazonLink: string;
  category: string;
  personalComment?: string;
  image?: string;
};

const categories = ["All", "Grooming", "Toys", "Food/Treats", "Health"] as const;

export function ProductsCategoryFilter({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  const visibleProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const subheadings: Record<(typeof categories)[number], string> = {
    All:
      "Carefully curated picks for grooming, nutrition, play, and everyday care – personal recommendations from our Goldens (Cosmo, Luna, Nala).",
    Grooming:
      "Top grooming picks for managing Golden Retriever shedding – our battle-tested tools for keeping coats shiny! 🐾",
    Toys:
      "Best toys for Golden Retriever play and exercise – durable favorites for fetch and zoomies.",
    "Food/Treats":
      "High-quality food and treats for Golden Retriever nutrition – what keeps our Goldens healthy and happy.",
    Health:
      "Vet-recommended health supplements for Goldens – support joints, immunity, and mobility.",
  };

  const toggleComment = (key: string) => {
    setExpandedComments((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <p className="text-lg text-gray-700 max-w-3xl mb-8">
        {subheadings[activeCategory]}
      </p>
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
        Top Picks
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleProducts.map((product) => {
          const comment = product.personalComment?.trim();
          const isExpandable = comment ? comment.length > 150 : false;
          const isExpanded = expandedComments[product.title] ?? false;

          return (
          <article key={product.title} className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
            {product.image ? (
              <div className="h-40 bg-amber-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="h-40 bg-amber-100 rounded-lg mb-4 flex items-center justify-center text-amber-700 font-semibold">
                Image Placeholder
              </div>
            )}
            <h3 className="text-xl font-semibold text-amber-900 mb-2">
              {product.title}
            </h3>
            <p className="text-gray-700 mb-4">{product.description}</p>
            {comment && (
              <div className="mb-4 text-gray-700">
                <p className={isExpandable && !isExpanded ? "line-clamp-3" : undefined}>
                  {comment}
                </p>
                {isExpandable && (
                  <button
                    type="button"
                    onClick={() => toggleComment(product.title)}
                    className="mt-2 text-amber-700 font-semibold hover:underline"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            )}
            <Link
              href={product.amazonLink}
              className="text-amber-700 font-semibold hover:underline"
              rel="nofollow sponsored"
            >
              View on Amazon
            </Link>
          </article>
        )})}
      </div>
    </>
  );
}
