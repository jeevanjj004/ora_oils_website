import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: 'swap', // Performance: Prevent FOIT
  preload: true,
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://oraoils.com'),
  title: {
    default: "ORA | Nature's Finest Drop",
    template: "%s | ORA Coconut Oil"
  },
  description: "Experience the ultra-premium luxury cold-pressed organic coconut oil by ORA. Crafted with absolute purity and tradition for exquisite cooking, skin nourishment, and holistic wellness.",
  keywords: ["coconut oil", "cold-pressed coconut oil", "organic coconut oil", "ORA coconut oil", "Kerala coconut oil", "virgin coconut oil"],
  authors: [{ name: "ORA Oils" }],
  creator: "ORA Oils",
  publisher: "ORA Oils",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://oraoils.com",
    siteName: "ORA Coconut Oil",
    title: "ORA | Nature's Finest Drop",
    description: "Cold-pressed, chemical-free coconut oil — crafted with purity and tradition from the heart of Kerala.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ORA Coconut Oil - Nature's Finest Drop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORA | Nature's Finest Drop",
    description: "Cold-pressed, chemical-free coconut oil — crafted with purity and tradition from the heart of Kerala.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console code
  },
  category: "food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className={`${cormorant.variable} ${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}