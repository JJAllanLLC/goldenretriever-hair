import { RandomHero } from "@/components/RandomHero";

export default function Home() {
  return (
    <>
      <RandomHero />

      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold text-center text-amber-900 mb-12">
            Fun Golden Facts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:-translate-y-1">
              <div className="text-6xl mb-4">🌊</div>
              <h3 className="text-2xl font-playfair font-semibold text-amber-800 mb-3">
                Webbed Feet Swimmers
              </h3>
              <p className="text-gray-700">
                Goldens have webbed feet, making them natural-born excellent swimmers.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:-translate-y-1">
              <div className="text-6xl mb-4">🧠</div>
              <h3 className="text-2xl font-playfair font-semibold text-amber-800 mb-3">
                Ranked 4th Smartest Breed
              </h3>
              <p className="text-gray-700">
                According to the AKC, Golden Retrievers are the 4th most intelligent dog breed—eager to learn and please.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:-translate-y-1">
              <div className="text-6xl mb-4">🥚</div>
              <h3 className="text-2xl font-playfair font-semibold text-amber-800 mb-3">
                Gentle Mouth
              </h3>
              <p className="text-gray-700">
                Known for their &quot;soft mouth,&quot; Goldens can carry delicate items like raw eggs without breaking them.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:-translate-y-1">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-2xl font-playfair font-semibold text-amber-800 mb-3">
                Ultimate Family Dogs
              </h3>
              <p className="text-gray-700">
                Gentle, patient, and affectionate—perfect companions for kids and adults alike.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:-translate-y-1">
              <div className="text-6xl mb-4">🐕‍🦺</div>
              <h3 className="text-2xl font-playfair font-semibold text-amber-800 mb-3">
                High Energy Athletes
              </h3>
              <p className="text-gray-700">
                Need 1–2 hours of daily exercise; they can run up to 30 mph and love fetch.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:-translate-y-1">
              <div className="text-6xl mb-4">🤗</div>
              <h3 className="text-2xl font-playfair font-semibold text-amber-800 mb-3">
                Emotional Intelligence
              </h3>
              <p className="text-gray-700">
                Goldens sense human emotions and provide comfort, making them top therapy dogs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:-translate-y-1">
              <div className="text-6xl mb-4">🔎</div>
              <h3 className="text-2xl font-playfair font-semibold text-amber-800 mb-3">
                Search & Rescue Heroes
              </h3>
              <p className="text-gray-700">
                Their strength, agility, and keen sense of smell make them excellent search and rescue dogs.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:-translate-y-1">
              <div className="text-6xl mb-4">🐶</div>
              <h3 className="text-2xl font-playfair font-semibold text-amber-800 mb-3">
                Loyal Velcro Dogs
              </h3>
              <p className="text-gray-700">
                Extremely loyal—they often follow owners everywhere, earning the &quot;velcro dog&quot; nickname.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:-translate-y-1">
              <div className="text-6xl mb-4">👃</div>
              <h3 className="text-2xl font-playfair font-semibold text-amber-800 mb-3">
                Strong Sense of Smell
              </h3>
              <p className="text-gray-700">
                Excellent trackers with noses 100,000 times more sensitive than humans.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
