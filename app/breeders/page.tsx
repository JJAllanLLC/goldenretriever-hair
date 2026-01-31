import Link from "next/link";

export const metadata = {
  title: "Vetted Golden Retriever Breeders Directory",
  description:
    "Trusted directory of vetted Golden Retriever breeders – find responsible breeders near you.",
};

export default function BreedersPage() {
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
                name: "Breeders",
                item: "https://goldenretriever.hair/breeders",
              },
            ],
          }),
        }}
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-amber-700 font-semibold mb-3">Breeder Directory</p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
          Trusted Golden Retriever Breeder Directory
        </h1>
        <p className="text-lg text-white drop-shadow-md max-w-3xl mb-10">
          A curated directory designed to help families find responsible Golden Retriever
          breeders with transparent health testing and ethical practices.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <article
              key={index}
              className="bg-white rounded-xl shadow-sm border border-amber-100 p-6"
            >
              <h2 className="text-xl font-semibold text-amber-900 mb-2">
                Breeder Listing Placeholder
              </h2>
              <p className="text-gray-700 mb-4">
                Location, kennel info, and health testing details will appear here.
              </p>
              <Link
                href="/guides/choosing-breeder"
                className="text-amber-700 font-semibold hover:underline"
              >
                Choosing a Breeder Guide
              </Link>
            </article>
          ))}
        </div>

        <div className="bg-amber-100/70 border border-amber-200 rounded-xl p-6">
          <h2 className="text-2xl font-playfair font-semibold text-amber-900 mb-2">
            Featured listings coming soon
          </h2>
          <p className="text-gray-700">
            We are building a premium tier for verified breeders and enhanced profiles.
          </p>
        </div>
      </section>
    </main>
  );
}
