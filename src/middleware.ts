import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Legacy paths that must land on the final canonical URL in one hop
 * (including trailing-slash variants). Keys are without trailing slash.
 *
 * Paired with next.config `skipTrailingSlashRedirect` so Next does not
 * strip `/old/` → `/old` before these rules can fire.
 */
const LEGACY_REDIRECTS: Record<string, string> = {
  "/guides/nutrition": "/guides/best-dog-food-golden-retrievers-2026",
  "/recommended-products-for-your-golden-retriever": "/products",
  "/history-of-the-golden-retriever": "/guides/history-of-the-golden-retriever",
  "/best-grooming-tools-for-golden-retrievers": "/guides/best-brushes-golden-retrievers",
};

function rawPathname(request: NextRequest): string {
  // Use the platform URL, not NextURL — NextURL can normalize away trailing slashes.
  try {
    return new URL(request.url).pathname;
  } catch {
    return request.nextUrl.pathname;
  }
}

function redirectPreservingQuery(request: NextRequest, pathname: string) {
  const url = new URL(request.url);
  url.pathname = pathname;
  // NextResponse.redirect requires an absolute URL; query string is preserved.
  return NextResponse.redirect(url, 308);
}

export function middleware(request: NextRequest) {
  const pathname = rawPathname(request);

  if (pathname.length > 1 && pathname.endsWith("/")) {
    const withoutSlash = pathname.slice(0, -1);
    const legacyDestination = LEGACY_REDIRECTS[withoutSlash];
    if (legacyDestination) {
      return redirectPreservingQuery(request, legacyDestination);
    }
    // Preserve site-wide no-trailing-slash canonicalization.
    return redirectPreservingQuery(request, withoutSlash);
  }

  const legacyDestination = LEGACY_REDIRECTS[pathname];
  if (legacyDestination) {
    return redirectPreservingQuery(request, legacyDestination);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Exclude Next/Vercel internals, API routes, and any path with a file extension
     * (robots.txt, sitemap.xml, images, fonts, etc.).
     */
    "/((?!api(?:/|$)|_next(?:/|$)|favicon\\.ico|.*\\..*).*)",
  ],
};
