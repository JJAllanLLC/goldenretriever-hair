"use client";

import { useState } from "react";

const TEASER =
  "Free Newsletter: Golden stories, tips & more — plus automatic entry to win a custom mug with your Golden's photo!";

const DISCLAIMER =
  "One entry per subscriber; winner announced monthly.";

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
    <div className={`w-full text-center ${isHero ? "max-w-md mx-auto" : ""}`}>
      <p
        className={
          isFooter
            ? "text-base sm:text-lg text-amber-100 font-medium mb-4 px-2"
            : "text-lg text-white drop-shadow-md mb-4 px-2"
        }
      >
        {TEASER}
      </p>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
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
              ? "flex-1 px-6 py-4 rounded-full border border-amber-300 bg-white/10 text-white placeholder:text-amber-200/80 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 disabled:opacity-70"
              : "flex-1 px-6 py-4 rounded-full border border-amber-200 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-70"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold transition disabled:opacity-70 whitespace-nowrap focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {status === "error" && message && (
        <p className="mt-2 text-red-200 text-sm">{message}</p>
      )}
      <p className="text-xs sm:text-sm text-amber-200/80 mt-3 px-2">
        {DISCLAIMER}
      </p>
      {isFooter && (
        <p className="text-xs text-amber-200/70 mt-1">No spam – unsubscribe anytime.</p>
      )}
    </div>
  );
}
