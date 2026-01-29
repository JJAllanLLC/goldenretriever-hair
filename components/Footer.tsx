export function Footer() {
  return (
    <footer className="bg-amber-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} GoldenRetriever.hair – Built with ❤️ by{" "}
          <a href="https://jjallan.com" className="underline hover:text-amber-300">
            JJ Allan LLC
          </a>
        </p>
      </div>
    </footer>
  );
}
