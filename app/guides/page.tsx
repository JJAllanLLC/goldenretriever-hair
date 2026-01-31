import { GuidesCategoryFilter } from "@/components/GuidesCategoryFilter";

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
    link: "/blog/choosing-a-breeder",
    category: "Breeder",
  },
  {
    title: "Common Health Issues",
    description:
      "Early signs, prevention tips, and vet guidance for Golden Retrievers.",
    link: "/blog/health-issues",
    category: "Health",
  },
  {
    title: "Training & Socialization",
    description:
      "Puppy to adult training routines with positive reinforcement.",
    link: "/blog/puppy-training",
    category: "Training",
  },
  {
    title: "Nutrition & Feeding",
    description:
      "Food quality, portions, and ingredient tips for long-term health.",
    link: "/guides/nutrition",
    category: "Nutrition",
  },
  {
    title: "Grooming & Coat Care",
    description:
      "Shedding management, brushing, and bathing best practices.",
    link: "/blog/grooming-shedding",
    category: "Grooming",
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
        <p className="text-lg text-white drop-shadow-md max-w-3xl mb-12">
          Deep-dive resources built for responsible ownership, from finding a breeder
          to lifelong health, training, and care.
        </p>

        <GuidesCategoryFilter guides={guides} />
      </section>
    </main>
  );
}
