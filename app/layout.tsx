import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://nutty-baseball.vercel.app"
  ),
  title: {
    default: "Nutty Baseball - Learn & Play Baseball",
    template: "%s | Nutty Baseball",
  },
  description: "Interactive baseball learning and game tracking app for parents and kids. Learn rules, track scores, and have fun with a Peanuts-inspired baseball experience!",
  keywords: ["baseball", "kids", "learning", "score tracker", "youth baseball", "baseball rules", "Peanuts", "Charlie Brown"],
  authors: [{ name: "JMBeh" }],
  creator: "JMBeh",
  publisher: "JMBeh",
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
    locale: "en_US",
    url: "https://nutty-baseball.vercel.app",
    siteName: "Nutty Baseball",
    title: "Nutty Baseball - Learn & Play Baseball",
    description: "Interactive baseball learning and game tracking app for parents and kids. Learn rules, track scores, and have fun!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nutty Baseball - Learn & Play Baseball",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutty Baseball - Learn & Play Baseball",
    description: "Interactive baseball learning and game tracking app for parents and kids.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nutty Baseball",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e85d04" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1410" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
