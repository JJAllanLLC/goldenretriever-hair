import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

async function getPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "src", "app", "blog", "posts", `${slug}.mdx`);
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);
    return { content, metadata: data };
  } catch {
    notFound();
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "src", "app", "blog", "posts");
  const filenames = await fs.readdir(postsDirectory);
  return filenames.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.metadata.title ?? "Golden Retriever Blog Post",
    description: post.metadata.description ?? "Golden Retriever care, training, and health insights.",
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { content, metadata } = post;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 bg-white rounded-xl shadow-2xl">
      <h1 className="text-4xl font-playfair font-bold text-amber-900 mb-6 text-center">{metadata.title}</h1>
      <p className="text-center text-gray-600 mb-8">{metadata.date}</p>
      <div className="prose prose-lg max-w-none text-gray-800 prose-headings:text-amber-900 prose-strong:text-amber-900 prose-a:text-amber-700 prose-a:underline prose-p:first:italic prose-p:first:text-gray-700 prose-ul:list-none prose-li:flex prose-li:items-center prose-li:gap-2 prose-li:my-2 prose-li:before:content-['🐾'] prose-li:before:text-amber-700">
        <MDXRemote source={content} />
      </div>
      <div className="bg-amber-50 border-l-4 border-amber-700 p-6 my-8">
        <p className="text-amber-900 font-bold">Quick Tip: Shedding season never ends – but these tricks help! 🐾</p>
      </div>
      {/* BreadcrumbList schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://goldenretriever.hair" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://goldenretriever.hair/blog" },
          { "@type": "ListItem", "position": 3, "name": metadata.title },
        ]
      }) }} />
    </article>
  );
}
