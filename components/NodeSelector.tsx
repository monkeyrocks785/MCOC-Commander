"use client";

interface NodeSelectorProps {
  selected: string[];
  onChange: (nodes: string[]) => void;
}

const nodeOptions = [
  { id: "biohazard", label: "Biohazard", difficulty: "Hard" },
  { id: "buffet", label: "Buffet", difficulty: "Hard" },
  { id: "powerShield", label: "Power Shield", difficulty: "Hard" },
  { id: "masochism", label: "Masochism", difficulty: "Hard" },
  { id: "aspectOfWar", label: "Aspect of War", difficulty: "Hard" },
  { id: "aspectOfNightmare", label: "Aspect of Nightmare", difficulty: "Hard" },
  { id: "poison", label: "Poison", difficulty: "Medium" },
  { id: "bleed", label: "Bleed", difficulty: "Easy" },
  { id: "incinerate", label: "Incinerate", difficulty: "Medium" },
  { id: "coldSnap", label: "Cold Snap", difficulty: "Medium" },
  { id: "shock", label: "Shock", difficulty: "Easy" },
  { id: "evade", label: "Evade", difficulty: "Medium" },
  { id: "autoBlock", label: "Auto-Block", difficulty: "Medium" },
  { id: "unblockable", label: "Unblockable Specials", difficulty: "Medium" },
  { id: "regen", label: "Regeneration", difficulty: "Medium" },
  { id: "stunImmunity", label: "Stun Immunity", difficulty: "Medium" },
  { id: "caltrops", label: "Caltrops", difficulty: "Medium" },
  { id: "degen", label: "Degeneration", difficulty: "Medium" },
  { id: "limbo", label: "Limbo", difficulty: "Hard" },
  { id: "stunReflect", label: "Stun Reflect", difficulty: "Hard" },
  { id: "toxicPustules", label: "Toxic Pustules", difficulty: "Hard" },
  { id: "lifeTransfer", label: "Life Transfer", difficulty: "Medium" },
  { id: "roff", label: "Reverse of Fate", difficulty: "Hard" },
  { id: "flux", label: "Flux", difficulty: "Medium" },
  { id: "kick", label: "Kick", difficulty: "Medium" },
];

const diffColor: Record<string, string> = {
  Easy: "#4CAF50",
  Medium: "#FF9800",
  Hard: "#F44336",
};

export default function NodeSelector({ selected, onChange }: NodeSelectorProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((n) => n !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {nodeOptions.map((node) => (
        <button
          key={node.id}
          onClick={() => toggle(node.id)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium font-heading uppercase tracking-wider transition-all ${
            selected.includes(node.id)
              ? "text-white shadow-sm"
              : "glass text-[var(--marvel-light-gray)] hover:text-[var(--marvel-white)]"
          }`}
          style={
            selected.includes(node.id)
              ? { background: diffColor[node.difficulty], boxShadow: `0 0 12px ${diffColor[node.difficulty]}44` }
              : {}
          }
        >
          {node.label}
          <span
            className="ml-1.5 opacity-60"
            style={{ color: selected.includes(node.id) ? "white" : diffColor[node.difficulty] }}
          >
            {node.difficulty[0]}
          </span>
        </button>
      ))}
    </div>
  );
}
