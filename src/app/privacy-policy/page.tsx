import type { Metadata } from "next";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Privacy Policy | GoldenRetriever.hair",
  description:
    "Privacy Policy for GoldenRetriever.hair, explaining how we collect, use, and protect visitor data, including cookies and analytics.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-amber-50/40 text-gray-900">
      <section className="max-w-3xl mx-auto px-4 py-16">
        <Content />
      </section>
    </main>
  );
}

