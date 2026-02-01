import { HeroCarousel } from "@/components/HeroCarousel";

export default function Home() {
  return (
    <>
      <HeroCarousel />

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
    </>
  );
}
