import Link from "next/link";

export const metadata = {
  title: "Golden Retriever Guides | Expert Care Advice",
  description:
    "In-depth Golden Retriever guides on health, training, breeders, products, and lifelong care.",
};

const guides = [
  {
    title: "Choosing a Responsible Breeder",
    description:
      "How to evaluate breeders, health testing, and red flags to avoid.",
    href: "/guides/choosing-breeder",
  },
  {
    title: "Common Health Issues",
    description:
      "Early signs, prevention tips, and vet guidance for Golden Retrievers.",
    href: "/guides/health-issues",
  },
  {
    title: "Training & Socialization",
    description:
      "Puppy to adult training routines with positive reinforcement.",
    href: "/guides/training-socialization",
  },
  {
    title: "Nutrition & Feeding",
    description:
      "Food quality, portions, and ingredient tips for long-term health.",
    href: "/guides/nutrition-feeding",
  },
  {
    title: "Grooming & Coat Care",
    description:
      "Shedding management, brushing, and bathing best practices.",
    href: "/guides/grooming-coat-care",
  },
];

export default function GuidesPage() {
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
            ],
          }),
        }}
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-amber-700 font-semibold mb-3">Guides</p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
          Comprehensive Guides for Golden Retriever Owners
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mb-12">
          Deep-dive resources built for responsible ownership, from finding a breeder
          to lifelong health, training, and care.
        </p>

        <h2 className="text-2xl font-playfair font-semibold text-amber-900 mb-6">
          Pillar Guides
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <article key={guide.href} className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                {guide.title}
              </h3>
              <p className="text-gray-700 mb-4">{guide.description}</p>
              <Link href={guide.href} className="text-amber-700 font-semibold hover:underline">
                Read guide
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
