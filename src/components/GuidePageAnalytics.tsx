"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { useScrollTracking } from "@/hooks/useScrollTracking";

export function GuidePageAnalytics({ title }: { title: string }) {
  useScrollTracking();

  useEffect(() => {
    trackEvent("guide_open", {
      event_category: "guide",
      event_label: title,
    });
  }, [title]);

  return null;
}
