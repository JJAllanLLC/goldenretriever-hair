declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type AnalyticsEventParams = {
  event_category?: string;
  event_label?: string;
  method?: string;
  page_path?: string;
  form_location?: string;
  link_domain?: string;
  affiliate_link_id?: string;
  link_placement?: string;
  product_name?: string;
};

/**
 * Returns only the path portion of the current URL. Query strings and hashes are
 * intentionally excluded so analytics events cannot copy arbitrary URL data.
 */
export function getCurrentPagePath(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname || "/";
}

/**
 * Sends a custom event to GA4. Fires only in browser, fails silently if GA unavailable.
 * Prefers gtag when available; falls back to dataLayer.push for GTM/custom listeners.
 */
export function trackEvent(
  eventName: string,
  params?: AnalyticsEventParams
): void {
  if (typeof window === "undefined") return;
  try {
    const eventParams = params ?? {};
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, eventParams);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...eventParams,
      });
    }
  } catch {
    // fail silently
  }
}
