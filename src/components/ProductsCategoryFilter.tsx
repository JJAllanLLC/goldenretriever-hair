'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

type Product = {
  title: string;
  description: string;
  amazonLink: string;
  category: string;
  personalComment?: string;
  image?: string;
};

const categories = ["All", "Grooming", "Toys", "Food/Treats", "Health", "Training", "Essentials", "Books & Resources"] as const;

export function ProductsCategoryFilter({ products }: { products: Product[] }) {
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategory = useMemo<(typeof categories)[number]>(() => {
    const categoryParam = searchParams.get("category");
    if (!categoryParam) return "All";

    const normalized = categoryParam.trim().toLowerCase();
    const matchedCategory = categories.find(
      (category) => category.toLowerCase() === normalized
    );

    return matchedCategory ?? "All";
  }, [searchParams]);

  const visibleProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const categoryOrder = [
    "Food/Treats",
    "Essentials",
    "Books & Resources",
    "Training",
    "Grooming",
    "Toys",
    "Health",
  ];
  const sortedProducts =
    activeCategory === "All"
      ? [...visibleProducts].sort(
          (a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
        )
      : visibleProducts;

  const subheadings: Record<(typeof categories)[number], string> = {
    All:
      "As a proud golden retriever parent, I know firsthand how much we want the absolute best for our furry companions. Whether it’s the food they eat, the toys they play with, or the grooming tools that make bath time (a little) easier, the right products can make a world of difference. This list isn’t just random picks – these are items we personally use. 🐾",
    Grooming:
      "As we all know, Goldens are heavy shedders – they shed like crazy! However, with the right grooming tools, you can greatly reduce the shedding and keep your Golden looking their best. 🐾",
    Toys:
      "Keep your Golden mentally stimulated and physically active with durable toys – our favorites for fetch, chew, and zoomies.",
    "Food/Treats":
      "High-quality nutrition is key for Golden health – balanced food and treats that support digestion, coat shine, and energy. Our Goldens' go-to picks.",
    Health:
      "Vet-recommended supplements and treatments fairies for joints, skin, ears, and immunity – what helps our pack stay healthy and happy.",
    Training:
      "Positive reinforcement tools and treats for obedience, recall, and new tricks – what works for our eager-to-please Goldens.",
    Essentials:
      "Must-have items for home, travel, and everyday life – crates, beds, leashes, and more for safe, comfortable Goldens.",
    "Books & Resources":
      "Expert books and guides for Golden owners – timeless advice on training, health, and raising happy pups.",
  };

  const toggleComment = (key: string) => {
    setExpandedComments((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <p className="text-lg text-white drop-shadow-md max-w-4xl mx-auto mb-8 text-center">
        {subheadings[activeCategory]}
      </p>
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                if (category === "All") {
                  params.delete("category");
                } else {
                  params.set("category", category);
                }
                const query = params.toString();
                router.push(query ? `?${query}` : "?");
              }}
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
        {sortedProducts.map((product) => {
          const comment = product.personalComment?.trim();
          const isExpandable = comment ? comment.length > 150 : false;
          const isExpanded = expandedComments[product.title] ?? false;

          return (
          <article key={product.title} className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
            {product.image ? (
              <div className="relative h-40 bg-amber-100 rounded-lg mb-4 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="h-40 bg-amber-100 rounded-lg mb-4 flex items-center justify-center text-amber-700 font-semibold">
                Image Placeholder
              </div>
            )}
            <h3 className="text-xl font-semibold text-amber-900 mb-2">
              <a
                href={product.amazonLink}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                {product.title}
              </a>
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
            <a
              href={product.amazonLink}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
            >
              View on Amazon
            </a>
          </article>
        )})}
      </div>
    </>
  );
}
