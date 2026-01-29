'use client';

export function HeroCarouselDots({ slideCount }: { slideCount: number }) {
  const handleDotClick = (index: number) => {
    const slides = document.querySelectorAll('.hero-slide');
    slides[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
      {Array.from({ length: slideCount }, (_, i) => (
        <button
          key={i}
          className="w-3 h-3 rounded-full bg-white/70 hover:bg-white transition"
          onClick={() => handleDotClick(i)}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}
