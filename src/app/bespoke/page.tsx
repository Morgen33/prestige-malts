import type { Metadata } from "next";
import { getProduct } from "@/data/products";
import BottleViewer from "@/components/three/BottleViewer";
import PetrolLiquidBackdrop from "@/components/three/PetrolLiquidBackdrop";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import EnquiryForm from "@/components/bespoke/EnquiryForm";
import PersonalizeBottle from "@/components/bespoke/PersonalizeBottle";

export const metadata: Metadata = {
  title: "Bespoke Bottling & Trade",
  description:
    "A private cask of your own — selected, matured in bond, hand-bottled and delivered under your name. Bonded warehouse and bottling services for the trade.",
};

const PILLARS = [
  {
    numeral: "I",
    title: "Single-cask expertise",
    body: "We nose hundreds of casks to reserve a handful. Two decades of relationships with distilleries and brokers mean access to parcels that never reach the open market.",
  },
  {
    numeral: "II",
    title: "Uncompromising quality",
    body: "Cask strength. Natural colour. Non chill-filtered. If a cask drifts from our standard while maturing, it is sold on quietly — it will never wear our label.",
  },
  {
    numeral: "III",
    title: "The service of a private house",
    body: "One point of contact from first conversation to delivery. Decisions made over a dram, not a ticket queue. Your cask is our reputation.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Selection",
    body: "Sit with us — in London or over samples sent to you — and nose through the reserved parcels. Region, age, cask type, character: we narrow hundreds to the one that is unmistakably yours.",
  },
  {
    n: "02",
    title: "Design",
    body: "Bottle, label, closure, presentation. Our designers set your name, mark or message into the house style — or depart from it entirely. Corporate crests, family initials, a line of dedication.",
  },
  {
    n: "03",
    title: "Production",
    body: "Bottled by hand at cask strength in our bonded facility. Every bottle numbered against the outturn, every label stating distillery, cask number, age and strength — plainly, as it should be.",
  },
  {
    n: "04",
    title: "Delivery",
    body: "Duty settled or held in bond, as suits you. Delivered worldwide with age verification, or stored with us and drawn down as needed — by the case or by the bottle.",
  },
];

const AUDIENCES = [
  ["Collectors", "A cask laid down under your own name — the ultimate expression of ownership."],
  ["Hospitality", "A house bottling for your bar or list that no competitor can pour."],
  ["Importers & Distributors", "Exclusive runs and private-label parcels with full provenance."],
  ["Corporate", "Gifts and milestones that will not be regifted. Ever."],
];

export default function BespokePage() {
  // The golden Clynelish makes the best showroom bottle.
  const showcase = getProduct("clynelish-2010-cask-1902")!;

  return (
    <>
      {/* ————— Hero ————— */}
      <section className="grain hairline-frame relative overflow-hidden bg-charcoal-950">
        {/* The gentleman, ghosted into the dark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/emblem.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[62%] top-1/2 h-[130vmin] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.045] blur-[2px]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 55% at 68% 45%, rgba(200,149,47,0.12), transparent 70%), radial-gradient(120% 120% at 50% 50%, transparent 45%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-container px-8 pb-24 pt-40 md:px-12 md:pb-32 md:pt-48">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-brass/50" />
              <p className="eyebrow">Private Casks · Bonded Warehouse · Trade</p>
            </div>
            <h1 className="mt-8 max-w-4xl font-display text-display-xl font-medium text-cream-100">
              A cask of{" "}
              <em className="gold-text">your own</em>.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-cream-200/65">
              Beyond our own releases, the house offers a quieter service: your
              cask, selected with you, matured in bond, bottled by hand and
              delivered under your name. For collectors, the trade, and
              occasions that deserve better than something off a shelf.
            </p>
            <div className="mt-11 flex flex-wrap items-center gap-4">
              <ButtonLink href="#enquiry" variant="solid">
                Begin an Enquiry
              </ButtonLink>
              <ButtonLink href="tel:+442076610264" variant="outline">
                Speak to the House
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— Personalisation playground: your story, live on the bottle ————— */}
      <section className="mx-auto max-w-container px-6 py-section">
        <Reveal>
          <p className="eyebrow">It Is Not Just Whisky</p>
          <h2 className="mt-4 max-w-3xl font-display text-display-md text-cream-100">
            Your name. Your story.{" "}
            <em className="gold-text">Your legacy.</em>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-200/65">
            Every commission carries its own label, set in the house style.
            Try it — type a name, a dedication, choose the wood, and watch the
            bottle become yours.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-14">
          <PersonalizeBottle />
        </Reveal>
      </section>

      {/* ————— Philosophy: the bottle steps aside ————— */}
      <section className="mx-auto max-w-container px-6 py-section">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-brass/15 bg-charcoal-950">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 55% at 50% 42%, rgba(200,149,47,0.16), transparent 70%)",
                }}
              />
              <BottleViewer product={showcase} interactive className="h-full w-full" />
              <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.24em] text-cream-200/40">
                Drag to rotate
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <p className="eyebrow">The House Bottle</p>
            <h2 className="mt-4 font-display text-display-md text-cream-100">
              The bottle steps aside for the whisky.
            </h2>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-cream-200/65">
              <p>
                Heavy-shouldered glass with real weight in the hand. A label
                that sits low and narrow, so the first thing you read is the
                colour of the liquid itself — which is precisely why we never
                adjust it.
              </p>
              <p>
                Every fact of the cask is stated plainly on the front:
                distillery, region, vintage, age, cask number, strength.
                Nothing invented, nothing withheld. Your bottling carries the
                same standard — with your name set beneath the house mark.
              </p>
            </div>
            <ul className="mt-10 space-y-4">
              {[
                "Cask strength — never diluted to a house number",
                "Natural colour · non chill-filtered",
                "700ml, individually numbered against the outturn",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm text-cream-200/75">
                  <span className="mt-1 text-amber-400">◆</span>
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ————— Why the house ————— */}
      <section className="relative overflow-hidden border-y border-brass/15 bg-petrol">
        <PetrolLiquidBackdrop />
        <div className="relative z-10 mx-auto max-w-container px-6 py-section">
          <Reveal className="text-center">
            <p className="eyebrow">Why Prestige Malts</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-display-md text-cream-100">
              Three things we will not negotiate
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.numeral} delay={i * 0.08}>
                <div className="h-full border border-brass/15 bg-petrol-950/50 p-9">
                  <p className="font-display text-4xl text-brass">{p.numeral}</p>
                  <div className="my-5 h-px w-10 bg-brass/40" />
                  <h3 className="font-display text-2xl text-cream-100">{p.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-cream-200/60">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Bonded warehouse & bottling services ————— */}
      <section className="mx-auto max-w-container px-6 py-section">
        <Reveal>
          <p className="eyebrow">Trade Services</p>
          <h2 className="mt-4 max-w-2xl font-display text-display-md text-cream-100">
            Bonded warehouse &amp; bottling
          </h2>
        </Reveal>

        <div className="relative mt-14 overflow-hidden border border-brass/15 bg-petrol">
          <PetrolLiquidBackdrop />
          <div className="relative z-10 grid lg:grid-cols-2">
            <div className="grain relative h-full overflow-hidden border-b border-brass/15 p-10 md:p-12 lg:border-b-0 lg:border-r">
              <p className="font-display text-3xl text-amber-300">In Bond</p>
              <div className="my-6 h-px w-12 bg-brass/40" />
              <p className="text-sm leading-relaxed text-cream-200/65">
                Secure, insured, duty-suspended storage under our AWRS and
                excise registrations. Casks are gauged on arrival, monitored
                through maturation, and re-gauged before bottling — with
                samples drawn to your instruction at any point.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-cream-200/75">
                {[
                  "HMRC-bonded, duty suspended until you decide",
                  "Full insurance & annual regauge reports",
                  "Cask management: recasking, finishing, brokerage",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-1 text-amber-400">◆</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grain relative h-full overflow-hidden p-10 md:p-12">
              <p className="font-display text-3xl text-amber-300">Small-Batch Bottling</p>
              <div className="my-6 h-px w-12 bg-brass/40" />
              <p className="text-sm leading-relaxed text-cream-200/65">
                A bottling line built for outturns of hundreds, not hundreds of
                thousands. Hand-filled, hand-labelled, hand-checked — the way a
                single cask deserves. Private-label runs for importers,
                distributors and houses without a facility of their own.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-cream-200/75">
                {[
                  "Runs from a single cask upward",
                  "Bespoke label, closure & presentation sourcing",
                  "Export documentation & worldwide freight",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-1 text-amber-400">◆</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ————— The programme ————— */}
      <section className="grain relative overflow-hidden border-y border-brass/15 bg-charcoal-950">
        <div className="mx-auto max-w-container px-6 py-section">
          <Reveal className="text-center">
            <p className="eyebrow">The Private Cask Programme</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-display-md text-cream-100">
              From our warehouse to{" "}
              <em className="gold-text">your heirloom</em>
            </h2>
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="group flex gap-8 border-b border-brass/15 py-10 last:border-b-0 md:gap-14">
                  <p className="font-display text-5xl text-brass/70 transition-colors duration-500 group-hover:text-amber-400 md:text-6xl">
                    {s.n}
                  </p>
                  <div>
                    <h3 className="font-display text-2xl text-cream-100 md:text-3xl">{s.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream-200/60">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Who we serve ————— */}
      <section className="mx-auto max-w-container px-6 py-section">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map(([title, body], i) => (
            <Reveal key={title} delay={i * 0.06}>
              <p className="font-display text-xl text-amber-300">{title}</p>
              <div className="my-4 h-px w-10 bg-brass/40" />
              <p className="text-sm leading-relaxed text-cream-200/60">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— Enquiry ————— */}
      <section id="enquiry" className="border-t border-brass/15 bg-charcoal-900/50 scroll-mt-24">
        <div className="mx-auto max-w-container px-6 py-section">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow">The First Dram</p>
              <h2 className="mt-4 font-display text-display-md text-cream-100">
                Begin the conversation
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-cream-200/65">
                Tell us what you have in mind — or simply that you&rsquo;re curious.
                Every commission starts the same way: a conversation, a few
                samples, and no obligation whatsoever.
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
