interface TierBadgeProps {
  tier: string;
  size?: "sm" | "md" | "lg";
}

const tierBg: Record<string, string> = {
  S: "var(--tier-s-bg)",
  A: "var(--tier-a-bg)",
  B: "var(--tier-b-bg)",
  C: "var(--tier-c-bg)",
  D: "var(--tier-d-bg)",
};

const sizeClasses = {
  sm: "w-5 h-5 text-[10px]",
  md: "w-7 h-7 text-xs",
  lg: "w-9 h-9 text-sm",
};

export default function TierBadge({ tier, size = "md" }: TierBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold font-heading ${sizeClasses[size]}`}
      style={{ background: tierBg[tier] || tierBg.C }}
    >
      {tier}
    </span>
  );
}
