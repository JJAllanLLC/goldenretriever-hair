import type { Metadata } from "next";

const SITE_ORIGIN = "https://goldenretriever.hair";

/**
 * Absolute URL for Open Graph / Twitter (Facebook requires absolute image URLs).
 */
export function resolveFeaturedImageAbsolute(featuredImage: string | undefined): string | undefined {
  if (typeof featuredImage !== "string" || featuredImage.length === 0) return undefined;
  return featuredImage.startsWith("/") ? `${SITE_ORIGIN}${featuredImage}` : featuredImage;
}

type BuildArticleSocialMetadataArgs = {
  title: string;
  description: string;
  /** Path only, e.g. `/guides/my-slug` or `/blog/my-slug` */
  canonicalPath: string;
  featuredImage?: string;
  featuredAlt?: string;
  robots?: Metadata["robots"];
};

/**
 * Shared social + SEO metadata for MDX-backed article routes (guides, blog).
 * Matches the guide pattern: no Open Graph / Twitter image block when there is no featured image.
 */
export function buildArticleSocialMetadata({
  title,
  description,
  canonicalPath,
  featuredImage,
  featuredAlt,
  robots,
}: BuildArticleSocialMetadataArgs): Metadata {
  const path = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
  const articleAbsoluteUrl = `${SITE_ORIGIN}${path}`;
  const imageAbsolute = resolveFeaturedImageAbsolute(featuredImage);

  const base: Metadata = {
    title,
    description,
    robots,
    alternates: {
      canonical: path,
    },
  };

  if (!imageAbsolute) {
    return base;
  }

  return {
    ...base,
    openGraph: {
      title,
      description,
      url: articleAbsoluteUrl,
      siteName: "GoldenRetriever.hair",
      locale: "en_US",
      type: "article",
      images: [
        {
          url: imageAbsolute,
          width: 1200,
          height: 630,
          alt: featuredAlt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageAbsolute],
    },
  };
}
