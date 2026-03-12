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
        <div className="flex flex-col items-center gap-4 text-sm">
          <p>
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
          <nav className="flex flex-wrap justify-center gap-4 text-amber-100/90">
            <a href="/privacy-policy" className="hover:text-orange-300 underline-offset-2 hover:underline">
              Privacy Policy
            </a>
            <a href="/affiliate-disclosure" className="hover:text-orange-300 underline-offset-2 hover:underline">
              Affiliate Disclosure
            </a>
            <a href="/terms-of-use" className="hover:text-orange-300 underline-offset-2 hover:underline">
              Terms of Use
            </a>
            <a href="/disclaimer" className="hover:text-orange-300 underline-offset-2 hover:underline">
              Disclaimer
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
