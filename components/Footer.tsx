import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[var(--marvel-black)]/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="font-heading text-lg font-bold text-gradient">MCOC COMMANDER</span>
            <span className="text-xs text-[var(--marvel-light-gray)]">•</span>
            <p className="text-xs text-[var(--marvel-light-gray)]">
              Fan companion for Marvel Contest of Champions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-[var(--marvel-light-gray)] transition-colors hover:text-[var(--marvel-gold)] no-underline">
              Dashboard
            </Link>
            <Link href="/champions" className="text-xs text-[var(--marvel-light-gray)] transition-colors hover:text-[var(--marvel-gold)] no-underline">
              Champions
            </Link>
            <Link href="/masteries" className="text-xs text-[var(--marvel-light-gray)] transition-colors hover:text-[var(--marvel-gold)] no-underline">
              Masteries
            </Link>
            <span className="text-xs text-[var(--marvel-light-gray)] opacity-30">|</span>
            <span className="text-[10px] text-[var(--marvel-light-gray)] opacity-50">
              Not affiliated with Kabam or Marvel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
