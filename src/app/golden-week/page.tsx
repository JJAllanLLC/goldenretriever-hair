import Image from "next/image";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata = {
  title: "Golden of the Month | Coming Soon | GoldenRetriever.hair",
  description:
    "Golden of the Month — our community contest to upload your favorite Golden photos, vote for the best, and see winners showcased. Sign up to be notified at launch.",
};

export default function GoldenWeekPage() {
  return (
    <main className="bg-amber-50/40 text-gray-900 min-h-screen">
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
                name: "Golden of the Month",
                item: "https://goldenretriever.hair/golden-week",
              },
            ],
          }),
        }}
      />
      <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <div className="relative w-full aspect-[3/2] max-h-[320px] rounded-xl overflow-hidden mb-10 bg-amber-100 border border-amber-200">
          <Image
            src="/images/threegoldens.jpeg"
            alt="Golden of the Month — coming soon"
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
          />
        </div>

        <p className="text-amber-700 font-semibold mb-2 text-center">Coming Soon</p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-8 text-center">
          Golden of the Month
        </h1>

        <div className="prose prose-lg max-w-none text-gray-800 space-y-6 mb-12">
          <p>
            Golden of the Month is coming soon — our brand-new community contest where you can upload your favorite Golden photos, vote for the best, and see winners showcased on the site!
          </p>
          <p>
            The winner each month gets featured on the homepage and added to our permanent Hall of Fame.
          </p>
          <p>
            Stay tuned for more details, including how to enter and the chance to win prizes like custom mugs and shirts with your Golden&apos;s photo.
          </p>
          <p>
            Sign up for the newsletter below to be the first to know when we launch — we&apos;ll announce everything there!
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-6 md:p-8">
          <p className="text-center text-amber-900 font-semibold text-lg mb-6">
            Get notified when Golden of the Month launches!
          </p>
          <NewsletterForm variant="footer" />
        </div>
      </section>
    </main>
  );
}
