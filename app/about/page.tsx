export const metadata = {
  title: "About GoldenRetriever.hair | Trusted Resource",
  description:
    "About GoldenRetriever.hair – your trusted Golden Retriever resource built by JJ Allan LLC.",
};

export default function AboutPage() {
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
                name: "About",
                item: "https://goldenretriever.hair/about",
              },
            ],
          }),
        }}
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-white drop-shadow-md font-semibold mb-3">About</p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
          About GoldenRetriever.hair
        </h1>
        <div className="max-w-3xl text-lg text-white drop-shadow-md space-y-6">
          <p>
            GoldenRetriever.hair is a community-first resource for owners who want
            the best for their Golden Retrievers. Our mission is to make expert
            guidance simple, welcoming, and accessible.
          </p>
          <p>
            We focus on responsible ownership, ethical breeders, and practical
            care that supports a healthy, joyful life for every Golden.
          </p>
          <p>
            This site is proudly built and maintained by{" "}
            <span className="font-semibold text-amber-800">JJ Allan LLC</span>,
            blending thoughtful content with a fast, friendly experience.
          </p>
        </div>
      </section>
    </main>
  );
}
