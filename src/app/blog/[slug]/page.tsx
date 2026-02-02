import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/components/mdx-components";

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
  const components = getMDXComponents({});

  return (
    <article className="bg-white rounded-xl shadow-2xl">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-amber-900 mb-8 text-center">{metadata.title}</h1>
        <p className="text-center text-gray-600 mb-12">{metadata.date}</p>
        <div className="bg-amber-50 border-l-4 border-amber-700 p-8 mb-12 rounded-r-lg">
          <p className="text-2xl font-bold text-amber-900 mb-4">Quick Tip 🐾</p>
          <p className="text-xl text-gray-800">
            Let&apos;s be honest – if you own a Golden Retriever, you know the struggle. Fur on the couch,
            fur in your coffee, fur on your black pants the second you walk out the door. It&apos;s like
            living with a walking tumbleweed factory!
          </p>
          <p className="text-xl text-gray-800 mt-4 font-semibold">
            Be proactive, not reactive – regular grooming prevents fur explosions and keeps your home (and
            sanity) intact!
          </p>
        </div>
      <div className="prose prose-2xl max-w-none text-gray-900 prose-headings:text-amber-900 prose-headings:font-bold prose-headings:text-4xl prose-headings:my-12 prose-p:my-8 prose-p:text-lg prose-p:first:text-3xl prose-p:first:font-bold prose-p:first:text-amber-900 prose-p:first:mb-12 prose-p:first:text-center prose-li:my-6 prose-li:text-lg prose-li:flex prose-li:items-start prose-li:gap-4 prose-li:before:content-['🐾'] prose-li:before:text-amber-700 prose-li:before:mr-4 prose-li:before:text-2xl prose-a:text-amber-700 prose-a:underline prose-strong:text-amber-900 prose-emojis:text-2xl">
        <MDXRemote source={content} components={components} />
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
      </div>
    </article>
  );
}
