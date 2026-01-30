import { notFound } from "next/navigation";

async function getPost(slug: string) {
  try {
    const { default: Content, metadata } = await import(`../posts/${slug}.mdx`);
    return { Content, metadata };
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.metadata.title,
    description: post.metadata.description,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { Content, metadata } = post;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-playfair font-bold text-amber-900 mb-4">{metadata.title}</h1>
      <p className="text-gray-600 mb-8">{metadata.date}</p>
      <div className="prose prose-lg max-w-none">
        <Content />
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
    </article>
  );
}
