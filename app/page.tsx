export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="font-heading text-5xl font-bold text-[var(--marvel-red)] text-glow-red md:text-6xl">
        MCOC Commander
      </h1>
      <p className="max-w-lg text-lg text-[var(--marvel-light-gray)]">
        Your ultimate companion for Marvel Contest of Champions
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {[
          { href: "/roster", label: "My Roster" },
          { href: "/champions", label: "Champions" },
          { href: "/masteries", label: "Masteries" },
          { href: "/quest-builder", label: "Quest Builder" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="glass rounded-lg px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider text-[var(--marvel-white)] transition-all duration-[var(--transition-normal)] hover:glow-red hover:text-[var(--marvel-gold)] no-underline"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
