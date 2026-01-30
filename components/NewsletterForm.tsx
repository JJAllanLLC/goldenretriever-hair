'use client';

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder – real integration later
    console.log("Signup:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="bg-amber-100 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-playfair font-bold text-amber-900 mb-4">
          Join the GoldenRetriever.hair Newsletter
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Get exclusive tips, Golden Week app updates, and more – straight to your inbox.
        </p>
        {submitted ? (
          <p className="text-green-700 font-semibold">Thanks! You&apos;re on the list.</p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-6 py-4 rounded-full text-gray-900"
            />
            <button type="submit" className="bg-amber-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-800 transition">
              Subscribe
            </button>
          </form>
        )}
        <p className="text-sm text-gray-600 mt-4">No spam – unsubscribe anytime.</p>
      </div>
    </div>
  );
}
