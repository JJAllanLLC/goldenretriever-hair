'use client';

import Image from "next/image";
import Link from "next/link";

const images = [
  {
    src: "/images/hero-1.png",
    alt: "Two happy Golden Retrievers smiling close-up",
  },
  {
    src: "/images/hero-2.jpeg",
    alt: "Golden Retriever running across a sunny field",
  },
  {
    src: "/images/hero-3.jpeg",
    alt: "Golden Retriever swimming and fetching in water",
  },
  {
    src: "/images/hero-4.jpeg",
    alt: "Golden Retriever relaxing outdoors with family",
  },
];

export function RandomHero() {
  const heroImage = images[Math.floor(Math.random() * images.length)];

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
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white drop-shadow-md mb-4">
              Welcome to GoldenRetriever.hair
            </h1>
            <p className="text-xl md:text-2xl text-white drop-shadow-md mb-8">
              Your go-to spot for everything Golden Retriever – from puppy dreams to lifelong care.
              Discover expert guides, health tips, hand-picked products, and more for owners and
              admirers alike.
            </p>
            <Link
              href="/guides"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition"
            >
              Explore Guides
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
