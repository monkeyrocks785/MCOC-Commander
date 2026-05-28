import type { Metadata } from "next";
import { Rajdhani, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MCOC Commander — Marvel Contest of Champions Companion",
    template: "%s — MCOC Commander",
  },
  description:
    "Track your roster, masteries, synergies, and get intelligent team-building recommendations for Marvel Contest of Champions.",
  keywords: [
    "MCOC",
    "Marvel Contest of Champions",
    "champion roster",
    "mastery advisor",
    "synergy finder",
    "quest builder",
  ],
  openGraph: {
    title: "MCOC Commander",
    description:
      "The ultimate companion for Marvel Contest of Champions players.",
    siteName: "MCOC Commander",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <Navbar />
        <main className="flex flex-1 flex-col pt-[var(--nav-height)] animate-fade-in">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
