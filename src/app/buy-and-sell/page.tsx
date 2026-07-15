import type { Metadata } from "next";
import { getProduct } from "@/data/products";
import BottleViewer from "@/components/three/BottleViewer";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import EnquiryForm from "@/components/bespoke/EnquiryForm";

export const metadata: Metadata = {
  title: "Buy, Sell & Trade",
  description:
    "Buy, sell or trade rare single-cask Scotch whisky with Prestige Malts. Personalised consultations, honest valuations, and full provenance.",
};

const STEPS = [
  ["01", "Tell us what you hold", "Share the bottles or casks you own — distillery, age, cask number, condition. Photographs help; a full list helps more."],
  ["02", "We value it", "Our team appraises against live auction results and private-treaty demand, and returns a considered, transparent figure — not a lowball."],
  ["03", "Choose your route", "Sell to us outright for a clean exit, or consign and let us place the bottle with the right collector. You decide."],
  ["04", "Settled properly", "Insured collection, documentation in order, and payment made promptly. Duty-suspended transfer in bond where it applies."],
];

export default function BuyAndSellPage() {
  const showcase = getProduct("glenfarclas-1998-cask-812")!;

  return (
    <>
      {/* ————— Hero ————— */}
      <section className="grain hairline-frame relative overflow-hidden bg-charcoal-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/emblem.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[68%] top-1/2 h-[120vmin] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.045] blur-[2px]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 55% at 68% 45%, rgba(200,149,47,0.11), transparent 70%), radial-gradient(120% 120% at 50% 50%, transparent 45%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-container px-8 pb-24 pt-40 md:px-12 md:pb-28 md:pt-48">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-brass/50" />
              <p className="eyebrow">Buy · Sell · Trade</p>
            </div>
            <h1 className="mt-8 max-w-4xl font-display text-display-xl font-medium text-cream-100">
              A market for{" "}
              <em className="gold-text">rare whisky</em>.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-cream-200/65">
              In addition to our extensive selection of whiskies, Prestige Malts
              offers comprehensive reselling services. Whether you are looking to
              buy, sell, or trade, our team of experts are here to assist you
              every step of the way. We provide personalised consultations to
              help you navigate the market, ensuring you receive the best value
              for your collection. Our commitment to transparency and integrity
              has earned us the trust of clients across the UK and beyond.
            </p>
            <div className="mt-11 flex flex-wrap items-center gap-4">
              <ButtonLink href="#enquiry" variant="solid">
                Request a Valuation
              </ButtonLink>
              <ButtonLink href="/shop" variant="outline">
                Browse the Cellar
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— Buy ————— */}
      <section className="mx-auto max-w-container px-6 py-section">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <p className="eyebrow">Buy Our Whiskies</p>
            <h2 className="mt-4 font-display text-display-md text-cream-100">
              Bottles you will not find on a shelf
            </h2>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-cream-200/65">
              <p>
                Every release in our cellar is a single cask — finite,
                unrepeatable, bottled at natural colour and cask strength. We
                buy well, so you buy well: full provenance on every label, and
                an honest account of what is in the glass.
              </p>
              <p>
                Looking for something specific — a particular distillery,
                vintage or cask type that is not currently listed? We hold and
                broker parcels that never reach the public catalogue. Tell us
                what you are hunting and we will go looking.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="/shop" variant="solid">
                View the Cellar
              </ButtonLink>
              <ButtonLink href="#enquiry" variant="ghost">
                Ask us to source a bottle →
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-brass/15 bg-charcoal-950">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 55% at 50% 42%, rgba(200,149,47,0.16), transparent 70%)",
                }}
              />
              <BottleViewer product={showcase} interactive autoRotate={false} className="h-full w-full" />
              <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.24em] text-cream-200/40">
                Drag to rotate
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— Sell ————— */}
      <section className="border-y border-brass/15 bg-charcoal-900/50">
        <div className="mx-auto max-w-container px-6 py-section">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Sell Your Whisky</p>
            <h2 className="mt-4 font-display text-display-md text-cream-100">
              A considered exit for a considered collection
            </h2>
            <p className="mt-6 text-base leading-relaxed text-cream-200/65">
              Whether it is a single treasured bottle or an entire cellar built
              over decades, we make selling straightforward and fair. Sell to us
              outright, or consign and let us find the right home for it — always
              with a transparent valuation and no obligation.
            </p>
          </Reveal>

          <div className="mx-auto mt-14 max-w-3xl">
            {STEPS.map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 0.06}>
                <div className="group flex gap-8 border-b border-brass/15 py-9 last:border-b-0 md:gap-14">
                  <p className="font-display text-4xl text-brass/70 transition-colors duration-500 group-hover:text-amber-400 md:text-5xl">
                    {n}
                  </p>
                  <div>
                    <h3 className="font-display text-2xl text-cream-100">{t}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream-200/60">
                      {d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <ButtonLink href="#enquiry" variant="solid">
              Request a Valuation
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* ————— Branding & Labelling ————— */}
      <section className="mx-auto max-w-container px-6 py-section">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">Whisky Branding &amp; Labelling</p>
            <h2 className="mt-4 font-display text-display-md text-cream-100">
              Your name on the bottle
            </h2>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-cream-200/65">
              <p>
                For private clients and the trade alike, we design and produce
                bespoke bottlings under your own brand — bottle, label, closure
                and presentation, set in a house style or one built entirely for
                you. From single casks to private-label runs, with full bonded
                bottling behind it.
              </p>
              <p>
                See the label take shape in real time on our bespoke bottling
                page — type a name and watch the bottle become yours.
              </p>
            </div>
            <div className="mt-9">
              <ButtonLink href="/bespoke" variant="solid">
                Explore Bespoke Bottling
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Single casks", "Bottle an entire cask under your name."],
                ["Private label", "Exclusive runs for bars, importers and distributors."],
                ["Bespoke design", "Label, closure and presentation, made to brief."],
                ["Bottled in bond", "Hand-filled at cask strength, duty-suspended."],
              ].map(([t, d]) => (
                <div key={t} className="border border-brass/15 bg-charcoal-900/40 p-6">
                  <p className="font-display text-xl text-amber-300">{t}</p>
                  <div className="my-3 h-px w-8 bg-brass/40" />
                  <p className="text-xs leading-relaxed text-cream-200/55">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— Enquiry ————— */}
      <section id="enquiry" className="scroll-mt-24 border-t border-brass/15 bg-charcoal-900/50">
        <div className="mx-auto max-w-container px-6 py-section">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Buy · Sell · Trade</p>
              <h2 className="mt-4 font-display text-display-md text-cream-100">
                Speak to the house
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-cream-200/65">
                Tell us what you hold or what you are hunting for. Every
                conversation begins with an honest, no-obligation valuation.
              </p>
              <div className="mt-10 space-y-2 text-sm text-cream-200/50">
                <p>86–90 Paul Street, London EC2A 4NE</p>
                <p>Mon–Fri, 9.00–18.00 GMT</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
