import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductCard from "@/components/shop/ProductCard";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Cellar",
  description:
    "Rare single-cask Scotch whisky, bottled by Prestige Malts. Filter by distillery, region, age, cask type and price.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-container px-6 pt-28 pb-section">
      <Reveal>
        <p className="eyebrow">The Cellar</p>
        <h1 className="mt-4 max-w-2xl font-display text-display-lg text-cream-100">
          Every bottle, a single cask
        </h1>
        <p className="mt-6 max-w-prose2 text-base leading-relaxed text-cream-200/70">
          A living catalogue of finite releases. Filtering by distillery, region,
          age, cask type, ABV and price is coming next — for now, the full cellar
          below.
        </p>
      </Reveal>

      {/* Filter bar placeholder — full implementation in the next pass */}
      <div className="mt-12 flex flex-wrap gap-3 border-y border-brass/15 py-5 text-[11px] uppercase tracking-[0.18em] text-cream-200/50">
        {["All", "Speyside", "Islay", "Highland", "Lowland", "Campbeltown", "Island"].map(
          (r) => (
            <button
              key={r}
              className="rounded-full border border-brass/20 px-4 py-2 transition-colors hover:border-amber-400 hover:text-amber-300"
            >
              {r}
            </button>
          )
        )}
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.06}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
