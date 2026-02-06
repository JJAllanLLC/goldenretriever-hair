import Link from "next/link";

export const metadata = {
  title: "About GoldenRetriever.hair",
  description:
    "Meet the passion behind GoldenRetriever.hair — your one-stop hub for everything Golden Retriever, from puppy tips to training, products, and heartwarming stories.",
};

export default function AboutPage() {
  return (
    <main className="bg-amber-50/40 text-gray-900">
      <section className="max-w-4xl mx-auto px-4 py-16">
        <article className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-10 md:px-10">
            <div className="prose prose-lg max-w-none text-gray-900 prose-headings:text-amber-900 prose-headings:font-bold prose-a:text-amber-700 prose-a:underline prose-strong:text-amber-900">
              <h1>About GoldenRetriever.hair</h1>
              <p>
                Our deep love for Golden Retrievers inspired me to create this one-stop hub — a place where owners (and
                future owners) can find everything needed to give these amazing dogs the best life possible.
              </p>
              <p>
                From getting your first puppy to daily care, training, the best products, fun stories, and adorable
                pictures — it&apos;s all here. Goldens have brought so much joy to our life, and we want to share that
                with you through practical, real-world advice.
              </p>
              <p>
                The #1 question we get? &quot;We&apos;re thinking about our first dog — everyone says Goldens are the
                best with families and young kids, but I have so many questions and don&apos;t know where to start.&quot;
              </p>
              <p>
                That&apos;s exactly why this site exists. Start here — whether you&apos;re researching
                breeders/rescues, prepping for puppy day, or navigating training and grooming. Adding a Golden to your
                family is a decision you&apos;ll never regret — they&apos;re loyal, affectionate, and pure happiness on
                four legs.
              </p>
              <p>
                We&apos;re constantly adding new blogs, guides, and features (more stories, tools, and surprises coming
                soon), so check back often — there&apos;s always something fresh for Golden lovers.
              </p>
              <p>
                Ready to dive in? Explore the{" "}
                <Link href="/guides" className="text-amber-700 underline hover:text-amber-900">
                  Guides
                </Link>{" "}
                for in-depth advice,{" "}
                <Link href="/products" className="text-amber-700 underline hover:text-amber-900">
                  Products
                </Link>{" "}
                for my personally tested recommendations, or{" "}
                <Link href="/blog" className="text-amber-700 underline hover:text-amber-900">
                  Blog
                </Link>{" "}
                for relatable stories.
              </p>
              <p>Don&apos;t forget to subscribe for our newsletter for updates.</p>
              <p>
                And keep an eye out for my upcoming <strong>Golden</strong> mobile app — designed to capture those daily
                joyful moments with your Golden.
              </p>
              <p>🐾 GoldenRetriever.hair</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

