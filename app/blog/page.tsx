import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

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
        <p className="text-amber-700 font-semibold mb-3">Blog</p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
          Latest from the Golden Retriever Blog
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mb-10">
          Discover expert guidance on training, health, grooming, and puppy care.
          Explore the newest articles and trusted tips for owners.
        </p>

        <div className="flex flex-wrap gap-3 mb-12">
          <Link href="/guides" className="px-4 py-2 rounded-full bg-white text-amber-800 border border-amber-200 hover:bg-amber-50">
            Explore Guides
          </Link>
          <Link href="/breeders" className="px-4 py-2 rounded-full bg-white text-amber-800 border border-amber-200 hover:bg-amber-50">
            Breeder Directory
          </Link>
          <Link href="/products" className="px-4 py-2 rounded-full bg-white text-amber-800 border border-amber-200 hover:bg-amber-50">
            Recommended Products
          </Link>
          <Link href="/golden-week" className="px-4 py-2 rounded-full bg-white text-amber-800 border border-amber-200 hover:bg-amber-50">
            Golden Week App
          </Link>
        </div>

        <h2 className="text-2xl font-playfair font-semibold text-amber-900 mb-6">
          All Posts
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
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
      </section>
    </main>
  );
}
