"use client";

import { useState } from "react";
import Link from "next/link";
import StatCard from "@/components/StatCard";

const tiers = ["Uncollected", "Cavalier", "Paragon", "Valiant"] as const;

const quickLinks = [
  { href: "/roster", label: "My Roster", icon: "⚔", desc: "Manage your champion collection" },
  { href: "/champions", label: "Champions", icon: "★", desc: "Browse champion database & tier list" },
  { href: "/masteries", label: "Masteries", icon: "◆", desc: "Optimize your mastery setup" },
  { href: "/quest-builder", label: "Quest Builder", icon: "▶", desc: "Build the perfect team for any quest" },
  { href: "/synergies", label: "Synergies", icon: "✦", desc: "Find champion synergy teams" },
  { href: "/purchase-guide", label: "Purchase Guide", icon: "●", desc: "Smart spending decisions" },
];

const dailyTips = [
  "Complete your Event Quest on the highest difficulty you can clear",
  "Don't open Grandmaster Crystals with units — save for masteries",
  "Rank up one champion at a time instead of spreading resources",
  "Use energy refills during grind events for maximum value",
  "Join an active alliance for loyalty rewards and AQ/AW",
  "Save 5-star shards for dual-class crystals",
];

export default function Home() {
  const [selectedTier, setSelectedTier] = useState<string>("Paragon");

  return (
    <div className="flex-1">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[var(--marvel-dark)] to-[var(--marvel-black)] py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[var(--marvel-red)] blur-[120px]" />
          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-[var(--marvel-gold)] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
          <h1 className="font-heading text-5xl font-bold text-[var(--marvel-red)] text-glow-red md:text-7xl">
            MCOC Commander
          </h1>
          <p className="mt-4 text-lg text-[var(--marvel-light-gray)] md:text-xl">
            Your ultimate companion for Marvel Contest of Champions
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {tiers.map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`rounded-lg px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider transition-all duration-[var(--transition-fast)] ${
                  selectedTier === tier
                    ? "bg-[var(--marvel-red)] text-white shadow-[var(--shadow-glow-red)]"
                    : "glass text-[var(--marvel-light-gray)] hover:text-[var(--marvel-white)]"
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-[var(--marvel-light-gray)]">
            Selected progress tier: <span className="font-semibold text-[var(--marvel-gold)]">{selectedTier}</span>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Roster" value="0 / 166" icon="⚔" subtitle="Champions collected" />
          <StatCard label="Mastery Score" value="0" icon="◆" subtitle="Points allocated" color="--class-mutant" />
          <StatCard label="Spending Grade" value="F2P" icon="●" subtitle="Current bracket" color="--class-tech" />
          <StatCard label="Top Champion" value="—" icon="★" subtitle="Highest tier owned" color="--class-cosmic" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h2 className="mb-6 font-heading text-2xl font-bold text-[var(--marvel-white)]">
          Quick Actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="glass group rounded-xl p-5 transition-all duration-[var(--transition-normal)] hover:shadow-[var(--shadow-card)] no-underline"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="text-2xl">{link.icon}</span>
                <h3 className="font-heading text-lg font-bold text-[var(--marvel-white)] group-hover:text-[var(--marvel-gold)] transition-colors">
                  {link.label}
                </h3>
              </div>
              <p className="text-sm text-[var(--marvel-light-gray)]">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="glass rounded-2xl p-6 md:p-8">
          <h2 className="mb-4 font-heading text-2xl font-bold text-[var(--marvel-gold)] text-glow-gold">
            Daily Tips
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {dailyTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[var(--marvel-light-gray)]">
                <span className="mt-0.5 text-[var(--marvel-red)]">▶</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
