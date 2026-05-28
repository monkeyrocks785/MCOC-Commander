"use client";

import { useState, useMemo } from "react";
import championsData from "@/data/champions.json";
import ChampionCard, { type Champion } from "@/components/ChampionCard";
import ChampionModal from "@/components/ChampionModal";

const classOptions = ["All", "Cosmic", "Mutant", "Tech", "Skill", "Science", "Mystic"];
const tierOptions = ["All", "S", "A", "B", "C", "D"];
const roleOptions = ["All", "Attacker", "Defender", "Utility"];

export default function ChampionsPage() {
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [filterTier, setFilterTier] = useState("All");
  const [filterRole, setFilterRole] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [modalOpen, setModalOpen] = useState(false);

  const allChampions = championsData.champions as Champion[];

  const filtered = useMemo(() => {
    return allChampions.filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterClass !== "All" && c.class !== filterClass) return false;
      if (filterTier !== "All" && c.tier !== filterTier) return false;
      if (filterRole !== "All" && !c.roles.includes(filterRole)) return false;
      return true;
    });
  }, [search, filterClass, filterTier, filterRole, allChampions]);

  const sorted = useMemo(() => {
    const tierOrder = ["S", "A", "B", "C", "D"];
    return [...filtered].sort((a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier));
  }, [filtered]);

  const handleAdd = () => { };

  return (
    <div className="flex-1">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[var(--marvel-dark)] to-[var(--marvel-black)] px-4 py-8 md:px-6">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[var(--marvel-gold)] blur-[120px] opacity-10" />
        <div className="mx-auto max-w-7xl relative">
          <h1 className="font-heading text-3xl font-bold text-[var(--marvel-white)] animate-fade-in-up">Champion Database</h1>
          <p className="mt-1 text-sm text-[var(--marvel-light-gray)] animate-fade-in stagger-2">
            {allChampions.length} champions &middot; {sorted.length} shown
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <div className="glass flex flex-1 items-center gap-2 rounded-xl px-3 py-2 min-w-[200px]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--marvel-light-gray)]">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search champions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-[var(--marvel-white)] placeholder-[var(--marvel-light-gray)] outline-none"
            />
          </div>
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
          <div className="flex rounded-lg overflow-hidden border border-white/10">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-xs font-medium transition-colors font-heading ${
                viewMode === "grid" ? "bg-white/15 text-[var(--marvel-white)]" : "text-[var(--marvel-light-gray)] hover:text-[var(--marvel-white)]"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 text-xs font-medium transition-colors font-heading ${
                viewMode === "list" ? "bg-white/15 text-[var(--marvel-white)]" : "text-[var(--marvel-light-gray)] hover:text-[var(--marvel-white)]"
              }`}
            >
              List
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sorted.map((champ) => (
              <div key={champ.id}>
                <ChampionCard
                  champion={champ}
                  showAdd
                  onAdd={() => setModalOpen(true)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {sorted.map((champ) => (
              <div
                key={champ.id}
                className="glass flex items-center gap-4 rounded-xl px-4 py-3 transition-all hover:bg-white/[0.08]"
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold font-heading"
                  style={{
                    background:
                      champ.tier === "S"
                        ? "var(--tier-s-bg)"
                        : champ.tier === "A"
                          ? "var(--tier-a-bg)"
                          : champ.tier === "B"
                            ? "var(--tier-b-bg)"
                            : "var(--tier-c-bg)",
                  }}
                >
                  {champ.tier}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-[var(--marvel-white)]">{champ.name}</p>
                  <p className="text-xs text-[var(--marvel-light-gray)]">
                    {champ.class} &middot; {champ.starRange.min}★-{champ.starRange.max}★ &middot; {champ.abilities.slice(0, 2).join(", ")}
                  </p>
                </div>
                <div className="flex gap-1">
                  {champ.roles.map((role) => (
                    <span
                      key={role}
                      className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase"
                      style={{
                        background:
                          role === "Attacker"
                            ? "#4CAF5022"
                            : role === "Defender"
                              ? "#F4433622"
                              : "#2196F322",
                        color:
                          role === "Attacker"
                            ? "#4CAF50"
                            : role === "Defender"
                              ? "#F44336"
                              : "#2196F3",
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-[var(--marvel-white)] transition-colors hover:bg-[var(--marvel-red)] font-heading uppercase tracking-wider"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        )}

        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg text-[var(--marvel-light-gray)]">No champions match your filters.</p>
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
