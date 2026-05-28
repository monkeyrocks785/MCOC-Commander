"use client";

import { useState, useEffect } from "react";
import ChampionCard, { type Champion } from "@/components/ChampionCard";
import ChampionModal from "@/components/ChampionModal";

const classOptions = ["All", "Cosmic", "Mutant", "Tech", "Skill", "Science", "Mystic"];
const tierOptions = ["All", "S", "A", "B", "C", "D"];
const roleOptions = ["All", "Attacker", "Defender", "Utility"];

interface RosterEntry {
  id: string;
  name: string;
  star: number;
  rank: number;
  awakened: boolean;
  class: string;
  tier: string;
}

export default function RosterPage() {
  const [entries, setEntries] = useState<RosterEntry[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("mcoc-roster");
        return saved ? JSON.parse(saved) : [];
      } catch { }
    }
    return [];
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [filterClass, setFilterClass] = useState("All");
  const [filterTier, setFilterTier] = useState("All");
  const [filterRole, setFilterRole] = useState("All");
  const [filterAwakened, setFilterAwakened] = useState<boolean | null>(null);

  useEffect(() => {
    localStorage.setItem("mcoc-roster", JSON.stringify(entries));
  }, [entries]);

  const handleAdd = (entry: RosterEntry) => {
    setEntries((prev) => {
      const exists = prev.find((e) => e.id === entry.id && e.star === entry.star);
      if (exists) return prev;
      return [...prev, entry];
    });
  };

  const handleRemove = (id: string, star: number) => {
    setEntries((prev) => prev.filter((e) => !(e.id === id && e.star === star)));
  };

  const filtered = entries.filter((e) => {
    if (filterClass !== "All" && e.class !== filterClass) return false;
    if (filterTier !== "All" && e.tier !== filterTier) return false;
    if (filterAwakened !== null && e.awakened !== filterAwakened) return false;
    return true;
  });

  const getGaps = () => {
    const topTiers = entries.filter((e) => e.tier === "S" || e.tier === "A");
    const topByClass: Record<string, RosterEntry[]> = {};
    for (const e of topTiers) {
      if (!topByClass[e.class]) topByClass[e.class] = [];
      topByClass[e.class].push(e);
    }
    const gaps: string[] = [];
    for (const cls of classOptions.slice(1)) {
      if (!topByClass[cls] || topByClass[cls].length < 2) {
        gaps.push(`Need more ${cls} champions (have ${topByClass[cls]?.length || 0})`);
      }
    }
    const underRanked = entries.filter((e) => (e.tier === "S" || e.tier === "A") && e.rank < 3);
    if (underRanked.length > 0) {
      gaps.push(`${underRanked.length} high-tier champion(s) under-ranked (rank < 3)`);
    }
    return gaps;
  };

  const gaps = getGaps();

  return (
    <div className="flex-1">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[var(--marvel-dark)] to-[var(--marvel-black)] px-4 py-8 md:px-6">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--marvel-red)] blur-[120px] opacity-10" />
        <div className="mx-auto max-w-7xl relative">
          <div className="flex items-center justify-between animate-fade-in-up">
            <div>
              <h1 className="font-heading text-3xl font-bold text-[var(--marvel-white)]">My Roster</h1>
              <p className="mt-1 text-sm text-[var(--marvel-light-gray)]">
                {entries.length} champion{entries.length !== 1 ? "s" : ""} collected
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-xl bg-[var(--marvel-red)] px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wider text-white transition-all hover:glow-red hover:scale-105"
            >
              + Add
            </button>
          </div>

          {gaps.length > 0 && (
            <div className="glass-card mt-4 rounded-xl p-4 animate-fade-in stagger-2">
              <h3 className="mb-2 font-heading text-sm font-bold uppercase tracking-wider text-[var(--marvel-gold)]">
                Rank-Up Suggestions
              </h3>
              <ul className="space-y-1">
                {gaps.map((gap, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[var(--marvel-light-gray)]">
                    <span className="mt-0.5 text-[var(--marvel-gold)]">◆</span>
                    {gap}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="glass rounded-lg px-3 py-2 text-xs font-medium text-[var(--marvel-white)] outline-none font-heading uppercase tracking-wider"
          >
            {classOptions.map((c) => (
              <option key={c} value={c} className="bg-[var(--marvel-dark)]">{c}</option>
            ))}
          </select>
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="glass rounded-lg px-3 py-2 text-xs font-medium text-[var(--marvel-white)] outline-none font-heading uppercase tracking-wider"
          >
            {tierOptions.map((t) => (
              <option key={t} value={t} className="bg-[var(--marvel-dark)]">{t}</option>
            ))}
          </select>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="glass rounded-lg px-3 py-2 text-xs font-medium text-[var(--marvel-white)] outline-none font-heading uppercase tracking-wider"
          >
            {roleOptions.map((r) => (
              <option key={r} value={r} className="bg-[var(--marvel-dark)]">{r}</option>
            ))}
          </select>
          <button
            onClick={() =>
              setFilterAwakened(filterAwakened === null ? true : filterAwakened === true ? false : null)
            }
            className={`rounded-lg px-3 py-2 text-xs font-medium font-heading uppercase tracking-wider transition-all ${
              filterAwakened !== null
                ? "bg-[var(--marvel-red)] text-white"
                : "glass text-[var(--marvel-light-gray)]"
            }`}
          >
            {filterAwakened === null ? "All" : filterAwakened ? "Awakened" : "Unawakened"}
          </button>
          {entries.length > 0 && (
            <span className="text-xs text-[var(--marvel-light-gray)]">
              Showing {filtered.length} of {entries.length}
            </span>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg text-[var(--marvel-light-gray)]">
              {entries.length === 0 ? "Your roster is empty. Add champions to get started." : "No champions match your filters."}
            </p>
            {entries.length === 0 && (
              <button
                onClick={() => setModalOpen(true)}
                className="mt-4 rounded-xl bg-[var(--marvel-red)] px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider text-white"
              >
                Add Your First Champion
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((entry) => (
              <div key={`${entry.id}-${entry.star}`} className="relative">
                <ChampionCard
                  champion={entry as unknown as Champion}
                />
                <div className="mt-2 flex items-center justify-between px-1">
                  <span className="text-xs text-[var(--marvel-light-gray)]">
                    {entry.star}★ R{entry.rank} {entry.awakened ? "⚡" : ""}
                  </span>
                  <button
                    onClick={() => handleRemove(entry.id, entry.star)}
                    className="text-[10px] text-[var(--marvel-light-gray)] transition-colors hover:text-[var(--marvel-red)]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {modalOpen && (
        <ChampionModal
          onClose={() => setModalOpen(false)}
          onSave={handleAdd}
        />
      )}
    </div>
  );
}
