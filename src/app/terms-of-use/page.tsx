import type { Metadata } from "next";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Terms of Use | GoldenRetriever.hair",
  description:
    "Terms of Use for GoldenRetriever.hair, outlining conditions for using the site, intellectual property, and limitations of liability.",
};

export default function TermsOfUsePage() {
  return (
    <main className="bg-amber-50/40 text-gray-900">
      <section className="max-w-3xl mx-auto px-4 py-16">
        <Content />
      </section>
    </main>
  );
}

