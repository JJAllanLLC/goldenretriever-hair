import type { Metadata } from "next";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Disclaimer | GoldenRetriever.hair",
  description:
    "Legal disclaimer for GoldenRetriever.hair. Learn how our educational content should be used and why it does not replace veterinary advice.",
};

export default function DisclaimerPage() {
  return (
    <main className="bg-amber-50/40 text-gray-900">
      <section className="max-w-3xl mx-auto px-4 py-16">
        <Content />
      </section>
    </main>
  );
}

