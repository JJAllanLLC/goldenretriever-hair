import Link from "next/link";

export const metadata = {
  title: "About Us | Golden Retriever Tips & Community | GoldenRetriever.hair",
  description:
    "Meet the team behind GoldenRetriever.hair — your hub for Golden Retriever guides, puppy tips, training, products, and heartwarming stories. Start here.",
};

export default function AboutPage() {
  return (
    <main className="bg-amber-50/40 text-gray-900">
      <section className="max-w-4xl mx-auto px-4 py-16">
        <article className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-10 md:px-10">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-8 text-center">
              About GoldenRetriever.hair
            </h1>
            <div className="max-w-3xl mx-auto text-lg text-gray-800 space-y-6">
              <p>
                Our deep love for Golden Retrievers inspired the creation of this one-stop hub — a place where owners (and
                future owners) can find everything needed to give these amazing dogs the best life possible.
              </p>
              <p>
                From getting your first puppy to daily care, training, the best products, fun stories, and adorable
                pictures — it&apos;s all here. Goldens have brought so much joy to their lives, and we want to share that
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
                Behind the scenes: A team of passionate Golden Retriever experts (nutritionists, trainers, long-time breeders, and owners) reached out to JJ Allan of JJ Allan LLC to help build, support, and maintain the site. They wanted a trusted, modern platform to share breed-specific knowledge and community resources. You can learn more about JJ Allan LLC at{" "}
                <Link
                  href="https://jjallanllc.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 underline hover:text-amber-900"
                >
                  jjallanllc.com
                </Link>
                {" "}— including the upcoming Golden Week mobile app (coming soon) for even more Golden fun!
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
                for carefully tested recommendations, or{" "}
                <Link href="/blog" className="text-amber-700 underline hover:text-amber-900">
                  Blog
                </Link>{" "}
                for relatable stories.
              </p>
              <p>Don&apos;t forget to subscribe for our newsletter for updates.</p>
              <p>
                And stay tuned for our upcoming Golden of the Month contest — a fun community way to share your favorite Golden moments!
              </p>
              <p className="text-sm text-gray-600">
                As an Amazon Associate, GoldenRetriever.hair earns from qualifying purchases at no extra cost to you. The site is owned and operated by JJ Allan LLC.
              </p>
              <p>🐾 GoldenRetriever.hair</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

