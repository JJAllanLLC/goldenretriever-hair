import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-amber-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-8">
          <p className="text-lg font-semibold text-amber-100 mb-4">
            Stay updated with GoldenRetriever.hair
          </p>
          <NewsletterForm variant="footer" />
        </div>
        <p className="text-sm">
          © 2026 GoldenRetriever.hair — Part of the{" "}
          <a
            href="https://jjallanllc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-orange-300"
          >
            JJ Allan LLC
          </a>{" "}
          portfolio collection
        </p>
      </div>
    </footer>
  );
}
