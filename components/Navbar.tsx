"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)] transition-all duration-300 ${
          scrolled ? "glass-strong shadow-[var(--shadow-nav)]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 no-underline" onClick={() => setMobileOpen(false)}>
            <Image src="/logo.svg" alt="MCOC Commander" width={120} height={32} className="h-8 w-auto" priority />
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
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-4/5 -translate-x-1/2 rounded-full bg-[var(--marvel-gold)] shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[var(--marvel-light-gray)] transition-colors hover:border-white/20 hover:text-[var(--marvel-white)] md:flex"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search
              <kbd className="ml-1 rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[10px]">⌘K</kbd>
            </button>

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
        </div>

        {mobileOpen && (
          <div className="glass-strong border-t border-white/10 animate-fade-in md:hidden">
            <div className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-4 py-3 text-sm font-medium font-heading tracking-wider uppercase transition-all no-underline animate-fade-in stagger-${i + 1} ${
                      isActive
                        ? "bg-white/10 text-[var(--marvel-gold)] border-l-2 border-[var(--marvel-gold)]"
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

      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-[var(--nav-height)] px-4" onClick={() => setSearchOpen(false)}>
          <div className="glass-strong w-full max-w-lg rounded-2xl p-4 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--marvel-light-gray)]">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search champions, masteries, pages..."
                className="flex-1 bg-transparent text-sm text-[var(--marvel-white)] outline-none"
                autoFocus
              />
              <kbd className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-[var(--marvel-light-gray)]">ESC</kbd>
            </div>
            <div className="section-divider mt-3 mb-2" />
            <div className="space-y-1">
              {navLinks.slice(0, 5).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--marvel-light-gray)] transition-colors hover:bg-white/5 hover:text-[var(--marvel-white)] no-underline"
                >
                  <span className="text-xs opacity-50">↗</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
