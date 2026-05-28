"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/roster", label: "Roster" },
  { href: "/champions", label: "Champions" },
  { href: "/masteries", label: "Masteries" },
  { href: "/synergies", label: "Synergies" },
  { href: "/quest-builder", label: "Quest Builder" },
  { href: "/purchase-guide", label: "Purchase Guide" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)] glass-strong shadow-[var(--shadow-nav)]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <img src="/logo.svg" alt="MCOC Commander" className="h-8 w-auto" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium font-heading tracking-wider uppercase transition-colors duration-[var(--transition-fast)] no-underline ${
                  isActive
                    ? "text-[var(--marvel-gold)]"
                    : "text-[var(--marvel-light-gray)] hover:text-[var(--marvel-white)]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4/5 -translate-x-1/2 rounded-full bg-[var(--marvel-gold)]" />
                )}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center rounded-lg p-2 text-[var(--marvel-white)] transition-colors hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="glass-strong border-t border-white/10 md:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium font-heading tracking-wider uppercase transition-colors no-underline ${
                    isActive
                      ? "bg-white/10 text-[var(--marvel-gold)]"
                      : "text-[var(--marvel-light-gray)] hover:bg-white/5 hover:text-[var(--marvel-white)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
