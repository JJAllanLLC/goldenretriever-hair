import { ProductsCategoryFilter } from "@/components/ProductsCategoryFilter";

export const metadata = {
  title: "Best Products for Golden Retrievers",
  description:
    "Curated top products for Golden Retrievers – brushes, food, toys (Amazon Associates links).",
};

const products = [
  {
    title: "Hill's Science Diet Large Breed Adult Dry Dog Food (Lamb Meal & Brown Rice)",
    description:
      "Balanced nutrition for large breed adults – supports joint health, digestion, and immune system.",
    personalComment:
      "Our Goldens switched to this food about one year ago and they still love it. Gentle on stomachs and is keeping their coats shiny! 🐾",
    amazonLink: "https://amzn.to/45GjTnt",
    image: "/images/products/hills_science_food.png",
    category: "Food/Treats",
  },
  {
    title: "Purina Pro Plan Sensitive Skin & Stomach Adult Dry Dog Food (Salmon & Rice Formula)",
    description: "Sensitive Skin, Digestive Health, Immune Support, Skin and Coat Health.",
    personalComment:
      "Helped with Cosmo’s digestion issues that he had since he was a pup. Reliability issues at times being in stock. 🐾",
    amazonLink: "https://amzn.to/4kcP5Rk",
    image: "/images/products/purina_proplan.png",
    category: "Food/Treats",
  },
  {
    title: "Canidae All Life Stages Multi-Protein Formula Dry Dog Food (Chicken, Turkey, Lamb Meals)",
    description:
      "High-protein nutrition for all life stages – real meat first ingredients for active Goldens.",
    personalComment:
      "We have happily fed our goldens with Multi-Protein Chicken, Turkey and Lamb Meals Formulas. Reliable all-ages option! 🐾",
    amazonLink: "https://amzn.to/46mR3IW",
    image: "/images/products/canidae.png",
    category: "Food/Treats",
  },
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

        <ProductsCategoryFilter products={products} />

        <p className="text-sm text-gray-600 mt-8">
          Personal recommendations from our Goldens – battle-tested! As an Amazon Associate,
          we earn from qualifying purchases – supports GoldenRetriever.hair and the upcoming
          Golden Week app.
        </p>
      </section>
    </main>
  );
}
