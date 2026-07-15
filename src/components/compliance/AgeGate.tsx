"use client";

import { useEffect, useState } from "react";

const COOKIE = "pm_age_ok";

function setAgeCookie() {
  // 30-day remember. Essential cookie — no consent required.
  const expires = new Date(Date.now() + 30 * 864e5).toUTCString();
  document.cookie = `${COOKIE}=1; expires=${expires}; path=/; SameSite=Lax`;
}

function hasAgeCookie(): boolean {
  return document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE}=`));
}

/**
 * 18+ verification gate — a full-screen, cinematic takeover in the manner of
 * the great cognac houses: near-black room, the house mark as a ghost in the
 * dark, the gold crest, and two quiet words. Blocks the site on first visit,
 * remembered via an essential cookie. UK alcohol-retail requirement.
 * NOTE: placeholder copy — the business should review before launch.
 */
export default function AgeGate() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!hasAgeCookie()) setOpen(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open && !closing ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, closing]);

  if (!mounted || !open) return null;

  function confirm() {
    setAgeCookie();
    setClosing(true);
    // Let the room fade to black before the site appears.
    setTimeout(() => setOpen(false), 900);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[100] overflow-hidden bg-[#0e0c0a] transition-opacity duration-[900ms] ease-silk"
      style={{ opacity: closing ? 0 : 1 }}
    >
      {/* The bonded warehouse, barely lit — casks waiting in the dark */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/barrels.webp)",
          filter: "brightness(0.52)",
        }}
      />

      {/* Lanternlight: a faint warm breath in the centre, vignetted to black */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 40% at 50% 44%, rgba(200,149,47,0.08), transparent 70%), radial-gradient(130% 130% at 50% 50%, transparent 30%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      <div className="grain absolute inset-0" />

      {/* Centre column */}
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center animate-fade-up">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/emblem.png"
          alt="Prestige Malts"
          width={288}
          height={360}
          className="w-56 sm:w-72"
          style={{
            filter: "drop-shadow(0 0 40px rgba(200,149,47,0.3))",
          }}
        />

        <h1
          id="age-gate-title"
          className="mt-10 max-w-xl font-display text-xl font-medium leading-relaxed tracking-[0.06em] text-[#d9c294] sm:text-2xl"
        >
          You must be over the legal drinking age
          <br className="hidden sm:block" /> to view this content.
          <br />
          Are you 18 or older?
        </h1>

        <div className="mt-12 flex items-center gap-20">
          <button
            onClick={confirm}
            className="font-display text-lg font-semibold uppercase tracking-[0.42em] text-[#d9c294] transition-colors duration-300 hover:text-amber-300"
          >
            Yes
          </button>
          <a
            href="https://www.drinkaware.co.uk/"
            className="font-display text-lg font-semibold uppercase tracking-[0.42em] text-[#d9c294]/70 transition-colors duration-300 hover:text-amber-300"
          >
            No
          </a>
        </div>

        <p className="absolute bottom-8 left-1/2 w-full -translate-x-1/2 text-[10px] uppercase tracking-[0.24em] text-cream-200/25">
          Please enjoy our whiskies responsibly ·{" "}
          <a
            href="https://www.drinkaware.co.uk/"
            className="underline decoration-brass/40 underline-offset-4 hover:text-amber-300"
          >
            drinkaware.co.uk
          </a>
        </p>
      </div>
    </div>
  );
}
