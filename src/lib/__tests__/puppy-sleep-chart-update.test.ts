// @vitest-environment node

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const articleSource = fs.readFileSync(
  path.join(root, "src/app/guides/posts/golden-retriever-puppy-sleep-chart.mdx"),
  "utf8"
);
const guidePageSource = fs.readFileSync(
  path.join(root, "src/app/guides/[slug]/page.tsx"),
  "utf8"
);
const signupSource = fs.readFileSync(
  path.join(root, "src/components/SleepGuideNewsletterSignup.tsx"),
  "utf8"
);
const footerSource = fs.readFileSync(
  path.join(root, "src/components/FooterNewsletter.tsx"),
  "utf8"
);
const svgSource = fs.readFileSync(
  path.join(root, "public/images/infographics/golden-retriever-daily-cheat-sheet.svg"),
  "utf8"
);
const welcomeEmailSource = fs.readFileSync(
  path.join(root, "src/lib/welcome-email.ts"),
  "utf8"
);
const { data: metadata } = matter(articleSource);

describe("puppy sleep chart accuracy and signup", () => {
  it("preserves publication identity while exposing the checked update", () => {
    expect(metadata.title).toBe("Golden Retriever Puppy Sleep Chart (By Age)");
    expect(metadata.description).toBe(
      "Plan your Golden Retriever puppy’s naps, nighttime potty breaks and sleep routine by age, with clear guidance on sleep estimates and individual variation."
    );
    expect(metadata.date).toBe("2026-03-12");
    expect(metadata.updated).toBe("2026-10-06");
    expect(metadata.canonical).toBe("/guides/golden-retriever-puppy-sleep-chart");
    expect(articleSource).toContain("Sleep and puppy-care sources checked October 6, 2026.");
  });

  it("uses qualified routine guidance instead of unsupported age-by-hour targets", () => {
    expect(articleSource).toContain("some puppies can sleep 18–20 hours a day");
    expect(articleSource).toContain(
      "lying quietly or spending time in a crate does not necessarily mean a puppy is asleep"
    );
    expect(articleSource).toContain("The study found differences between the two ages.");
    expect(articleSource).toContain(
      "does not establish a continuous weekly or monthly decline or a Golden Retriever sleep quota"
    );
    expect(articleSource).not.toMatch(/16–18 hours|15–17 hours|14–16 hours/);
    expect(articleSource).not.toContain("These numbers match our site guidance");
  });

  it("places exactly one sleep-page signup after the daily routine and before later content", () => {
    const routine = articleSource.indexOf("## A Flexible Daily Sleep Routine");
    const signup = articleSource.indexOf("<SleepGuideNewsletter />");
    const nightWaking = articleSource.indexOf("## Night Waking and Potty Breaks");
    const faq = articleSource.indexOf("## Frequently Asked Questions");

    expect(articleSource.match(/<SleepGuideNewsletter \/>/g)).toHaveLength(1);
    expect(signup).toBeGreaterThan(routine);
    expect(nightWaking).toBeGreaterThan(signup);
    expect(faq).toBeGreaterThan(signup);
    expect(guidePageSource).toContain(
      "isPuppySleepChart ? { SleepGuideNewsletter: SleepGuideNewsletterSignup } : {}"
    );
    expect(guidePageSource).toContain("!isPuppySleepChart &&");
    expect(footerSource).toContain('pathname === SLEEP_GUIDE_PATH');
  });

  it("uses the approved signup copy and distinct PII-free placement", () => {
    expect(signupSource).toContain("Keep your Golden’s daily routine handy");
    expect(signupSource).toContain(
      "Join our newsletter and get the free Golden Retriever Owner Cheat Sheet: a printable overview of sleep,"
    );
    expect(signupSource).toContain("meals, and everyday care from puppyhood to senior years.");
    expect(signupSource).toContain('buttonLabel="Email me the free cheat sheet"');
    expect(signupSource).toContain("wrapButtonLabelBelow375");
    expect(signupSource).toContain('analyticsSource="puppy_sleep_chart"');
    expect(signupSource).toContain("showSmallText={false}");
    expect(signupSource).not.toContain("Unsubscribe");
  });

  it("aligns the existing SVG without retaining cup graphics or stale sleep ranges", () => {
    const svgBody = svgSource.split("</defs>", 2)[1];

    expect(svgSource).toContain("Meals and Daily Food Amounts");
    expect(svgSource).toContain("Use the exact food&#8217;s label and calories per cup or gram.");
    expect(svgSource).toContain("General meal-frequency starting points; adjust with your vet.");
    expect(svgSource).toContain("3 to under 6 months:");
    expect(svgSource).toContain("Divide the daily amount among meals. Count treats and extras.");
    expect(svgSource).toContain("Frequent naps; needs vary");
    expect(svgSource).toContain("Daytime naps + overnight sleep");
    expect(svgSource).toContain("Overnight sleep + daytime naps");
    expect(svgSource).toContain("Monitor changes in sleep and energy");
    expect(svgSource).toContain("Puppy sleep guidance");
    expect(svgBody).not.toContain('class="cup-');
    expect(svgSource).not.toMatch(/~2|~3|18&#8211;20 hrs|14&#8211;18 hrs|12&#8211;14 hrs/);
  });

  it("preserves the public asset URL used by the welcome email", () => {
    const assetUrl =
      "https://goldenretriever.hair/images/infographics/golden-retriever-daily-cheat-sheet.svg";
    expect(welcomeEmailSource.match(new RegExp(assetUrl.replaceAll(".", "\\."), "g"))).toHaveLength(2);
  });
});
