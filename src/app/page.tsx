import Link from "next/link";
import { products } from "@/data/products";
import Hero from "@/components/home/Hero";
import BottleCarousel from "@/components/home/BottleCarousel";
import BespokeSteps from "@/components/home/BespokeSteps";
import PetrolLiquidBackdrop from "@/components/three/PetrolLiquidBackdrop";
import ProductCard from "@/components/shop/ProductCard";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export default function HomePage() {
  const hero = products[0];
  const featured = products.slice(1);
  const allocated = products.filter((p) => p.isAllocated).slice(0, 1)[0];

  return (
    <>
      {/* House manifesto — the opening statement, above the hero */}
      <section className="grain relative overflow-hidden border-b border-brass/15 bg-petrol">
        <PetrolLiquidBackdrop />
        {/* Legibility veil so the quote reads over the moving liquid */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(90% 80% at 50% 45%, rgba(2,48,71,0.25), rgba(1,24,40,0.55)), linear-gradient(to bottom, rgba(1,24,40,0.45), transparent 22%, transparent 74%, rgba(1,24,40,0.55))",
          }}
        />
        {/* Always visible — this is the first thing above the fold, so it must
            not depend on a scroll-reveal trigger. */}
        <div className="animate-fade-up relative z-10 mx-auto max-w-container px-6 pt-32 pb-16 text-center md:pt-40 md:pb-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/emblem.png"
            alt=""
            aria-hidden="true"
            width={224}
            height={280}
            className="mx-auto w-48 md:w-56"
          />
          <blockquote className="mx-auto mt-6 max-w-3xl font-display text-display-md font-medium leading-snug text-cream-100">
            &ldquo;We bottle what the distilleries{" "}
            <em className="gold-text">keep for themselves</em>.&rdquo;
          </blockquote>
          <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-cream-200/40">
            The House Standard · Prestige Malts, London
          </p>
        </div>
      </section>

      <Hero product={hero} />

      {/* Featured bottlings */}
      <section className="mx-auto max-w-container px-6 py-section">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">The Current Release</p>
            <h2 className="mt-4 max-w-xl font-display text-display-md text-cream-100">
              Recently drawn from the cask
            </h2>
          </div>
          <Link
            href="/shop"
            className="shrink-0 text-xs uppercase tracking-[0.2em] text-amber-300 hover:text-amber-400"
          >
            View all →
          </Link>
        </Reveal>

        <Reveal className="mt-14">
          <BottleCarousel products={featured} />
        </Reveal>
      </section>

      {/* Heritage / trust signals */}
      <section className="relative overflow-hidden border-y border-brass/15 bg-petrol">
        <PetrolLiquidBackdrop />
        <div className="relative z-10 mx-auto grid max-w-container gap-10 px-6 py-20 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Single Cask", v: "Every bottling from one barrel — never blended." },
            { k: "Natural", v: "Non chill-filtered, no added colouring, cask strength." },
            { k: "Finite", v: "Outturns of a few hundred bottles, then gone for good." },
            { k: "Provenance", v: "Full cask number, distillery and vintage on every label." },
          ].map((item, i) => (
            <Reveal key={item.k} delay={i * 0.06}>
              <p className="font-display text-2xl text-amber-300">{item.k}</p>
              <div className="my-4 h-px w-10 bg-brass/40" />
              <p className="text-sm leading-relaxed text-cream-200/60">{item.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bespoke teaser */}
      <section className="mx-auto max-w-container px-6 py-section">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow">A Private Commission</p>
            <h2 className="mt-4 font-display text-display-md text-cream-100">
              Your own cask, bottled to your name.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream-200/70">
              For collectors, corporate gifts and the hospitality trade, our
              bespoke service guides you from cask selection through bottle and
              package design to final delivery — an heirloom bearing your mark.
            </p>
            <div className="mt-8">
              <ButtonLink href="/bespoke" variant="outline">
                Begin an Enquiry
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <BespokeSteps />
          </Reveal>
        </div>
      </section>

      {/* Allocated release spotlight */}
      {allocated && (
        <section className="relative overflow-hidden border-t border-brass/15 bg-gradient-to-b from-petrol/80 to-charcoal-950">
        <PetrolLiquidBackdrop />
          <div className="relative z-10 mx-auto grid max-w-container items-center gap-10 px-6 py-24 md:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <p className="eyebrow">By Allocation</p>
              <h2 className="mt-4 font-display text-display-md text-cream-100">
                {allocated.name}
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-cream-200/70">
                {allocated.description}
              </p>
              <div className="mt-8">
                <ButtonLink href={`/shop/${allocated.id}`} variant="solid">
                  Request Allocation
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ProductCard product={allocated} tone="onPetrol" />
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
