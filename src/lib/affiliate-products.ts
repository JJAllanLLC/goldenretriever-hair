/**
 * Canonical, non-PII product names for Amazon short links used on the site.
 *
 * Keep this mapping source-backed: names come from the curated Products page
 * or an explicit product/book name in article content. Unknown links should
 * remain unresolved rather than deriving names from arbitrary DOM text.
 */
export const AFFILIATE_PRODUCT_NAMES_BY_LINK_ID = {
  "3MbOin7": "Stewart Pro-Treat Beef Liver Freeze-Dried Dog Treats",
  "3NNTcXW": "K9 Advantix II XL Dog Vet-Recommended Flea, Tick & Mosquito Treatment & Prevention",
  "3NmK5Ob": "Extra Large Puppy Training Pads (50 Pack)",
  "3OFIN14": "Bissell Pet Hair Eraser Handheld Vacuum",
  "3OghJ80": "Hertzko Self-Cleaning Slicker Brush",
  "3QwiVFv": 'Laifug Orthopedic Memory Foam Dog Bed (XL 50")',
  "3Ri8vJW": "KONG Classic Stuffable Dog Toy",
  "3Z92oss": "FURminator Grooming Rake",
  "42vuobd": "The Art of Raising a Puppy",
  "4328Zqf": "Before and After Getting Your Puppy",
  "45GP2Hp": "Casfuy 6-Speed Dog Nail Grinder",
  "45GjTnt": "Hill's Science Diet Large Breed Adult Dry Dog Food (Lamb Meal & Brown Rice)",
  "46mR3IW": "Canidae All Life Stages Multi-Protein Formula Dry Dog Food (Chicken, Turkey, Lamb Meals)",
  "46qen8L": "ChomChom Roller Pet Hair Remover",
  "47vXWbG": "Virbac C.E.T. Enzymatic Dog Toothpaste",
  "48dIlxS": "Neater Feeder Deluxe Elevated Dog Bowl (Large Breed)",
  "49Ro6av": "Benebone Wishbone Durable Dog Chew Toy",
  "4a29NyA": "Nature’s Miracle Dog Stain and Odor Remover",
  "4a2RdX1": "Amazon Basics Dog Poop Bags with Dispenser and Leash Clip",
  "4alOERg": "Mars Coat King Dematting Undercoat Grooming Rake Stripper Tool (20-Blade)",
  "4aqMno4": "Orijen Original",
  "4b0x6ue": "Wellness Complete Health Large Breed",
  "4b1d1E9": "Royal Canin Golden Retriever Adult",
  "4c2ZWLv": "Natural Dog Company Snout Soother Balm – Dog Nose Balm for Dry Cracked Snouts",
  "4c49W70": "Benebone Small 4-Pack (Best Value Chew Toy Bundle)",
  "4c4H26J": "Benebone Puppy 2-Pack Maplestick/Zaggler (Best for Gentle Puppy Chewers)",
  "4clB95m": 'MidWest Exercise Pen (30" Height)',
  "4dCa8K2": "lesotc Large Dog Travel Water Bottle with Pull-Out Bowl",
  "4eT4ZQe": "The Green Pet Shop Large Cool Pet Pad",
  "4kcP5Rk": "Purina Pro Plan Sensitive Skin & Stomach Adult Dry Dog Food (Salmon & Rice Formula)",
  "4kcWikm": "Fromm Four-Star Nutritionals Surf & Turf Grain-Free Dry Dog Food",
  "4q830cM": "Zuke’s Mini Naturals Training Dog Treats",
  "4q8rGle": "Chris Christensen Ice on Ice Detangling Dog Conditioner",
  "4qMQboo": "Acana Large Breed Adult",
  "4qUQXAK": "Before and After Getting Your Puppy by Dr. Ian Dunbar",
  "4qV9v3V": "Neakasa P1 Pro Pet Grooming Kit & Vacuum",
  "4rYY3Ur": "Outward Hound Fun Feeder Slo Bowl (Large, 4-Cup)",
  "4ronE9o": "iBuddy Dog Seat Cover for Trucks with Mesh Window",
  "4rowap5": "#1 All Systems Super Cleaning and Conditioning Pet Shampoo",
  "4rphVjU": "ThunderShirt Classic Dog Anxiety Jacket (X Large)",
  "4rq298l": "MidWest Homes for Pets iCrate Folding Dog Crate",
  "4rt7coR": "Hill's Science Diet Large Breed Adult",
  "4s91ckF": "Wet Ones for Pets Antibacterial Dog Wipes",
  "4t7BfUe": "TrizULTRA + Keto Flush for Dogs, Cats & Horses",
  "4tOlMce": "Purina Pro Plan Large Breed Adult Sensitive Skin & Stomach",
  "4tSMssu": "Open Farm Grass-Fed Beef Recipe",
  "4tVIYo7": "WeatherTech PetRamp",
  "4tc2L33": "Kuranda Chewproof Elevated Dog Bed",
  "4tc3u48": "The Art of Raising a Puppy (Revised Edition) by Monks of New Skete",
  "4thEWGn": "Gamma2 Vittles Vault Stackable Dog Food Storage Container",
  "4u2HJUh": "PetSafe Deluxe Easy Walk Harness",
  "4vaOKUm": "Burt's Bees for Pets Nose & Paw Balm",
  "4viPOFV": "Vetericyn Plus Dog Wound Care Spray",
} as const satisfies Readonly<Record<string, string>>;

export function getAffiliateProductName(linkId: string | undefined): string | undefined {
  if (!linkId) return undefined;
  return (AFFILIATE_PRODUCT_NAMES_BY_LINK_ID as Readonly<Record<string, string>>)[linkId];
}
