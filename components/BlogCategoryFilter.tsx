'use client';

import { useState } from "react";
import Link from "next/link";

type PostMeta = {
  title: string;
  description: string;
  date: string;
  slug: string;
  category: string;
};

const categories = ["All", "Health", "Grooming", "Training", "Breeder"] as const;

export function BlogCategoryFilter({ posts }: { posts: PostMeta[] }) {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");

  const visiblePosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

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
        All Posts
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visiblePosts.map((post) => (
          <article key={post.slug} className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
            <p className="text-sm text-amber-700 mb-2">{post.date}</p>
            <h3 className="text-xl font-semibold text-amber-900 mb-2">
              {post.title}
            </h3>
            <p className="text-gray-700 mb-4">
              {post.description}
            </p>
            <Link href={`/blog/${post.slug}`} className="text-amber-700 font-semibold hover:underline">
              Read post
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
