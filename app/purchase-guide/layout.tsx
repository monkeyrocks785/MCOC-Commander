import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase Guide",
  description: "Smart spending decisions for MCOC. Crystal value ratings, offer analysis, and spending priority.",
  openGraph: {
    title: "Purchase Guide — MCOC Commander",
    description: "Make informed spending decisions in MCOC.",
  },
};

export default function PurchaseGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
