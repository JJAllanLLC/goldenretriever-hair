// @vitest-environment node

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { getAffiliateProductName } from "@/lib/affiliate-products";
import { FEEDING_CHART_FAQS } from "@/lib/feeding-chart-faqs";

const source = fs.readFileSync(
  path.join(process.cwd(), "src/app/guides/posts/golden-retriever-feeding-chart.mdx"),
  "utf8"
);
const pageSource = fs.readFileSync(
  path.join(process.cwd(), "src/app/guides/[slug]/page.tsx"),
  "utf8"
);
const { data: metadata } = matter(source);

describe("feeding-chart nutrition update", () => {
  it("preserves the canonical publication record and exposes the source-check update", () => {
    expect(metadata.title).toBe("Golden Retriever Feeding Chart: How Much to Feed by Age & Weight");
    expect(metadata.description).toBe(
      "Work out Golden Retriever food portions using age, healthy weight, and calories per cup, with puppy meal schedules and adult feeding examples."
    );
    expect(metadata.date).toBe("2026-02-01");
    expect(metadata.updated).toBe("2026-10-06");
    expect(metadata.canonical).toBe("/guides/golden-retriever-feeding-chart");
    expect(source).toContain("Nutrition sources checked October 6, 2026.");
    expect(pageSource).toContain("dateModified: metadata.updated ?? metadata.date ?? undefined");
  });

  it("uses recipe-specific puppy amounts and keeps meal frequency separate from daily calories", () => {
    expect(source).toContain(
      "When a puppy moves from three meals to two, divide the same current daily total between the two meals"
    );
    expect(source).toContain(
      "<tr><td>8–12 weeks</td><td>3–4</td><td>Use the exact food's puppy age-and-weight instructions"
    );
    expect(source).toContain(
      "<tr><td>3 to under 6 months</td><td>3</td><td>Recheck the label row as weight changes"
    );
    expect(source).toContain(
      "<tr><td>6–12 months</td><td>Usually 2</td><td>Continue a food suitable for large-breed growth"
    );
    expect(source).toContain("Some foods labeled for all life stages meet that requirement");
    expect(source).not.toMatch(/1–3 cups|2\.5–3\.5 cups|Avoid high-calorie \"performance\" or \"all life stages\"/);
  });

  it("shows adult estimates that reproduce the documented AAHA calculation", () => {
    const expected = [
      [55, 1090, 1250],
      [65, 1240, 1420],
      [75, 1380, 1580],
      [85, 1520, 1730],
    ];

    for (const [pounds, low, high] of expected) {
      const rer = 70 * Math.pow(pounds / 2.2046226218, 0.75);
      expect(Math.round((rer * 1.4) / 10) * 10).toBe(low);
      expect(Math.round((rer * 1.6) / 10) * 10).toBe(high);
      expect(source).toContain(
        `<tr><td>${pounds} lb</td><td>About ${low.toLocaleString("en-US")}–${high.toLocaleString("en-US")} kcal/day</td></tr>`
      );
    }
  });

  it("shows accurate calorie-density conversions for the whole day", () => {
    const rows = [
      [800, 2.3, 2.0, 1.8],
      [1000, 2.9, 2.5, 2.2],
      [1200, 3.4, 3.0, 2.7],
      [1400, 4.0, 3.5, 3.1],
      [1600, 4.6, 4.0, 3.6],
    ];
    const densities = [350, 400, 450];

    for (const [calories, ...cups] of rows) {
      densities.forEach((density, index) => {
        expect((calories / density).toFixed(1)).toBe(cups[index].toFixed(1));
      });
    }
    expect(source).toContain("1,200 ÷ (4,000 ÷ 1,000) = 300 g/day");
  });

  it("places the unchanged adult affiliate comparison after the calorie table", () => {
    const adultHeading = source.indexOf("## Adult Golden Retriever Feeding Chart: Calorie Examples");
    const adultTableLastRow = source.indexOf(
      "<tr><td>85 lb</td><td>About 1,520–1,730 kcal/day</td></tr>"
    );
    const comparisonHeading = source.indexOf("#### Compare adult food options");
    const conversionHeading = source.indexOf("## How to Convert Calories to Cups or Grams");

    expect(adultHeading).toBeGreaterThan(-1);
    expect(adultTableLastRow).toBeGreaterThan(adultHeading);
    expect(comparisonHeading).toBeGreaterThan(adultTableLastRow);
    expect(conversionHeading).toBeGreaterThan(comparisonHeading);
    expect(source.match(/https:\/\/amzn\.to\/45GjTnt/g)).toHaveLength(1);
    expect(source.match(/https:\/\/amzn\.to\/4kcP5Rk/g)).toHaveLength(1);
    expect(source).toContain("View Hill’s adult food on Amazon");
    expect(source).toContain("View Purina adult food on Amazon");
    expect(source).toContain(
      "As an Amazon Associate, GoldenRetriever.hair earns from qualifying purchases."
    );
    expect(getAffiliateProductName("45GjTnt")).toBe(
      "Hill's Science Diet Large Breed Adult Dry Dog Food (Lamb Meal & Brown Rice)"
    );
    expect(getAffiliateProductName("4kcP5Rk")).toBe(
      "Purina Pro Plan Sensitive Skin & Stomach Adult Dry Dog Food (Salmon & Rice Formula)"
    );
  });

  it("keeps tables mobile-readable and the elevated-feeder language neutral", () => {
    expect(source.match(/className="overflow-x-auto my-6"/g)).toHaveLength(4);
    expect(source.match(/<table className=/g)).toHaveLength(4);
    expect(source.match(/<caption>/g)).toHaveLength(4);
    expect(source.match(/role="region" aria-label=/g)).toHaveLength(4);
    expect(source.match(/https:\/\/amzn\.to\/48dIlxS/g)).toHaveLength(2);
    expect(source).toContain(
      "Ask your veterinarian whether an elevated bowl is appropriate for your dog."
    );
    expect(source).not.toContain("more comfortable eating position");
    expect(source).not.toContain("reducing cleanup");
  });

  it("renders the visible FAQs and FAQ schema from one shared data source", () => {
    expect(FEEDING_CHART_FAQS).toHaveLength(7);
    expect(new Set(FEEDING_CHART_FAQS.map(({ question }) => question)).size).toBe(7);
    expect(FEEDING_CHART_FAQS[0].answer).toContain(
      "divide the same recipe-specific daily total"
    );
    expect(FEEDING_CHART_FAQS.at(-1)?.source?.href).toBe(
      "https://www.fda.gov/animal-veterinary/animal-health-literacy/potentially-dangerous-items-your-pet"
    );
    expect(pageSource).toContain("FEEDING_CHART_FAQS.map(({ question, answer })");
    expect(pageSource).toContain("FEEDING_CHART_FAQS.map((faq)");
    expect(pageSource).toContain('\"@type\": \"FAQPage\"');
  });

  it("uses the feeding-page-specific signup copy without changing the shared form", () => {
    expect(pageSource).toContain("Keep Your Golden&apos;s Daily Care on Track");
    expect(pageSource).toContain(
      "Get the free Golden Retriever Owner Cheat Sheet for a printable daily-care reference."
    );
    expect(pageSource).toContain('<Link href="/#newsletter"');
  });
});
