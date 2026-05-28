interface TierBadgeProps {
  tier: string;
  size?: "sm" | "md" | "lg";
}

const tierConfig: Record<string, { bg: string; shadow: string }> = {
  S: { bg: "var(--tier-s-bg)", shadow: "0 0 10px rgba(255,215,0,0.3)" },
  A: { bg: "var(--tier-a-bg)", shadow: "0 0 8px rgba(76,175,80,0.3)" },
  B: { bg: "var(--tier-b-bg)", shadow: "0 0 6px rgba(33,150,243,0.2)" },
  C: { bg: "var(--tier-c-bg)", shadow: "none" },
  D: { bg: "var(--tier-d-bg)", shadow: "none" },
};

const sizeClasses = {
  sm: "w-5 h-5 text-[10px]",
  md: "w-7 h-7 text-xs",
  lg: "w-9 h-9 text-sm",
};

export default function TierBadge({ tier, size = "md" }: TierBadgeProps) {
  const config = tierConfig[tier] || tierConfig.C;

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold font-heading ${sizeClasses[size]}`}
      style={{ background: config.bg, boxShadow: config.shadow }}
    >
      {tier}
    </span>
  );
}
