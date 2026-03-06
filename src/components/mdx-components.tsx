import type { MDXComponents } from "mdx/types";
import { trackEvent } from "@/lib/analytics";

type Metadata = { date?: string; author?: string };

export function getMDXComponents(
  components: MDXComponents = {},
  metadata?: Metadata
): MDXComponents {
  return {
    h1: ({ children }) => (
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-2">{children}</h1>
        {(metadata?.date || metadata?.author) && (
          <p className="text-gray-600 text-sm md:text-base">
            {[metadata?.date, metadata?.author].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    ),
    h2: ({ children }) => <h2 className="text-4xl font-bold text-amber-900 my-12">{children}</h2>,
    h3: ({ children }) => <h3 className="text-3xl font-bold text-amber-900 my-10">{children}</h3>,
    p: ({ children }) => <p className="text-lg text-gray-800 my-8">{children}</p>,
    ul: ({ children }) => <ul className="my-8 space-y-6">{children}</ul>,
    li: ({ children }) => (
      <li className="flex items-start gap-4 text-lg text-gray-800">
        <span className="text-amber-700 text-2xl">🐾</span>
        <span>{children}</span>
      </li>
    ),
    a: ({ children, href, className, ...props }) => {
      const isAffiliate = href && String(href).includes("amzn.to");
      return (
        <a
          href={href}
          className={className ?? "text-amber-700 underline hover:text-amber-900"}
          onClick={
            isAffiliate
              ? (e) =>
                  trackEvent("affiliate_click", {
                    event_category: "affiliate",
                    event_label: (e.currentTarget as HTMLAnchorElement).textContent?.trim() || "Amazon",
                  })
              : undefined
          }
          {...props}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="text-amber-900 font-bold">{children}</strong>,
    ...components,
  };
}
