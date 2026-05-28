"use client";

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
}

interface MasteryNodeProps {
  mastery: MasteryNodeData;
  currentLevel: number;
  onAllocate: (id: string) => void;
  onDeallocate: (id: string) => void;
  canAfford: boolean;
  isUnlocked: boolean;
  treePoints: number;
}

const treeColors: Record<string, { accent: string; bg: string }> = {
  offense: { accent: "var(--marvel-red)", bg: "rgba(237,29,36,0.08)" },
  defense: { accent: "var(--class-tech)", bg: "rgba(0,188,212,0.08)" },
  proficiency: { accent: "var(--marvel-gold)", bg: "rgba(255,215,0,0.08)" },
};

export default function MasteryNode({
  mastery,
  currentLevel,
  onAllocate,
  onDeallocate,
  canAfford,
  isUnlocked,
  treePoints,
}: MasteryNodeProps) {
  const isComplete = currentLevel >= mastery.maxPoints;
  const meetsRequired = treePoints >= mastery.requiredPoints;
  const tree = treeColors[mastery.tree] || treeColors.offense;

  return (
    <div
      className={`relative w-full max-w-[200px] rounded-xl p-3.5 transition-all duration-200 ${
        !meetsRequired ? "opacity-30 pointer-events-none" : isUnlocked ? "hover:scale-[1.02]" : "opacity-50"
      }`}
      style={{
        background: isComplete ? tree.bg : currentLevel > 0 ? "rgba(255,255,255,0.04)" : "var(--glass-bg)",
        backdropFilter: "blur(8px)",
        border: `1px solid ${
          isComplete
            ? tree.accent
            : currentLevel > 0
              ? "rgba(255,255,255,0.15)"
              : "var(--glass-border)"
        }`,
        boxShadow: isComplete
          ? `0 0 20px ${tree.accent}22, inset 0 1px 0 ${tree.accent}11`
          : "none",
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-bold font-heading uppercase tracking-wider text-[var(--marvel-white)] truncate pr-1">
          {mastery.name}
        </span>
        <span
          className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold"
          style={{
            background: isComplete ? `${tree.accent}22` : "rgba(255,255,255,0.05)",
            color: isComplete ? tree.accent : "var(--marvel-light-gray)",
          }}
        >
          {currentLevel}/{mastery.maxPoints}
        </span>
      </div>

      <div className="mb-2">
        <div className="flex gap-0.5">
          {Array.from({ length: mastery.maxPoints }).map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{
                background: i < currentLevel ? tree.accent : "rgba(255,255,255,0.08)",
                boxShadow: i < currentLevel ? `0 0 6px ${tree.accent}44` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {currentLevel > 0 && mastery.statEffects[currentLevel - 1] && (
        <p className="mb-2.5 text-[10px] leading-tight text-[var(--marvel-light-gray)]">
          {mastery.statEffects[currentLevel - 1].description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {isUnlocked && currentLevel > 0 && (
            <button
              onClick={() => onDeallocate(mastery.id)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs text-[var(--marvel-light-gray)] transition-all hover:bg-white/20 hover:scale-110"
              title="Remove point"
            >
              −
            </button>
          )}
          {isUnlocked && !isComplete && (
            <button
              onClick={() => onAllocate(mastery.id)}
              disabled={!canAfford}
              className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all"
              style={{
                background: canAfford ? tree.accent : "rgba(255,255,255,0.05)",
                color: canAfford ? "white" : "rgba(255,255,255,0.2)",
                boxShadow: canAfford ? `0 0 8px ${tree.accent}33` : "none",
                cursor: canAfford ? "pointer" : "not-allowed",
              }}
              title={canAfford ? `Cost: ${mastery.costPerPoint} pt` : "Not enough points"}
            >
              +
            </button>
          )}
          {isComplete && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs" style={{ background: `${tree.accent}22`, color: tree.accent }}>
              ✓
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {mastery.requiredPoints > 0 && (
            <span className="rounded bg-white/5 px-1 py-0.5 text-[9px] text-[var(--marvel-light-gray)]">
              req {mastery.requiredPoints}
            </span>
          )}
          <span className="text-[9px] text-[var(--marvel-light-gray)]">
            {mastery.costPerPoint}pt
          </span>
        </div>
      </div>

      {mastery.recommendedLevel > 0 && !isComplete && (
        <div className="mt-2 flex items-center gap-1 rounded bg-[var(--marvel-gold)]/5 px-1.5 py-0.5">
          <span className="text-[9px] text-[var(--marvel-gold)]">★</span>
          <span className="text-[9px] text-[var(--marvel-gold)]">Recommended: {mastery.recommendedLevel}</span>
        </div>
      )}

      {(mastery.name === "Deep Wounds" || mastery.name === "Willpower" || mastery.name === "Despair" || mastery.name === "Glass Cannon" || mastery.name === "Liquid Courage" || mastery.name === "Double Edge") && (
        <div className="mt-1.5 rounded bg-[#F44336]/10 px-1.5 py-0.5">
          <p className="text-[9px] text-[#F44336]">
            {mastery.name === "Deep Wounds" && currentLevel < 3 && "Trap: Max for bleed champs"}
            {mastery.name === "Willpower" && currentLevel < 1 && "Essential: Required for suicide builds"}
            {mastery.name === "Despair" && currentLevel < 3 && "Trap: Max to shut down regen"}
            {mastery.name === "Glass Cannon" && currentLevel > 2 && "Warning: Reduces survivability"}
            {mastery.name === "Liquid Courage" && "Requires Willpower mastery"}
            {mastery.name === "Double Edge" && "Requires Willpower mastery"}
          </p>
        </div>
      )}
    </div>
  );
}
