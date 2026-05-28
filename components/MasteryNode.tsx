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

const colOffset: Record<string, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
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

  return (
    <div className={`flex ${colOffset[mastery.col] || "justify-center"}`}>
      <div
        className={`glass group w-full max-w-[200px] rounded-xl p-3 transition-all duration-[var(--transition-fast)] ${
          isUnlocked ? "hover:shadow-[var(--shadow-card)]" : "opacity-50"
        } ${!meetsRequired ? "opacity-40 pointer-events-none" : ""}`}
        style={{
          borderColor: isComplete
            ? "var(--marvel-gold)"
            : currentLevel > 0
              ? "var(--marvel-red)"
              : "var(--glass-border)",
          borderWidth: 1,
          borderStyle: "solid",
        }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold font-heading uppercase tracking-wider text-[var(--marvel-white)] truncate pr-1">
            {mastery.name}
          </span>
          <span
            className={`shrink-0 text-[10px] font-bold ${
              isComplete ? "text-[var(--marvel-gold)]" : "text-[var(--marvel-light-gray)]"
            }`}
          >
            {currentLevel}/{mastery.maxPoints}
          </span>
        </div>

        <div className="mb-2">
          <div className="flex gap-0.5">
            {Array.from({ length: mastery.maxPoints }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i < currentLevel ? "bg-[var(--marvel-red)]" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>

        {currentLevel > 0 && mastery.statEffects[currentLevel - 1] && (
          <p className="mb-2 text-[10px] leading-tight text-[var(--marvel-light-gray)]">
            {mastery.statEffects[currentLevel - 1].description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isUnlocked && currentLevel > 0 && (
              <button
                onClick={() => onDeallocate(mastery.id)}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs text-[var(--marvel-light-gray)] transition-colors hover:bg-white/20"
                title="Remove point"
              >
                −
              </button>
            )}
            {isUnlocked && !isComplete && (
              <button
                onClick={() => onAllocate(mastery.id)}
                disabled={!canAfford}
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  canAfford
                    ? "bg-[var(--marvel-red)] text-white hover:glow-red"
                    : "bg-white/5 text-[var(--marvel-light-gray)]/50 cursor-not-allowed"
                }`}
                title={canAfford ? `Cost: ${mastery.costPerPoint} pt` : "Not enough points"}
              >
                +
              </button>
            )}
          </div>
          <div className="flex items-center gap-1">
            {mastery.requiredPoints > 0 && (
              <span className="text-[9px] text-[var(--marvel-light-gray)]">
                req {mastery.requiredPoints}
              </span>
            )}
            <span className="text-[9px] text-[var(--marvel-light-gray)]">
              {mastery.costPerPoint}pt
            </span>
          </div>
        </div>

        {mastery.recommendedLevel > 0 && (
          <div className="mt-2 flex items-center gap-1">
            <span className="text-[9px] text-[var(--marvel-gold)]">★</span>
            <span className="text-[9px] text-[var(--marvel-gold)]">Recommended: {mastery.recommendedLevel}</span>
          </div>
        )}

        {mastery.name === "Deep Wounds" && currentLevel < 3 && (
          <p className="mt-1 text-[9px] text-[#F44336]">Trap: Max for bleed champs</p>
        )}
        {mastery.name === "Willpower" && currentLevel < 1 && (
          <p className="mt-1 text-[9px] text-[#FF9800]">Trap: Essential for Suicide builds</p>
        )}
        {mastery.name === "Despair" && currentLevel < 3 && (
          <p className="mt-1 text-[9px] text-[#F44336]">Trap: Max to shut down regen</p>
        )}
        {mastery.name === "Glass Cannon" && currentLevel > 2 && (
          <p className="mt-1 text-[9px] text-[#FF9800]">Warning: Reduces survivability</p>
        )}
        {mastery.name === "Liquid Courage" && (
          <p className="mt-1 text-[9px] text-[#F44336]">Trap: Requires Willpower</p>
        )}
        {mastery.name === "Double Edge" && (
          <p className="mt-1 text-[9px] text-[#F44336]">Trap: Requires Willpower</p>
        )}
      </div>
    </div>
  );
}
