import { ProductsCategoryFilter } from "@/components/ProductsCategoryFilter";

export const metadata = {
  title: "Best Products for Golden Retrievers",
  description:
    "Curated top products for Golden Retrievers – brushes, food, toys (Amazon Associates links).",
};

const products = [
  {
    title: "Deshedding Brush",
    description: "Gentle on skin, effective for double coats.",
    amazonLink: "https://amazon.com/affiliate-placeholder",
    category: "Grooming",
  },
  {
    title: "Durable Fetch Toy",
    description: "Long-lasting rubber toy for daily exercise.",
    amazonLink: "https://amazon.com/affiliate-placeholder",
    category: "Toys",
  },
  {
    title: "Joint Support Chews",
    description: "Support mobility with vet-recommended ingredients.",
    amazonLink: "https://amazon.com/affiliate-placeholder",
    category: "Health",
  },
  {
    title: "Premium Puppy Food",
    description: "Balanced nutrition for growing Goldens.",
    amazonLink: "https://amazon.com/affiliate-placeholder",
    category: "Food/Treats",
  },
];

export default function ProductsPage() {
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
                name: "Products",
                item: "https://goldenretriever.hair/products",
              },
            ],
          }),
        }}
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-amber-700 font-semibold mb-3">Products</p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
          Recommended Products for Your Golden Retriever
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mb-10">
          Carefully curated picks for grooming, nutrition, play, and everyday care.
        </p>

        <ProductsCategoryFilter products={products} />

        <p className="text-sm text-gray-600 mt-8">
          As an Amazon Associate, we earn from qualifying purchases.
        </p>
      </section>
    </main>
  );
}
