import Link from "next/link";

export const metadata = {
  title: "Golden Retriever Blog | Tips & Advice",
  description:
    "Expert Golden Retriever blog: puppy care, health, training, grooming tips, and more for owners.",
};

export default function BlogPage() {
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
                name: "Blog",
                item: "https://goldenretriever.hair/blog",
              },
            ],
          }),
        }}
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-amber-700 font-semibold mb-3">Blog</p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
          Golden Retriever Blog – Expert Tips for Owners
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mb-10">
          Practical, vet-aware advice and trustworthy tips for Golden Retriever owners.
          Browse by category or dive into the latest posts.
        </p>

        <div className="flex flex-wrap gap-3 mb-12">
          <Link href="/blog/puppy-care" className="px-4 py-2 rounded-full bg-white text-amber-800 border border-amber-200 hover:bg-amber-50">
            Puppy Care
          </Link>
          <Link href="/blog/health" className="px-4 py-2 rounded-full bg-white text-amber-800 border border-amber-200 hover:bg-amber-50">
            Health
          </Link>
          <Link href="/blog/training" className="px-4 py-2 rounded-full bg-white text-amber-800 border border-amber-200 hover:bg-amber-50">
            Training
          </Link>
          <Link href="/blog/grooming" className="px-4 py-2 rounded-full bg-white text-amber-800 border border-amber-200 hover:bg-amber-50">
            Grooming
          </Link>
        </div>

        <h2 className="text-2xl font-playfair font-semibold text-amber-900 mb-6">
          Latest Posts
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <article key={index} className="bg-white rounded-xl shadow-sm border border-amber-100 p-6">
              <div className="h-40 bg-amber-100 rounded-lg mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                Placeholder Post Title
              </h3>
              <p className="text-gray-700 mb-4">
                Short summary of the post content goes here. This grid is ready for MDX.
              </p>
              <Link href="/blog" className="text-amber-700 font-semibold hover:underline">
                Read more
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
