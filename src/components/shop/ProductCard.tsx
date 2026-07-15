"use client";

import Link from "next/link";
import type { Product } from "@/data/types";
import { formatPrice, ageLabel } from "@/lib/format";
import BottleViewer from "@/components/three/BottleViewer";
import { ScarcityBadge } from "@/components/ui/ScarcityBadge";

/**
 * Catalogue card with a live BottleViewer thumbnail. In dense grids the 3D
 * scene still lazy-loads and pauses off-screen; pass `forceFallback` to force
 * the 2D card everywhere if you want to cap GPU cost.
 */
export default function ProductCard({
  product,
  forceFallback = false,
}: {
  product: Product;
  forceFallback?: boolean;
}) {
  return (
    <Link
      href={`/shop/${product.id}`}
      className="group relative flex flex-col overflow-hidden border border-brass/15 bg-charcoal-900/40 transition-all duration-500 ease-silk hover:-translate-y-1.5 hover:border-brass/40 hover:shadow-[0_28px_80px_-24px_rgba(200,149,47,0.32)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal-950">
        {/* Warm pool of light behind the bottle */}
        <div
          className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 42%, rgba(200,149,47,0.14), transparent 70%)",
          }}
        />
        <div className="absolute left-4 top-4 z-10">
          <ScarcityBadge product={product} />
        </div>
        <div className="h-full w-full transition-transform duration-700 ease-silk group-hover:scale-[1.03]">
          <BottleViewer
            product={product}
            forceFallback={forceFallback}
            glass="low"
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t border-brass/15 p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400">
          {product.region} · {product.caskType}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight text-cream-100">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-cream-200/60">
          {ageLabel(product.age)} · {product.abv.toFixed(1)}% ABV
        </p>
        <div className="mt-5 flex items-end justify-between">
          <span className="font-display text-xl text-amber-300">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-cream-200/50 transition-colors group-hover:text-amber-300">
            View
            <span className="inline-block transition-transform duration-500 ease-silk group-hover:translate-x-1.5">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
