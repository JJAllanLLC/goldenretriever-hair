import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FooterNewsletter } from "@/components/FooterNewsletter";

const usePathnameMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  usePathname: usePathnameMock,
}));

describe("FooterNewsletter", () => {
  beforeEach(() => {
    usePathnameMock.mockReset();
  });

  it("hides the duplicate footer form on the puppy sleep chart", () => {
    usePathnameMock.mockReturnValue("/guides/golden-retriever-puppy-sleep-chart");

    render(<FooterNewsletter />);

    expect(screen.queryByRole("textbox", { name: "Email address" })).not.toBeInTheDocument();
  });

  it("preserves the footer form on other routes", () => {
    usePathnameMock.mockReturnValue("/guides/golden-retriever-feeding-chart");

    render(<FooterNewsletter />);

    expect(screen.getByRole("textbox", { name: "Email address" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Get My Free Cheat Sheet" })).toBeInTheDocument();
  });
});
