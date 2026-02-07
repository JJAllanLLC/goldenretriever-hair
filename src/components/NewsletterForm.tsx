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
        setMessage(
          typeof data?.error === "string"
            ? data.error
            : "Something went wrong. Please try again."
        );
        return;
      }
      setStatus("success");
      setMessage(
        typeof data?.message === "string"
          ? data.message
          : "Subscribed! Check inbox for welcome + giveaway entry."
      );
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
      <p
        className={
          isFooter
            ? "text-amber-100 font-semibold"
            : "text-white font-semibold drop-shadow-md"
        }
      >
        {message || "Subscribed! Check inbox for welcome + giveaway entry."}
      </p>
    );
  }

  return (
    <div className={`w-full text-center ${isHero ? "max-w-md mx-auto" : ""}`}>
      <p
        className={
          isFooter
            ? "text-base sm:text-lg text-amber-100 font-medium mb-4 px-2"
            : "text-lg text-white font-medium drop-shadow-md mb-4 px-2"
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
              ? "flex-1 px-6 py-4 rounded-full border-2 border-amber-300 bg-white/10 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-amber-900 focus:border-amber-400 disabled:opacity-70"
              : "flex-1 px-6 py-4 rounded-full border-2 border-amber-300 bg-black/20 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black/30 focus:border-amber-400 disabled:opacity-70"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold transition disabled:opacity-70 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-transparent"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {status === "error" && message && (
        <p className="mt-2 text-red-200 text-sm">{message}</p>
      )}
      <p
        className={
          isFooter
            ? "text-xs sm:text-sm text-amber-200/80 mt-3 px-2"
            : "text-xs sm:text-sm text-white/90 mt-3 px-2 drop-shadow-sm"
        }
      >
        {DISCLAIMER}
      </p>
      {isFooter && (
        <p className="text-xs text-amber-200/70 mt-1">No spam – unsubscribe anytime.</p>
      )}
    </div>
  );
}
