#!/usr/bin/env node
/**
 * Post-build audit of rendered HTML <title> tags.
 * Run after `npm run build`. No new dependencies.
 *
 * Fails on:
 * - missing/empty titles
 * - duplicate GoldenRetriever.hair branding
 * - any page with a configured MDX seoTitle whose rendered title exceeds 70 characters
 *
 * Does not fail merely because legacy pages without seoTitle remain over 70 characters.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const APP_HTML_ROOT = path.join(process.cwd(), ".next", "server", "app");
const REDIRECT_SHELLS = new Set(["/best-grooming-tools-for-golden-retrievers"]);
const BRAND = "GoldenRetriever.hair";

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function walkHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (entry === "api" || entry.startsWith("_")) continue;
      walkHtml(full, out);
    } else if (entry.endsWith(".html") && !entry.includes("_not-found")) {
      out.push(full);
    }
  }
  return out;
}

function fileToUrl(filePath) {
  let url = filePath
    .slice(APP_HTML_ROOT.length)
    .replace(/\\/g, "/")
    .replace(/\.html$/, "");
  if (!url.startsWith("/")) url = `/${url}`;
  if (url === "/index" || url === "") url = "/";
  return url;
}

function loadConfiguredSeoTitles() {
  const map = new Map();
  const roots = [
    ["guides", path.join(process.cwd(), "src", "app", "guides", "posts")],
    ["blog", path.join(process.cwd(), "src", "app", "blog", "posts")],
  ];
  for (const [kind, dir] of roots) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
      const slug = file.replace(/\.mdx$/, "");
      const { data } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      const raw = data.seoTitle;
      if (typeof raw !== "string") continue;
      const seoTitle = raw.trim();
      if (!seoTitle) continue;
      map.set(`/${kind}/${slug}`, seoTitle);
    }
  }
  return map;
}

function main() {
  if (!fs.existsSync(APP_HTML_ROOT)) {
    console.error("Missing .next/server/app. Run `npm run build` first.");
    process.exit(1);
  }

  const seoByUrl = loadConfiguredSeoTitles();
  const files = walkHtml(APP_HTML_ROOT);
  const rows = [];
  const failures = [];

  for (const file of files) {
    const url = fileToUrl(file);
    if (url.includes("[")) continue;
    if (REDIRECT_SHELLS.has(url)) continue;

    const html = fs.readFileSync(file, "utf8");
    const robotsMatch =
      html.match(/name="robots"\s+content="([^"]*)"/i) ||
      html.match(/content="([^"]*)"\s+name="robots"/i);
    const robots = robotsMatch ? robotsMatch[1] : null;
    if (robots && /noindex/i.test(robots)) continue;

    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? decodeEntities(titleMatch[1]).trim() : "";
    const chars = title.length;
    const brandCount = (title.match(/GoldenRetriever\.hair/g) || []).length;
    const hasSeoTitle = seoByUrl.has(url);

    rows.push({ url, title, chars, brandCount, hasSeoTitle });

    if (!title) {
      failures.push(`Missing or empty <title>: ${url}`);
    }
    if (brandCount >= 2) {
      failures.push(`Duplicate branding (${brandCount}× ${BRAND}): ${url} → ${title}`);
    }
    if (hasSeoTitle && chars > 70) {
      failures.push(`seoTitle page over 70 chars (${chars}): ${url} → ${title}`);
    }
  }

  rows.sort((a, b) => b.chars - a.chars);

  const over70 = rows.filter((r) => r.chars > 70);
  const over80 = rows.filter((r) => r.chars > 80);
  const doubleBrand = rows.filter((r) => r.brandCount >= 2);

  console.log(`Title audit: ${rows.length} indexable pages\n`);
  console.log("URL\tCHARS\tBRANDS\tSEO_TITLE?\tTITLE");
  for (const r of rows) {
    console.log(
      `${r.url}\t${r.chars}\t${r.brandCount}\t${r.hasSeoTitle ? "Y" : "N"}\t${r.title}`
    );
  }

  console.log("\n--- Summary ---");
  console.log(`Pages: ${rows.length}`);
  console.log(`Titles > 70 chars: ${over70.length} (informational for legacy pages)`);
  console.log(`Titles > 80 chars: ${over80.length} (informational for legacy pages)`);
  console.log(`Duplicate branding: ${doubleBrand.length}`);
  console.log(`Configured seoTitle pages: ${seoByUrl.size}`);

  if (failures.length) {
    console.error("\n--- Failures ---");
    for (const f of failures) console.error(`✗ ${f}`);
    process.exit(1);
  }

  console.log("\n✓ Title audit passed");
}

main();
