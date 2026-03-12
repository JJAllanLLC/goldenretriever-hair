import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | GoldenRetriever.hair",
  description:
    "Legal disclaimer for GoldenRetriever.hair. Learn how our educational content should be used and why it does not replace veterinary advice.",
};

export default function DisclaimerPage() {
  return (
    <main className="bg-amber-50/40 text-gray-900">
      <section className="max-w-3xl mx-auto px-4 py-16 prose prose-amber">
        <h1>Disclaimer</h1>
        <p>
          <em>Last updated: March 25, 2026</em>
        </p>
        <p>
          The information on GoldenRetriever.hair is created to help owners make{" "}
          <strong>more informed decisions</strong> about caring for their Golden Retrievers. However, it has important
          limitations. This <strong>Disclaimer</strong> explains how you should and should not use the content on this
          Site.
        </p>
        <p>
          By using <code>https://goldenretriever.hair</code> (the “Site”), you agree to the terms below.
        </p>
        <hr />
        <h2>Educational Purposes Only</h2>
        <p>All content on GoldenRetriever.hair is provided for general informational and educational purposes.</p>
        <ul>
          <li>Articles, guides, and blog posts.</li>
          <li>Product recommendations and comparisons.</li>
          <li>Tools, downloads, and other resources.</li>
        </ul>
        <p>
          Our content is <strong>not a substitute for professional veterinary advice, diagnosis, or treatment</strong>.
          Every dog is an individual, and only a licensed veterinarian who has examined your dog can provide
          recommendations tailored to their specific health, medical history, and environment.
        </p>
        <hr />
        <h2>No Veterinary-Client-Patient Relationship</h2>
        <p>
          Using this Site, reading its content, or contacting us does <strong>not</strong> create a
          veterinary-client-patient relationship:
        </p>
        <ul>
          <li>We do not examine or treat animals through the Site.</li>
          <li>We do not maintain medical records or provide individualized treatment plans.</li>
          <li>
            Any responses to questions should be treated as <strong>general information</strong>, not as case-specific
            veterinary guidance.
          </li>
        </ul>
        <p>
          For any decision that could affect your dog’s health, you should consult a{" "}
          <strong>licensed veterinarian</strong> in your area.
        </p>
        <hr />
        <h2>Not Medical or Legal Advice</h2>
        <p>The Site may occasionally discuss:</p>
        <ul>
          <li>
            Health topics such as nutrition, exercise, grooming, injury prevention, or common conditions in Golden
            Retrievers.
          </li>
          <li>Legal or insurance topics related to dog ownership.</li>
        </ul>
        <p>Nothing on the Site should be interpreted as:</p>
        <ul>
          <li>
            <strong>Medical advice</strong> for diagnosing or treating a specific illness, injury, or condition.
          </li>
          <li>
            <strong>Legal, financial, or insurance advice</strong> tailored to your situation.
          </li>
        </ul>
        <p>
          Always seek appropriate professional advice before acting on information that could affect your dog’s
          health, safety, or your legal responsibilities.
        </p>
        <hr />
        <h2>Consult a Veterinarian for Medical Concerns</h2>
        <p>
          If you have questions or concerns about your dog’s health, behavior, or well-being, you should:
        </p>
        <ul>
          <li>Schedule an appointment with your primary veterinarian or an appropriate veterinary specialist.</li>
          <li>
            Seek <strong>emergency veterinary care</strong> immediately in urgent situations (e.g., difficulty
            breathing, suspected poisoning, severe injury, or sudden collapse).
          </li>
        </ul>
        <p>Do not delay or avoid seeking veterinary care because of something you read on this Site.</p>
        <hr />
        <h2>Accuracy and Completeness</h2>
        <p>We aim to keep information on GoldenRetriever.hair:</p>
        <ul>
          <li>
            <strong>Accurate</strong>, <strong>current</strong>, and <strong>evidence-informed</strong>.
          </li>
          <li>Based on credible sources and breed-specific experience.</li>
        </ul>
        <p>However:</p>
        <ul>
          <li>Veterinary knowledge and best practices change over time.</li>
          <li>Errors, omissions, or outdated information may occur despite our efforts.</li>
        </ul>
        <p>
          We make <strong>no guarantees</strong> about the completeness, reliability, or accuracy of the information on
          the Site. You use the content at your own discretion and risk.
        </p>
        <hr />
        <h2>External Links and Third-Party Content</h2>
        <p>The Site may link to:</p>
        <ul>
          <li>External websites (such as product pages, research articles, or other resources).</li>
          <li>Third-party tools, services, or social media accounts.</li>
        </ul>
        <p>These links are provided for convenience and reference. We:</p>
        <ul>
          <li>Do not control or endorse the content, policies, or practices of third-party sites.</li>
          <li>Are not responsible for any damages or issues that arise from your use of third-party websites or services.</li>
        </ul>
        <p>
          You should review the <strong>privacy policies, terms, and disclosures</strong> of any external site you
          visit.
        </p>
        <hr />
        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, GoldenRetriever.hair, its owners, contributors, and affiliates:
        </p>
        <ul>
          <li>
            Are <strong>not liable</strong> for any loss, injury, claim, or damage arising from:
            <ul>
              <li>Your use of the Site or reliance on its content.</li>
              <li>Any decisions you make regarding your dog’s care, training, or environment.</li>
              <li>Errors, omissions, or interruptions in the availability of the Site.</li>
            </ul>
          </li>
          <li>
            Are <strong>not responsible</strong> for outcomes of actions taken or not taken based on information
            provided here.
          </li>
        </ul>
        <p>
          Your use of the Site is at your own risk. If you are not willing to accept this limitation of liability, you
          should not use the Site.
        </p>
        <hr />
        <h2>Changes to This Disclaimer</h2>
        <p>
          We may update this Disclaimer from time to time. When we do, we will revise the <strong>“Last updated”</strong>{" "}
          date at the top of this page. Your continued use of the Site after changes are posted constitutes acceptance
          of the updated Disclaimer.
        </p>
        <hr />
        <h2>Contact</h2>
        <p>If you have questions about this Disclaimer, you can contact us at:</p>
        <ul>
          <li>
            <strong>Email:</strong> <code>legal@goldenretriever.hair</code>
          </li>
        </ul>
        <p>
          We appreciate your understanding and your commitment to working with qualified professionals to keep your
          Golden Retriever healthy and safe.
        </p>
      </section>
    </main>
  );
}

