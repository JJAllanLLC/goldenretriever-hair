"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { useScrollTracking } from "@/hooks/useScrollTracking";

export function BlogPageAnalytics({ title }: { title: string }) {
  useScrollTracking();

  useEffect(() => {
    trackEvent("blog_open", {
      event_category: "blog",
      event_label: title,
    });
  }, [title]);

  return null;
}
