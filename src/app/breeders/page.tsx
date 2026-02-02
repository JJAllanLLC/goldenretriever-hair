import Link from "next/link";

export const metadata = {
  title: "Golden Retriever Breeder Directory | Paid Listings",
  description:
    "Advertised Golden Retriever breeder directory with paid listings, community comments, and transparency for informed decisions.",
};

const breeders = [
  {
    name: "Sunrise Goldens",
    location: "Austin, TX",
    website: "https://example.com",
  },
  {
    name: "Meadowbrook Retrievers",
    location: "Nashville, TN",
    website: "https://example.com",
  },
  {
    name: "Prairie Lane Goldens",
    location: "Boise, ID",
    website: "https://example.com",
  },
  {
    name: "Coastal Golden Co.",
    location: "Charleston, SC",
    website: "https://example.com",
  },
  {
    name: "Maple Ridge Retrievers",
    location: "Columbus, OH",
    website: "https://example.com",
  },
  {
    name: "Highland Goldens",
    location: "Denver, CO",
    website: "https://example.com",
  },
];

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
        <p className="text-white drop-shadow-md font-semibold mb-3">Breeder Directory</p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-4">
          Advertised Golden Retriever Breeder Listings
        </h1>
        <p className="text-lg text-white drop-shadow-md max-w-3xl mb-6">
          Advertised breeder directory – listings are paid advertisements and not personally vetted by
          GoldenRetriever.hair. User comments help community decide.
        </p>
        <p className="text-white drop-shadow-md font-semibold max-w-4xl mb-10">
          These are paid advertisements. We have not personally used these breeders. Rely on user reviews
          and your own research.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {breeders.map((breeder) => (
            <article
              key={breeder.name}
              className="bg-white rounded-xl shadow-sm border border-amber-100 p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-xl font-semibold text-amber-900">{breeder.name}</h2>
                <span className="text-xs font-semibold uppercase tracking-wide bg-amber-100 text-amber-900 px-2 py-1 rounded-full">
                  Paid Listing
                </span>
              </div>
              <p className="text-gray-700 mb-3">{breeder.location}</p>
              <a
                href={breeder.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 font-semibold hover:underline"
              >
                Visit website
              </a>

              <div className="mt-6 border-t border-amber-100 pt-4">
                <h3 className="text-sm font-semibold text-amber-900 mb-2">User comments</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Reviews are moderated for accuracy and community trust.
                </p>
                <form className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-lg border border-amber-200 px-3 py-2 text-sm"
                  />
                  <textarea
                    placeholder="Share your experience (public)"
                    rows={3}
                    className="w-full rounded-lg border border-amber-200 px-3 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full bg-amber-700 text-white text-sm font-semibold py-2 rounded-lg hover:bg-amber-800 transition"
                  >
                    Submit comment
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>

        <div id="advertise" className="bg-amber-100/70 border border-amber-200 rounded-xl p-6">
          <h2 className="text-2xl font-playfair font-semibold text-amber-900 mb-2">
            Promote your breeder listing
          </h2>
          <p className="text-gray-700 mb-4">
            Paid submissions are coming soon with options for premium placement and profile features.
          </p>
          <Link
            href="#advertise"
            className="inline-flex items-center justify-center bg-amber-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-800 transition"
          >
            Join the paid listing waitlist
          </Link>
        </div>
      </section>
    </main>
  );
}
