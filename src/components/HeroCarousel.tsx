'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    src: "/images/hero-1.png",
    alt: "Golden Retriever close-up with joyful expression",
  },
  {
    src: "/images/hero-2.jpeg",
    alt: "Golden Retriever running in a sunny field",
  },
  {
    src: "/images/hero-3.jpeg",
    alt: "Golden Retriever swimming and fetching",
  },
  {
    src: "/images/hero-4.jpeg",
    alt: "Golden Retriever relaxing with family outdoors",
  },
];

export function HeroCarousel() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setIsDesktop(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const autoplayConfig = useMemo(
    () =>
      isDesktop
        ? { delay: 7000, disableOnInteraction: true, pauseOnMouseEnter: true }
        : false,
    [isDesktop]
  );

  return (
    <section className="relative h-screen md:h-[80vh] w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        loop
        autoplay={autoplayConfig}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.src}>
            <div className="relative h-full w-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="100vw"
                className={`object-cover ${index === 0 ? "scale-95" : "object-center"}`}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
