import Image from "next/image";
import Link from "next/link";

const images = [
  {
    src: "/images/hero/hero-1.jpg",
    alt: "Two happy Golden Retrievers smiling close-up",
  },
  {
    src: "/images/hero/hero-2.jpg",
    alt: "Golden Retriever running across a sunny field",
  },
  {
    src: "/images/hero/hero-3.jpg",
    alt: "Golden Retriever swimming and fetching in water",
  },
  {
    src: "/images/hero/hero-4.jpg",
    alt: "Golden Retriever relaxing outdoors with family",
  },
];

export default function Home() {
  const heroImage = images[Math.floor(Math.random() * images.length)];

  return (
    <>
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

      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold text-center text-amber-900 mb-12">
            Fun Golden Facts
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
    </>
  );
}
