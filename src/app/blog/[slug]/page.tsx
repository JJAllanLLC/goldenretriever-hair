import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { getMDXComponents } from "@/components/mdx-components";

async function getPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "src", "app", "blog", "posts", `${slug}.mdx`);
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);
    return { content, metadata: data };
  } catch {
    notFound();
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "src", "app", "blog", "posts");
  const filenames = await fs.readdir(postsDirectory);
  return filenames.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  const title = post.metadata.title ?? "Golden Retriever Blog Post";
  const description = post.metadata.description ?? "Golden Retriever care, training, and health insights.";
  const featuredImage = post.metadata.featuredImage;

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
              alt: post.metadata.featuredAlt ?? title,
            },
          ],
        }
      : undefined,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { content, metadata } = post;
  const components = getMDXComponents({});

  const showQuickTip = metadata.showQuickTip === true;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-amber-700 font-semibold hover:underline">
        ← Back to Blog
      </Link>
      <article className="mt-6 bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-10 md:px-10">
          <h1 className="text-5xl font-bold text-amber-900 mb-8 text-center">{metadata.title}</h1>
          {metadata.featuredImage && (
            <div className="my-12 text-center">
              <Image
                src={metadata.featuredImage}
                alt={metadata.featuredAlt || metadata.title}
                width={800}
                height={600}
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
          )}
          <p className="text-center text-gray-600 mb-12">{metadata.date}</p>
          {showQuickTip && (
            <div className="bg-amber-50 border-l-4 border-amber-700 p-8 mb-12 rounded-r-lg">
              <p className="text-2xl font-bold text-amber-900 mb-4">Quick Tip 🐾</p>
              <p className="text-xl text-gray-800">
                Let&apos;s be honest – if you own a Golden Retriever, you know the struggle. Fur on the couch,
                fur in your coffee, fur on your black pants the second you walk out the door. It&apos;s like
                living with a walking tumbleweed factory!
              </p>
              <p className="text-xl text-gray-800 mt-4 font-semibold">
                Be proactive, not reactive – regular grooming prevents fur explosions and keeps your home (and
                sanity) intact!
              </p>
            </div>
          )}
          <div className="prose prose-2xl max-w-none text-gray-900 prose-headings:text-amber-900 prose-headings:font-bold prose-headings:text-4xl prose-headings:my-12 prose-p:my-8 prose-p:text-lg prose-p:first:text-3xl prose-p:first:font-bold prose-p:first:text-amber-900 prose-p:first:mb-12 prose-p:first:text-center prose-li:my-6 prose-li:text-lg prose-li:flex prose-li:items-start prose-li:gap-4 prose-li:before:content-['🐾'] prose-li:before:text-amber-700 prose-li:before:mr-4 prose-li:before:text-2xl prose-a:text-amber-700 prose-a:underline prose-strong:text-amber-900 prose-emojis:text-2xl">
            <MDXRemote source={content} components={components} />
          </div>
          <div className="mt-12 pt-8 border-t border-amber-100 text-center">
            <p className="text-gray-600 mb-2">
              P.S. If you&apos;re obsessed with capturing those daily Golden moments, keep an eye out for our upcoming Golden of the Month contest — a community celebration where you can upload your favorite photos, vote for the best, and see winners showcased on the site! Winners get featured on the homepage, added to our permanent Hall of Fame, and a chance at prizes like custom mugs and shirts with their Golden&apos;s photo.
            </p>
            <p className="text-gray-600 mb-2">
              Coming soon —{" "}
              <Link href="/golden-week" className="text-amber-700 font-semibold hover:underline">
                join the newsletter
              </Link>{" "}
              for exclusive updates and launch announcements!
            </p>
          </div>
          {/* BreadcrumbList schema */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://goldenretriever.hair" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://goldenretriever.hair/blog" },
              { "@type": "ListItem", "position": 3, "name": metadata.title },
            ]
          }) }} />
          {/* Article schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: metadata.title,
                description: metadata.description ?? "Golden Retriever care, training, and health insights.",
                image: metadata.featuredImage
                  ? (metadata.featuredImage.startsWith("/")
                      ? `https://goldenretriever.hair${metadata.featuredImage}`
                      : metadata.featuredImage)
                  : undefined,
                datePublished: metadata.date ?? undefined,
                author: { "@type": "Organization", name: "GoldenRetriever.hair" },
                publisher: { "@type": "Organization", name: "GoldenRetriever.hair", url: "https://goldenretriever.hair" },
              }),
            }}
          />
        </div>
      </article>
    </div>
  );
}
