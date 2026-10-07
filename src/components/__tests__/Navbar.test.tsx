import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Navbar } from "@/components/Navbar";

describe("Navbar mobile menu", () => {
  it("uses a 44px control and exposes its open state to assistive technology", async () => {
    const user = userEvent.setup();

    render(<Navbar />);

    const menuButton = screen.getByRole("button", { name: "Open menu" });
    expect(menuButton).toHaveClass("h-11", "w-11");
    expect(menuButton).toHaveAttribute("aria-controls", "mobile-navigation");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).not.toBeInTheDocument();

    menuButton.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    const mobileNavigation = screen.getByRole("navigation", { name: "Mobile navigation" });
    const mobileLinks = within(mobileNavigation);
    expect(mobileNavigation).toBeInTheDocument();
    expect(mobileLinks.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(mobileLinks.getByRole("link", { name: "Guides" })).toHaveAttribute("href", "/guides");
    expect(mobileLinks.getByRole("link", { name: "Products" })).toHaveAttribute("href", "/products");

    await user.keyboard(" ");

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).not.toBeInTheDocument();
  });
});
