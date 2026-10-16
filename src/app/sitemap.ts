import { MetadataRoute } from "next";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

type ContentEntry = {
  slug: string;
  lastModified?: string;
};

/** Prefer `updated`, then `date` — the same rule as guide Article `dateModified`. */
function frontmatterLastModified(data: Record<string, unknown>): string | undefined {
  return toDateOnly(data.updated ?? data.date);
}

function toDateOnly(value: unknown): string | undefined {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return undefined;
    return value.toISOString().slice(0, 10);
  }
  if (typeof value !== "string") return undefined;

  const match = /^(\d{4}-\d{2}-\d{2})/.exec(value.trim());
  if (!match) return undefined;

  const [year, month, day] = match[1].split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day));
  if (
    utc.getUTCFullYear() !== year ||
    utc.getUTCMonth() !== month - 1 ||
    utc.getUTCDate() !== day
  ) {
    return undefined;
  }

  return match[1];
}

function newestDate(dates: Array<string | undefined>): string | undefined {
  let newest: string | undefined;
  for (const date of dates) {
    if (date && (!newest || date > newest)) newest = date;
  }
  return newest;
}

async function readContentEntries(
  directory: string,
  exclude: ReadonlySet<string> = new Set()
): Promise<ContentEntry[]> {
  const files = await fs.readdir(directory);
  const entries: ContentEntry[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;
    const slug = file.replace(/\.mdx$/, "");
    if (exclude.has(slug)) continue;

    const source = await fs.readFile(path.join(directory, file), "utf8");
    const { data } = matter(source);
    const lastModified = frontmatterLastModified(data);
    entries.push(lastModified ? { slug, lastModified } : { slug });
  }

  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://goldenretriever.hair";

  // Dynamic blog posts
  const blogEntries: ContentEntry[] = [];
  try {
    const postsDirectory = path.join(process.cwd(), "src", "app", "blog", "posts");
    blogEntries.push(...(await readContentEntries(postsDirectory)));
  } catch (error) {
    console.error("Error reading blog posts:", error);
  }

  // Dynamic guides — exclude redirect-only / non-canonical stubs
  const redirectOnlyGuideSlugs = new Set(["nutrition"]);
  const guideEntries: ContentEntry[] = [];
  try {
    const guidesDirectory = path.join(process.cwd(), "src", "app", "guides", "posts");
    guideEntries.push(...(await readContentEntries(guidesDirectory, redirectOnlyGuideSlugs)));
  } catch (error) {
    console.error("Error reading guides:", error);
  }

  const blogLastModified = newestDate(blogEntries.map((entry) => entry.lastModified));
  const guidesLastModified = newestDate(guideEntries.map((entry) => entry.lastModified));
  const homeLastModified = newestDate([blogLastModified, guidesLastModified]);

  // Static pages. Products, about, breeders, and golden-week have no content date.
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      ...(homeLastModified ? { lastModified: homeLastModified } : {}),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guides`,
      ...(guidesLastModified ? { lastModified: guidesLastModified } : {}),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      ...(blogLastModified ? { lastModified: blogLastModified } : {}),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/breeders`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/golden-week`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = blogEntries.map((entry) => ({
    url: `${baseUrl}/blog/${entry.slug}`,
    ...(entry.lastModified ? { lastModified: entry.lastModified } : {}),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const guides: MetadataRoute.Sitemap = guideEntries.map((entry) => ({
    url: `${baseUrl}/guides/${entry.slug}`,
    ...(entry.lastModified ? { lastModified: entry.lastModified } : {}),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...blogPosts, ...guides];
}
