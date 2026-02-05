import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/components/mdx-components";

async function getBreederContent() {
  const filePath = path.join(process.cwd(), "src", "app", "breeders", "breeder.mdx");
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);
  return { content, metadata: data };
}

export async function generateMetadata() {
  const { metadata } = await getBreederContent();
  const title = metadata.title ?? "Finding a Responsible Golden Retriever Breeder";
  const description =
    metadata.description ??
    "Educational guide to ethical Golden Retriever sources — no endorsements or paid ads.";
  const featuredImage = metadata.featuredImage;

  return {
    title,
    description,
    openGraph: featuredImage
      ? {
          title,
          description,
          images: [
            {
              url: featuredImage.startsWith("/") ? `https://goldenretriever.hair${featuredImage}` : featuredImage,
              width: 800,
              height: 600,
              alt: metadata.featuredAlt ?? title,
            },
          ],
        }
      : undefined,
  };
}

export default async function BreedersPage() {
  const { content, metadata } = await getBreederContent();
  const components = getMDXComponents({});

  return (
    <main className="bg-amber-50/40 text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://goldenretriever.hair/" },
              { "@type": "ListItem", position: 2, name: "Finding a Golden Puppy", item: "https://goldenretriever.hair/breeders" },
            ],
          }),
        }}
      />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/guides" className="text-amber-700 font-semibold hover:underline">
          ← Guides
        </Link>
        <article className="mt-8 bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-10 md:px-10">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-4">
              {metadata.title}
            </h1>
            {metadata.featuredImage && (
              <div className="my-8 text-center">
                <Image
                  src={metadata.featuredImage}
                  alt={metadata.featuredAlt || metadata.title}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg mx-auto"
                />
              </div>
            )}
            {metadata.date && <p className="text-gray-600 mb-8">{metadata.date}</p>}
            <div className="prose prose-lg max-w-none text-gray-900 prose-headings:text-amber-900 prose-headings:font-bold prose-a:text-amber-700 prose-a:underline prose-strong:text-amber-900">
              <MDXRemote source={content} components={components} />
            </div>
            <div className="mt-12 pt-8 border-t border-amber-100 text-center">
              <p className="text-gray-600 mb-2">
                Track daily moments with your Golden —{" "}
                <Link href="/golden-week" className="text-amber-700 font-semibold hover:underline">
                  Golden Week app
                </Link>{" "}
                coming soon. Join the waitlist!
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
