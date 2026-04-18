import { Suspense } from "react";
import { ProductsCategoryFilter } from "@/components/ProductsCategoryFilter";

export const metadata = {
  title: "Best Products for Golden Retrievers | GoldenRetriever.hair",
  description:
    "Curated best products for Golden Retrievers: food, brushes, crates, toys, and more. Hand-picked by owners (Amazon Associates). Find what works for your Golden.",
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
    title: "Gamma2 Vittles Vault Stackable Dog Food Storage Container",
    description:
      "Airtight dog food storage container that keeps kibble fresh, prevents moisture, and protects against pests. Ideal for storing large-breed dog food bags.",
    personalComment: "Great for keeping large bags of dog food fresh and organized.",
    amazonLink: "https://amzn.to/4thEWGn",
    image: "/images/products/food_storage.jpeg",
    category: "Food/Treats",
  },
  {
    title: "Outward Hound Fun Feeder Slo Bowl (Large, 4-Cup)",
    description:
      "Slow feeder dog bowl that helps prevent fast eating, supports better digestion, and reduces risk of bloating. Ideal for Golden Retrievers that eat too quickly.",
    personalComment: "Great for slowing down meals and improving feeding habits.",
    amazonLink: "https://amzn.to/4rYY3Ur",
    image: "/images/products/slow_feeder.jpeg",
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
    title: "Nature’s Miracle Dog Stain and Odor Remover",
    description:
      "Enzymatic formula eliminates stains and odors – perfect for puppy training accidents.",
    personalComment:
      "A must-have during training — works great for stains and odors. 🐾",
    amazonLink: "https://amzn.to/4a29NyA",
    image: "/images/products/stain.png",
    category: "Training",
  },
  {
    title: "Extra Large Puppy Training Pads (50 Pack)",
    description:
      "Extra-large puppy pads with quick-dry absorbency and leak protection for easier early potty training cleanup.",
    personalComment:
      "Helpful during early potty training when accidents are still happening. The extra-large size gives growing Golden puppies more room and helps protect floors. 🐾",
    amazonLink: "https://amzn.to/3NmK5Ob",
    image: "/images/products/puppy_pads.jpeg",
    category: "Puppy",
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
    title: "MidWest Exercise Pen (30\" Height)",
    description:
      "Best for: safe daytime play and controlled space.\n\nDurable folding playpen that gives your puppy room to move while staying contained.\n\nWe've used these successfully with our own Golden Retriever puppies, and the 30\" height is more than enough to prevent jumping while they learn boundaries. Works great alongside a crate to create a full enclosed setup for the first 30 days.",
    amazonLink: "https://amzn.to/4clB95m",
    image: "/images/products/pen.jpeg",
    imageAlt: "MidWest folding metal exercise pen for puppies, 30 inch height",
    amazonLinkLabel: "Check price on Amazon →",
    category: "Essentials",
  },
  {
    title: "ChomChom Roller Pet Hair Remover",
    description:
      "Reusable roller removes embedded pet hair from couches, clothes, and car seats – no sticky tape needed.",
    personalComment:
      "Not a gimmick – does the trick by easily getting Golden hair off furniture and other surfaces. Our lifesaver for shedding season! 🐾",
    amazonLink: "https://amzn.to/46qen8L",
    image: "/images/products/chomchom.jpeg",
    category: "Essentials",
  },
  {
    title: "Kuranda Chewproof Elevated Dog Bed",
    description:
      "Durable aluminum frame and chewproof fabric – elevated for comfort and easy cleaning.",
    personalComment:
      "I highly recommend this one especially if your Golden is an aggressive chewer. There is no way he is going to damage this bed. Ours is over 7 years old and still looks like new. This one is built to last! 🐾",
    amazonLink: "https://amzn.to/4tc2L33",
    image: "/images/products/kuranda.png",
    category: "Essentials",
  },
  {
    title: "Amazon Basics Dog Poop Bags with Dispenser and Leash Clip",
    description:
      "Simple, reliable, and budget-friendly — gets the job done every time and at a great price.",
    personalComment:
      "Our everyday essential for Golden walks – leak-proof, easy-tear, and affordable. Stock up! 🐾",
    amazonLink: "https://amzn.to/4a2RdX1",
    image: "/images/products/bags.png",
    category: "Essentials",
  },
  {
    title: "iBuddy Dog Seat Cover for Trucks with Mesh Window",
    description:
      "Heavy-duty protection for truck seats – mesh window for airflow and visibility.",
    personalComment:
      "Still going strong after 3 years — protects the seats and lets them ride in style. Just pick one that matches your vehicle and enjoy the ride. 🐾",
    amazonLink: "https://amzn.to/4ronE9o",
    image: "/images/products/cover.jpeg",
    category: "Essentials",
  },
  {
    title: "Before and After Getting Your Puppy by Dr. Ian Dunbar",
    description:
      "The Positive Approach to Raising a Happy, Healthy, and Well-Behaved Dog.",
    personalComment:
      "Fantastic for first-time puppy parents; positive and easy to follow. 🐾",
    amazonLink: "https://amzn.to/4qUQXAK",
    image: "/images/products/dunbar.jpeg",
    category: "Books & Resources",
  },
  {
    title: "The Art of Raising a Puppy (Revised Edition) by Monks of New Skete",
    description:
      "Timeless advice on structure, trust, and routine for raising a happy, well-behaved puppy.",
    personalComment:
      "A classic by the Monks of New Skete, with timeless advice on structure, trust, and routine. Essential for new Golden puppy parents! 🐾",
    amazonLink: "https://amzn.to/4tc3u48",
    image: "/images/products/monks.jpeg",
    category: "Books & Resources",
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
    title: "Wet Ones for Pets Antibacterial Dog Wipes",
    description:
      "Antibacterial wipes for fast paw and coat wipe-downs—help lift dirt and reduce bacteria between baths, without the hassle of a full wash. Aloe vera keeps contact gentle on skin. Ideal for itchy paws, allergy-prone Goldens, and daily cleaning after walks or yard time.",
    personalComment:
      "Handy by the door for muddy paws and quick wipe-downs when you want less pollen and grit tracked inside. 🐾",
    amazonLink: "https://amzn.to/4s91ckF",
    image: "/images/products/paw_wipes.jpeg",
    category: "Grooming",
  },
  {
    title: "Burt's Bees for Pets Nose & Paw Balm",
    description:
      "Moisturizing balm for dry, cracked paw pads and rough nose skin, formulated with beeswax and cocoa butter to soothe and protect. Helps shield pads from cold weather, salt, ice-melt, and rough surfaces while supporting a healthier moisture barrier. Useful for seasonal dryness or routine care after long walks on pavement or trails.",
    amazonLink: "https://amzn.to/4vaOKUm",
    image: "/images/products/paw_balm.jpeg",
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
    title: "Neakasa P1 Pro Pet Grooming Kit & Vacuum",
    description:
      "Low-noise grooming vacuum with attachments – sucks up loose fur while brushing.",
    personalComment:
      "Using a pet hair remover regularly helps keep your home cleaner and reduces airborne allergens. It also makes cuddling your golden a little less…furry. Produces low noise and our Goldens love getting groomed with this! Mine is 4 years old and is still going strong. 🐾",
    amazonLink: "https://amzn.to/4qV9v3V",
    image: "/images/products/neakasa.png",
    category: "Grooming",
  },
  {
    title: "Benebone Wishbone Durable Dog Chew Toy for Aggressive Chewers",
    description: "Real-flavored nylon wishbone – long-lasting for tough chewers.",
    personalComment:
      "One of our dogs all-time favorites for tough chewers. Lasts a very long time! 🐾",
    amazonLink: "https://amzn.to/49Ro6av",
    image: "/images/products/benebone.png",
    category: "Toys",
  },
  {
    title: "Benebone Puppy 2-Pack Maplestick/Zaggler (Best for Gentle Puppy Chewers)",
    description:
      "Softer puppy chew toy 2-pack made for gentle chewers under 15 lbs, with real bacon and real maplewood flavor.",
    personalComment:
      "A better fit for younger Golden Retriever puppies that are still in the early chewing stage and not ready for a tougher adult chew yet. The softer design is made for modest chewers and gives puppies a safe way to satisfy teething and mouthy behavior. This 2-pack gives you variety right away, which helps when puppies get bored with the same chew too quickly. A good step before moving up to tougher long-lasting chews. 🐾",
    amazonLink: "https://amzn.to/4c4H26J",
    image: "/images/products/benebone2.jpeg",
    imageAlt:
      "Benebone Puppy 2-Pack Maplestick and Zaggler durable chew toys for gentle puppy chewers",
    category: "Toys",
  },
  {
    title: "Benebone Small 4-Pack (Best Value Chew Toy Bundle)",
    description:
      "4-pack of durable Benebone chews designed for small dogs and puppies — multiple shapes and flavors to prevent boredom.",
    personalComment:
      "Great option if your Golden Retriever puppy gets bored quickly with the same chew. This 4-pack includes multiple shapes and flavors, which helps keep them engaged and rotating between toys instead of going back to your hands. Designed for smaller dogs and puppies, but still durable enough for regular chewing. A strong value pick if you want variety without constantly buying new toys. 🐾",
    amazonLink: "https://amzn.to/4c49W70",
    image: "/images/products/benebone-4pack.jpeg",
    imageAlt:
      "Benebone Small 4-Pack durable dog chew toys for puppies and small dogs",
    category: "Toys",
  },
  {
    title: "Natural Dog Company Snout Soother Balm – Dog Nose Balm for Dry Cracked Snouts",
    description:
      "Moisturizing winter nose care with coconut oil & shea butter – helps with nasal hyperkeratosis (dry, thick, crusty nose).",
    personalComment:
      "Great for Goldens with dry or crusty noses – natural ingredients soothe and heal. Our pack loves it during dry seasons! 🐾",
    amazonLink: "https://amzn.to/4c2ZWLv",
    image: "/images/products/balm.jpeg",
    category: "Health",
  },
  {
    title: "TrizULTRA + Keto Flush for Dogs, Cats & Horses",
    description:
      "Gentle ear flush for cleaning and preventing infections – antifungal and antibacterial.",
    personalComment:
      "Goldens are very susceptible to ear infections. This flush will keep their ears healthy – our go-to for clean, happy ears! 🐾",
    amazonLink: "https://amzn.to/4t7BfUe",
    image: "/images/products/flush.png",
    category: "Health",
  },
  {
    title: "ThunderShirt Classic Dog Anxiety Jacket (X Large)",
    description:
      "Gentle constant pressure calms anxiety – perfect for fireworks, storms, or separation.",
    personalComment:
      "A revolutionary solution for anxious Goldens. The wrap-around design applies soothing pressure – our pack stays calmer during fireworks and storms. Highly recommend for stressful events! 🐾",
    amazonLink: "https://amzn.to/4rphVjU",
    image: "/images/products/thunder.jpeg",
    category: "Health",
  },
  {
    title: "K9 Advantix II XL Dog Vet-Recommended Flea, Tick & Mosquito Treatment & Prevention",
    description:
      "Shield your furry friend from pesky fleas and ticks with an effective and reliable flea and tick treatment.",
    personalComment:
      "Essential protection for our Goldens during outdoor adventures – vet-recommended and reliable against fleas, ticks, and mosquitoes. Keeps them safe and happy! 🐾",
    amazonLink: "https://amzn.to/3NNTcXW",
    image: "/images/products/tick.png",
    category: "Health",
  },
  {
    title: "Vetericyn Plus Dog Wound Care Spray",
    description:
      "Gentle antimicrobial spray that helps clean wounds, soothe irritated skin, and support healing for issues like hot spots, cuts, and skin irritation. Safe, non-toxic, and a great addition to your Golden Retriever first-aid kit.",
    amazonLink: "https://amzn.to/4viPOFV",
    image: "/images/products/hot_spot.png",
    category: "Health",
  },
  {
    title: "Virbac C.E.T. Enzymatic Dog Toothpaste",
    description:
      "Veterinarian-recommended enzymatic toothpaste that helps reduce plaque and tartar while freshening breath. Safe for daily use and ideal for maintaining long-term dental health in Golden Retrievers.",
    amazonLink: "https://amzn.to/47vXWbG",
    image: "/images/products/toothpaste.jpeg",
    category: "Health",
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
        <p className="text-white drop-shadow-md font-semibold mb-3">Products</p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-6">
          Recommended Products for Your Golden Retriever
        </h1>

        <Suspense fallback={<div className="text-center text-gray-600">Loading products…</div>}>
          <ProductsCategoryFilter products={products} />
        </Suspense>

        <p className="text-white drop-shadow-md text-center max-w-4xl mx-auto mt-12 italic bg-amber-900/50 rounded p-4 text-base">
          Personal recommendations from our Goldens – battle-tested! As an Amazon Associate,
          we earn from qualifying purchases – supports GoldenRetriever.hair and the upcoming
          Golden Week app. 🐾
        </p>
      </section>
    </main>
  );
}
