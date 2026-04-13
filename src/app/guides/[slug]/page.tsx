import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/components/mdx-components";
import { GuidePageAnalytics } from "@/components/GuidePageAnalytics";
import { buildArticleSocialMetadata } from "@/lib/mdx-article-metadata";

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

  const title = guide.metadata.title ?? "Golden Retriever Guide";
  const description =
    guide.metadata.description ??
    "In-depth Golden Retriever guide with practical tips for responsible ownership, health, training, and care.";

  return buildArticleSocialMetadata({
    title,
    description,
    canonicalPath: `/guides/${slug}`,
    featuredImage: guide.metadata.featuredImage,
    featuredAlt: guide.metadata.featuredAlt,
    robots: slug === "nutrition" ? { index: false, follow: true } : undefined,
  });
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) notFound();

  const { content, metadata } = guide;
  const components = getMDXComponents({}, { ...metadata, date: undefined });

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
                name: metadata.title ?? "Guide",
                item: `https://goldenretriever.hair/guides/${slug}`,
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: metadata.title ?? "Guide",
            description:
              metadata.description ??
              "In-depth Golden Retriever guide with practical tips for responsible ownership, health, training, and care.",
            image: metadata.featuredImage
              ? (metadata.featuredImage.startsWith("/")
                  ? `https://goldenretriever.hair${metadata.featuredImage}`
                  : metadata.featuredImage)
              : undefined,
            datePublished: metadata.date ?? undefined,
            author: { "@type": "Organization", name: "GoldenRetriever.hair" },
            publisher: { "@type": "Organization", name: "GoldenRetriever.hair", url: "https://goldenretriever.hair" },
          }),
        }}
      />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <GuidePageAnalytics title={metadata.title ?? "Guide"} />
        <Link href="/guides" className="text-amber-700 font-semibold hover:underline">
          ← Back to Guides
        </Link>
        <article className="mt-8 bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-10 md:px-10">
            {metadata.featuredImage && (
              <div className="mb-8 -mx-6 md:-mx-10 overflow-hidden bg-amber-50">
                <div className="flex w-full justify-center items-center px-2 py-3 md:px-4 md:py-5">
                  <Image
                    src={metadata.featuredImage}
                    alt={metadata.featuredAlt ?? metadata.title ?? "Guide"}
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 896px"
                    className="h-auto max-h-[min(72vh,680px)] w-auto max-w-full object-contain object-center"
                  />
                </div>
              </div>
            )}
            <div className="prose prose-lg max-w-none text-gray-900 prose-headings:text-amber-900 prose-headings:font-bold prose-a:text-amber-700 prose-a:underline prose-strong:text-amber-900">
              <MDXRemote source={content} components={components} />
            </div>
            <div className="mt-12 pt-8 border-t border-amber-100 text-center">
              <p className="text-gray-600 mb-2">
                P.S. Get the free{" "}
                <strong>Golden Retriever Owner Cheat Sheet</strong> — daily feeding, sleep, and care in one printable
                guide.
              </p>
              <p className="text-gray-600 mb-2">
                <Link href="/#newsletter" className="text-amber-700 font-semibold hover:underline">
                  Get the Cheat Sheet
                </Link>{" "}
                when you join the newsletter — instant access in your welcome email.
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
