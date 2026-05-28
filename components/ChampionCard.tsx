import TierBadge from "./TierBadge";

export interface Champion {
  id: string;
  name: string;
  class: string;
  tier: string;
  starRange: { min: number; max: number };
  abilities: string[];
  immunities: string[];
  bestUseCase: string;
  roles: string[];
  counters: string[];
  awakeningPriority: string;
  description?: string;
}

const classColors: Record<string, string> = {
  Mutant: "var(--class-mutant)",
  Tech: "var(--class-tech)",
  Skill: "var(--class-skill)",
  Science: "var(--class-science)",
  Mystic: "var(--class-mystic)",
  Cosmic: "var(--class-cosmic)",
};

const classIcons: Record<string, string> = {
  Mutant: "🧬",
  Tech: "⚙",
  Skill: "⚔",
  Science: "🔬",
  Mystic: "🔮",
  Cosmic: "🌌",
};

const classGlows: Record<string, string> = {
  Mutant: "border-glow-mutant",
  Tech: "border-glow-tech",
  Skill: "border-glow-skill",
  Science: "border-glow-science",
  Mystic: "border-glow-mystic",
  Cosmic: "border-glow-cosmic",
};

const roleColors: Record<string, string> = {
  Attacker: "#4CAF50",
  Defender: "#F44336",
  Utility: "#2196F3",
};

interface ChampionCardProps {
  champion: Champion;
  onAdd?: (champion: Champion) => void;
  showAdd?: boolean;
}

export default function ChampionCard({ champion, onAdd, showAdd }: ChampionCardProps) {
  const classColor = classColors[champion.class] || "var(--marvel-light-gray)";
  const classIcon = classIcons[champion.class] || "★";
  const glowClass = classGlows[champion.class] || "";
  const stars = Array.from({ length: champion.starRange.max - champion.starRange.min + 1 }, (_, i) => i + champion.starRange.min);

  return (
    <div
      className={`glass-card group relative overflow-hidden rounded-xl p-4 ${glowClass}`}
      style={{ borderLeft: `3px solid ${classColor}` }}
    >
      <div className="absolute top-0 right-0 h-16 w-16 opacity-[0.03]" style={{ background: `radial-gradient(circle at top right, ${classColor}, transparent)` }} />

      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <TierBadge tier={champion.tier} size="sm" />
            <h3 className="font-heading text-base font-bold text-[var(--marvel-white)] truncate">
              {champion.name}
            </h3>
          </div>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="text-[10px]">{classIcon}</span>
            <span className="text-xs font-medium" style={{ color: classColor }}>
              {champion.class}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-2.5 flex gap-0.5">
        {stars.map((s) => (
          <span key={s} className="text-xs" style={{ color: s <= 5 ? "var(--marvel-gold)" : "var(--marvel-red)" }}>
            ★
          </span>
        ))}
      </div>

      <div className="mb-2.5 flex flex-wrap gap-1">
        {champion.roles.map((role) => (
          <span
            key={role}
            className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase"
            style={{ background: `${roleColors[role] || "#666"}22`, color: roleColors[role] || "#666" }}
          >
            {role}
          </span>
        ))}
        <span
          className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase"
          style={{
            background:
              champion.awakeningPriority === "High"
                ? "#FFD70022"
                : champion.awakeningPriority === "Medium"
                  ? "#2196F322"
                  : "#9E9E9E22",
            color:
              champion.awakeningPriority === "High"
                ? "#FFD700"
                : champion.awakeningPriority === "Medium"
                  ? "#2196F3"
                  : "#9E9E9E",
          }}
        >
          {champion.awakeningPriority === "High" ? "★" : champion.awakeningPriority === "Medium" ? "◆" : "○"} {champion.awakeningPriority}
        </span>
      </div>

      <div className="mb-2.5 flex flex-wrap gap-1">
        {champion.abilities.slice(0, 3).map((ability) => (
          <span
            key={ability}
            className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-[var(--marvel-light-gray)] transition-colors group-hover:bg-white/8"
          >
            {ability}
          </span>
        ))}
        {champion.abilities.length > 3 && (
          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-[var(--marvel-light-gray)]">
            +{champion.abilities.length - 3}
          </span>
        )}
      </div>

      {champion.immunities.length > 0 && (
        <div className="mb-2.5 flex flex-wrap gap-1">
          {champion.immunities.slice(0, 3).map((imm) => (
            <span
              key={imm}
              className="flex items-center gap-1 rounded bg-[#4CAF50]/10 px-1.5 py-0.5 text-[10px] text-[#4CAF50]"
            >
              <span className="text-[8px]">🛡</span> {imm}
            </span>
          ))}
          {champion.immunities.length > 3 && (
            <span className="rounded bg-[#4CAF50]/10 px-1.5 py-0.5 text-[10px] text-[#4CAF50]">
              +{champion.immunities.length - 3}
            </span>
          )}
        </div>
      )}

      {champion.description && (
        <p className="mb-3 text-[11px] leading-relaxed text-[var(--marvel-light-gray)] line-clamp-2">
          {champion.description}
        </p>
      )}

      {showAdd && onAdd && (
        <button
          onClick={() => onAdd(champion)}
          className="mt-1 w-full rounded-lg bg-white/10 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--marvel-white)] transition-all duration-200 hover:bg-[var(--marvel-red)] hover:shadow-[0_0_16px_rgba(237,29,36,0.3)] font-heading"
        >
          + Add to Roster
        </button>
      )}
    </div>
  );
}
