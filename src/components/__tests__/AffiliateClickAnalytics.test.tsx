import { act, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AffiliateClickAnalytics } from "@/components/AffiliateClickAnalytics";

const trackEventMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/analytics", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/analytics")>();
  return { ...actual, trackEvent: trackEventMock };
});

describe("AffiliateClickAnalytics", () => {
  beforeEach(() => {
    trackEventMock.mockClear();
    window.history.replaceState(
      {},
      "",
      "/guides/golden-retriever-feeding-chart?email=private%40example.com#products"
    );
  });

  it("tracks an explicit MDX-style JSX Amazon anchor without blocking navigation", () => {
    const { getByText } = render(
      <>
        <AffiliateClickAnalytics />
        <article>
          <a href="https://amzn.to/4rt7coR" target="_blank" rel="nofollow sponsored noopener">
            <span>Check price on Amazon</span>
          </a>
        </article>
      </>
    );

    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      detail: 1,
    });

    let navigationAllowed = false;
    vi.useFakeTimers();
    act(() => {
      navigationAllowed = getByText("Check price on Amazon").dispatchEvent(event);
    });
    vi.clearAllTimers();
    vi.useRealTimers();

    expect(navigationAllowed).toBe(true);
    expect(event.defaultPrevented).toBe(false);
    expect(trackEventMock).toHaveBeenCalledOnce();
    expect(trackEventMock).toHaveBeenCalledWith("affiliate_click", {
      event_category: "affiliate",
      event_label: "4rt7coR",
      page_path: "/guides/golden-retriever-feeding-chart",
      link_domain: "amzn.to",
      affiliate_link_id: "4rt7coR",
      link_placement: "article_link",
    });
    expect(JSON.stringify(trackEventMock.mock.calls)).not.toContain("private@example.com");
    expect(JSON.stringify(trackEventMock.mock.calls)).not.toContain("email=");
  });

  it("tracks keyboard-generated clicks and ignores non-Amazon links", () => {
    const { getByRole } = render(
      <>
        <AffiliateClickAnalytics />
        <a href="https://amzn.to/4abc123" target="_blank" rel="nofollow sponsored noopener">
          Amazon product
        </a>
        <a href="https://example.com/product">Other product</a>
      </>
    );

    const keyboardClick = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      detail: 0,
    });

    vi.useFakeTimers();
    act(() => {
      getByRole("link", { name: "Amazon product" }).dispatchEvent(keyboardClick);
    });

    expect(keyboardClick.defaultPrevented).toBe(false);
    expect(trackEventMock).toHaveBeenCalledOnce();

    act(() => {
      getByRole("link", { name: "Other product" }).dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true })
      );
    });
    vi.clearAllTimers();
    vi.useRealTimers();

    expect(trackEventMock).toHaveBeenCalledOnce();
  });
});
