'use client';

import React from 'react';

interface HeroCarouselDotsProps {
  slideCount: number;
}

export function HeroCarouselDots({ slideCount }: HeroCarouselDotsProps) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
      {Array.from({ length: slideCount }, (_, index) => (
        <button
          key={index}
          className="w-3 h-3 rounded-full bg-white/70 hover:bg-white transition"
          onClick={() => {
            const slides = document.querySelectorAll('.snap-center');
            slides[index]?.scrollIntoView({ behavior: "smooth" });
          }}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
