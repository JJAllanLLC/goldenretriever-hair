import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | GoldenRetriever.hair",
  description:
    "Privacy Policy for GoldenRetriever.hair, explaining how we collect, use, and protect visitor data, including cookies and analytics.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-amber-50/40 text-gray-900">
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white/95 rounded-2xl shadow-sm border border-amber-100 px-6 py-10 md:px-10 md:py-12 space-y-6 text-base leading-relaxed text-slate-800">
          <h1 className="text-3xl md:text-4xl font-playfair font-semibold text-amber-900">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
          <em>Last updated: March 12, 2026</em>
          </p>
          <p>
            GoldenRetriever.hair (“we”, “our”, or “us”) respects your privacy. This{" "}
            <strong>Privacy Policy</strong> explains how we collect, use, and protect information when you visit{" "}
            <code>https://goldenretriever.hair</code> (the “Site”).
          </p>
          <p>
            By using the Site, you agree to the practices described here. If you do not agree, please discontinue use
            of the Site.
          </p>
        <h2 className="text-xl font-semibold text-amber-900">
          Information We Collect
        </h2>
        <p>
          We do not ask casual visitors to create accounts or submit extensive personal details. However, we may
          collect:
        </p>
        <ul>
          <li>
            <strong>Information you provide directly</strong>
            <ul>
              <li>Email address if you subscribe to our newsletter or contact us.</li>
              <li>Any information you choose to include in messages you send to us.</li>
            </ul>
          </li>
          <li>
            <strong>Usage data collected automatically</strong>
            <ul>
              <li>IP address (truncated or anonymized where supported).</li>
              <li>Browser type, device type, and operating system.</li>
              <li>Pages viewed, time spent on pages, and referring URLs.</li>
              <li>General geographic region (city/country level), not precise location.</li>
            </ul>
          </li>
        </ul>
        <p>This usage data is typically collected through <strong>cookies and similar technologies</strong>.</p>
        <h2 className="text-xl font-semibold text-amber-900">
          Cookies and Tracking Technologies
        </h2>
        <p>The Site uses <strong>cookies</strong> and similar technologies to:</p>
        <ul>
          <li>Understand how visitors use the Site.</li>
          <li>Improve content, layout, and performance.</li>
          <li>Remember certain preferences (such as previously dismissed banners).</li>
        </ul>
        <p>
          You can control or disable cookies through your browser settings. If you block cookies, some parts of the
          Site may not function optimally, but core content should remain accessible.
        </p>
        <h2 className="text-xl font-semibold text-amber-900">Google Analytics</h2>
        <p>We use <strong>Google Analytics</strong> and similar analytics tools to understand aggregate visitor behavior.</p>
        <p>Google Analytics uses cookies and other identifiers to:</p>
        <ul>
          <li>Measure traffic and usage patterns.</li>
          <li>Provide reports about how visitors find and interact with the Site.</li>
        </ul>
        <p>Where possible, we configure analytics to:</p>
        <ul>
          <li>Use <strong>IP anonymization</strong> or truncation features offered by the provider.</li>
          <li>Focus on aggregated trends rather than individual profiles.</li>
        </ul>
        <p>
          You can learn more about how Google uses data from partner sites at Google’s information pages. You can
          also opt out of Google Analytics by using the official browser add‑on or your browser’s
          tracking-prevention settings.
        </p>
        <h2 className="text-xl font-semibold text-amber-900">
          How We Use Information
        </h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Operate, maintain, and improve the Site.</li>
          <li>Analyze which guides and topics are most useful to visitors.</li>
          <li>Respond to messages or inquiries you send us.</li>
          <li>Send optional newsletters or updates if you explicitly subscribe (you can unsubscribe at any time).</li>
        </ul>
        <p>
          We <strong>do not sell personal information</strong> to third parties. We may use affiliate links and
          advertising programs (such as Amazon Associates) that track clicks and qualifying purchases, but these
          programs do not provide us with your full payment details or other sensitive information.
        </p>
        <h2 className="text-xl font-semibold text-amber-900">Data Sharing</h2>
        <p>We may share limited information with:</p>
        <ul>
          <li>
            <strong>Service providers</strong> who help us operate the Site (for example, email newsletter services,
            analytics providers, or hosting platforms). They are expected to handle data according to their own
            privacy policies and applicable laws.
          </li>
          <li>
            <strong>Legal authorities</strong>, if required to do so by law or in response to valid legal process.
          </li>
        </ul>
        <p>We do not share email lists or visitor information with unrelated third parties for their own marketing purposes.</p>
        <h2 className="text-xl font-semibold text-amber-900">Data Retention</h2>
        <p>We keep information:</p>
        <ul>
          <li>For as long as needed to provide the Site and related services.</li>
          <li>
            As required by law, accounting rules, or legitimate business needs (for example, to maintain security
            logs or respond to abuse).
          </li>
        </ul>
        <p>
          If you subscribe to our newsletter, your email address is stored until you unsubscribe or we close the
          mailing list.
        </p>
        <h2 className="text-xl font-semibold text-amber-900">Your Choices</h2>
        <p>You can:</p>
        <ul>
          <li>
            <strong>Disable cookies</strong> or clear them using your browser settings.
          </li>
          <li>
            <strong>Unsubscribe</strong> from our emails by clicking the unsubscribe link in any newsletter.
          </li>
          <li>
            Contact us to request that we <strong>update or delete</strong> information you have voluntarily provided,
            where technically feasible and not required to be kept for legal reasons.
          </li>
        </ul>
        <h2 className="text-xl font-semibold text-amber-900">Children’s Privacy</h2>
        <p>
          The Site is intended for adults and responsible owners. We do not knowingly collect personal information
          from children under 13. If you believe we have collected information from a child, please contact us so we
          can review and, if appropriate, delete it.
        </p>
        <h2 className="text-xl font-semibold text-amber-900">
          Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws.
          When we make material changes, we will update the <strong>“Last updated”</strong> date at the top of this
          page. Continued use of the Site after changes are posted constitutes acceptance of the revised policy.
        </p>
        <h2 className="text-xl font-semibold text-amber-900">Contact Us</h2>
        <p>If you have questions about this Privacy Policy or how we handle data, you can contact us at:</p>
        <ul>
          <li>
            <strong>Email:</strong> <code>goldenofthemonth@jjallanllc.com</code>
          </li>
        </ul>
        <p>We will do our best to respond to reasonable privacy-related requests in a timely manner.</p>
        </div>
      </section>
    </main>
  );
}

