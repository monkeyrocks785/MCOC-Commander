"use client";

import { useState, useMemo } from "react";
import TierBadge from "./TierBadge";
import championsData from "@/data/champions.json";
import synergiesData from "@/data/synergies.json";

interface TeamPick {
  id: string;
  name: string;
  class: string;
  tier: string;
  starRange: { min: number; max: number };
  immunities?: string[];
  abilities?: string[];
  roles?: string[];
}

interface TeamBuilderProps {
  selectedNodes: string[];
}

const classWheel = [
  { class: "Mutant", beats: "Mystic", losesTo: "Tech" },
  { class: "Tech", beats: "Mutant", losesTo: "Cosmic" },
  { class: "Cosmic", beats: "Tech", losesTo: "Mystic" },
  { class: "Mystic", beats: "Cosmic", losesTo: "Science" },
  { class: "Science", beats: "Mystic", losesTo: "Skill" },
  { class: "Skill", beats: "Science", losesTo: "Mutant" },
];

const allChampions = (championsData.champions || []) as TeamPick[];

export default function TeamBuilder({ selectedNodes }: TeamBuilderProps) {
  const [team, setTeam] = useState<(TeamPick | null)[]>([null, null, null, null, null]);

  const addToSlot = (champ: TeamPick, slot: number) => {
    setTeam((prev) => {
      const next = [...prev];
      if (next.includes(champ)) return next;
      next[slot] = champ;
      return next;
    });
  };

  const removeFromSlot = (slot: number) => {
    setTeam((prev) => {
      const next = [...prev];
      next[slot] = null;
      return next;
    });
  };

  const teamHas = (champ: TeamPick) => team.some((t) => t?.id === champ.id);

  const synergyScore = useMemo(() => {
    const active = team.filter(Boolean) as TeamPick[];
    let score = 0;
    const activeIds = new Set(active.map((c) => c.id));
    for (const syn of synergiesData.pairs || []) {
      if (activeIds.has(syn.championA) && activeIds.has(syn.championB)) {
        score += 10;
      }
    }
    for (const syn of synergiesData.synergies || []) {
      const inTeam = syn.champions.filter((c) => activeIds.has(c));
      if (inTeam.length >= 3) score += 15;
    }
    const avgTier = active.reduce((s, c) => {
      const order = ["S", "A", "B", "C", "D"];
      return s + (5 - order.indexOf(c.tier));
    }, 0) / active.length;
    score += Math.round(avgTier * 5);
    return score;
  }, [team]);

  const classAdvice = useMemo(() => {
    const active = team.filter(Boolean) as TeamPick[];
    const classes = active.map((c) => c.class);
    const wheel = classWheel.find((w) => classes.includes(w.class));
    if (!wheel) return null;
    const beats = active.filter((c) => {
      const entry = classWheel.find((w) => w.class === c.class);
      return entry && classes.includes(entry.losesTo);
    });
    return { beats, covered: classes };
  }, [team]);

  const recommendation = useMemo(() => {
    const active = team.filter(Boolean) as TeamPick[];
    const activeIds = new Set(active.map((c) => c.id));

    const nodesLowerCase = selectedNodes.map((n) => n.toLowerCase());
    const hasDOT = ["bleed", "poison", "incinerate"].some((n) =>
      nodesLowerCase.includes(n)
    );
    const hasPower = ["powerShield"].some((n) => nodesLowerCase.includes(n));
    const hasEvade = ["evade", "autoBlock"].some((n) =>
      nodesLowerCase.includes(n)
    );
    const hasRegen = ["regen"].some((n) => nodesLowerCase.includes(n));

    const scored = allChampions
      .filter((c) => !activeIds.has(c.id))
      .map((c) => {
        let score = 0;
        const immunities = c.immunities || [];
        const abilities = c.abilities || [];
        const roles = c.roles || [];

        if (hasDOT) {
          if (immunities.some((i) => ["Bleed", "Poison", "Incinerate"].includes(i)))
            score += 30;
        }
        if (hasPower) {
          if (abilities.some((a) => ["Power Drain", "Power Burn", "Power Lock"].includes(a)))
            score += 25;
        }
        if (hasEvade) {
          if (abilities.some((a) => ["True Strike", "Lock-On"].includes(a)))
            score += 20;
        }
        if (hasRegen) {
          if (abilities.some((a) => a.includes("Regen")) || abilities.includes("Heal Block"))
            score += 20;
        }

        if (roles.includes("Attacker")) score += 10;

        const tierOrder = ["S", "A", "B", "C", "D"];
        score += (5 - tierOrder.indexOf(c.tier)) * 5;

        return { champion: c, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return scored;
  }, [selectedNodes, team]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-2">
        {team.map((slot, i) => (
          <div
            key={i}
            className={`glass flex min-h-[100px] flex-col items-center justify-center rounded-xl p-2 text-center transition-all ${
              slot ? "" : "border border-dashed border-white/10"
            }`}
          >
            {slot ? (
              <>
                <div className="flex items-center gap-1">
                  <TierBadge tier={slot.tier} size="sm" />
                  <span className="text-xs font-semibold text-[var(--marvel-white)] truncate font-heading">
                    {slot.name}
                  </span>
                </div>
                <span className="mt-0.5 text-[10px] text-[var(--marvel-light-gray)]">{slot.class}</span>
                <button
                  onClick={() => removeFromSlot(i)}
                  className="mt-1 text-[9px] text-[var(--marvel-light-gray)] transition-colors hover:text-[var(--marvel-red)]"
                >
                  Remove
                </button>
              </>
            ) : (
              <span className="text-[10px] text-[var(--marvel-light-gray)]">
                Slot {i + 1}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm font-bold text-[var(--marvel-white)]">
            Team Score
          </span>
          <span className="font-heading text-2xl font-bold text-[var(--marvel-gold)]">
            {synergyScore}
          </span>
        </div>
        {team.filter(Boolean).length >= 3 && (
          <p className="mt-1 text-xs text-[var(--marvel-light-gray)]">
            {synergyScore >= 50
              ? "Excellent team composition!"
              : synergyScore >= 30
                ? "Good synergy. Consider adding more class coverage."
                : "Low synergy. Try adding champions with shared synergies."}
          </p>
        )}
      </div>

      {classAdvice && (
        <div className="glass rounded-xl p-4">
          <h3 className="mb-2 font-heading text-xs font-bold uppercase tracking-wider text-[var(--marvel-gold)]">
            Class Advantage
          </h3>
          <div className="flex flex-wrap gap-2">
            {classAdvice.covered.map((cls) => {
              const wheel = classWheel.find((w) => w.class === cls);
              if (!wheel) return null;
              return (
                <div key={cls} className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-[var(--marvel-light-gray)]">
                  <span className="font-semibold text-[var(--marvel-white)]">{cls}</span>
                  {" → beats "}
                  <span style={{ color: "var(--class-mystic)" }}>{wheel.beats}</span>
                  {" → weak to "}
                  <span style={{ color: "var(--class-tech)" }}>{wheel.losesTo}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {recommendation.length > 0 && (
        <div>
          <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-[var(--marvel-light-gray)]">
            Recommended Picks
            {selectedNodes.length > 0 && " (based on selected nodes)"}
          </h3>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {recommendation.map(({ champion, score }) => (
              <button
                key={champion.id}
                onClick={() => {
                  const emptySlot = team.findIndex((s) => s === null);
                  if (emptySlot !== -1) addToSlot(champion as TeamPick, emptySlot);
                }}
                disabled={teamHas(champion as TeamPick)}
                className={`glass rounded-xl p-3 text-left transition-all hover:scale-[1.02] ${
                  teamHas(champion as TeamPick) ? "opacity-40" : ""
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <TierBadge tier={champion.tier} size="sm" />
                  <span className="text-xs font-semibold text-[var(--marvel-white)] truncate font-heading">
                    {champion.name}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[10px] text-[var(--marvel-light-gray)]">{champion.class}</span>
                  <span className="text-[10px] font-bold text-[var(--marvel-gold)]">{score}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {team.some(Boolean) && (
        <button
          onClick={() => {
            const names = team.filter(Boolean).map((t) => t!.name).join(", ");
            navigator.clipboard.writeText(`MCOC Team: ${names}`);
          }}
          className="w-full rounded-xl bg-[var(--marvel-red)] py-3 font-heading text-sm font-bold uppercase tracking-wider text-white transition-all hover:glow-red"
        >
          Copy Team to Clipboard
        </button>
      )}
    </div>
  );
}
