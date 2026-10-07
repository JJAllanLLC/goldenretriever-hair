export type FeedingChartFaq = {
  question: string;
  answer: string;
  source?: {
    href: string;
    label: string;
  };
};

export const FEEDING_CHART_FAQS: FeedingChartFaq[] = [
  {
    question: "How many times a day should I feed my Golden Retriever?",
    answer:
      "Young puppies commonly eat three to four measured meals a day from 8 to 12 weeks, then three meals until about 6 months. Older puppies and adults usually eat two measured meals a day. When meal frequency changes, divide the same recipe-specific daily total across the new schedule unless your veterinarian recommends a different total.",
  },
  {
    question: "How many cups should an adult Golden Retriever eat?",
    answer:
      "There is no universal cup amount because recipes contain different calories per cup. First estimate a daily calorie allowance, subtract calories from treats and extras, then divide the remaining calories by the food's calories per cup. For example, 1,200 kcal divided by 400 kcal per cup is 3 cups for the whole day, or 1.5 cups at each of two meals. That example is not a target for every dog.",
  },
  {
    question: "How do I know if I am overfeeding my Golden Retriever?",
    answer:
      "Difficulty feeling the ribs, loss of a visible waist, or steady unwanted weight gain can point to overfeeding. Count meals, treats, chews, toppers, and table food, then review the total and your dog's body condition with your veterinarian. Do not apply one generic percentage cut to every dog, and do not restrict a growing puppy without veterinary guidance.",
  },
  {
    question: "Should I feed my Golden Retriever puppy large-breed food?",
    answer:
      "Choose a complete and balanced food whose nutritional adequacy statement says it is suitable for growth of large-size dogs. Some foods labeled for all life stages meet that requirement, so the life-stage statement matters more than a blanket rule about the words on the front of the bag. Do not add calcium unless your veterinarian directs you to.",
  },
  {
    question: "How much should a 6-month-old Golden Retriever eat per day?",
    answer:
      "Use the exact food's puppy feeding instructions and the correct weight basis; some labels use current weight while others use expected adult weight. At about 6 months, many puppies can eat the labeled daily total in two meals, but they still need food suitable for large-breed growth. Recheck growth and body condition rather than copying a universal cup amount.",
  },
  {
    question: "Should I automatically feed less when my Golden Retriever becomes a senior?",
    answer:
      "No. Age alone does not determine a lower portion. Keep monitoring weight, muscle condition, activity, appetite, and health. An older dog with unwanted weight gain may need a different calorie allowance, while unexplained weight or muscle loss needs veterinary assessment rather than an automatic food reduction.",
  },
  {
    question: "Can I give my Golden Retriever human food?",
    answer:
      "Small amounts of dog-safe human food can fit as counted treats, but treats and extras should generally stay at or below 10% of daily calories so at least 90% comes from complete and balanced food. Avoid toxic foods and ask your veterinarian about unfamiliar ingredients or a dog with medical needs.",
    source: {
      href: "https://www.fda.gov/animal-veterinary/animal-health-literacy/potentially-dangerous-items-your-pet",
      label: "Review the FDA's list of potentially dangerous items for pets.",
    },
  },
];
