export function Footer() {
  return (
    <footer className="bg-amber-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-8">
          <p className="text-lg font-semibold text-amber-100 mb-4">
            Stay updated with GoldenRetriever.hair
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 rounded-full border border-orange-300 text-gray-900 placeholder:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
            />
            <button
              type="submit"
              className="bg-amber-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} GoldenRetriever.hair – Built with ❤️ by{" "}
          <a href="https://jjallanllc.com" className="underline hover:text-amber-300">
            JJ Allan LLC
          </a>
        </p>
      </div>
    </footer>
  );
}
