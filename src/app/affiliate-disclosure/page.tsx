import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | GoldenRetriever.hair",
  description:
    "Affiliate disclosure for GoldenRetriever.hair, including information about Amazon Associates and how affiliate links support the site.",
};

export default function AffiliateDisclosurePage() {
  return (
    <main className="bg-amber-50/40 text-gray-900">
      <section className="max-w-3xl mx-auto px-4 py-16 prose prose-amber">
        <h1>Affiliate Disclosure</h1>
        <p>
          <em>Last updated: March 25, 2026</em>
        </p>
        <p>
          GoldenRetriever.hair provides <strong>research-driven guides and product recommendations</strong> to
          help Golden Retriever owners make informed decisions. To support the time and cost involved in creating
          this content, some links on the Site are <strong>affiliate links</strong>.
        </p>
        <p>This page explains how those affiliate relationships work and what they mean for you.</p>
        <hr />
        <h2>Amazon Services LLC Associates Program</h2>
        <p>
          GoldenRetriever.hair participates in the Amazon Services LLC Associates Program, an affiliate advertising
          program designed to provide a means for sites to earn advertising fees by advertising and linking to
          Amazon.com.
        </p>
        <p>
          This means that when you click on certain links to Amazon and make a qualifying purchase, we may earn a
          small commission. This commission does <strong>not</strong> change the price you pay.
        </p>
        <hr />
        <h2>Other Affiliate Links and Recommendations</h2>
        <p>
          In addition to Amazon Associates, we may occasionally participate in other affiliate or partner programs.
          In all cases:
        </p>
        <ul>
          <li>Some product or service links on the Site are <strong>affiliate links</strong>.</li>
          <li>If you click through and make a purchase, GoldenRetriever.hair may earn a commission.</li>
          <li>
            These commissions help support the ongoing maintenance of the Site, hosting costs, and the time required
            to research and write detailed guides.
          </li>
        </ul>
        <p>Our goal is to recommend products and services that:</p>
        <ul>
          <li>Are <strong>appropriate for Golden Retrievers</strong> based on breed needs.</li>
          <li>
            Are supported by <strong>research, ingredient analysis, or extensive owner and expert experience</strong>.
          </li>
          <li>We would reasonably consider for our own dogs under similar circumstances.</li>
        </ul>
        <p>
          Affiliate status does <strong>not</strong> change our commitment to providing honest, evidence-informed
          recommendations.
        </p>
        <hr />
        <h2>How Affiliate Links Are Used on the Site</h2>
        <p>You may see affiliate links:</p>
        <ul>
          <li>In product recommendation sections of guides (for example, brush or food roundups).</li>
          <li>In comparison tables or “Best of” lists.</li>
          <li>Occasionally within blog posts discussing specific tools, services, or supplies.</li>
        </ul>
        <p>Affiliate links will typically:</p>
        <ul>
          <li>Lead directly to a product page or vendor site.</li>
          <li>Be clearly associated with a specific product or service discussed in the content.</li>
        </ul>
        <p>
          If you prefer not to use affiliate links, you can always search for the same products independently by
          name.
        </p>
        <hr />
        <h2>Your Choice and Transparency</h2>
        <p>Using affiliate links is <strong>optional</strong> for you:</p>
        <ul>
          <li>You are never required to purchase anything to use the Site.</li>
          <li>You can treat product recommendations as <strong>starting points for your own research</strong>.</li>
        </ul>
        <p>We aim to keep our affiliate relationships:</p>
        <ul>
          <li>
            <strong>Transparent</strong> – clearly disclosed on this page and, where appropriate, near product
            sections.
          </li>
          <li>
            <strong>Responsible</strong> – focused on products that align with the health, safety, and comfort of
            Golden Retrievers.
          </li>
        </ul>
        <p>
          If you have questions about a specific recommendation or link, you can contact us and we’ll do our best to
          clarify why it was included.
        </p>
        <hr />
        <h2>Contact</h2>
        <p>If you have any questions about this Affiliate Disclosure, please contact:</p>
        <ul>
          <li>
            <strong>Email:</strong> <code>legal@goldenretriever.hair</code>
          </li>
        </ul>
        <p>
          Thank you for supporting GoldenRetriever.hair and helping us continue to publish in-depth resources for
          Golden Retriever owners.
        </p>
      </section>
    </main>
  );
}

