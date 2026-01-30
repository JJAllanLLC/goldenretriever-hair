import Link from "next/link";
import { HeroCarouselDots } from '@/components/HeroCarouselDots';

export default function Home() {
  const heroImages = [
    {
      url: "/images/hero/hero-1.png",
      alt: "Joyful Golden Retriever close-up with tongue out – happy and playful family companion",
    },
    {
      url: "/images/hero/hero-2.jpeg",
      alt: "Your Golden Retriever enjoying the outdoors – gentle and loving temperament",
    },
    {
      url: "/images/hero/hero-3.jpeg",
      alt: "Adorable Golden Retriever in action – intelligent and eager to please",
    },
    {
      url: "/images/hero/hero-4.jpeg",
      alt: "Golden Retriever natural energy moment – perfect water-loving breed",
    },
  ];

  return (
    <>
      {/* Hero Carousel - JS-free scroll snap */}
      <section className="relative h-screen overflow-hidden">
        <div className="flex snap-x snap-mandatory overflow-x-auto h-full hide-scrollbar">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className="hero-slide snap-center flex-shrink-0 w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${image.url})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center text-center px-8">
                <div className="max-w-4xl">
                  <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white drop-shadow-lg mb-4">
                    Welcome to GoldenRetriever.hair
                  </h1>
                  <p className="text-xl md:text-2xl text-white drop-shadow mb-8">
                    Your trusted resource for Golden Retriever owners – expert guides, health tips, vetted breeders, curated products, and more.
                  </p>
                  <Link
                    href="/guides"
                    className="bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transition"
                  >
                    Explore Guides
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <HeroCarouselDots slideCount={heroImages.length} />
      </section>

      {/* Fun Facts Grid */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold text-center text-amber-900 mb-12">
            Fun Golden Retriever Facts
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-2xl font-playfair font-semibold text-amber-800 mb-3">
                Ultimate Family Dogs
              </h3>
              <p className="text-gray-700">
                Known for their gentle, patient temperament – perfect companions for kids and adults alike.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-6xl mb-4">🌊</div>
              <h3 className="text-2xl font-playfair font-semibold text-amber-800 mb-3">
                Water Lovers
              </h3>
              <p className="text-gray-700">
                Bred as hunting retrievers, Goldens adore swimming and fetching.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-6xl mb-4">🧠</div>
              <h3 className="text-2xl font-playfair font-semibold text-amber-800 mb-3">
                Highly Intelligent
              </h3>
              <p className="text-gray-700">
                Ranked 4th smartest dog breed – eager to learn and please.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Golden Week Teaser */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-8">
            Coming Soon: Golden Week App
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            The ultimate mobile app for Golden Retriever owners – health tracking, community features, training tips, and exclusive content.
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email for waitlist"
                className="px-6 py-4 rounded-full text-gray-900 flex-1"
              />
              <button className="bg-white text-amber-800 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition">
                Join Waitlist
              </button>
            </form>
            <p className="text-sm mt-4 opacity-80">Be the first to know when we launch!</p>
          </div>
        </div>
      </section>

      {/* Latest Posts Placeholder */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold text-center text-amber-900 mb-12">
            Latest from the Blog
          </h2>
          <p className="text-center text-xl text-gray-600">Blog coming soon – expert tips on puppy care, health, training, and more.</p>
        </div>
      </section>
    </>
  );
}
