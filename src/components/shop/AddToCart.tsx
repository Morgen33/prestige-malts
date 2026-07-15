"use client";

import { useState } from "react";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";

/**
 * Add-to-cart control with allocation status. Cart state is a placeholder —
 * wire to your cart store / Stripe Checkout session before launch.
 */
export default function AddToCart({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const soldOut = product.bottlesRemaining <= 0;

  return (
    <div className="mt-8">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-3xl text-amber-300">
          {formatPrice(product.price, product.currency)}
        </span>
        <span className="text-xs uppercase tracking-[0.18em] text-cream-200/50">
          {soldOut
            ? "Sold out"
            : `${product.bottlesRemaining} of ${product.outturn} remaining`}
        </span>
      </div>

      {product.isAllocated ? (
        <button
          className="mt-6 w-full bg-amber-500 py-4 text-xs font-medium uppercase tracking-[0.2em] text-charcoal-950 transition-colors hover:bg-amber-400"
          onClick={() => setAdded(true)}
        >
          Request Allocation
        </button>
      ) : (
        <div className="mt-6 flex gap-3">
          <div className="flex items-center border border-brass/40">
            <button
              aria-label="Decrease quantity"
              className="px-4 py-4 text-cream-100 hover:text-amber-300 disabled:opacity-30"
              disabled={qty <= 1 || soldOut}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="w-10 text-center text-sm tabular-nums text-cream-100">
              {qty}
            </span>
            <button
              aria-label="Increase quantity"
              className="px-4 py-4 text-cream-100 hover:text-amber-300 disabled:opacity-30"
              disabled={qty >= product.bottlesRemaining || soldOut}
              onClick={() => setQty((q) => Math.min(product.bottlesRemaining, q + 1))}
            >
              +
            </button>
          </div>
          <button
            className="flex-1 bg-amber-500 text-xs font-medium uppercase tracking-[0.2em] text-charcoal-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={soldOut}
            onClick={() => setAdded(true)}
          >
            {soldOut ? "Sold out" : added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      )}

      <p className="mt-4 flex items-center gap-2 text-xs text-cream-200/50">
        <span className="text-amber-400">◆</span>
        Age verification &amp; ID may be required on delivery (Challenge 25).
      </p>
    </div>
  );
}
