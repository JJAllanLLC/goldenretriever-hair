"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function useScrollTracking() {
  useEffect(() => {
    const fired = { "50": false, "75": false, "100": false };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percent = Math.round((scrollTop / docHeight) * 100);

      if (percent >= 50 && !fired["50"]) {
        fired["50"] = true;
        trackEvent("scroll_50", { event_category: "engagement", event_label: "page_scroll" });
      }
      if (percent >= 75 && !fired["75"]) {
        fired["75"] = true;
        trackEvent("scroll_75", { event_category: "engagement", event_label: "page_scroll" });
      }
      if (percent >= 100 && !fired["100"]) {
        fired["100"] = true;
        trackEvent("scroll_100", { event_category: "engagement", event_label: "page_scroll" });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
