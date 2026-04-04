"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

const HEADLINE = "Free Golden Retriever Cheat Sheet (instant access)";

const BODY_P1 =
  "Get the exact daily feeding, sleep, and care guide used by experienced Golden owners.";

const BODY_P2 =
  "Join the newsletter and get immediate access — plus tips, training advice, and real-world Golden insights.";

const SMALL_TEXT = "No spam — unsubscribe anytime.";

const SUCCESS_FALLBACK =
  "Subscribed! Check your inbox for your welcome email with the cheat sheet link.";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({
  variant = "footer",
  onSuccess,
  trackSuccessEvent,
}: {
  variant?: "footer" | "hero" | "standalone" | "dark" | "light";
  onSuccess?: () => void;
  trackSuccessEvent?: { event: string; category: string; label: string };
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
        typeof data?.message === "string" ? data.message : SUCCESS_FALLBACK
      );
      setEmail("");
      onSuccess?.();
      if (trackSuccessEvent) {
        trackEvent(trackSuccessEvent.event, {
          event_category: trackSuccessEvent.category,
          event_label: trackSuccessEvent.label,
        });
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const isFooter = variant === "footer";
  const isHero = variant === "hero";
  const isDark = variant === "dark";
  const isLight = variant === "light";

  const headlineClass =
    isLight
      ? "text-lg sm:text-xl text-amber-900 font-bold mb-3 px-2"
      : isDark
        ? "text-lg sm:text-xl text-gray-100 font-bold mb-3 px-2 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]"
        : isFooter
          ? "text-lg sm:text-xl text-amber-100 font-bold mb-3 px-2"
          : "text-xl sm:text-2xl text-white font-bold drop-shadow-md mb-3 px-2";

  const bodyClass =
    isLight
      ? "text-base sm:text-lg text-amber-900 font-medium mb-3 px-2 leading-relaxed"
      : isDark
        ? "text-base sm:text-lg text-gray-100 font-medium mb-3 px-2 leading-relaxed [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]"
        : isFooter
          ? "text-base sm:text-lg text-amber-100 font-medium mb-3 px-2 leading-relaxed"
          : "text-base sm:text-lg text-white font-medium drop-shadow-md mb-3 px-2 leading-relaxed";

  const smallClass =
    isLight
      ? "text-xs sm:text-sm text-gray-600 mt-3 px-2"
      : isDark
        ? "text-xs sm:text-sm text-gray-300 mt-3 px-2 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]"
        : isFooter
          ? "text-xs sm:text-sm text-amber-200/80 mt-3 px-2"
          : "text-xs sm:text-sm text-white/90 mt-3 px-2 drop-shadow-sm";

  if (status === "success") {
    return (
      <p
        className={
          isLight
            ? "text-amber-900 font-semibold"
            : isDark
              ? "text-gray-100 font-semibold [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]"
              : isFooter
                ? "text-amber-100 font-semibold"
                : "text-white font-semibold drop-shadow-md"
        }
      >
        {message || SUCCESS_FALLBACK}
      </p>
    );
  }

  return (
    <div className={`w-full text-center ${isHero || isDark || isLight ? "max-w-md mx-auto" : ""}`}>
      <p className={headlineClass}>{HEADLINE}</p>
      <p className={bodyClass}>{BODY_P1}</p>
      <p className={bodyClass}>{BODY_P2}</p>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === "loading"}
          className={
            isLight
              ? "w-full flex-1 px-6 py-4 rounded-full border-2 border-amber-300 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 disabled:opacity-70"
              : isDark
                ? "w-full flex-1 px-6 py-4 rounded-full border-2 border-amber-600 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 disabled:opacity-70"
                : isFooter
                  ? "flex-1 px-6 py-4 rounded-full border-2 border-amber-300 bg-white/10 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-amber-900 focus:border-amber-400 disabled:opacity-70"
                  : "flex-1 px-6 py-4 rounded-full border-2 border-amber-300 bg-black/20 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black/30 focus:border-amber-400 disabled:opacity-70"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold transition disabled:opacity-70 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-transparent w-full sm:w-auto"
        >
          {status === "loading" ? "Subscribing…" : "Get the Cheat Sheet"}
        </button>
      </form>
      {status === "error" && message && (
        <p
          className={
            isLight
              ? "mt-2 text-red-700 text-sm"
              : "mt-2 text-red-200 text-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]"
          }
        >
          {message}
        </p>
      )}
      <p className={smallClass}>{SMALL_TEXT}</p>
    </div>
  );
}
