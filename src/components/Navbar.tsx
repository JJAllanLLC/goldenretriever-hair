'use client';

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-amber-50 border-b border-amber-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-amber-700 font-playfair">
              GoldenRetriever.hair
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-amber-700 font-medium">Home</Link>
            <Link href="/blog" className="text-gray-700 hover:text-amber-700 font-medium">Blog</Link>
            <Link href="/guides" className="text-gray-700 hover:text-amber-700 font-medium">Guides</Link>
            <Link href="/breeders" className="text-gray-700 hover:text-amber-700 font-medium">Finding a Golden Puppy</Link>
            <Link href="/products" className="text-gray-700 hover:text-amber-700 font-medium">Products</Link>
            <Link href="/golden-week" className="text-amber-700 font-semibold hover:underline">Golden Mobile App</Link>
            <Link href="/about" className="text-gray-700 hover:text-amber-700 font-medium">About</Link>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-amber-50 border-t border-amber-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-amber-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/blog" className="block px-3 py-2 text-gray-700 hover:text-amber-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
              <Link href="/guides" className="block px-3 py-2 text-gray-700 hover:text-amber-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Guides</Link>
              <Link href="/breeders" className="block px-3 py-2 text-gray-700 hover:text-amber-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Finding a Golden Puppy</Link>
              <Link href="/products" className="block px-3 py-2 text-gray-700 hover:text-amber-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Products</Link>
              <Link href="/golden-week" className="block px-3 py-2 text-amber-700 font-semibold hover:underline" onClick={() => setMobileMenuOpen(false)}>Golden Mobile App</Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-amber-700 font-medium" onClick={() => setMobileMenuOpen(false)}>About</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
