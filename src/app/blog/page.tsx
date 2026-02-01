import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { BlogCategoryFilter } from "@/components/BlogCategoryFilter";

export const metadata = {
  title: "Golden Retriever Blog | Care Tips, Health, Training",
  description:
    "Latest Golden Retriever advice on puppy care, health, training, and grooming. Read expert tips, practical guides, and trusted owner resources every week.",
};

type PostMeta = {
  title: string;
  description: string;
  date: string;
  slug: string;
  category: string;
};

async function getPosts(): Promise<PostMeta[]> {
  const postsDir = path.join(process.cwd(), "app", "blog", "posts");
  const files = await fs.readdir(postsDir);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(postsDir, file);
      const source = await fs.readFile(filePath, "utf8");
      const { data } = matter(source);

      return {
        title: data.title ?? "Untitled Post",
        description: data.description ?? "",
        date: data.date ?? "",
        category: data.category ?? "Uncategorized",
        slug,
      };
    })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="bg-amber-50/40 text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://goldenretriever.hair/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://goldenretriever.hair/blog",
              },
            ],
          }),
        }}
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-white drop-shadow-md font-semibold mb-3">Blog</p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
          Latest from the Golden Retriever Blog
        </h1>
        <p className="text-lg text-white drop-shadow-md max-w-3xl mb-10">
          Discover expert guidance on training, health, grooming, and puppy care.
          Explore the newest articles and trusted tips for owners.
        </p>

        <BlogCategoryFilter posts={posts} />
      </section>
    </main>
  );
}
