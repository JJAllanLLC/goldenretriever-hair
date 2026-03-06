declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Sends a custom event to GA4. Fires only in browser, fails silently if GA unavailable.
 * Prefers gtag when available; falls back to dataLayer.push for GTM/custom listeners.
 */
export function trackEvent(
  eventName: string,
  params?: { event_category?: string; event_label?: string }
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
