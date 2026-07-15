import type { Product } from "@/data/types";
import { ageLabel } from "@/lib/format";

/**
 * Elegant 2D substitute for the 3D bottle: a typographic label rendered on an
 * aged-cream card over a liquid-toned gradient. Shown when WebGL is
 * unavailable, on low-power devices, or as the Suspense placeholder.
 */
export default function BottleFallback({ product }: { product: Product }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div
        className="relative flex aspect-[3/5] w-full max-w-[240px] flex-col items-center justify-center overflow-hidden rounded-[6px] px-6"
        style={{
          background: `linear-gradient(180deg, ${product.liquidColor}22, ${product.liquidColor}66)`,
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.35)",
        }}
      >
        {/* Liquid fill hint */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background: `linear-gradient(180deg, transparent, ${product.liquidColor})`,
            opacity: 0.55,
          }}
        />
        <div className="relative z-10 w-full rounded-[3px] border border-brass/50 bg-cream-100 px-4 py-5 text-center text-charcoal-900">
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-amber-600">
            Prestige Malts
          </p>
          <div className="mx-auto my-2 h-px w-10 bg-brass/60" />
          <p className="font-display text-lg font-bold leading-tight">
            {product.distillery}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-amber-700">
            {product.region}
          </p>
          <p className="mt-3 font-display text-base font-semibold">
            {product.vintage}
          </p>
          <p className="text-[10px] text-charcoal-600">{ageLabel(product.age)}</p>
          <div className="mx-auto my-2 h-px w-10 bg-brass/60" />
          <p className="text-[10px] font-medium tracking-wide">
            SINGLE CASK {product.caskNumber}
          </p>
          <p className="text-[10px] text-charcoal-600">
            {product.abv.toFixed(1)}% ABV · {product.sizeMl}ml
          </p>
        </div>
      </div>
    </div>
  );
}
