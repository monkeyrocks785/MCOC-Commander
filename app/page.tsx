"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StatCard from "@/components/StatCard";

const tiers = ["Uncollected", "Cavalier", "Paragon", "Valiant"] as const;

const quickLinks = [
  { href: "/roster", label: "My Roster", icon: "⚔", desc: "Manage your champion collection", color: "var(--marvel-red)" },
  { href: "/champions", label: "Champions", icon: "★", desc: "Browse champion database & tier list", color: "var(--marvel-gold)" },
  { href: "/masteries", label: "Masteries", icon: "◆", desc: "Optimize your mastery setup", color: "var(--class-mutant)" },
  { href: "/quest-builder", label: "Quest Builder", icon: "▶", desc: "Build the perfect team for any quest", color: "var(--class-tech)" },
  { href: "/synergies", label: "Synergies", icon: "✦", desc: "Find champion synergy teams", color: "var(--class-skill)" },
  { href: "/purchase-guide", label: "Purchase Guide", icon: "●", desc: "Smart spending decisions", color: "var(--class-cosmic)" },
];

const dailyTips = [
  "Complete your Event Quest on the highest difficulty you can clear",
  "Don't open Grandmaster Crystals with units — save for masteries",
  "Rank up one champion at a time instead of spreading resources",
  "Use energy refills during grind events for maximum value",
  "Join an active alliance for loyalty rewards and AQ/AW",
  "Save 5-star shards for dual-class crystals",
];

const particles = [
  { left: "10%", top: "20%", delay: "0s", color: "var(--marvel-red)", size: "particle-sm" },
  { left: "85%", top: "15%", delay: "1s", color: "var(--marvel-gold)", size: "particle-md" },
  { left: "70%", top: "70%", delay: "2s", color: "var(--class-tech)", size: "particle-sm" },
  { left: "20%", top: "80%", delay: "3s", color: "var(--class-mystic)", size: "particle-sm" },
  { left: "50%", top: "30%", delay: "0.5s", color: "var(--marvel-red)", size: "particle-md" },
  { left: "90%", top: "50%", delay: "1.5s", color: "var(--class-cosmic)", size: "particle-sm" },
  { left: "30%", top: "60%", delay: "2.5s", color: "var(--marvel-gold)", size: "particle-sm" },
  { left: "60%", top: "85%", delay: "3.5s", color: "var(--class-skill)", size: "particle-sm" },
];

export default function Home() {
  const [selectedTier, setSelectedTier] = useState<string>("Paragon");
  const [checklist, setChecklist] = useState<Record<number, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("mcoc-checklist");
        return saved ? JSON.parse(saved) : {};
      } catch { }
    }
    return {};
  });
  const [counts] = useState(() => {
    let roster = 0;
    if (typeof window !== "undefined") {
      try {
        roster = JSON.parse(localStorage.getItem("mcoc-roster") || "[]").length;
      } catch { }
    }
    return { roster, mastery: 0 };
  });

  useEffect(() => {
    localStorage.setItem("mcoc-checklist", JSON.stringify(checklist));
  }, [checklist]);

  const toggleCheck = (i: number) => {
    setChecklist((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[var(--marvel-dark)] to-[var(--marvel-black)] py-24 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[var(--marvel-red)] blur-[140px]" />
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[var(--marvel-gold)] blur-[120px]" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--class-mystic)] blur-[100px] opacity-40" />
        </div>

        {particles.map((p, i) => (
          <div
            key={i}
            className={`particle ${p.size} animate-float`}
            style={{
              left: p.left,
              top: p.top,
              backgroundColor: p.color,
              animationDelay: p.delay,
              animationDuration: `${6 + i * 0.5}s`,
            }}
          />
        ))}

        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
          <div className="animate-fade-in-up">
            <h1 className="font-heading text-6xl font-bold text-glow-red md:text-8xl" style={{ color: "var(--marvel-red)" }}>
              MCOC
            </h1>
            <h2 className="font-heading text-3xl font-semibold tracking-widest text-gradient md:text-5xl" style={{ marginTop: "-4px" }}>
              COMMANDER
            </h2>
          </div>
          <p className="mt-6 text-lg text-[var(--marvel-light-gray)] animate-fade-in stagger-2 md:text-xl">
            Your ultimate companion for Marvel Contest of Champions
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 animate-fade-in stagger-3">
            {tiers.map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`rounded-lg px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                  selectedTier === tier
                    ? "bg-[var(--marvel-red)] text-white animate-glow-pulse"
                    : "glass hover:bg-white/10 hover:text-[var(--marvel-white)]"
                } ${selectedTier !== tier ? "text-[var(--marvel-light-gray)]" : ""}`}
              >
                {tier}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-[var(--marvel-light-gray)] animate-fade-in stagger-4">
            Progress tier: <span className="font-semibold text-[var(--marvel-gold)]">{selectedTier}</span>
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="animate-fade-in-up stagger-1"><StatCard label="Roster" value={`${counts.roster} / 166`} icon="⚔" subtitle="Champions collected" /></div>
          <div className="animate-fade-in-up stagger-2"><StatCard label="Mastery Score" value="0" icon="◆" subtitle="Points allocated" color="--class-mutant" /></div>
          <div className="animate-fade-in-up stagger-3"><StatCard label="Spending Grade" value="F2P" icon="●" subtitle="Current bracket" color="--class-tech" /></div>
          <div className="animate-fade-in-up stagger-4"><StatCard label="Top Champion" value="—" icon="★" subtitle="Highest tier owned" color="--class-cosmic" /></div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h2 className="mb-6 font-heading text-2xl font-bold text-[var(--marvel-white)]">
          Quick Actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`glass-card group relative overflow-hidden rounded-xl p-5 no-underline animate-fade-in stagger-${i + 1}`}
            >
              <div className="absolute top-0 left-0 h-full w-1 rounded-l-xl" style={{ background: link.color, opacity: 0.6 }} />
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `${link.color}15` }}>
                  <span className="text-xl">{link.icon}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[var(--marvel-white)] transition-colors group-hover:text-[var(--marvel-gold)]">
                  {link.label}
                </h3>
              </div>
              <p className="text-sm text-[var(--marvel-light-gray)]">{link.desc}</p>
              <span className="absolute right-4 top-4 text-xs text-[var(--marvel-light-gray)] opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0 translate-x-[-4px]">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Daily Checklist + Tips */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-6 animate-fade-in-up">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-[var(--marvel-gold)] text-glow-gold">
                Daily Checklist
              </h2>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[var(--marvel-light-gray)]">
                {checkedCount}/{dailyTips.length}
              </span>
            </div>
            <div className="space-y-2">
              {dailyTips.map((tip, i) => (
                <button
                  key={i}
                  onClick={() => toggleCheck(i)}
                  className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all ${
                    checklist[i]
                      ? "bg-white/5 text-[var(--marvel-light-gray)] line-through opacity-60"
                      : "text-[var(--marvel-white)] hover:bg-white/5"
                  }`}
                >
                  <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                    checklist[i]
                      ? "border-[var(--marvel-gold)] bg-[var(--marvel-gold)] text-[var(--marvel-black)]"
                      : "border-white/20"
                  }`}>
                    {checklist[i] && <span className="text-[10px] font-bold">✓</span>}
                  </span>
                  <span>{tip}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 animate-fade-in-up stagger-2">
            <h2 className="mb-4 font-heading text-xl font-bold text-[var(--marvel-white)]">
              <span className="text-gradient">Pro Tips</span>
            </h2>
            <div className="space-y-3">
              {[
                { icon: "🔥", title: "Suicide Builds", text: "Willpower + Liquid Courage + Double Edge = massive attack boost" },
                { icon: "⚔", title: "Blade Trinity", text: "Blade + Ghost Rider + Stark Spidey gives Danger Sense to all Villains" },
                { icon: "🛡", title: "Perfect Block", text: "Stack block proficiency masteries to reduce chip damage to zero" },
                { icon: "💎", title: "Crystal Strategy", text: "Always open Nexus over basic crystals — the choice is worth more" },
              ].map((tip, i) => (
                <div key={i} className="flex gap-3 rounded-lg bg-white/5 p-3">
                  <span className="text-xl">{tip.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--marvel-white)]">{tip.title}</p>
                    <p className="text-xs text-[var(--marvel-light-gray)]">{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Class Reference */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h2 className="mb-6 font-heading text-2xl font-bold text-[var(--marvel-white)]">Class Advantage</h2>
        <div className="glass-card rounded-2xl p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: "Mutant", color: "var(--class-mutant)", beats: "Mystic", losesTo: "Tech", icon: "🧬" },
              { name: "Tech", color: "var(--class-tech)", beats: "Mutant", losesTo: "Cosmic", icon: "⚙" },
              { name: "Cosmic", color: "var(--class-cosmic)", beats: "Tech", losesTo: "Mystic", icon: "🌌" },
              { name: "Mystic", color: "var(--class-mystic)", beats: "Cosmic", losesTo: "Science", icon: "🔮" },
              { name: "Science", color: "var(--class-science)", beats: "Mystic", losesTo: "Skill", icon: "🔬" },
              { name: "Skill", color: "var(--class-skill)", beats: "Science", losesTo: "Mutant", icon: "⚔" },
            ].map((cls) => (
              <div key={cls.name} className="rounded-lg bg-white/5 p-3 text-center transition-all hover:bg-white/10">
                <span className="text-2xl">{cls.icon}</span>
                <p className="mt-1 font-heading text-sm font-bold" style={{ color: cls.color }}>{cls.name}</p>
                <p className="mt-1 text-[10px] text-[var(--marvel-light-gray)]">→ {cls.beats}</p>
                <p className="text-[10px] text-[var(--marvel-light-gray)]">← {cls.losesTo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
