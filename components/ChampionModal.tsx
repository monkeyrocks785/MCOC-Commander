"use client";

import { useState, useEffect, useRef } from "react";

interface RosterEntry {
  id: string;
  name: string;
  star: number;
  rank: number;
  awakened: boolean;
  class: string;
  tier: string;
}

interface ChampionModalProps {
  onClose: () => void;
  onSave: (entry: RosterEntry) => void;
}

const mockChampions = [
  { id: "doctorDoom", name: "Doctor Doom", class: "Mystic", tier: "S", starRange: { min: 3, max: 7 } },
  { id: "hulkling", name: "Hulkling", class: "Cosmic", tier: "S", starRange: { min: 3, max: 7 } },
  { id: "onslaught", name: "Onslaught", class: "Mutant", tier: "S", starRange: { min: 3, max: 7 } },
  { id: "hercules", name: "Hercules", class: "Cosmic", tier: "S", starRange: { min: 3, max: 7 } },
  { id: "warlock", name: "Warlock", class: "Tech", tier: "S", starRange: { min: 2, max: 6 } },
  { id: "ghost", name: "Ghost", class: "Tech", tier: "S", starRange: { min: 2, max: 6 } },
  { id: "archangel", name: "Archangel", class: "Mutant", tier: "S", starRange: { min: 2, max: 6 } },
  { id: "nickFury", name: "Nick Fury", class: "Skill", tier: "S", starRange: { min: 2, max: 6 } },
  { id: "corvusGlaive", name: "Corvus Glaive", class: "Cosmic", tier: "S", starRange: { min: 2, max: 6 } },
  { id: "kittyPryde", name: "Kitty Pryde", class: "Mutant", tier: "S", starRange: { min: 3, max: 7 } },
  { id: "photon", name: "Photon", class: "Science", tier: "S", starRange: { min: 3, max: 7 } },
  { id: "juggernaut", name: "Juggernaut", class: "Science", tier: "S", starRange: { min: 2, max: 7 } },
  { id: "thorRagnarok", name: "Thor (Ragnarok)", class: "Cosmic", tier: "S", starRange: { min: 2, max: 7 } },
  { id: "chavez", name: "America Chavez", class: "Mystic", tier: "S", starRange: { min: 3, max: 7 } },
  { id: "knull", name: "Knull", class: "Cosmic", tier: "S", starRange: { min: 3, max: 7 } },
  { id: "deadpoolX", name: "Deadpool (X-Force)", class: "Mutant", tier: "S", starRange: { min: 3, max: 7 } },
  { id: "omegaSentinel", name: "Omega Sentinel", class: "Tech", tier: "S", starRange: { min: 3, max: 7 } },
  { id: "void", name: "Void", class: "Science", tier: "S", starRange: { min: 2, max: 6 } },
  { id: "quake", name: "Quake", class: "Science", tier: "S", starRange: { min: 2, max: 6 } },
  { id: "humanTorch", name: "Human Torch", class: "Science", tier: "S", starRange: { min: 2, max: 6 } },
  { id: "domino", name: "Domino", class: "Mutant", tier: "S", starRange: { min: 2, max: 6 } },
  { id: "apocalypse", name: "Apocalypse", class: "Mutant", tier: "S", starRange: { min: 3, max: 7 } },
  { id: "captainMarvelMovie", name: "Captain Marvel (Movie)", class: "Cosmic", tier: "S", starRange: { min: 2, max: 6 } },
  { id: "hulk", name: "Hulk", class: "Science", tier: "B", starRange: { min: 2, max: 6 } },
  { id: "ironMan", name: "Iron Man", class: "Tech", tier: "C", starRange: { min: 2, max: 5 } },
  { id: "wolverine", name: "Wolverine", class: "Mutant", tier: "C", starRange: { min: 2, max: 5 } },
  { id: "storm", name: "Storm", class: "Mutant", tier: "C", starRange: { min: 2, max: 5 } },
  { id: "blackPanther", name: "Black Panther", class: "Skill", tier: "C", starRange: { min: 2, max: 5 } },
  { id: "cyclopsBlue", name: "Cyclops (Blue)", class: "Mutant", tier: "D", starRange: { min: 2, max: 5 } },
  { id: "groot", name: "Groot", class: "Cosmic", tier: "D", starRange: { min: 2, max: 5 } },
].sort((a, b) => a.name.localeCompare(b.name));

const ranks = [1, 2, 3, 4, 5];
const starsList = [3, 4, 5, 6, 7];

export default function ChampionModal({ onClose, onSave }: ChampionModalProps) {
  const [search, setSearch] = useState("");
  const [selectedChamp, setSelectedChamp] = useState<string | null>(null);
  const [star, setStar] = useState(5);
  const [rank, setRank] = useState(1);
  const [awakened, setAwakened] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const filtered = mockChampions.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedData = mockChampions.find((c) => c.id === selectedChamp);

  const handleSave = () => {
    if (!selectedData) return;
    onSave({
      id: selectedData.id,
      name: selectedData.name,
      star,
      rank,
      awakened,
      class: selectedData.class,
      tier: selectedData.tier,
    });
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="glass-strong w-full max-w-lg rounded-2xl p-6 max-h-[85vh] overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-[var(--marvel-white)]">
            Add Champion
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[var(--marvel-light-gray)] hover:text-[var(--marvel-white)] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="glass mb-4 flex items-center gap-2 rounded-xl px-3 py-2">
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
            autoFocus
          />
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedChamp(c.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all font-heading uppercase tracking-wider ${
                selectedChamp === c.id
                  ? "bg-[var(--marvel-red)] text-white"
                  : "bg-white/5 text-[var(--marvel-light-gray)] hover:bg-white/10 hover:text-[var(--marvel-white)]"
              }`}
            >
              {c.name}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-xs text-[var(--marvel-light-gray)]">No champions found</p>
          )}
        </div>

        {selectedData && (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--marvel-light-gray)] font-heading">
                Star Rating
              </label>
              <div className="flex gap-1.5">
                {starsList.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStar(s)}
                    disabled={s < selectedData.starRange.min || s > selectedData.starRange.max}
                    className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
                      star === s
                        ? "bg-[var(--marvel-red)] text-white"
                        : s < selectedData.starRange.min || s > selectedData.starRange.max
                          ? "bg-white/5 text-[var(--marvel-light-gray)]/30 cursor-not-allowed"
                          : "bg-white/5 text-[var(--marvel-light-gray)] hover:bg-white/10"
                    }`}
                  >
                    {s}★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--marvel-light-gray)] font-heading">
                Rank
              </label>
              <div className="flex gap-1.5">
                {ranks.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRank(r)}
                    className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
                      rank === r
                        ? "bg-[var(--marvel-red)] text-white"
                        : "bg-white/5 text-[var(--marvel-light-gray)] hover:bg-white/10"
                    }`}
                  >
                    R{r}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-[var(--marvel-white)]">Awakened</label>
              <button
                onClick={() => setAwakened(!awakened)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  awakened ? "bg-[var(--marvel-red)]" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    awakened ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>

            <button
              onClick={handleSave}
              className="w-full rounded-xl bg-[var(--marvel-red)] py-3 font-heading text-sm font-bold uppercase tracking-wider text-white transition-all hover:glow-red"
            >
              Add to Roster
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
