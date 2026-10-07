import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import { notFound, permanentRedirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/components/mdx-components";
import { GuidePageAnalytics } from "@/components/GuidePageAnalytics";
import { FEEDING_CHART_FAQS } from "@/lib/feeding-chart-faqs";
import { buildArticleSocialMetadata } from "@/lib/mdx-article-metadata";

const NUTRITION_CANONICAL = "/guides/best-dog-food-golden-retrievers-2026";

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
    seoTitle: guide.metadata.seoTitle,
    description,
    canonicalPath: slug === "nutrition" ? NUTRITION_CANONICAL : `/guides/${slug}`,
    featuredImage: guide.metadata.featuredImage,
    featuredAlt: guide.metadata.featuredAlt,
    robots: slug === "nutrition" ? { index: false, follow: true } : undefined,
  });
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "nutrition") {
    permanentRedirect(NUTRITION_CANONICAL);
  }
  const guide = await getGuide(slug);
  if (!guide) notFound();

  const { content, metadata } = guide;
  const components = getMDXComponents({}, { ...metadata, date: undefined });
  const isFeedingChart = slug === "golden-retriever-feeding-chart";

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
            dateModified: metadata.updated ?? metadata.date ?? undefined,
            author: { "@type": "Organization", name: "GoldenRetriever.hair" },
            publisher: { "@type": "Organization", name: "GoldenRetriever.hair", url: "https://goldenretriever.hair" },
          }),
        }}
      />
      {isFeedingChart && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FEEDING_CHART_FAQS.map(({ question, answer }) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: answer,
                },
              })),
            }),
          }}
        />
      )}
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
              {isFeedingChart && (
                <section aria-labelledby="feeding-chart-faqs">
                  <h2 id="feeding-chart-faqs">Frequently Asked Questions</h2>
                  {FEEDING_CHART_FAQS.map((faq) => (
                    <div key={faq.question}>
                      <h3>{faq.question}</h3>
                      <p>
                        {faq.answer}
                        {faq.source && (
                          <>
                            {" "}
                            <a href={faq.source.href}>{faq.source.label}</a>
                          </>
                        )}
                      </p>
                    </div>
                  ))}
                </section>
              )}
            </div>
            <div className="mt-12 pt-8 border-t border-amber-100 text-center">
              {isFeedingChart ? (
                <>
                  <h2 className="text-xl font-bold text-amber-900 mb-2">Keep Your Golden&apos;s Daily Care on Track</h2>
                  <p className="text-gray-600 mb-2">
                    Get the free Golden Retriever Owner Cheat Sheet for a printable daily-care reference.
                  </p>
                </>
              ) : (
                <p className="text-gray-600 mb-2">
                  P.S. Get the free{" "}
                  <strong>Golden Retriever Owner Cheat Sheet</strong> — daily feeding, sleep, and care in one printable
                  guide.
                </p>
              )}
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
