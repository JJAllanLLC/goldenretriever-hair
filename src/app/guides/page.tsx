import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { GuidesCategoryFilter } from "@/components/GuidesCategoryFilter";

export const metadata = {
  title: "Golden Retriever Guides | Expert Care Advice",
  description:
    "In-depth Golden Retriever guides on health, training, breeders, adoption, grooming, and lifelong care. Expert advice for responsible owners.",
};

type GuideMeta = {
  title: string;
  description: string;
  date: string;
  slug: string;
  category: string;
  featuredImage?: string;
  featuredAlt?: string;
};

async function getGuides(): Promise<GuideMeta[]> {
  const guidesDir = path.join(process.cwd(), "src", "app", "guides", "posts");
  const files = await fs.readdir(guidesDir);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const guides = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(guidesDir, file);
      const source = await fs.readFile(filePath, "utf8");
      const { data } = matter(source);

      return {
        title: data.title ?? "Untitled Guide",
        description: data.description ?? "",
        date: data.date ?? "",
        slug,
        category: data.category ?? "General",
        featuredImage: data.featuredImage,
        featuredAlt: data.featuredAlt,
      };
    })
  );

  const sorted = guides.sort((a, b) => (a.date < b.date ? 1 : -1));
  const flagshipSlug = "best-dog-food-golden-retrievers-2026";
  const flagship = sorted.find((g) => g.slug === flagshipSlug);
  const rest = sorted.filter((g) => g.slug !== flagshipSlug);
  return flagship ? [flagship, ...rest] : sorted;
}

export default async function GuidesPage() {
  const guides = await getGuides();

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
                name: "Guides",
                item: "https://goldenretriever.hair/guides",
              },
            ],
          }),
        }}
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-white drop-shadow-md font-semibold mb-3">Guides</p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
          Comprehensive Guides for Golden Retriever Owners
        </h1>
        <p className="text-lg text-white drop-shadow-md max-w-3xl mb-12">
          Deep-dive resources built for responsible ownership, from adoption and puppy care
          to training, grooming, and lifelong health.
        </p>

        <GuidesCategoryFilter guides={guides} />
      </section>
    </main>
  );
}
