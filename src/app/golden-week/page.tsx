import Image from "next/image";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata = {
  title: "Golden of the Month | Coming Soon | GoldenRetriever.hair",
  description:
    "Golden of the Month — our community contest to upload your favorite Golden photos, vote for the best, and see winners showcased. Sign up to be notified at launch.",
};

export default function GoldenWeekPage() {
  return (
    <main className="bg-gray-900 min-h-screen">
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

        <p className="text-amber-400 font-semibold mb-2 text-center text-base md:text-lg [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          Coming Soon
        </p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-400 mb-8 text-center [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          Golden of the Month
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 mb-12">
          <p className="text-gray-100 text-base md:text-lg leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
            Golden of the Month is our upcoming community photo contest built to celebrate Golden Retrievers and the people who love them. Upload your favorite Golden photos, vote throughout the month, and see winners showcased on the site.
          </p>

          <h2 className="text-xl md:text-2xl font-playfair font-bold text-amber-400 mt-8 mb-4 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
            How it works
          </h2>
          <ul className="text-gray-100 text-base md:text-lg leading-relaxed space-y-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] list-disc list-inside">
            <li>Upload a photo of your Golden Retriever</li>
            <li>The community votes throughout the month</li>
            <li>One Golden is crowned each month and featured on the homepage</li>
            <li>Winners are added to our permanent Hall of Fame</li>
          </ul>

          <p className="text-gray-100 text-base md:text-lg leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
            We&apos;ll share full details when submissions open.
          </p>
        </div>

        <div className="bg-gray-900/80 rounded-xl shadow-md border border-amber-200/30 p-6 md:p-8 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
          <p className="text-center text-gray-100 font-semibold text-lg mb-6">
            Get notified when Golden of the Month launches!
          </p>
          <NewsletterForm variant="dark" />
        </div>

        <p className="text-center text-gray-500 text-sm mt-10 mb-4">
          Already subscribed? You&apos;re all set — we&apos;ll email you the moment Golden of the Month launches.
        </p>
      </section>
    </main>
  );
}
