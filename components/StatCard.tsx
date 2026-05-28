interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
  subtitle?: string;
}

export default function StatCard({ label, value, icon, color = "--marvel-gold", subtitle }: StatCardProps) {
  return (
    <div className="glass-card rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `var(${color})12` }}>
          <span className="text-xl">{icon}</span>
        </div>
        <span
          className="text-[10px] font-semibold uppercase tracking-wider font-heading"
          style={{ color: `var(${color})` }}
        >
          {label}
        </span>
      </div>
      <p className="text-2xl font-bold font-heading text-[var(--marvel-white)]">{value}</p>
      {subtitle && (
        <p className="mt-1 text-xs text-[var(--marvel-light-gray)]">{subtitle}</p>
      )}
    </div>
  );
}
