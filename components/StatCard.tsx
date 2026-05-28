interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
  subtitle?: string;
}

export default function StatCard({ label, value, icon, color = "--marvel-gold", subtitle }: StatCardProps) {
  return (
    <div className="glass rounded-xl p-4 transition-all duration-[var(--transition-normal)] hover:scale-[1.02] hover:shadow-[var(--shadow-glow-red)]">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span
          className="text-xs font-semibold uppercase tracking-wider font-heading"
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
