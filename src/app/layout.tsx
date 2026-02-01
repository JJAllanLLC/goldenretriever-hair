import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GoldenRetriever.hair | Your Trusted Resource for Golden Retriever Owners",
    template: "%s | GoldenRetriever.hair",
  },
  description:
    "Everything Golden Retriever owners need: expert guides, puppy care tips, health advice, vetted breeder directory, recommended products, and the upcoming Golden Week app.",
  keywords: [
    "golden retriever",
    "golden retriever puppy",
    "golden retriever care",
    "golden retriever health",
    "golden retriever breeders",
    "golden retriever shedding",
    "golden retriever training",
  ],
  authors: [{ name: "JJ Allan LLC" }],
  creator: "JJ Allan LLC",
  publisher: "JJ Allan LLC",
  metadataBase: new URL("https://goldenretriever.hair"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GoldenRetriever.hair",
    description:
      "The ultimate resource for Golden Retriever lovers – guides, products, breeders, and more.",
    url: "https://goldenretriever.hair",
    siteName: "GoldenRetriever.hair",
    images: [
      {
        url: "/og-image.jpg", // We'll add this image later
        width: 1200,
        height: 630,
        alt: "Happy Golden Retriever running in field",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoldenRetriever.hair",
    description:
      "Expert guides, vetted breeders, and curated products for Golden Retriever owners.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Basic structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GoldenRetriever.hair",
              url: "https://goldenretriever.hair",
              logo: "https://goldenretriever.hair/logo.png",
              description:
                "Trusted resource for Golden Retriever owners built by JJ Allan LLC.",
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@goldenretriever.hair",
                contactType: "Customer Service",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
