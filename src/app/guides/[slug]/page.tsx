import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/components/mdx-components";

async function getGuide(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "src", "app", "guides", "posts", `${slug}.mdx`);
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);
    return { content, metadata: data };
  } catch {
    notFound();
  }
}

export async function generateStaticParams() {
  const guidesDirectory = path.join(process.cwd(), "src", "app", "guides", "posts");
  const filenames = await fs.readdir(guidesDirectory);
  return filenames.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return { title: "Guide Not Found" };

  return {
    title: guide.metadata.title ?? "Golden Retriever Guide",
    description:
      guide.metadata.description ??
      "In-depth Golden Retriever guide with practical tips for responsible ownership, health, training, and care.",
  };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) notFound();

  const { content, metadata } = guide;
  const components = getMDXComponents({});

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
                name: "Guides",
                item: "https://goldenretriever.hair/guides",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: title,
                item: `https://goldenretriever.hair/guides/${slug}`,
              },
            ],
          }),
        }}
      />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/guides" className="text-amber-700 font-semibold hover:underline">
          ← Back to Guides
        </Link>
        <article className="mt-8 bg-white rounded-xl shadow-2xl px-6 py-10 md:px-10">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-4">
            {metadata.title}
          </h1>
          {metadata.date && <p className="text-gray-600 mb-8">{metadata.date}</p>}
          <div className="prose prose-lg max-w-none text-gray-900">
            <MDXRemote source={content} components={components} />
          </div>
        </article>
      </section>
    </main>
  );
}
