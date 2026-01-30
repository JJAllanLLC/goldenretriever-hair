import Link from "next/link";

export const metadata = {
  title: "Best Products for Golden Retrievers",
  description:
    "Curated top products for Golden Retrievers – brushes, food, toys (Amazon Associates links).",
};

const products = [
  {
    title: "Deshedding Brush",
    description: "Gentle on skin, effective for double coats.",
    href: "https://amazon.com",
  },
  {
    title: "Durable Fetch Toy",
    description: "Long-lasting rubber toy for daily exercise.",
    href: "https://amazon.com",
  },
  {
    title: "Joint Support Chews",
    description: "Support mobility with vet-recommended ingredients.",
    href: "https://amazon.com",
  },
  {
    title: "Waterproof Travel Bed",
    description: "Comfortable padding for home or on the go.",
    href: "https://amazon.com",
  },
  {
    title: "Slow Feeder Bowl",
    description: "Encourages healthy eating pace and digestion.",
    href: "https://amazon.com",
  },
  {
    title: "Everyday Grooming Kit",
    description: "Brush, comb, and nail tools for routine care.",
    href: "https://amazon.com",
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

        <h2 className="text-2xl font-playfair font-semibold text-amber-900 mb-6">
          Top Picks
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <article key={product.title} className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
              <div className="h-40 bg-amber-100 rounded-lg mb-4 flex items-center justify-center text-amber-700 font-semibold">
                Image Placeholder
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                {product.title}
              </h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <Link
                href={product.href}
                className="text-amber-700 font-semibold hover:underline"
                rel="nofollow sponsored"
              >
                View on Amazon
              </Link>
            </article>
          ))}
        </div>

        <p className="text-sm text-gray-600 mt-8">
          As an Amazon Associate, we earn from qualifying purchases.
        </p>
      </section>
    </main>
  );
}
