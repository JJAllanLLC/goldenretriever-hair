// @vitest-environment node

import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  AFFILIATE_PRODUCT_NAMES_BY_LINK_ID,
  getAffiliateProductName,
} from "@/lib/affiliate-products";

const root = process.cwd();

describe("affiliate product mapping", () => {
  it("contains the complete reviewed set and resolves the observed GA4 link", () => {
    expect(Object.keys(AFFILIATE_PRODUCT_NAMES_BY_LINK_ID)).toHaveLength(53);
    expect(getAffiliateProductName("3Z92oss")).toBe("FURminator Grooming Rake");
    expect(getAffiliateProductName("not-mapped")).toBeUndefined();
  });

  it("resolves every Amazon short link in article source", () => {
    const postsRoot = path.join(root, "src/app/guides/posts");
    const files = fs.readdirSync(postsRoot).filter((name) => name.endsWith(".mdx"));
    const ids = files.flatMap((file) => {
      const source = fs.readFileSync(path.join(postsRoot, file), "utf8");
      return [...source.matchAll(/https:\/\/amzn\.to\/([A-Za-z0-9]+)/g)].map(
        (match) => match[1]
      );
    });
    const uniqueIds = [...new Set(ids)];

    expect(ids).toHaveLength(188);
    expect(uniqueIds).toHaveLength(48);
    expect(uniqueIds.filter((id) => !getAffiliateProductName(id))).toEqual([]);
  });

  it("matches all canonical Products-page records", () => {
    const source = fs
      .readFileSync(path.join(root, "src/app/products/page.tsx"), "utf8")
      .split("const products = [", 2)[1];
    const productPattern =
      /\{\s*title:\s*("(?:\\.|[^"\\])*")[\s\S]*?amazonLink:\s*"https:\/\/amzn\.to\/([A-Za-z0-9]+)"/g;
    const records = [...source.matchAll(productPattern)].map((match) => ({
      title: JSON.parse(match[1]) as string,
      linkId: match[2],
    }));

    expect(records).toHaveLength(44);
    for (const record of records) {
      expect(getAffiliateProductName(record.linkId)).toBe(record.title);
    }
  });

  it("contains only maintained human-readable values without URLs or email data", () => {
    for (const productName of Object.values(AFFILIATE_PRODUCT_NAMES_BY_LINK_ID)) {
      expect(productName.trim()).toBe(productName);
      expect(productName.length).toBeGreaterThan(3);
      expect(productName).not.toMatch(/https?:\/\/|@|email=/i);
    }
  });
});
