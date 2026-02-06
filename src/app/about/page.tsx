import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/components/mdx-components";

async function getAboutContent() {
  const filePath = path.join(process.cwd(), "src", "app", "about", "about.mdx");
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);
  return { content, metadata: data };
}

export async function generateMetadata() {
  const { metadata } = await getAboutContent();
  const title = metadata.title ?? "About GoldenRetriever.hair";
  const description =
    metadata.description ??
    "Meet the passion behind GoldenRetriever.hair — your one-stop hub for everything Golden Retriever.";
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
              width: 1200,
              height: 630,
              alt: metadata.featuredAlt ?? title,
            },
          ],
        }
      : undefined,
  };
}

export default async function AboutPage() {
  const { content, metadata } = await getAboutContent();
  const components = getMDXComponents({}, metadata);

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
              { "@type": "ListItem", position: 2, name: "About", item: "https://goldenretriever.hair/about" },
            ],
          }),
        }}
      />
      <section className="max-w-4xl mx-auto px-4 py-16">
        {metadata.featuredImage && (
          <div className="mb-10">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <Image
                src={metadata.featuredImage}
                alt={metadata.featuredAlt ?? metadata.title ?? "About GoldenRetriever.hair"}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          </div>
        )}
        <article className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-10 md:px-10">
            <div className="prose prose-lg max-w-none text-gray-900 prose-headings:text-amber-900 prose-headings:font-bold prose-a:text-amber-700 prose-a:underline prose-strong:text-amber-900">
              <MDXRemote source={content} components={components} />
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
