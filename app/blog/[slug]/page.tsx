import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import { notFound } from "next/navigation";

type PostData = {
  title?: string;
  description?: string;
  date?: string;
};

async function getPostSource(slug: string) {
  const filePath = path.join(process.cwd(), "app", "blog", "posts", `${slug}.mdx`);
  try {
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);
    return { data: data as PostData, content };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostSource(params.slug);
  if (!post) {
    return {};
  }

  return {
    title: post.data.title ?? "Golden Retriever Blog Post",
    description: post.data.description ?? "Golden Retriever care, training, and health insights.",
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostSource(params.slug);
  if (!post) {
    notFound();
  }

  const { default: PostContent } = await import(`../posts/${params.slug}.mdx`);

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
              {
                "@type": "ListItem",
                position: 3,
                name: post.data.title ?? params.slug,
                item: `https://goldenretriever.hair/blog/${params.slug}`,
              },
            ],
          }),
        }}
      />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-6">
          <Link href="/blog" className="text-amber-700 font-semibold hover:underline">
            ← Back to Blog
          </Link>
        </div>
        {post.data.date && (
          <p className="text-sm text-amber-700 mb-2">{post.data.date}</p>
        )}
        <article className="space-y-6 text-gray-800">
          <PostContent />
        </article>

        <div className="mt-12 border-t border-amber-200 pt-8">
          <h2 className="text-2xl font-playfair font-semibold text-amber-900 mb-4">
            Continue Exploring
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides" className="px-4 py-2 rounded-full bg-white text-amber-800 border border-amber-200 hover:bg-amber-50">
              Golden Retriever Guides
            </Link>
            <Link href="/breeders" className="px-4 py-2 rounded-full bg-white text-amber-800 border border-amber-200 hover:bg-amber-50">
              Breeder Directory
            </Link>
            <Link href="/products" className="px-4 py-2 rounded-full bg-white text-amber-800 border border-amber-200 hover:bg-amber-50">
              Recommended Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
