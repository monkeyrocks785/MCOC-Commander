"use client";

import { useState, useMemo } from "react";
import SynergyCard from "@/components/SynergyCard";
import synergiesData from "@/data/synergies.json";

export default function SynergiesPage() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"browse" | "team">("browse");
  const [teamPicks, setTeamPicks] = useState<string[]>([]);

  const allSynergies = useMemo(() => synergiesData.synergies || [], []);
  const allPairs = useMemo(() => synergiesData.pairs || [], []);

  const filteredSynergies = useMemo(() => {
    if (!search) return allSynergies;
    const q = search.toLowerCase();
    return allSynergies.filter((s) =>
      s.champions.some((c) => c.toLowerCase().includes(q))
    );
  }, [search, allSynergies]);

  const filteredPairs = useMemo(() => {
    if (!search) return allPairs;
    const q = search.toLowerCase();
    return allPairs.filter(
      (p) =>
        p.championA.toLowerCase().includes(q) ||
        p.championB.toLowerCase().includes(q)
    );
  }, [search, allPairs]);

  const allChampNames = useMemo(() => {
    const set = new Set<string>();
    for (const s of allSynergies) {
      for (const c of s.champions) set.add(c);
    }
    for (const p of allPairs) {
      set.add(p.championA);
      set.add(p.championB);
    }
    return Array.from(set).sort();
  }, [allSynergies, allPairs]);

  const toggleTeamPick = (name: string) => {
    setTeamPicks((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name].slice(0, 5)
    );
  };

  const teamSynergies = useMemo(() => {
    if (teamPicks.length < 2) return [];
    const picks = new Set(teamPicks.map((n) => n.toLowerCase()));
    const results: { type: "pair" | "team"; data: { description: string; bonus?: string; type?: string } }[] = [];

    for (const p of allPairs) {
      if (picks.has(p.championA.toLowerCase()) && picks.has(p.championB.toLowerCase())) {
        results.push({ type: "pair", data: p });
      }
    }

    for (const s of allSynergies) {
      const matchCount = s.champions.filter((c) => picks.has(c.toLowerCase())).length;
      if (matchCount >= 2) {
        results.push({ type: "team", data: s });
      }
    }

    return results;
  }, [teamPicks, allPairs, allSynergies]);

  return (
    <div className="flex-1">
      <section className="border-b border-white/10 bg-gradient-to-b from-[var(--marvel-dark)] to-[var(--marvel-black)] px-4 py-8 md:px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-heading text-3xl font-bold text-[var(--marvel-white)]">Synergy Finder</h1>
          <p className="mt-1 text-sm text-[var(--marvel-light-gray)]">Discover champion synergies and build optimal teams</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="flex rounded-lg overflow-hidden border border-white/10">
            <button
              onClick={() => setMode("browse")}
              className={`px-4 py-2 text-xs font-semibold font-heading uppercase tracking-wider transition-colors ${
                mode === "browse" ? "bg-white/15 text-[var(--marvel-white)]" : "text-[var(--marvel-light-gray)] hover:text-[var(--marvel-white)]"
              }`}
            >
              Browse
            </button>
            <button
              onClick={() => setMode("team")}
              className={`px-4 py-2 text-xs font-semibold font-heading uppercase tracking-wider transition-colors ${
                mode === "team" ? "bg-white/15 text-[var(--marvel-white)]" : "text-[var(--marvel-light-gray)] hover:text-[var(--marvel-white)]"
              }`}
            >
              Team Builder
            </button>
          </div>

          <div className="glass flex flex-1 items-center gap-2 rounded-xl px-3 py-2 min-w-[200px]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--marvel-light-gray)]">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder={mode === "browse" ? "Search by champion name..." : "Add champions to team..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-[var(--marvel-white)] placeholder-[var(--marvel-light-gray)] outline-none"
            />
          </div>
        </div>

        {mode === "team" && (
          <div className="mb-6">
            <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-[var(--marvel-light-gray)]">
              Your Team ({teamPicks.length}/5)
            </h2>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {allChampNames.slice(0, 50).map((name) => (
                <button
                  key={name}
                  onClick={() => toggleTeamPick(name)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium font-heading uppercase tracking-wider transition-all ${
                    teamPicks.includes(name)
                      ? "bg-[var(--marvel-red)] text-white"
                      : "glass text-[var(--marvel-light-gray)] hover:text-[var(--marvel-white)]"
                  } ${teamPicks.length >= 5 && !teamPicks.includes(name) ? "opacity-30" : ""}`}
                >
                  {name}
                </button>
              ))}
            </div>

            {teamSynergies.length > 0 ? (
              <div className="glass rounded-xl p-4 mb-4">
                <h3 className="mb-3 font-heading text-sm font-bold text-[var(--marvel-gold)]">
                  Active allSynergies ({teamSynergies.length})
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {teamSynergies.map((syn, i) => (
                    <div key={i} className="rounded-lg bg-white/5 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase text-[var(--marvel-light-gray)] font-heading">
                          {syn.type}
                        </span>
                        <span className="text-xs font-semibold text-[var(--marvel-white)]">{syn.data.bonus}</span>
                      </div>
                      <p className="text-[11px] text-[var(--marvel-light-gray))">{syn.data.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : teamPicks.length >= 2 ? (
              <p className="text-sm text-[var(--marvel-light-gray)]">No allSynergies found between these champions.</p>
            ) : null}
          </div>
        )}

        <div className="space-y-6">
          {filteredSynergies.length > 0 && (
            <div>
              <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-[var(--marvel-light-gray)]">
                Team Synergies
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSynergies.map((syn, i) => (
                  <SynergyCard
                    key={i}
                    champions={syn.champions}
                    name={syn.name}
                    bonus={syn.bonus}
                    description={syn.description}
                    type="team"
                  />
                ))}
              </div>
            </div>
          )}

          {filteredPairs.length > 0 && (
            <div>
              <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-[var(--marvel-light-gray)]">
                Pair Synergies
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPairs.map((pair, i) => (
                  <SynergyCard
                    key={i}
                    champions={[pair.championA, pair.championB]}
                    name={`${pair.championA} + ${pair.championB}`}
                    bonus={pair.type}
                    description={pair.description}
                    type="pair"
                  />
                ))}
              </div>
            </div>
          )}

          {!search && mode === "browse" && (
            <div>
              <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-[var(--marvel-gold)]">
                Best Synergy Teams
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {(allSynergies.filter((s) =>
                  ["The Trinity", "Houses of X", "Rise of the Horsemen", "Symbiote Hive", "Ant-Family", "Deadpool Family"].includes(s.name)
                )).map((syn, i) => (
                  <SynergyCard
                    key={i}
                    champions={syn.champions}
                    name={syn.name}
                    bonus={syn.bonus}
                    description={syn.description}
                    type="team"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
