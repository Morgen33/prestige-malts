"use client";

import { useEffect, useState } from "react";

const KEY = "pm_cookie_consent";

/**
 * Minimal consent banner distinguishing essential vs. non-essential cookies.
 * Placeholder — wire to your real analytics/consent manager before launch.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  function decide(choice: "all" | "essential") {
    localStorage.setItem(KEY, choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-brass/20 bg-charcoal-900/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-container flex-col items-start gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-xs leading-relaxed text-cream-200/70">
          We use essential cookies to make this site work, and optional cookies
          to understand how it is used. See our{" "}
          <a href="/legal/privacy" className="text-amber-300 underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => decide("essential")}
            className="border border-brass/40 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-cream-100 transition-colors hover:border-amber-400"
          >
            Essential only
          </button>
          <button
            onClick={() => decide("all")}
            className="bg-amber-500 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-charcoal-950 transition-colors hover:bg-amber-400"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
