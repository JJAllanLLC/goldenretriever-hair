import type { Metadata } from "next";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | GoldenRetriever.hair",
  description: "Affiliate disclosure for GoldenRetriever.hair, including information about Amazon Associates and how affiliate links support the site.",
};

export default function AffiliateDisclosurePage() {
  return (
    <main className="bg-amber-50/40 text-gray-900">
      <section className="max-w-3xl mx-auto px-4 py-16">
        <Content />
      </section>
    </main>
  );
}

