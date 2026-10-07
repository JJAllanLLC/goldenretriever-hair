import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NewsletterForm } from "@/components/NewsletterForm";

const trackEventMock = vi.hoisted(() => vi.fn());
const fetchMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/analytics", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/analytics")>();
  return { ...actual, trackEvent: trackEventMock };
});

describe("NewsletterForm analytics", () => {
  beforeEach(() => {
    trackEventMock.mockClear();
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    window.history.replaceState(
      {},
      "",
      "/guides/golden-retriever-feeding-chart?utm_source=private#newsletter"
    );
  });

  it("emits one PII-free sign_up event only after API success", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Subscribed! Check your inbox." }),
    });
    const user = userEvent.setup();

    render(<NewsletterForm variant="light" analyticsSource="home_inline" />);

    await user.type(
      screen.getByRole("textbox", { name: "Email address" }),
      "reader@example.com"
    );
    await user.click(screen.getByRole("button", { name: "Get My Free Cheat Sheet" }));

    expect(await screen.findByText("Subscribed! Check your inbox.")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "reader@example.com" }),
    });
    expect(trackEventMock).toHaveBeenCalledOnce();
    expect(trackEventMock).toHaveBeenCalledWith("sign_up", {
      method: "newsletter",
      event_category: "newsletter",
      event_label: "home_inline",
      form_location: "home_inline",
      page_path: "/guides/golden-retriever-feeding-chart",
    });
    expect(JSON.stringify(trackEventMock.mock.calls)).not.toContain("reader@example.com");
    expect(JSON.stringify(trackEventMock.mock.calls)).not.toContain("utm_source");
  });

  it("submits from the keyboard and emits no event when the API rejects the signup", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Please enter a valid email address." }),
    });
    const user = userEvent.setup();

    render(<NewsletterForm variant="footer" analyticsSource="site_footer" />);

    await user.type(
      screen.getByRole("textbox", { name: "Email address" }),
      "reader@example.com"
    );
    await user.tab();
    await user.keyboard("{Enter}");

    expect(
      await screen.findByText("Please enter a valid email address.")
    ).toBeInTheDocument();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    expect(trackEventMock).not.toHaveBeenCalled();
  });

  it("uses the sleep-chart button and placement only after an HTTP 200 response", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ message: "Subscribed! Check your inbox." }),
    });
    const user = userEvent.setup();
    window.history.replaceState(
      {},
      "",
      "/guides/golden-retriever-puppy-sleep-chart?utm_source=private#daily-routine"
    );

    render(
      <NewsletterForm
        variant="light"
        analyticsSource="puppy_sleep_chart"
        buttonLabel="Email me the free cheat sheet"
        wrapButtonLabelBelow375
        showIntro={false}
        showSmallText={false}
      />
    );

    expect(screen.queryByText("Most Golden Retriever Owners Are Feeding the Wrong Amount")).not.toBeInTheDocument();
    expect(screen.queryByText("No spam. Unsubscribe anytime.")).not.toBeInTheDocument();
    await user.type(screen.getByRole("textbox", { name: "Email address" }), "reader@example.com");
    const submitButton = screen.getByRole("button", { name: "Email me the free cheat sheet" });
    expect(submitButton).toHaveClass("whitespace-normal", "min-[375px]:whitespace-nowrap");
    await user.click(submitButton);

    expect(await screen.findByText("Subscribed! Check your inbox.")).toBeInTheDocument();
    expect(trackEventMock).toHaveBeenCalledWith("sign_up", {
      method: "newsletter",
      event_category: "newsletter",
      event_label: "puppy_sleep_chart",
      form_location: "puppy_sleep_chart",
      page_path: "/guides/golden-retriever-puppy-sleep-chart",
    });
    expect(JSON.stringify(trackEventMock.mock.calls)).not.toContain("reader@example.com");
    expect(JSON.stringify(trackEventMock.mock.calls)).not.toContain("utm_source");
  });

  it("keeps the sleep-chart signup in place and emits no event after an API error", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: "Something went wrong. Please try again." }),
    });
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/guides/golden-retriever-puppy-sleep-chart");

    render(
      <NewsletterForm
        variant="light"
        analyticsSource="puppy_sleep_chart"
        buttonLabel="Email me the free cheat sheet"
        wrapButtonLabelBelow375
        showIntro={false}
        showSmallText={false}
      />
    );

    await user.type(screen.getByRole("textbox", { name: "Email address" }), "reader@example.com");
    await user.click(screen.getByRole("button", { name: "Email me the free cheat sheet" }));

    expect(await screen.findByText("Something went wrong. Please try again.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Email me the free cheat sheet" })).toBeInTheDocument();
    expect(trackEventMock).not.toHaveBeenCalled();
  });
});
