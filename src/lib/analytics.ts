declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Sends a custom event to GA4. Fires only in browser, fails silently if GA unavailable.
 */
export function trackEvent(
  eventName: string,
  params?: { event_category?: string; event_label?: string }
): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  } catch {
    // fail silently
  }
}
