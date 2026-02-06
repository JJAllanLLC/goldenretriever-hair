"use client";

import { useState } from "react";

const TEASER =
  "Subscribe for Golden tips, app updates, giveaway entries.";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({
  variant = "footer",
}: {
  variant?: "footer" | "hero" | "standalone";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const isFooter = variant === "footer";
  const isHero = variant === "hero";

  if (status === "success") {
    return (
      <p className="text-amber-100 font-semibold">
        Thanks! Check your inbox for a welcome note from us.
      </p>
    );
  }

  return (
    <div className={isHero ? "max-w-md mx-auto" : ""}>
      {!isFooter && (
        <p className="text-lg text-white drop-shadow-md mb-4">{TEASER}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className={
          isFooter
            ? "max-w-md mx-auto flex flex-col sm:flex-row gap-4"
            : "flex flex-col sm:flex-row gap-4"
        }
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          disabled={status === "loading"}
          className={
            isFooter
              ? "flex-1 px-6 py-4 rounded-full border border-orange-300 bg-white/10 text-white placeholder:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 disabled:opacity-70"
              : "flex-1 px-6 py-4 rounded-full border border-amber-200 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-70"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-amber-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-800 transition disabled:opacity-70 whitespace-nowrap"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {status === "error" && message && (
        <p className="mt-2 text-red-200 text-sm">{message}</p>
      )}
      {isFooter && (
        <p className="text-sm text-amber-200/90 mt-3">
          No spam – unsubscribe anytime.
        </p>
      )}
    </div>
  );
}
