import Link from "next/link";
import { notFound } from "next/navigation";

const guideTitles: Record<string, string> = {
  "choosing-breeder": "Choosing a Responsible Breeder",
  "health-issues": "Common Health Issues",
  "training-socialization": "Training & Socialization",
  "nutrition-feeding": "Nutrition & Feeding",
  "grooming-coat-care": "Grooming & Coat Care",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = guideTitles[slug];
  if (!title) {
    return { title: "Guide Not Found" };
  }
  return {
    title: `${title} | Golden Retriever Guides`,
    description:
      "In-depth Golden Retriever guide with practical tips for responsible ownership, health, training, and care.",
  };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = guideTitles[slug];
  if (!title) {
    notFound();
  }

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
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mt-6 mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-700">
          This guide is coming soon. We are preparing expert-backed content to help
          you provide the best care for your Golden Retriever.
        </p>
      </section>
    </main>
  );
}
