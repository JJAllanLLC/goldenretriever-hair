"use client";

import { usePathname } from "next/navigation";
import { NewsletterForm } from "@/components/NewsletterForm";

const SLEEP_GUIDE_PATH = "/guides/golden-retriever-puppy-sleep-chart";

export function FooterNewsletter() {
  const pathname = usePathname();

  if (pathname === SLEEP_GUIDE_PATH) return null;

  return (
    <div className="mb-8">
      <NewsletterForm variant="footer" analyticsSource="site_footer" />
    </div>
  );
}
