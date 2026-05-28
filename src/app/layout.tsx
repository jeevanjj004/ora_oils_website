import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: 'swap',
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
  metadataBase: new URL('https://oramills.in'),
  
  title: {
    default: "ORA Mills | Nature's Finest Drop",
    template: "%s | ORA Mills"
  },
  
  description: "Experience the ultra-premium luxury cold-pressed organic coconut oil by ORA Mills. Crafted with absolute purity and tradition for exquisite cooking, skin nourishment, and holistic wellness.",
  
  keywords: ["coconut oil", "cold-pressed coconut oil", "organic coconut oil", "ORA Mills", "Kerala coconut oil", "virgin coconut oil"],
  
  authors: [{ name: "ORA Mills" }],
  creator: "ORA Mills",
  publisher: "ORA Mills",
  
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
    url: "https://oramills.in",
    siteName: "ORA Mills Coconut Oil",
    title: "ORA Mills | Nature's Finest Drop",
    description: "Cold-pressed, chemical-free coconut oil — crafted with purity and tradition from the heart of Kerala.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ORA Mills Coconut Oil - Nature's Finest Drop",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "ORA Mills | Nature's Finest Drop",
    description: "Cold-pressed, chemical-free coconut oil — crafted with purity and tradition from the heart of Kerala.",
    images: ["/images/og-image.jpg"],
  },
  
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  
  manifest: "/site.webmanifest",
  
  verification: {
    google: "your-google-verification-code",
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
      <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        
        {/* ✅ FAVICON LINKS - Browser tab icon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
      </head>
      <body className={`${cormorant.variable} ${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}