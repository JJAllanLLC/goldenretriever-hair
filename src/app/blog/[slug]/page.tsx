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
  const firstParagraph =
    content
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .find((block) => block && !block.startsWith("#") && !block.startsWith("![")) ??
    "Shedding season never ends — but a few simple habits make it way more manageable.";

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 bg-white rounded-xl shadow-2xl">
      <h1 className="text-4xl font-playfair font-bold text-amber-900 mb-6 text-center">{metadata.title}</h1>
      <p className="text-center text-gray-600 mb-12">{metadata.date}</p>
      <div className="bg-amber-50 border-l-4 border-amber-700 p-6 mb-12 rounded-r-lg">
        <p className="text-xl font-bold text-amber-900">Quick Tip: {firstParagraph} 🐾</p>
      </div>
      <div className="prose prose-lg max-w-none text-gray-800 prose-headings:text-amber-900 prose-strong:text-amber-900 prose-a:text-amber-700 prose-a:underline prose-li:my-4 prose-li:flex prose-li:items-start prose-li:gap-3 prose-li:before:content-['🐾'] prose-li:before:text-amber-700">
        <MDXRemote source={content} />
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
