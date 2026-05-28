"use client";

import { useState, useMemo, useCallback } from "react";
import MasteryNodeComponent from "@/components/MasteryNode";
import masteriesData from "@/data/masteries.json";

interface MasteryNodeData {
  id: string;
  name: string;
  tree: string;
  row: number;
  col: string;
  maxPoints: number;
  costPerPoint: number;
  statEffects: { level: number; description: string }[];
  recommendedLevel: number;
  requiredPoints: number;
  prerequisites: string[];
}

const presetBuilds = [
  {
    name: "Standard",
    description: "Balanced all-purpose build. Good for general content and questing.",
    config: {
      lesserPrecision: 0, precision: 3, greaterPrecision: 0,
      lesserCruelty: 0, cruelty: 3, greaterCruelty: 0,
      lesserCritical: 0, critical: 3, greaterCritical: 0,
      deepWounds: 3, assault: 0, expose: 0, pierce: 0, glassCannon: 0,
      lesserBlock: 0, blockProficiency: 0, perfectBlock: 0, greaterBlock: 0,
      vigor: 0, salve: 0, lesserVitality: 0, greaterVitality: 0,
      physicalResist: 0, energyResist: 0, thorns: 0, inequity: 0, resilience: 0, indestructible: 0,
      lesserRecovery: 0, recovery: 3, greaterRecovery: 0,
      willpower: 0, mysticDispersion: 0, pacify: 3, petrify: 3,
      stupefy: 3, despair: 3, resonate: 0, unleash: 0, mysticWard: 0,
    },
  },
  {
    name: "Suicide",
    description: "High-risk high-reward. Maximizes attack at the cost of health. Requires Willpower.",
    config: {
      lesserPrecision: 0, precision: 3, greaterPrecision: 0,
      lesserCruelty: 0, cruelty: 3, greaterCruelty: 0,
      lesserCritical: 3, critical: 3, greaterCritical: 3,
      deepWounds: 3, assault: 0, expose: 0, pierce: 0, glassCannon: 3,
      lesserBlock: 0, blockProficiency: 0, perfectBlock: 0, greaterBlock: 0,
      vigor: 0, salve: 0, lesserVitality: 0, greaterVitality: 0,
      physicalResist: 0, energyResist: 0, thorns: 0, inequity: 0, resilience: 0, indestructible: 0,
      lesserRecovery: 0, recovery: 3, greaterRecovery: 0,
      willpower: 3, mysticDispersion: 0, pacify: 3, petrify: 3,
      stupefy: 3, despair: 3, resonate: 0, unleash: 0, mysticWard: 0,
    },
  },
  {
    name: "Inequity",
    description: "Defensive build. Reduces enemy attack per debuff. Great for long fights.",
    config: {
      lesserPrecision: 0, precision: 3, greaterPrecision: 0,
      lesserCruelty: 0, cruelty: 3, greaterCruelty: 0,
      lesserCritical: 0, critical: 0, greaterCritical: 0,
      deepWounds: 0, assault: 0, expose: 0, pierce: 0, glassCannon: 0,
      lesserBlock: 0, blockProficiency: 0, perfectBlock: 0, greaterBlock: 0,
      vigor: 0, salve: 0, lesserVitality: 3, greaterVitality: 0,
      physicalResist: 0, energyResist: 0, thorns: 0, inequity: 3, resilience: 0, indestructible: 0,
      lesserRecovery: 0, recovery: 3, greaterRecovery: 0,
      willpower: 3, mysticDispersion: 0, pacify: 3, petrify: 3,
      stupefy: 3, despair: 3, resonate: 0, unleash: 0, mysticWard: 0,
    },
  },
  {
    name: "Beginner",
    description: "Cheap build for new players. Saves units for core masteries.",
    config: {
      lesserPrecision: 3, precision: 0, greaterPrecision: 0,
      lesserCruelty: 3, cruelty: 0, greaterCruelty: 0,
      lesserCritical: 0, critical: 0, greaterCritical: 0,
      deepWounds: 0, assault: 0, expose: 0, pierce: 0, glassCannon: 0,
      lesserBlock: 3, blockProficiency: 0, perfectBlock: 0, greaterBlock: 0,
      vigor: 0, salve: 0, lesserVitality: 3, greaterVitality: 0,
      physicalResist: 0, energyResist: 0, thorns: 0, inequity: 0, resilience: 0, indestructible: 0,
      lesserRecovery: 3, recovery: 0, greaterRecovery: 0,
      willpower: 0, mysticDispersion: 0, pacify: 0, petrify: 0,
      stupefy: 3, despair: 0, resonate: 0, unleash: 0, mysticWard: 0,
    },
  },
  {
    name: "Battlegrounds",
    description: "PvP focused. Deep Wounds + Despair + offensive pressure.",
    config: {
      lesserPrecision: 0, precision: 3, greaterPrecision: 3,
      lesserCruelty: 0, cruelty: 3, greaterCruelty: 0,
      lesserCritical: 0, critical: 3, greaterCritical: 0,
      deepWounds: 3, assault: 3, expose: 0, pierce: 0, glassCannon: 0,
      lesserBlock: 0, blockProficiency: 0, perfectBlock: 0, greaterBlock: 0,
      vigor: 0, salve: 0, lesserVitality: 3, greaterVitality: 0,
      physicalResist: 0, energyResist: 0, thorns: 0, inequity: 0, resilience: 0, indestructible: 0,
      lesserRecovery: 0, recovery: 3, greaterRecovery: 0,
      willpower: 0, mysticDispersion: 0, pacify: 3, petrify: 3,
      stupefy: 3, despair: 3, resonate: 0, unleash: 0, mysticWard: 0,
    },
  },
];

export default function MasteriesPage() {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const allMasteries = useMemo(() => {
    const trees = masteriesData.trees as Record<string, MasteryNodeData[]>;
    return [...(trees.offense || []), ...(trees.defense || []), ...(trees.proficiency || [])];
  }, []);

  const getLevel = useCallback(
    (id: string) => allocations[id] || 0,
    [allocations]
  );

  const getTreePoints = useCallback(
    (tree: string) => {
      const trees = masteriesData.trees as Record<string, MasteryNodeData[]>;
      const treeMasteries = trees[tree] || [];
      return treeMasteries.reduce((sum, m) => sum + (allocations[m.id] || 0), 0);
    },
    [allocations]
  );

  const totalPoints = useMemo(
    () => allMasteries.reduce((sum, m) => sum + (allocations[m.id] || 0), 0),
    [allMasteries, allocations]
  );

  const totalCost = useMemo(
    () =>
      allMasteries.reduce((sum, m) => sum + (allocations[m.id] || 0) * m.costPerPoint, 0),
    [allMasteries, allocations]
  );

  const maxPoints = 70;

  const handleAllocate = useCallback(
    (id: string) => {
      if (totalPoints >= maxPoints) return;
      setAllocations((prev) => {
        const mastery = allMasteries.find((m) => m.id === id);
        if (!mastery) return prev;
        const current = prev[id] || 0;
        if (current >= mastery.maxPoints) return prev;
        return { ...prev, [id]: current + 1 };
      });
      setActivePreset(null);
    },
    [totalPoints, allMasteries]
  );

  const handleDeallocate = useCallback(
    (id: string) => {
      setAllocations((prev) => {
        const current = prev[id] || 0;
        if (current <= 0) return prev;
        return { ...prev, [id]: current - 1 };
      });
      setActivePreset(null);
    },
    []
  );

  const applyPreset = useCallback(
    (name: string) => {
      const preset = presetBuilds.find((p) => p.name === name);
      if (!preset) return;
      setAllocations(preset.config as Record<string, number>);
      setActivePreset(name);
    },
    []
  );

  const isUnlocked = useCallback(
    (mastery: MasteryNodeData) => {
      if (mastery.requiredPoints === 0) return true;
      const treePts = getTreePoints(mastery.tree);
      return treePts >= mastery.requiredPoints;
    },
    [getTreePoints]
  );

  const exportBuild = () => {
    const lines: string[] = [];
    lines.push("MCOC Commander - Mastery Build Export");
    lines.push(`Preset: ${activePreset || "Custom"}`);
    lines.push(`Total Points: ${totalPoints} / ${maxPoints}`);
    lines.push(`Total Cost: ${totalCost} units (cores only)`);
    lines.push("---");
    const trees = masteriesData.trees as Record<string, MasteryNodeData[]>;
    for (const [treeName, masteries] of Object.entries(trees)) {
      const active = masteries.filter((m) => (allocations[m.id] || 0) > 0);
      if (active.length === 0) continue;
      lines.push(`\n${treeName.toUpperCase()}:`);
      for (const m of active) {
        const level = allocations[m.id] || 0;
        lines.push(`  ${m.name}: ${level}/${m.maxPoints} (${level * m.costPerPoint} pts)`);
      }
    }
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mcoc-mastery-build.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const trees = masteriesData.trees as Record<string, MasteryNodeData[]>;

  return (
    <div className="flex-1">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[var(--marvel-dark)] to-[var(--marvel-black)] px-4 py-8 md:px-6">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--class-mutant)] blur-[120px] opacity-10" />
        <div className="mx-auto max-w-7xl relative">
          <div className="flex items-center justify-between animate-fade-in-up">
            <div>
              <h1 className="font-heading text-3xl font-bold text-[var(--marvel-white)]">Mastery Advisor</h1>
              <p className="mt-1 text-sm text-[var(--marvel-light-gray)]">
                {totalPoints} / {maxPoints} points used &middot; ~{totalCost} units in cores
              </p>
            </div>
            <button
              onClick={exportBuild}
              className="rounded-xl px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wider text-[var(--marvel-gold)] transition-all hover:glow-gold border border-[var(--marvel-gold)]/30 hover:scale-105"
            >
              Export Build
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--marvel-red)] to-[var(--marvel-gold)] transition-all duration-[var(--transition-normal)]"
                style={{ width: `${(totalPoints / maxPoints) * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium text-[var(--marvel-light-gray)]">
              {Math.round((totalPoints / maxPoints) * 100)}%
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="mb-6">
          <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-[var(--marvel-light-gray)]">
            Preset Builds
          </h2>
          <div className="flex flex-wrap gap-2">
            {presetBuilds.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset.name)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold font-heading uppercase tracking-wider transition-all ${
                  activePreset === preset.name
                    ? "bg-[var(--marvel-red)] text-white shadow-[var(--shadow-glow-red)]"
                    : "glass text-[var(--marvel-light-gray)] hover:text-[var(--marvel-white)]"
                }`}
                title={preset.description}
              >
                {preset.name}
              </button>
            ))}
          </div>
          {activePreset && (
            <p className="mt-2 text-xs text-[var(--marvel-light-gray)]">
              {presetBuilds.find((p) => p.name === activePreset)?.description}
            </p>
          )}
        </div>

        <div className="space-y-8">
          {Object.entries(trees).map(([treeKey, masteries]) => {
            const treeLabel = treeKey.charAt(0).toUpperCase() + treeKey.slice(1);
            const treePts = getTreePoints(treeKey);
            const maxRow = Math.max(...masteries.map((m) => m.row));

            return (
              <div key={treeKey}>
                <div className="mb-4 flex items-center gap-3">
                  <h2 className="font-heading text-xl font-bold text-[var(--marvel-white)]">{treeLabel}</h2>
                  <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs text-[var(--marvel-light-gray)]">
                    {treePts} pts
                  </span>
                </div>
                <div className="space-y-3">
                  {Array.from({ length: maxRow }).map((_, rowIdx) => {
                    const rowNum = rowIdx + 1;
                    const rowMasteries = masteries.filter((m) => m.row === rowNum);
                    if (rowMasteries.length === 0) return null;
                    return (
                      <div key={rowNum} className="relative">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-[10px] text-[var(--marvel-light-gray)] font-heading uppercase tracking-wider">
                            Row {rowNum}
                          </span>
                          <div className="flex-1 h-px bg-white/5" />
                        </div>
                        <div
                          className="grid gap-3"
                          style={{ gridTemplateColumns: `repeat(${rowMasteries.length}, 1fr)` }}
                        >
                          {rowMasteries.map((mastery) => (
                            <MasteryNodeComponent
                              key={mastery.id}
                              mastery={mastery}
                              currentLevel={getLevel(mastery.id)}
                              onAllocate={handleAllocate}
                              onDeallocate={handleDeallocate}
                              canAfford={totalPoints < maxPoints}
                              isUnlocked={isUnlocked(mastery)}
                              treePoints={treePts}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {totalPoints > 60 && (
          <div className="glass mt-8 rounded-xl border border-[#FF9800]/30 bg-[#FF9800]/5 p-4">
            <p className="text-sm font-semibold text-[#FF9800] font-heading uppercase tracking-wider">
              ⚠ Almost at cap! You have {maxPoints - totalPoints} points remaining.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
