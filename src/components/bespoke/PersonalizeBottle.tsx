"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/types";
import type { BespokeLabelData } from "@/lib/label-texture";
import BottleViewer from "@/components/three/BottleViewer";

/** Cask choices — each drives the liquid colour of the live bottle. */
const CASKS = [
  {
    id: "bourbon",
    label: "First-Fill Bourbon Cask",
    short: "Bourbon",
    color: "#e0b24a",
    note: "Bright gold · vanilla, orchard fruit",
  },
  {
    id: "port",
    label: "Port Pipe",
    short: "Port",
    color: "#a84b39",
    note: "Russet · red berries, cocoa",
  },
  {
    id: "oloroso",
    label: "Oloroso Sherry Cask",
    short: "Oloroso",
    color: "#8a3d1c",
    note: "Mahogany · fig, walnut",
  },
  {
    id: "px",
    label: "Pedro Ximénez Cask",
    short: "PX",
    color: "#6f2f14",
    note: "Dark umber · treacle, espresso",
  },
] as const;

const inputCls =
  "w-full border border-brass/25 bg-charcoal-950/60 px-4 py-3.5 text-sm text-cream-100 placeholder:text-cream-200/30 transition-colors duration-300 focus:border-amber-400 focus:outline-none";

/**
 * The live personalisation moment: type a name and a dedication, choose the
 * wood — and watch the label typeset itself on the rotating bottle in real
 * time. This is the private-cask promise, demonstrated rather than described.
 */
export default function PersonalizeBottle() {
  const [name, setName] = useState("");
  const [dedication, setDedication] = useState("");
  const [caskId, setCaskId] = useState<(typeof CASKS)[number]["id"]>("oloroso");

  const cask = CASKS.find((c) => c.id === caskId)!;

  // Debounce typing so the label texture isn't regenerated per keystroke.
  const [label, setLabel] = useState<BespokeLabelData>({
    name: "",
    dedication: "",
    caskLabel: cask.label,
  });
  useEffect(() => {
    const t = setTimeout(
      () => setLabel({ name, dedication, caskLabel: cask.label }),
      280
    );
    return () => clearTimeout(t);
  }, [name, dedication, cask.label]);

  // Synthetic product: feeds the liquid colour and the 2D fallback card.
  const product: Product = useMemo(
    () => ({
      id: "bespoke-preview",
      name: name.trim() || "Your Private Cask",
      distillery: name.trim() || "Your Name",
      region: "Highland",
      age: 12,
      vintage: new Date().getFullYear() - 12,
      caskNumber: "#001",
      caskType: "Oloroso Sherry",
      abv: 57.0,
      sizeMl: 700,
      outturn: 280,
      bottlesRemaining: 280,
      price: 0,
      currency: "GBP",
      liquidColor: cask.color,
      tastingNotes: { nose: "", palate: "", finish: "" },
      description: "",
      isLimited: true,
      isAllocated: true,
    }),
    [name, cask.color]
  );

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 xl:pr-52">
      {/* Controls */}
      <div>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="pb-name"
              className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream-200/50"
            >
              The name on the bottle
            </label>
            <input
              id="pb-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              className={inputCls}
              placeholder="The Harrington Family"
            />
          </div>
          <div>
            <label
              htmlFor="pb-dedication"
              className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream-200/50"
            >
              Your dedication
            </label>
            <input
              id="pb-dedication"
              value={dedication}
              onChange={(e) => setDedication(e.target.value)}
              maxLength={70}
              className={inputCls}
              placeholder="Laid down for Amelia, born 2024"
            />
          </div>
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-cream-200/50">
              Your cask — the wood chooses the colour
            </p>
            <div className="grid grid-cols-2 gap-3">
              {CASKS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCaskId(c.id)}
                  aria-pressed={c.id === caskId}
                  className={`flex items-center gap-3 border px-4 py-3.5 text-left transition-all duration-300 ease-silk ${
                    c.id === caskId
                      ? "border-amber-400 bg-amber-500/10"
                      : "border-brass/25 hover:border-brass/50"
                  }`}
                >
                  <span
                    className="h-6 w-6 shrink-0 rounded-full border border-black/30"
                    style={{ backgroundColor: c.color }}
                  />
                  <span>
                    <span className="block text-sm text-cream-100">{c.short}</span>
                    <span className="mt-0.5 block text-[10px] leading-tight text-cream-200/45">
                      {c.note}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-cream-200/40">
          A sketch, not a proof — our designers refine every commission by hand,
          from typeface to closure to presentation case.
        </p>
      </div>

      {/* The living bottle, annotated in the margins */}
      <div className="relative">
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-brass/15 bg-charcoal-950">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 42%, rgba(200,149,47,0.16), transparent 70%)",
            }}
          />
          <BottleViewer
            product={product}
            interactive
            autoRotate={false}
            label={label}
            className="h-full w-full"
          />
          <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.24em] text-cream-200/40">
            Drag to rotate
          </p>
        </div>

        {/* Callouts — desktop only, in the manner of an engraver's plate */}
        <div className="pointer-events-none absolute -right-4 top-[12%] hidden w-44 translate-x-full xl:block">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-brass/50" />
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-300">
              Your mark
            </p>
          </div>
          <p className="mt-1.5 pl-11 text-[11px] leading-relaxed text-cream-200/45">
            The house crest above your name — or your own.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-4 top-[44%] hidden w-44 translate-x-full xl:block">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-brass/50" />
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-300">
              Your story
            </p>
          </div>
          <p className="mt-1.5 pl-11 text-[11px] leading-relaxed text-cream-200/45">
            Name and dedication, typeset in the house style.
          </p>
        </div>
        <div className="pointer-events-none absolute -right-4 top-[72%] hidden w-44 translate-x-full xl:block">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-brass/50" />
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-300">
              Your cask
            </p>
          </div>
          <p className="mt-1.5 pl-11 text-[11px] leading-relaxed text-cream-200/45">
            The colour in the glass is drawn from the wood you choose.
          </p>
        </div>
      </div>
    </div>
  );
}
