import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-heading text-8xl font-bold text-[var(--marvel-red)] text-glow-red">
        404
      </h1>
      <p className="max-w-md text-lg text-[var(--marvel-light-gray)]">
        This quest path doesn&apos;t exist. Even the Collector gets lost
        sometimes.
      </p>
      <Link
        href="/"
        className="glass rounded-lg px-6 py-3 font-heading text-sm font-semibold uppercase tracking-wider text-[var(--marvel-gold)] transition-all duration-[var(--transition-normal)] hover:glow-gold no-underline"
      >
        Return to Hub
      </Link>
    </div>
  );
}
