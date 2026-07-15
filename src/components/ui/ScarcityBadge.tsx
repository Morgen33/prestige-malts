import type { Product } from "@/data/types";

/** Small provenance / scarcity chips shared across cards and detail pages. */

export function Chip({
  children,
  tone = "brass",
}: {
  children: React.ReactNode;
  tone?: "brass" | "amber" | "muted" | "cerulean";
}) {
  const tones = {
    brass: "border-brass/40 text-brass-light",
    amber: "border-amber-500/50 text-amber-300 bg-amber-500/10",
    muted: "border-charcoal-600 text-cream-200/70",
    cerulean: "border-cerulean/40 text-cerulean bg-cerulean/10",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function ScarcityBadge({ product }: { product: Product }) {
  const { bottlesRemaining, isAllocated } = product;
  if (isAllocated) {
    return <Chip tone="amber">By Allocation</Chip>;
  }
  if (bottlesRemaining <= 12) {
    return <Chip tone="amber">Only {bottlesRemaining} bottles</Chip>;
  }
  return <Chip tone="brass">Single Cask</Chip>;
}
