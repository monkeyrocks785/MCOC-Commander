import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mastery Advisor",
  description: "Optimize your MCOC mastery setup with preset builds and live point allocation.",
  openGraph: {
    title: "Mastery Advisor — MCOC Commander",
    description: "Plan and optimize your mastery builds.",
  },
};

export default function MasteriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
