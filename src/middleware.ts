import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Legacy paths that must land on the final canonical URL in one hop
 * (including trailing-slash variants). Keys are without trailing slash.
 *
 * Paired with next.config `skipTrailingSlashRedirect` so Next does not
 * strip `/old/` → `/old` before these rules can fire.
 * www.goldenretriever.hair is folded into the same response.
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

const APEX_HOST = "goldenretriever.hair";

function publicHost(request: NextRequest): string {
  const raw =
    request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
  return raw.split(",")[0]?.trim().split(":")[0]?.toLowerCase() ?? "";
}

function redirectPreservingQuery(request: NextRequest, pathname: string) {
  const url = new URL(request.url);
  url.pathname = pathname;
  url.hash = "";

  const host = publicHost(request);
  // Production hosts must leave on the HTTPS apex in this same response.
  // Preview and local hosts keep their own origin so those deployments stay testable.
  if (host === APEX_HOST || host === `www.${APEX_HOST}`) {
    url.protocol = "https:";
    url.hostname = APEX_HOST;
    url.port = "";
  }

  return NextResponse.redirect(url, 308);
}

export function middleware(request: NextRequest) {
  const pathname = rawPathname(request);
  const host = publicHost(request);
  let target = pathname;

  if (pathname.length > 1 && pathname.endsWith("/")) {
    const withoutSlash = pathname.slice(0, -1);
    target = LEGACY_REDIRECTS[withoutSlash] ?? withoutSlash;
  } else if (LEGACY_REDIRECTS[pathname]) {
    target = LEGACY_REDIRECTS[pathname];
  }

  const pathNeedsRedirect = target !== pathname;
  const hostNeedsRedirect = host === `www.${APEX_HOST}`;
  if (!pathNeedsRedirect && !hostNeedsRedirect) {
    return NextResponse.next();
  }

  return redirectPreservingQuery(request, target);
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
