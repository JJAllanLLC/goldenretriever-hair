// @vitest-environment node

import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getAffiliateProductName } from "@/lib/affiliate-products";

const source = fs.readFileSync(
  path.join(process.cwd(), "src/app/guides/posts/golden-retriever-feeding-chart.mdx"),
  "utf8"
);

describe("feeding-chart adult food comparison", () => {
  it("places the comparison after the adult table and before senior feeding", () => {
    const adultHeading = source.indexOf("### Adult Feeding (18 Months – 7 Years)");
    const adultTableLastRow = source.indexOf(
      "<tr><td>85 lbs</td><td>2.75–3 cups</td><td>3–3.25 cups</td><td>3.25–3.75 cups</td></tr>"
    );
    const comparisonHeading = source.indexOf("#### Compare adult food options");
    const seniorHeading = source.indexOf("### Senior Feeding (7+ Years)");

    expect(adultHeading).toBeGreaterThan(-1);
    expect(adultTableLastRow).toBeGreaterThan(adultHeading);
    expect(comparisonHeading).toBeGreaterThan(adultTableLastRow);
    expect(seniorHeading).toBeGreaterThan(comparisonHeading);
  });

  it("keeps the two exact affiliate URLs and uses clear product-specific buttons", () => {
    expect(source.match(/https:\/\/amzn\.to\/45GjTnt/g)).toHaveLength(1);
    expect(source.match(/https:\/\/amzn\.to\/4kcP5Rk/g)).toHaveLength(1);
    expect(source).toContain("View Hill’s adult food on Amazon");
    expect(source).toContain("View Purina adult food on Amazon");
    expect(getAffiliateProductName("45GjTnt")).toBe(
      "Hill's Science Diet Large Breed Adult Dry Dog Food (Lamb Meal & Brown Rice)"
    );
    expect(getAffiliateProductName("4kcP5Rk")).toBe(
      "Purina Pro Plan Sensitive Skin & Stomach Adult Dry Dog Food (Salmon & Rice Formula)"
    );
  });

  it("includes neutral decision context and the nearby Amazon disclosure", () => {
    expect(source).toContain(
      "Check the exact recipe’s life-stage label and feeding instructions before choosing. Ask your vet about your dog’s individual dietary needs."
    );
    expect(source).toContain(
      "As an Amazon Associate, GoldenRetriever.hair earns from qualifying purchases."
    );
    expect(source).not.toContain("What We Actually Feed Our Golden Retrievers");
    expect(source).not.toContain("what we use now");
    expect(source).not.toContain("good alternative");
  });

  it("retains readable charts and mobile-first stacked cards with tap targets", () => {
    expect(source.match(/className="overflow-x-auto my-6"/g)).toHaveLength(3);
    expect(source.match(/<table className=/g)).toHaveLength(3);
    expect(source).toContain("grid grid-cols-1 gap-4 my-6 md:grid-cols-2");
    expect(source.match(/inline-flex min-h-11 w-full sm:w-auto/g)).toHaveLength(2);
  });
});
