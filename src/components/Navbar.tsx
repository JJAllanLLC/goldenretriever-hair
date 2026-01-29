import Link from "next/link";

export function Navbar() {
  return (
    <header className="bg-amber-50 border-b border-amber-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-amber-700 font-playfair">
              GoldenRetriever.hair
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-amber-700 font-medium">
              Home
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-amber-700 font-medium">
              Blog
            </Link>
            <Link href="/guides" className="text-gray-700 hover:text-amber-700 font-medium">
              Guides
            </Link>
            <Link href="/breeders" className="text-gray-700 hover:text-amber-700 font-medium">
              Breeder Directory
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-amber-700 font-medium">
              Products
            </Link>
            <Link href="/golden-week" className="text-amber-700 font-semibold hover:underline">
              Golden Week App
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-amber-700 font-medium">
              About
            </Link>
          </nav>

          {/* Mobile menu placeholder – we'll add a proper hamburger later */}
          <div className="md:hidden">
            <button className="text-gray-700">Menu</button>
          </div>
        </div>
      </div>
    </header>
  );
}
