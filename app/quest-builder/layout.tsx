import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quest Team Builder",
  description: "Build the perfect MCOC quest team with node-based champion recommendations.",
  openGraph: {
    title: "Quest Team Builder — MCOC Commander",
    description: "AI-powered team builder for MCOC quest content.",
  },
};

export default function QuestBuilderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
