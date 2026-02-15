import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

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
    default: "Golden Retriever Guides, Tips & Products | GoldenRetriever.hair",
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
    title: "Golden Retriever Guides, Tips & Products | GoldenRetriever.hair",
    description:
      "The ultimate resource for Golden Retriever lovers – guides, products, breeders, and more.",
    url: "https://goldenretriever.hair",
    siteName: "GoldenRetriever.hair",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Retriever Guides, Tips & Products | GoldenRetriever.hair",
    description:
      "Expert guides, vetted breeders, and curated products for Golden Retriever owners.",
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
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              id="gtag-js"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "vfawad5jmp");
            `,
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
