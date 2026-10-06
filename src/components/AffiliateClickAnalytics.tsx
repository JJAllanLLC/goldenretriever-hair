"use client";

import { useEffect } from "react";
import {
  getCurrentPagePath,
  trackEvent,
  type AnalyticsEventParams,
} from "@/lib/analytics";
import { getAffiliateProductName } from "@/lib/affiliate-products";

const AMAZON_SHORT_LINK_HOST = "amzn.to";

function getAffiliateLinkId(url: URL): string | undefined {
  const linkId = url.pathname.split("/").filter(Boolean).at(-1);
  return linkId || undefined;
}

/**
 * Tracks one GA4 event for every activated Amazon short link. Event delegation
 * covers links rendered from MDX/JSX without changing their navigation behavior.
 */
export function AffiliateClickAnalytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || !(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }

      if (url.hostname.toLowerCase() !== AMAZON_SHORT_LINK_HOST) return;

      const affiliateLinkId = getAffiliateLinkId(url);
      const productName =
        anchor.dataset.affiliateProduct?.trim() ||
        getAffiliateProductName(affiliateLinkId);
      const linkPlacement =
        anchor.dataset.affiliatePlacement?.trim() ||
        (anchor.closest("article") ? "article_link" : "site_link");

      const params: AnalyticsEventParams = {
        event_category: "affiliate",
        event_label: productName || affiliateLinkId || "amazon_short_link",
        page_path: getCurrentPagePath(),
        link_domain: AMAZON_SHORT_LINK_HOST,
        affiliate_link_id: affiliateLinkId,
        link_placement: linkPlacement,
      };

      if (productName) params.product_name = productName;

      trackEvent("affiliate_click", params);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
