export const metadata = {
  title: "Golden Week App | Coming Soon for Goldens",
  description:
    "Golden Week – the ultimate mobile app for Golden Retriever owners: health tracking, community, training tips.",
};

export default function GoldenWeekPage() {
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
                name: "Golden Week",
                item: "https://goldenretriever.hair/golden-week",
              },
            ],
          }),
        }}
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-white drop-shadow-md font-semibold mb-3">Golden Week App</p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
          Golden Week – The Ultimate App for Golden Lovers
        </h1>
        <p className="text-lg text-white drop-shadow-md max-w-3xl mb-10">
          The upcoming Golden Retriever mobile app is perfect for sharing photos,
          entering fun contests with prizes, and celebrating the joy of life with
          your Golden. Built for Golden lovers who want to capture every stage of life.
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-8 mb-12">
          <h2 className="text-2xl font-playfair font-semibold text-amber-900 mb-4">
            Join the Waitlist
          </h2>
          <p className="text-gray-700 mb-6">
            Get early access updates, launch perks, and a first look at new features.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-full text-gray-900 flex-1 border border-amber-200"
            />
            <button className="bg-amber-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-800 transition">
              Join Waitlist
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-playfair font-semibold text-amber-900 mb-4">
            App Preview
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-64 bg-amber-100 border border-amber-200 rounded-xl flex items-center justify-center text-amber-700 font-semibold"
              >
                coming soon
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
