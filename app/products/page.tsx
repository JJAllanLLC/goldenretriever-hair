import { ProductsCategoryFilter } from "@/components/ProductsCategoryFilter";

export const metadata = {
  title: "Best Products for Golden Retrievers",
  description:
    "Curated top products for Golden Retrievers – brushes, food, toys (Amazon Associates links).",
};

const products = [
  {
    title: "Hill's Science Diet Large Breed Adult Dry Dog Food (Lamb Meal & Brown Rice)",
    description:
      "Balanced nutrition for large breed adults – supports joint health, digestion, and immune system.",
    personalComment:
      "Our Goldens switched to this food about one year ago and they still love it. Gentle on stomachs and is keeping their coats shiny! 🐾",
    amazonLink: "https://amzn.to/45GjTnt",
    image: "/images/products/hills_science_food.png",
    category: "Food/Treats",
  },
  {
    title: "Purina Pro Plan Sensitive Skin & Stomach Adult Dry Dog Food (Salmon & Rice Formula)",
    description: "Sensitive Skin, Digestive Health, Immune Support, Skin and Coat Health.",
    personalComment:
      "Helped with Cosmo’s digestion issues that he had since he was a pup. Reliability issues at times being in stock. 🐾",
    amazonLink: "https://amzn.to/4kcP5Rk",
    image: "/images/products/purina_proplan.png",
    category: "Food/Treats",
  },
  {
    title: "Canidae All Life Stages Multi-Protein Formula Dry Dog Food (Chicken, Turkey, Lamb Meals)",
    description:
      "High-protein nutrition for all life stages – real meat first ingredients for active Goldens.",
    personalComment:
      "We have happily fed our goldens with Multi-Protein Chicken, Turkey and Lamb Meals Formulas. Reliable all-ages option! 🐾",
    amazonLink: "https://amzn.to/46mR3IW",
    image: "/images/products/canidae.png",
    category: "Food/Treats",
  },
  {
    title: "Fromm Four-Star Nutritionals Surf & Turf Grain-Free Dry Dog Food",
    description:
      "Premium grain-free formula with salmon, chicken, and duck – real meat for picky eaters and coat health.",
    personalComment:
      "Great for picky eaters, and we noticed shinier coats after a few weeks. Has been successfully used to feed our puppies. 🐾",
    amazonLink: "https://amzn.to/4kcWikm",
    image: "/images/products/fromm.png",
    category: "Food/Treats",
  },
  {
    title: "Stewart Pro-Treat Beef Liver Freeze-Dried Dog Treats",
    description:
      "Single-ingredient freeze-dried beef liver – high-value rewards for training.",
    personalComment:
      "Our go-to “high value” treat. We save these for moments when we really need them to listen, like recall training or new tricks. Our Goldens go nuts for these. Use sparingly! 🐾",
    amazonLink: "https://amzn.to/3MbOin7",
    image: "/images/products/stewart.jpeg",
    category: "Training",
  },
  {
    title: "Zuke’s Mini Naturals Training Dog Treats",
    description:
      "Made with high-quality real ingredients – free from artificial colors, flavors, and preservatives.",
    personalComment:
      "Great for training sessions. They’re small, soft, and come in flavors like chicken or peanut butter. Low calorie, so you can give multiple in a row. 🐾",
    amazonLink: "https://amzn.to/4q830cM",
    image: "/images/products/zukes.jpeg",
    category: "Training",
  },
  {
    title: "MidWest Homes for Pets iCrate Folding Dog Crate",
    description:
      "Larger size (42 x 28 x 30) – Best for home use, more room to stretch (especially for males). Smaller size (36 x 23 x 25) – Great for travel, fits most SUVs/vans.",
    personalComment:
      "Reliable folding crate for home or travel – our Goldens love the space! 🐾",
    amazonLink: "https://amzn.to/4rq298l",
    image: "/images/products/midwest.png",
    category: "Essentials",
  },
  {
    title: "Mars Coat King Dematting Undercoat Grooming Rake Stripper Tool (20-Blade)",
    description:
      "Professional-grade rake for removing mats, tangles, and loose undercoat.",
    personalComment:
      "Used to achieve a professional looking groom. Great for getting out tangles and mats! 🐾",
    amazonLink: "https://amzn.to/4alOERg",
    image: "/images/products/mars.png",
    category: "Grooming",
  },
  {
    title: "FURminator Grooming Rake",
    description: "Grooming rake to remove loose hair and tangles.",
    personalComment:
      "A rake actually works better than a comb. Takes out the undercoat before it goes all over the house! We use a PSI 808 rake but it looks like that model is no longer available. While we have not personally tested this one it appears it should do the job. 🐾",
    amazonLink: "https://amzn.to/3Z92oss",
    image: "/images/products/furminator.jpeg",
    category: "Grooming",
  },
  {
    title: "Hertzko Self-Cleaning Slicker Brush",
    description: "Removes loose fur and minimizes shedding.",
    personalComment:
      "Does a good job and the self cleaning option makes it a breeze. 🐾",
    amazonLink: "https://amzn.to/3OghJ80",
    image: "/images/products/hertzko.jpeg",
    category: "Grooming",
  },
  {
    title: "Casfuy 6-Speed Dog Nail Grinder",
    description:
      "One of the most powerful grinders on the market – super low noise & vibration.",
    personalComment:
      "I love this nail grinder. If your dog is not having it when it comes to nail clipping, a nail grinder is a great option. I absolutely LOVE this one. And it has a light which helps more than you would think. Casfuy hits a quality / price point that is hard to beat !! 🐾",
    amazonLink: "https://amzn.to/45GP2Hp",
    image: "/images/products/casfuy.png",
    category: "Grooming",
  },
  {
    title: "#1 All Systems Super Cleaning and Conditioning Pet Shampoo",
    description:
      "Extra-gentle, low sudsing formula – completely rinses out leaving no residue.",
    personalComment:
      "Our favorite shampoo for keeping Golden coats clean and conditioned – gentle, low-suds, rinses clean with no residue. Luna's coat is always shiny after bath time! 🐾",
    amazonLink: "https://amzn.to/4rowap5",
    image: "/images/products/allsuper.png",
    category: "Grooming",
  },
  {
    title: "Chris Christensen Ice on Ice Detangling Dog Conditioner",
    description:
      "Leave-in detangling conditioner – smooths out tangles and knots, easier to comb or brush through.",
    personalComment:
      "Just don't drop any on the floor as it can make it super slippery. 🐾 Pro-level detangler for Goldens' thick coats!",
    amazonLink: "https://amzn.to/4q8rGle",
    image: "/images/products/ice.png",
    category: "Grooming",
  },
  {
    title: "Deshedding Brush",
    description: "Gentle on skin, effective for double coats.",
    amazonLink: "https://amazon.com/affiliate-placeholder",
    category: "Grooming",
  },
  {
    title: "Durable Fetch Toy",
    description: "Long-lasting rubber toy for daily exercise.",
    amazonLink: "https://amazon.com/affiliate-placeholder",
    category: "Toys",
  },
  {
    title: "Joint Support Chews",
    description: "Support mobility with vet-recommended ingredients.",
    amazonLink: "https://amazon.com/affiliate-placeholder",
    category: "Health",
  },
  {
    title: "Premium Puppy Food",
    description: "Balanced nutrition for growing Goldens.",
    amazonLink: "https://amazon.com/affiliate-placeholder",
    category: "Food/Treats",
  },
];

export default function ProductsPage() {
  return (
    <main className="bg-amber-50/40 text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://goldenretriever.hair/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: "https://goldenretriever.hair/products",
              },
            ],
          }),
        }}
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-amber-700 font-semibold mb-3">Products</p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
          Recommended Products for Your Golden Retriever
        </h1>

        <ProductsCategoryFilter products={products} />

        <p className="text-sm text-gray-600 mt-8">
          Personal recommendations from our Goldens – battle-tested! As an Amazon Associate,
          we earn from qualifying purchases – supports GoldenRetriever.hair and the upcoming
          Golden Week app.
        </p>
      </section>
    </main>
  );
}
