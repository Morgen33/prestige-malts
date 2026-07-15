import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AgeGate from "@/components/compliance/AgeGate";
import CookieBanner from "@/components/compliance/CookieBanner";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prestige Malts — Rare Single-Cask Scotch Whisky",
    template: "%s · Prestige Malts",
  },
  description:
    "A London bottler of rare, single-cask Scotch whisky for collectors, the trade and the discerning few.",
  metadataBase: new URL("https://prestigemalts.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-charcoal-800 text-cream-100 antialiased">
        <AgeGate />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
