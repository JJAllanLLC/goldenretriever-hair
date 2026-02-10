"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const images = [
  {
    src: "/images/hero-1.jpg",
    alt: "Two happy golden retrievers sitting side by side indoors with tongues out and joyful expressions",
  },
  {
    src: "/images/hero-2.jpeg",
    alt: "Playful golden retriever close-up with tongue out and joyful expression looking up",
  },
  {
    src: "/images/hero-3.jpeg",
    alt: "Curious golden retriever close-up with wet nose and expressive eyes looking up outdoors",
  },
  {
    src: "/images/hero-4.jpeg",
    alt: "Adorable golden retriever puppy sitting indoors next to stuffed mouse toy with curious expression",
  },
  {
    src: "/images/hero-5.jpeg",
    alt: "Happy golden retriever at baseball field with tongue out enjoying sunny game day",
  },
  {
    src: "/images/hero-6.jpeg",
    alt: "Relaxed golden retriever wearing gaming headphones lying on pet bed indoors",
  },
  {
    src: "/images/hero-7.jpeg",
    alt: "Golden retriever in tuxedo bow tie with cute formal pose outdoors",
  },
  {
    src: "/images/hero-8.jpeg",
    alt: "Golden retriever in car back seat looking out window on sunny road trip",
  },
  {
    src: "/images/hero-9.jpeg",
    alt: "Golden retriever lying on floor chewing large bone toy with focused expression",
  },
  {
    src: "/images/hero-11.jpeg",
    alt: "Playful golden retriever close-up with tongue out and joyful expression",
  },
  {
    src: "/images/hero-15.jpeg",
    alt: "Playful golden retriever close-up with tongue out and joyful expression",
  },
  {
    src: "/images/hero-17.jpeg",
    alt: "Two golden retrievers looking out window with curious expressions",
  },
  {
    src: "/images/hero-18.jpeg",
    alt: "Relaxed golden retriever resting with tennis ball next to her and content expression",
  },
  {
    src: "/images/hero-20.jpeg",
    alt: "Golden retriever looking up lovingly at young child with affectionate expression",
  },
  {
    src: "/images/hero-21.jpeg",
    alt: "Golden retriever looking up with dirt on muzzle after outdoor adventure",
  },
];

export function RandomHero() {
  const [heroIndex, setHeroIndex] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeroIndex(Math.floor(Math.random() * images.length));
  }, []);

  if (heroIndex === null) {
    return (
      <section className="relative h-screen md:h-[80vh] w-full bg-black/30">
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white drop-shadow-md mb-2">
              Everything Golden Retrievers
            </h1>
            <p className="text-base md:text-lg text-white/90 font-normal drop-shadow-md mb-4">
              Plus our monthly Golden of the Month photo competition — coming soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const heroImage = images[heroIndex];

  return (
    <section className="relative h-screen md:h-[80vh] w-full">
      <div className="relative h-full w-full">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white drop-shadow-md mb-2">
              Everything Golden Retrievers
            </h1>
            <p className="text-base md:text-lg text-white/90 font-normal drop-shadow-md mb-4">
              Plus our monthly Golden of the Month photo competition — coming soon.
            </p>
            <p className="text-xl md:text-2xl text-white drop-shadow-md mb-8">
              Trusted guides, grooming tips, and resources for every stage of Golden life.
            </p>
            <Link
              href="/golden-week"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition"
            >
              Golden of the Month — Coming Soon
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
