"use client";

interface SynergyCardProps {
  champions: string[];
  name?: string;
  bonus: string;
  description: string;
  type: "pair" | "team";
}

const bonusColors: Record<string, string> = {
  Attack: "#F44336",
  Defense: "#2196F3",
  Utility: "#4CAF50",
  Health: "#FF9800",
};

export default function SynergyCard({ champions, name, bonus, description, type }: SynergyCardProps) {
  return (
    <div className="glass rounded-xl p-4 transition-all duration-[var(--transition-normal)] hover:shadow-[var(--shadow-card)]">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {champions.slice(0, 3).map((champ) => (
            <div
              key={champ}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold uppercase text-[var(--marvel-white)] font-heading"
              title={champ}
            >
              {champ.slice(0, 2)}
            </div>
          ))}
          {champions.length > 3 && (
            <span className="text-[10px] text-[var(--marvel-light-gray)]">+{champions.length - 3}</span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="rounded px-2 py-0.5 text-[10px] font-bold uppercase font-heading"
            style={{ background: `${(bonusColors[bonus] || "#666")}22`, color: bonusColors[bonus] || "#666" }}
          >
            {bonus}
          </span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase text-[var(--marvel-light-gray)] font-heading">
            {type}
          </span>
        </div>
      </div>

      {name && (
        <h3 className="mb-1 font-heading text-sm font-bold text-[var(--marvel-white)]">{name}</h3>
      )}

      <p className="flex flex-wrap gap-1 mb-2">
        {champions.map((champ) => (
          <span key={champ} className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-[var(--marvel-light-gray)]">
            {champ}
          </span>
        ))}
      </p>

      <p className="text-xs leading-relaxed text-[var(--marvel-light-gray)]">{description}</p>
    </div>
  );
}
