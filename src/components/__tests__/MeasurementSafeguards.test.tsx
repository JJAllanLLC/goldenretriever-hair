import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AffiliateClickAnalytics } from "@/components/AffiliateClickAnalytics";
import { NewsletterForm } from "@/components/NewsletterForm";
import { trackEvent } from "@/lib/analytics";

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  delete window.gtag;
  window.dataLayer = [];
  vi.unstubAllGlobals();
});

describe("measurement safeguards", () => {
  it("removes its delegated listener on unmount before a clean remount", () => {
    const gtagMock = vi.fn();
    window.gtag = gtagMock;
    window.history.replaceState({}, "", "/guides/grooming?email=private#tools");

    const anchor = document.createElement("a");
    anchor.href = "https://amzn.to/4safe123?tag=ignored";
    anchor.dataset.affiliateProduct = "Safe Grooming Brush";
    anchor.dataset.affiliatePlacement = "article_link";
    anchor.textContent = "Open Amazon";
    document.body.appendChild(anchor);

    const firstMount = render(<AffiliateClickAnalytics />);
    vi.useFakeTimers();
    act(() => {
      anchor.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    expect(gtagMock).toHaveBeenCalledOnce();
    expect(gtagMock).toHaveBeenLastCalledWith("event", "affiliate_click", {
      event_category: "affiliate",
      event_label: "Safe Grooming Brush",
      page_path: "/guides/grooming",
      link_domain: "amzn.to",
      affiliate_link_id: "4safe123",
      link_placement: "article_link",
      product_name: "Safe Grooming Brush",
    });

    firstMount.unmount();
    act(() => {
      anchor.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    expect(gtagMock).toHaveBeenCalledOnce();

    const secondMount = render(<AffiliateClickAnalytics />);
    act(() => {
      anchor.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    expect(gtagMock).toHaveBeenCalledTimes(2);

    secondMount.unmount();
    anchor.remove();
    expect(JSON.stringify(gtagMock.mock.calls)).not.toContain("private");
    expect(JSON.stringify(gtagMock.mock.calls)).not.toContain("tag=ignored");
  });

  it("does not block native link navigation when the analytics transport throws", () => {
    window.gtag = vi.fn(() => {
      throw new Error("analytics unavailable");
    });
    const { getByRole } = render(
      <>
        <AffiliateClickAnalytics />
        <a href="https://amzn.to/4safe456">Amazon product</a>
      </>
    );
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });

    let navigationAllowed = false;
    vi.useFakeTimers();
    expect(() => {
      act(() => {
        navigationAllowed = getByRole("link", { name: "Amazon product" }).dispatchEvent(event);
      });
    }).not.toThrow();
    expect(navigationAllowed).toBe(true);
    expect(event.defaultPrevented).toBe(false);
  });

  it("keeps a successful signup successful when the analytics transport throws", async () => {
    const gtagMock = vi.fn(() => {
      throw new Error("analytics unavailable");
    });
    window.gtag = gtagMock;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ message: "Subscribed! Check your inbox." }),
      })
    );
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/?utm_source=private#newsletter");

    render(<NewsletterForm variant="light" analyticsSource="home_inline" />);
    await user.type(screen.getByRole("textbox", { name: "Email address" }), "reader@example.com");
    await user.click(screen.getByRole("button", { name: "Get My Free Cheat Sheet" }));

    expect(await screen.findByText("Subscribed! Check your inbox.")).toBeInTheDocument();
    expect(gtagMock).toHaveBeenCalledOnce();
    expect(gtagMock).toHaveBeenCalledWith("event", "sign_up", {
      method: "newsletter",
      event_category: "newsletter",
      event_label: "home_inline",
      form_location: "home_inline",
      page_path: "/",
    });
    expect(JSON.stringify(gtagMock.mock.calls)).not.toContain("reader@example.com");
    expect(JSON.stringify(gtagMock.mock.calls)).not.toContain("utm_source");
  });

  it("does not emit sign_up for an HTTP 409 response", async () => {
    const gtagMock = vi.fn();
    window.gtag = gtagMock;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 409,
        json: async () => ({ error: "Already subscribed — thanks for being a Golden fan!" }),
      })
    );
    const user = userEvent.setup();

    render(<NewsletterForm variant="footer" analyticsSource="site_footer" />);
    await user.type(screen.getByRole("textbox", { name: "Email address" }), "reader@example.com");
    await user.click(screen.getByRole("button", { name: "Get My Free Cheat Sheet" }));

    expect(
      await screen.findByText("Already subscribed — thanks for being a Golden fan!")
    ).toBeInTheDocument();
    expect(gtagMock).not.toHaveBeenCalled();
  });

  it("does not emit sign_up when the newsletter request rejects", async () => {
    const gtagMock = vi.fn();
    window.gtag = gtagMock;
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network unavailable")));
    const user = userEvent.setup();

    render(<NewsletterForm variant="dark" analyticsSource="golden_week" />);
    await user.type(screen.getByRole("textbox", { name: "Email address" }), "reader@example.com");
    await user.click(screen.getByRole("button", { name: "Get My Free Cheat Sheet" }));

    expect(await screen.findByText("Something went wrong. Please try again.")).toBeInTheDocument();
    expect(gtagMock).not.toHaveBeenCalled();
  });

  it("pushes the exact PII-free payload through the dataLayer fallback", () => {
    delete window.gtag;
    window.dataLayer = [];

    trackEvent("sign_up", {
      method: "newsletter",
      event_category: "newsletter",
      event_label: "site_footer",
      form_location: "site_footer",
      page_path: "/guides/grooming",
    });

    expect(window.dataLayer).toEqual([
      {
        event: "sign_up",
        method: "newsletter",
        event_category: "newsletter",
        event_label: "site_footer",
        form_location: "site_footer",
        page_path: "/guides/grooming",
      },
    ]);
    expect(JSON.stringify(window.dataLayer)).not.toMatch(/@|email|utm_|\?/i);
  });
});
