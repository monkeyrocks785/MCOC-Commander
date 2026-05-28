import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--marvel-dark)] py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <p className="text-xs text-[var(--marvel-light-gray)]">
          MCOC Commander &mdash; Fan companion for Marvel Contest of Champions
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs text-[var(--marvel-light-gray)] transition-colors hover:text-[var(--marvel-gold)] no-underline"
          >
            Dashboard
          </Link>
          <span className="text-xs text-[var(--marvel-light-gray)] opacity-30">|</span>
          <span className="text-xs text-[var(--marvel-light-gray)]">
            Not affiliated with Kabam or Marvel
          </span>
        </div>
      </div>
    </footer>
  );
}
