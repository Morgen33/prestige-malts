import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProductIds, getProduct, products } from "@/data/products";
import { ageLabel } from "@/lib/format";
import BottleViewer from "@/components/three/BottleViewer";
import ProductCard from "@/components/shop/ProductCard";
import AddToCart from "@/components/shop/AddToCart";
import { Chip, ScarcityBadge } from "@/components/ui/ScarcityBadge";
import Reveal from "@/components/ui/Reveal";

export function generateStaticParams() {
  return getAllProductIds().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.id !== product.id && p.region === product.region)
    .concat(products.filter((p) => p.id !== product.id && p.region !== product.region))
    .slice(0, 3);

  const spec: [string, string][] = [
    ["Distillery", product.distillery],
    ["Region", product.region],
    ["Age", ageLabel(product.age)],
    ["Vintage", String(product.vintage)],
    ["Cask Number", product.caskNumber],
    ["Cask Type", product.caskType],
    ["ABV", `${product.abv.toFixed(1)}%`],
    ["Bottle Size", `${product.sizeMl}ml`],
    ["Outturn", `${product.outturn} bottles`],
  ];

  return (
    <>
      <div className="mx-auto max-w-container px-6 pt-28 pb-section">
        {/* Breadcrumb */}
        <nav className="mb-8 text-xs uppercase tracking-[0.18em] text-cream-200/50">
          <Link href="/shop" className="hover:text-amber-300">
            The Cellar
          </Link>
          <span className="mx-2 text-brass/50">/</span>
          <span className="text-cream-200/80">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Interactive bottle */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-brass/15 bg-charcoal-950">
              {/* Warm pool of light behind the bottle */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 55% at 50% 42%, rgba(200,149,47,0.16), transparent 70%)",
                }}
              />
              <div className="absolute left-5 top-5 z-10">
                <ScarcityBadge product={product} />
              </div>
              <BottleViewer
                product={product}
                interactive
                autoRotate={false}
                className="h-full w-full"
              />
              <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.24em] text-cream-200/40">
                Drag to rotate
              </p>
            </div>
          </div>

          {/* Detail */}
          <div>
            <p className="eyebrow">
              {product.region} · Single Cask {product.caskNumber}
            </p>
            <h1 className="mt-4 font-display text-display-md text-cream-100">
              {product.name}
            </h1>
            <p className="mt-3 text-lg text-cream-200/70">
              {ageLabel(product.age)} · {product.caskType} · {product.abv.toFixed(1)}% ABV
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {product.isLimited && <Chip tone="brass">Limited Release</Chip>}
              <Chip tone="muted">Non Chill-Filtered</Chip>
              <Chip tone="muted">Natural Colour</Chip>
            </div>

            <p className="mt-8 max-w-prose2 text-base leading-relaxed text-cream-200/75">
              {product.description}
            </p>

            <AddToCart product={product} />

            {/* Provenance table */}
            <div className="mt-12">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-400">
                Provenance
              </h2>
              <dl className="mt-5 grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
                {spec.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between border-b border-brass/12 py-3"
                  >
                    <dt className="text-sm text-cream-200/50">{k}</dt>
                    <dd className="text-sm font-medium text-cream-100">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Tasting notes */}
            <div className="mt-12">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-400">
                Tasting Notes
              </h2>
              <div className="mt-5 space-y-5">
                {(
                  [
                    ["Nose", product.tastingNotes.nose],
                    ["Palate", product.tastingNotes.palate],
                    ["Finish", product.tastingNotes.finish],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k}>
                    <p className="font-display text-lg text-brass-light">{k}</p>
                    <p className="mt-1 text-sm leading-relaxed text-cream-200/70">
                      {v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="border-t border-brass/15 bg-charcoal-900/40">
        <div className="mx-auto max-w-container px-6 py-section">
          <Reveal>
            <p className="eyebrow">You may also admire</p>
            <h2 className="mt-4 font-display text-display-sm text-cream-100">
              Related bottlings
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
