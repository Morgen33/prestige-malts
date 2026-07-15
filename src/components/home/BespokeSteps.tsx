"use client";

import { useRef } from "react";

const STEPS: [string, string, string][] = [
  ["01", "Selection", "Nose and choose from our reserved casks."],
  ["02", "Design", "Bespoke bottle, label and presentation."],
  ["03", "Production", "Bottled by hand at cask strength."],
  ["04", "Delivery", "Delivered, worldwide, ID-verified."],
];

/**
 * Interactive step cards: a gold spotlight tracks the cursor, the card tilts
 * gently toward the pointer, and the numeral ignites into gold-foil on hover.
 * All driven by CSS custom properties set on pointer-move — no React re-render.
 */
function StepCard({ n, t, d }: { n: string; t: string; d: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--ry", `${((x / r.width - 0.5) * 7).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((y / r.height - 0.5) * -7).toFixed(2)}deg`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="group relative overflow-hidden border border-brass/15 bg-charcoal-900/40 p-7 transition-[border-color,box-shadow,transform] duration-300 ease-silk hover:border-brass/45 hover:shadow-[0_24px_60px_-24px_rgba(200,149,47,0.4)]"
      style={{
        transform:
          "perspective(800px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
      }}
    >
      {/* Cursor-tracking gold spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), rgba(200,149,47,0.20), transparent 55%)",
        }}
      />

      {/* Numeral — brass, cross-fading to gold-foil on hover */}
      <p className="relative font-display text-4xl leading-none">
        <span className="text-brass transition-opacity duration-300 group-hover:opacity-0">
          {n}
        </span>
        <span className="gold-text absolute left-0 top-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {n}
        </span>
      </p>

      {/* Accent line that grows on hover */}
      <div className="relative mt-4 h-px w-8 bg-brass/40 transition-all duration-500 ease-silk group-hover:w-16 group-hover:bg-amber-400" />

      <p className="relative mt-4 text-sm font-medium uppercase tracking-[0.14em] text-cream-100">
        {t}
      </p>
      <p className="relative mt-2 text-xs leading-relaxed text-cream-200/50">
        {d}
      </p>
    </div>
  );
}

export default function BespokeSteps() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {STEPS.map(([n, t, d]) => (
        <StepCard key={n} n={n} t={t} d={d} />
      ))}
    </div>
  );
}
