import type { Metadata } from "next";
import Link from "next/link";
import { distilleries, bottlingsFor } from "@/data/distilleries";
import { formatPrice, ageLabel } from "@/lib/format";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Distilleries",
  description:
    "The houses behind our casks — editorial profiles of the distilleries whose spirit earns the Prestige Malts label.",
};

export default function DistilleriesPage() {
  return (
    <>
      {/* ————— Hero ————— */}
      <section className="grain hairline-frame relative overflow-hidden bg-charcoal-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/emblem.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[70%] top-1/2 h-[120vmin] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.04] blur-[2px]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 55% at 70% 45%, rgba(200,149,47,0.10), transparent 70%), radial-gradient(120% 120% at 50% 50%, transparent 45%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-container px-8 pb-24 pt-40 md:px-12 md:pb-28 md:pt-48">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-brass/50" />
              <p className="eyebrow">Provenance · The Houses We Trust</p>
            </div>
            <h1 className="mt-8 max-w-4xl font-display text-display-xl font-medium text-cream-100">
              The houses behind{" "}
              <em className="gold-text">our casks</em>.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-cream-200/65">
              We bottle from a small circle of distilleries whose spirit we
              know cask by cask. Some are famous, some are quietly revered —
              all of them earn the label, or they do not wear it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ————— The index ————— */}
      <section className="mx-auto max-w-container px-6 py-section">
        <div className="mx-auto max-w-4xl">
          {distilleries.map((d, i) => {
            const bottlings = bottlingsFor(d.name);
            return (
              <Reveal key={d.id} delay={(i % 2) * 0.05}>
                <article className="group border-b border-brass/15 py-14 first:pt-0 last:border-b-0">
                  <div className="flex flex-col gap-8 md:flex-row md:gap-14">
                    {/* Founded — the anchor of provenance */}
                    <div className="shrink-0 md:w-36">
                      <p className="font-display text-4xl text-brass/70 transition-colors duration-500 group-hover:text-amber-400 md:text-5xl">
                        {d.founded}
                      </p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-cream-200/40">
                        Established
                      </p>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                        <h2 className="font-display text-3xl text-cream-100 md:text-4xl">
                          {d.name}
                        </h2>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-amber-400">
                          {d.region}
                        </p>
                      </div>

                      <p className="mt-3 font-display text-lg italic text-brass-light">
                        {d.character}
                      </p>

                      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cream-200/60">
                        {d.summary}
                      </p>

                      {bottlings.length > 0 && (
                        <div className="mt-7">
                          <p className="text-[10px] uppercase tracking-[0.24em] text-cream-200/40">
                            Currently in the cellar
                          </p>
                          <ul className="mt-3 space-y-2">
                            {bottlings.map((b) => (
                              <li key={b.id}>
                                <Link
                                  href={`/shop/${b.id}`}
                                  className="group/link flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm"
                                >
                                  <span className="text-cream-100 underline-offset-4 group-hover/link:underline">
                                    {b.name}
                                  </span>
                                  <span className="text-cream-200/45">
                                    {ageLabel(b.age)} · {b.caskType} ·{" "}
                                    {b.abv.toFixed(1)}%
                                  </span>
                                  <span className="font-display text-base text-amber-300">
                                    {formatPrice(b.price, b.currency)}
                                  </span>
                                  {b.isAllocated ? (
                                    <span className="text-[10px] uppercase tracking-[0.18em] text-amber-400">
                                      By allocation
                                    </span>
                                  ) : b.bottlesRemaining <= 12 ? (
                                    <span className="text-[10px] uppercase tracking-[0.18em] text-amber-400">
                                      Only {b.bottlesRemaining} left
                                    </span>
                                  ) : null}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ————— Closing ————— */}
      <section className="border-t border-brass/15 bg-charcoal-900/50">
        <div className="mx-auto max-w-container px-6 py-20 text-center">
          <Reveal>
            <p className="mx-auto max-w-2xl font-display text-display-sm text-cream-100">
              A cask from one of these houses,{" "}
              <em className="gold-text">bottled under your name?</em>
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href="/shop" variant="solid">
                Browse the Cellar
              </ButtonLink>
              <ButtonLink href="/bespoke" variant="outline">
                Bespoke Bottling
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
