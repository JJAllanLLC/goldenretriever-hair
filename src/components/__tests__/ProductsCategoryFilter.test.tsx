import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AffiliateClickAnalytics } from "@/components/AffiliateClickAnalytics";
import { ProductsCategoryFilter } from "@/components/ProductsCategoryFilter";

const trackEventMock = vi.hoisted(() => vi.fn());
const routerPushMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/analytics", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/analytics")>();
  return { ...actual, trackEvent: trackEventMock };
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: routerPushMock }),
  useSearchParams: () => new URLSearchParams(),
}));

const product = {
  title: "Test Golden Brush",
  description: "A representative product.",
  amazonLink: "https://amzn.to/4test123",
  category: "Grooming",
};

describe("ProductsCategoryFilter analytics", () => {
  beforeEach(() => {
    trackEventMock.mockClear();
    routerPushMock.mockClear();
    window.history.replaceState({}, "", "/products?category=Grooming#top");
  });

  it("emits one affiliate event plus product_click for a product-title activation", () => {
    render(
      <>
        <AffiliateClickAnalytics />
        <ProductsCategoryFilter products={[product]} />
      </>
    );

    const titleLink = screen.getByRole("link", { name: product.title });
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      detail: 1,
    });

    act(() => {
      titleLink.dispatchEvent(event);
    });

    expect(event.defaultPrevented).toBe(false);
    expect(trackEventMock).toHaveBeenCalledTimes(2);
    expect(trackEventMock).toHaveBeenNthCalledWith(1, "product_click", {
      event_category: "product",
      event_label: product.title,
    });
    expect(trackEventMock).toHaveBeenNthCalledWith(2, "affiliate_click", {
      event_category: "affiliate",
      event_label: product.title,
      page_path: "/products",
      link_domain: "amzn.to",
      affiliate_link_id: "4test123",
      link_placement: "product_title",
      product_name: product.title,
    });
  });

  it("emits exactly one affiliate event for a CTA tap/click", () => {
    render(
      <>
        <AffiliateClickAnalytics />
        <ProductsCategoryFilter products={[product]} />
      </>
    );

    const ctaLink = screen.getByRole("link", { name: "Check price on Amazon →" });
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      detail: 1,
    });

    act(() => {
      ctaLink.dispatchEvent(event);
    });

    expect(event.defaultPrevented).toBe(false);
    expect(trackEventMock).toHaveBeenCalledOnce();
    expect(trackEventMock).toHaveBeenCalledWith(
      "affiliate_click",
      expect.objectContaining({
        event_label: product.title,
        affiliate_link_id: "4test123",
        link_placement: "product_cta",
        product_name: product.title,
      })
    );
  });
});
