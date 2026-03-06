"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function GoldenWeekAnalytics() {
  useEffect(() => {
    trackEvent("golden_view_profile", {
      event_category: "golden_of_month",
      event_label: "view",
    });
  }, []);

  return null;
}
