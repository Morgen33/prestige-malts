"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { href: "/shop", label: "The Cellar" },
  { href: "/bespoke", label: "Bespoke Bottling" },
  { href: "/buy-and-sell", label: "Buy & Sell" },
  { href: "/distilleries", label: "Distilleries" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-silk ${
        scrolled
          ? "border-b border-brass/20 bg-charcoal-900/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-4">
        <Link
          href="/"
          aria-label="Prestige Malts home"
          className="flex shrink-0 items-center gap-3"
        >
          <Image
            src="/emblem.png"
            alt="Prestige Malts"
            width={56}
            height={70}
            priority
            className="h-12 w-auto md:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-[0.18em] text-cream-200/80 transition-colors hover:text-amber-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/account"
            className="text-xs font-medium uppercase tracking-[0.18em] text-cream-200/80 transition-colors hover:text-amber-300"
          >
            Account
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-cream-100 transition-colors hover:text-amber-300"
          >
            Cart <span className="text-brass">(0)</span>
          </Link>
        </div>

        <button
          className="text-cream-100 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <div className="space-y-1.5">
            <span className="block h-px w-6 bg-current" />
            <span className="block h-px w-6 bg-current" />
            <span className="block h-px w-6 bg-current" />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-brass/20 bg-charcoal-900/95 px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            {[...nav, { href: "/account", label: "Account" }, { href: "/cart", label: "Cart" }].map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium uppercase tracking-[0.18em] text-cream-200/80"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
