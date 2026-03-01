import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
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

  const title = guide.metadata.title ?? "Golden Retriever Guide";
  const description =
    guide.metadata.description ??
    "In-depth Golden Retriever guide with practical tips for responsible ownership, health, training, and care.";
  const featuredImage = guide.metadata.featuredImage;

  return {
    title,
    description,
    robots: slug === "nutrition" ? { index: false, follow: true } : undefined,
    openGraph: featuredImage
      ? {
          title,
          description,
          images: [
            {
              url: featuredImage.startsWith("/") ? `https://goldenretriever.hair${featuredImage}` : featuredImage,
              width: 800,
              height: 600,
              alt: guide.metadata.featuredAlt ?? title,
            },
          ],
        }
      : undefined,
  };
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
        <Link href="/guides" className="text-amber-700 font-semibold hover:underline">
          ← Back to Guides
        </Link>
        <article className="mt-8 bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-10 md:px-10">
            {metadata.featuredImage && (
              <div className="mb-8 -mx-6 md:-mx-10">
                <div className="relative w-full aspect-video md:aspect-[21/9]">
                  <Image
                    src={metadata.featuredImage}
                    alt={metadata.featuredAlt ?? metadata.title ?? "Guide"}
                    fill
                    sizes="(max-width: 768px) 100vw, 896px"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            <div className="prose prose-lg max-w-none text-gray-900 prose-headings:text-amber-900 prose-headings:font-bold prose-a:text-amber-700 prose-a:underline prose-strong:text-amber-900">
              <MDXRemote source={content} components={components} />
            </div>
            <div className="mt-12 pt-8 border-t border-amber-100 text-center">
              <p className="text-gray-600 mb-2">
                P.S. If you&apos;re obsessed with capturing those daily Golden moments, keep an eye out for our upcoming Golden of the Month contest — a community celebration where you can upload your favorite photos, vote for the best, and see winners showcased on the site!
              </p>
              <p className="text-gray-600 mb-2">
                Coming soon —{" "}
                <Link href="/golden-week" className="text-amber-700 font-semibold hover:underline">
                  join the newsletter
                </Link>{" "}
                for exclusive updates and launch announcements!
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
