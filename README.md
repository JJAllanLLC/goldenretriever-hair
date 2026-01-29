**Site Name:** GoldenRetriever.hair  
**Current Status:** Lightweight WordPress landing page (to be fully replaced)  
**Goal:** Modern, authoritative, SEO-optimized hub for Golden Retriever owners and enthusiasts. Helpful content first, ethical monetization second, cross-promotion for JJ Allan LLC (positioned as the expert agency behind the site) and the upcoming Golden Week mobile app.

**Tech Stack**  
- Next.js (App Router) + Tailwind CSS + TypeScript  
- Deployment: Vercel  
- Content: MDX files in-repo (simple, version-controlled, AI-friendly editing; structured for future headless CMS migration if needed)

**Core Priorities**  
- SEO baked in from day one (speed, schema, keywords, internal linking)  
- Tasteful, non-spammy user experience  
- Future-proof architecture (navigation, URLs, data placeholders)

## MVP Launch Features (Build these first)

1. **Home Page** (`/`)  
   - Hero carousel with high-quality Golden Retriever photos  
   - Punchy tagline (“Everything Golden – Care, Fun, Community”)  
   - Grid of top fun facts (card layout, curated from original site)  
   - Featured latest blog posts  
   - Golden Week app teaser/section  
   - Subtle JJ Allan LLC branding and footer link  

2. **Main Navigation**  
   - Top nav bar: Home, Blog, Guides, Breeder Directory, Products, Golden Week App, About  
   - Reserved slot for future Community section (Phase 2)

3. **Blog / Articles Section** (`/blog`)  
   - Category-based blog system  
   - Categories: Puppy Care, Health & Wellness, Training & Behavior, Grooming & Shedding, Nutrition, Senior Goldens, Fun & Lifestyle  
   - SEO-optimized post template (headings, internal links, schema)

4. **Guides & Resources Section** (`/guides`)  
   - Long-form evergreen pillar pages, including:  
     - Expanded “How to Choose a Reputable Breeder” guide (links to directory)  
     - Common Health Issues & Prevention  
     - Downloadable checklists (puppy prep, vet visits, etc.) as lead magnets

5. **Product Recommendations Section** (`/products`)  
   - Curated shop-style pages or category hubs (food, toys, grooming tools, beds, etc.)  
   - Honest reviews with pros/cons  
   - Genuine Amazon Associates affiliate links only on truly endorsed products

6. **Breeder Directory** (`/directory`)  
   - Dedicated vetted directory page  
   - Free basic listings + paid featured/top-of-list placements  
   - Enhanced paid profiles: direct website links, more photos, health testing details, moderated user reviews  
   - Manual approval process with published ethical/health-testing criteria  
   - Clear disclaimer and transparency

7. **Golden Week App Page** (`/app`)  
   - Landing page with mockups/screenshots, feature list, waitlist/signup form  
   - Cross-links from blog posts, home, and relevant guides

8. **About Page** (`/about`)  
   - Warm, personal tone from the site’s perspective (no individual owner name revealed)  
   - Highlight passion for the breed and site mission  
   - Thank-you statement: “We’re grateful to the expert team at JJ Allan LLC for turning our vision into a technical reality with cutting-edge development.”  
   - Links to JJ Allan LLC services/site for cross-promotion

9. **Tasteful Monetization**  
   - Amazon Associates links in product recs and relevant blog posts  
   - Limited banner ads (max 2–3 placements: sidebar, mid-content, footer) via Ezoic/Mediavine/Amazon native — clean, non-intrusive  
   - Paid breeder directory features (recurring revenue)  
   - No pop-ups, overlays, or aggressive tactics  
   - *Note:* Banner ad component flexible — can minimize/remove if revenue shifts

10. **SEO Foundations**  
    - Next.js SSG/SSR for speed and Core Web Vitals  
    - Proper heading structure, schema markup (Article, FAQ, Product, Organization/ItemList)  
    - XML sitemap, robots.txt, optimized meta titles/descriptions  
    - Image alt text, internal linking strategy, keyword-targeted content

11. **Basic Contact / Newsletter Signup**  
    - Simple contact form  
    - Newsletter/signup (Mailchimp or similar) in footer and strategic spots  
    - Doubles as Golden Week app waitlist builder

## Phase 2 / Future Additions (Architecture prepped during MVP)
- **Community Features**  
  - User photo gallery  
  - Moderated site-wide comments  
  - Light forum or user stories section  
  - Navigation and data schema placeholders added now

## Content Management
- All blog posts, guides, and static content stored as MDX files in `/content`  
- Easy AI-assisted editing (Cursor/ChatGPT)  
- Full GitHub version control  
- Structured for painless future migration to headless CMS (Sanity/Contentful) if desired

---

This document is locked in as our master plan. Save it at the root of the repo — it will guide every commit.

Ready for the next move? Run the `create-next-app` command and push the skeleton to GitHub, or let me know which page/component you want code for first (Navbar, Home hero, etc.). Once the repo is live on Vercel, we can start seeing real progress instantly.
