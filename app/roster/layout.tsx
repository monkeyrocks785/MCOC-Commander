import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Roster",
  description: "Manage your MCOC champion roster. Track champions, stars, ranks, and awakening status.",
  openGraph: {
    title: "My Roster — MCOC Commander",
    description: "Track your MCOC champion collection.",
  },
};

export default function RosterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
