# SEO Audit – GoldenRetriever.hair (Vercel Preview)

Prioritized list with file locations and exact suggested changes. High-impact first.

---

## 1. HIGH IMPACT

### 1.1 Page titles (50–60 chars, keyword + brand)

- **`src/app/layout.tsx`**  
  - Current default title: 58 chars ✓ (keep).  
  - Optional: shorten to **"Golden Retriever Guides, Tips & Products | GoldenRetriever.hair"** (56 chars) if you want “Golden Retriever” earlier.

- **`src/app/about/page.tsx`**  
  - Current: `"About GoldenRetriever.hair"` (23 chars) – too short, weak keyword.  
  - **Change to:**  
    `title: "About Us | Golden Retriever Tips & Community | GoldenRetriever.hair"`  
    (58 chars)

- **`src/app/products/page.tsx`**  
  - Current: `"Best Products for Golden Retrievers"` (34 chars).  
  - **Change to:**  
    `title: "Best Products for Golden Retrievers | GoldenRetriever.hair"`  
    (54 chars)

- **`src/app/golden-week/page.tsx`**  
  - Current: `"Golden Mobile App | Coming Soon for Goldens"` (42 chars).  
  - **Change to:**  
    `title: "Golden Retriever Mobile App | Coming Soon | GoldenRetriever.hair"`  
    (56 chars)

- **Blog post titles (with template become 70+ chars)**  
  - Template in layout: `"%s | GoldenRetriever.hair"` (~20 chars). So keep post titles in MDX to **~50–55 chars** so full title stays ≤60.  
  - **`src/app/blog/posts/golden-retriever-lean.mdx`**  
    - Current title: 62 chars → full ~82.  
    - **Change to:**  
      `title: "The Golden Retriever Lean: Why Personal Space Is Optional"`  
      (52 chars)  
  - **`src/app/blog/posts/chicken-cutlet-heist.mdx`**  
    - Current: 72 chars.  
    - **Change to:**  
      `title: "The Chicken Cutlet Heist: My Golden's Epic Counter-Surfing Crime"`  
      (56 chars)

---

### 1.2 Meta descriptions (120–160 chars, compelling)

- **`src/app/layout.tsx`**  
  - Current default: ~128 chars ✓. Keep.

- **`src/app/about/page.tsx`**  
  - Current: ~118 chars.  
  - **Change to:**  
    `description: "Meet the team behind GoldenRetriever.hair — your hub for Golden Retriever guides, puppy tips, training, products, and heartwarming stories. Start here."`  
    (120 chars)

- **`src/app/products/page.tsx`**  
  - Current: ~78 chars – too short.  
  - **Change to:**  
    `description: "Curated best products for Golden Retrievers: food, brushes, crates, toys, and more. Hand-picked by owners (Amazon Associates). Find what works for your Golden."`  
    (120 chars)

- **`src/app/guides/page.tsx`**  
  - Current: ~87 chars.  
  - **Change to:**  
    `description: "In-depth Golden Retriever guides on health, training, breeders, adoption, grooming, and lifelong care. Expert advice for responsible owners."`  
    (115 chars)

- **`src/app/blog/page.tsx`**  
  - Current: ~118 chars.  
  - **Change to:**  
    `description: "Latest Golden Retriever advice on puppy care, health, training, and grooming. Expert tips, practical guides, and trusted owner resources every week."`  
    (118 chars – already good; optional add “Read on GoldenRetriever.hair.” to hit ~140.)

- **`src/app/blog/posts/golden-head-tilt.mdx`**  
  - **Add or tighten description** so it’s 120–160 chars and includes “Golden Retriever” and a CTA, e.g.:  
    `description: "Why do Golden Retrievers tilt their heads? Science and fun behind the head tilt — and why it melts our hearts every time. Read more on GoldenRetriever.hair."`

---

### 1.3 Image alt text (hero, product, blog)

- **`src/app/blog/posts/golden-head-tilt.mdx`**  
  - Current: `featuredAlt: "Golden Retriever"` – too generic.  
  - **Change to:**  
    `featuredAlt: "Golden Retriever puppy with adorable head tilt and curious expression"`

- **Guides with empty `featuredAlt`** when a featured image is later added:  
  - In **`src/app/guides/[slug]/page.tsx`** and **`src/app/breeders/page.tsx`**, alt fallback is already `metadata.title` or `featuredAlt ?? title` ✓.  
  - When you add images to **nutrition.mdx**, **puppy-care.mdx**, **puppy-training.mdx**, **rescue-adoption.mdx**, set a descriptive `featuredAlt` (e.g. “Golden Retriever eating from bowl” for nutrition).

- **Products:**  
  - **`src/components/ProductsCategoryFilter.tsx`** uses `alt={product.title}` ✓. Product titles are descriptive; no change needed.

- **Hero (RandomHero):**  
  - **`src/components/RandomHero.tsx`** – alts are already descriptive ✓.

---

### 1.4 H1/H2 structure (one H1 per page, logical)

- **Blog post pages – duplicate H1:**  
  - **`src/app/blog/[slug]/page.tsx`** renders `<h1>{metadata.title}</h1>` and the MDX body also has `# Title` in **golden-head-tilt.mdx**, **golden-retriever-lean.mdx**, **chicken-cutlet-heist.mdx**, so those pages have **two H1s**.  
  - **Fix:** In those three MDX files, change the first `#` to `##` so the page has a single H1 (from the layout) and the rest are H2s.  
    - **golden-head-tilt.mdx:** line 12: `#` → `##`  
    - **golden-retriever-lean.mdx:** line 12: `#` → `##`  
    - **chicken-cutlet-heist.mdx:** line 12: `#` → `##`  
  - **hair-hair-everywhere.mdx** has no `#` in body; the only H1 is from the page ✓.

- **Homepage:**  
  - **`src/app/page.tsx`** – no H1 in the static section; **RandomHero** has the only H1 (“Welcome to GoldenRetriever.hair”) ✓.

- **Guides:**  
  - **`src/app/guides/[slug]/page.tsx`** – no extra H1 in the layout; H1 comes from the first `#` in each guide MDX ✓.  
  - **Nutrition guide** has `# Nutrition & Feeding Guide...` ✓.

- **Products, About, Blog index, Guides index, Golden-week:**  
  - Each has a single H1 ✓.

---

## 2. MEDIUM IMPACT

### 2.1 Article schema (blog and guide posts)

- **`src/app/blog/[slug]/page.tsx`**  
  - Add **Article** (or **BlogPosting**) JSON-LD next to the existing BreadcrumbList. Example (adjust `datePublished`/`dateModified` from metadata if you add them):

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: metadata.title,
      description: post.metadata.description ?? "",
      image: metadata.featuredImage
        ? (metadata.featuredImage.startsWith("/")
            ? `https://goldenretriever.hair${metadata.featuredImage}`
            : metadata.featuredImage)
        : undefined,
      datePublished: metadata.date ?? undefined,
      author: { "@type": "Organization", name: metadata.author ?? "GoldenRetriever.hair" },
      publisher: { "@type": "Organization", name: "GoldenRetriever.hair", url: "https://goldenretriever.hair" },
    }),
  }}
/>
```

- **`src/app/guides/[slug]/page.tsx`**  
  - Add the same **Article** (or **TechArticle**) JSON-LD using `guide.metadata` and the same `datePublished`/author/publisher pattern.

---

### 2.2 Internal linking (no broken links)

- All internal links found are valid routes: `/`, `/blog`, `/guides`, `/breeders`, `/products`, `/about`, `/golden-week`, `/guides/[slug]`, `/blog/[slug]`, `/products?category=...`.  
- **Recommendation:** Add a few contextual links from the homepage (e.g. in **`src/app/page.tsx`**) to key guides or blog posts (e.g. “Explore our [grooming guide](/guides/golden-retriever-grooming-guide) and [blog](/blog)”).

---

### 2.3 Open Graph (layout)

- **`src/app/layout.tsx`**  
  - `openGraph.title` is **"GoldenRetriever.hair"** – very short.  
  - **Change to:** use the same default title as the site:  
    `title: "GoldenRetriever.hair | Your Trusted Resource for Golden Retriever Owners"`  
  - Ensure **`/og-image.jpg`** exists in **`public/`** (referenced in layout). If missing, add a 1200×630 image or remove until ready.

---

## 3. LOWER PRIORITY

### 3.1 Duplicate / thin content

- **`src/app/guides/posts/nutrition.mdx`**  
  - Very short (“Coming soon” + one paragraph). Consider either expanding with life-stage portions, ingredient tips, and 2–3 sections, or noindex until the full guide is ready (e.g. in **generateMetadata** for that slug, set `robots: { index: false }`).

- **Repeated P.S. / app CTA**  
  - The same “P.S. If you’re obsessed with capturing…” block appears on breeders, blog post, and guide detail pages. Good for consistency; from an SEO perspective it’s mild duplicate. Optional: shorten to one line and link to `/golden-week` and newsletter.

---

### 3.2 FAQ schema

- No dedicated FAQ page found. If you add an FAQ section (e.g. on About or a new `/faq` page), add **FAQPage** JSON-LD with `mainEntity` array of questions/answers.

---

### 3.3 Canonical

- **`src/app/layout.tsx`** has `alternates: { canonical: "/" }` – that only sets canonical for the root. For other pages, Next.js will use the current path. If you use a different domain for preview (e.g. Vercel preview URL), ensure production canonical is `https://goldenretriever.hair/...` (metadataBase is already set ✓).

---

## Summary checklist

| Priority | Item | File(s) | Action |
|----------|------|---------|--------|
| High | About title + description | `about/page.tsx` | Longer title with keyword; description 120+ chars |
| High | Products title + description | `products/page.tsx` | Add brand to title; description 120–160 chars |
| High | Guides description | `guides/page.tsx` | Lengthen to 115+ chars |
| High | Golden-week title | `golden-week/page.tsx` | Add “Retriever” + brand |
| High | Blog post titles (lean, chicken) | `blog/posts/*.mdx` | Shorten so full title ≤60 chars |
| High | Blog head-tilt description + alt | `blog/posts/golden-head-tilt.mdx` | Better description + featuredAlt |
| High | Duplicate H1 on blog posts | `blog/posts/*.mdx` (3 files) | Change first `#` to `##` |
| Medium | Article schema | `blog/[slug]/page.tsx`, `guides/[slug]/page.tsx` | Add Article JSON-LD |
| Medium | OG title | `layout.tsx` | Use default site title; add/check og-image |
| Medium | Homepage internal links | `page.tsx` | Add 1–2 links to guides/blog |
| Low | Nutrition thin content | `guides/posts/nutrition.mdx` | Expand or noindex |
| Low | FAQ schema | Future FAQ page | Add FAQPage when you have FAQs |

After applying high-impact changes, re-check the Vercel preview (titles in tabs, meta in “View Source”, one H1 per page, and images with alt). Then run a quick crawl (e.g. Screaming Frog or Lighthouse) to confirm no broken internal links and schema validates.
