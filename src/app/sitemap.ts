import { MetadataRoute } from "next";
import fs from "fs/promises";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://goldenretriever.hair";
  const today = new Date().toISOString().split("T")[0];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/breeders`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/golden-week`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic blog posts
  const blogPosts: MetadataRoute.Sitemap = [];
  try {
    const postsDirectory = path.join(process.cwd(), "src", "app", "blog", "posts");
    const files = await fs.readdir(postsDirectory);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    for (const file of mdxFiles) {
      const slug = file.replace(/\.mdx$/, "");
      blogPosts.push({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: today,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  } catch (error) {
    console.error("Error reading blog posts:", error);
  }

  // Dynamic guides
  const guides: MetadataRoute.Sitemap = [];
  try {
    const guidesDirectory = path.join(process.cwd(), "src", "app", "guides", "posts");
    const files = await fs.readdir(guidesDirectory);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    for (const file of mdxFiles) {
      const slug = file.replace(/\.mdx$/, "");
      guides.push({
        url: `${baseUrl}/guides/${slug}`,
        lastModified: today,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  } catch (error) {
    console.error("Error reading guides:", error);
  }

  return [...staticPages, ...blogPosts, ...guides];
}
