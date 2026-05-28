import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Champion Database",
  description: "Browse all MCOC champions with tier lists, abilities, immunities, and counters.",
  openGraph: {
    title: "Champion Database — MCOC Commander",
    description: "Complete MCOC champion database with tier rankings.",
  },
};

export default function ChampionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
