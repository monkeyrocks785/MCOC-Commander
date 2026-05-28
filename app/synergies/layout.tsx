import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Synergy Finder",
  description: "Discover champion synergies and build optimal MCOC teams.",
  openGraph: {
    title: "Synergy Finder — MCOC Commander",
    description: "Find the best champion synergies for your team.",
  },
};

export default function SynergiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
