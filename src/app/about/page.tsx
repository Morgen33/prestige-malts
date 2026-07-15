import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About & Contact",
  description:
    "Prestige Malts — a London house bottling rare single-cask Scotch whisky. 86–90 Paul Street, London EC2A 4NE.",
};

const DETAILS = [
  ["Address", "86–90 Paul Street\nLondon EC2A 4NE"],
  ["Telephone", "+44 (0) 20 7661 0264"],
  ["Email", "info@prestigemalts.com"],
  ["Hours", "Mon–Fri, 9.00–18.00 GMT\nTastings by appointment"],
];

export default function AboutPage() {
  return (
    <>
      {/* ————— Hero ————— */}
      <section className="grain hairline-frame relative overflow-hidden bg-charcoal-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/emblem.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[68%] top-1/2 h-[125vmin] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.045] blur-[2px]"
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
              <p className="eyebrow">The House · London · Est. 2021</p>
            </div>
            <h1 className="mt-8 max-w-4xl font-display text-display-xl font-medium text-cream-100">
              A London house for{" "}
              <em className="gold-text">singular whisky</em>.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-cream-200/65">
              Prestige Malts exists for one kind of whisky: the single cask —
              finite, unrepeatable, and honest about exactly what it is.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ————— The story ————— */}
      <section className="mx-auto max-w-container px-6 py-section">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-4 font-display text-display-md text-cream-100">
              Why we bottle one cask at a time
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 text-base leading-relaxed text-cream-200/65">
              <p>
                Most whisky is an average — hundreds of casks married together
                so that this year tastes like last year. There is craft in
                that. But there is no thrill in it.
              </p>
              <p>
                A single cask is the opposite proposition. One barrel, filled
                on one day, resting in one corner of one warehouse until it
                becomes something no other barrel became. When it is gone, it
                is gone — and we think that is precisely the point.
              </p>
              <p>
                From Paul Street, we spend our year nosing casks across
                Scotland to reserve the few that stop conversation. They are
                bottled by hand at cask strength, at natural colour, without
                chill-filtration, and labelled with everything we know about
                them: distillery, vintage, cask number, outturn. Nothing
                invented, nothing withheld.
              </p>
              <p>
                We supply collectors, private clients, and the trade — and for
                those who want to go further, we bottle{" "}
                <a
                  href="/bespoke"
                  className="text-amber-300 underline decoration-brass/40 underline-offset-4 hover:text-amber-400"
                >
                  entire casks under their own name
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— The letter ————— */}
      <section className="grain relative overflow-hidden border-y border-brass/15 bg-charcoal-950">
        <div className="mx-auto max-w-container px-6 py-section">
          <Reveal className="mx-auto max-w-2xl text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/emblem.png"
              alt=""
              aria-hidden="true"
              width={120}
              height={120}
              className="mx-auto h-auto w-32 opacity-95"
            />
            <p className="mt-8 font-display text-2xl italic leading-relaxed text-cream-100 md:text-3xl">
              &ldquo;Our promise is easily stated: if a cask is not worth
              keeping a bottle back for ourselves, it will never be offered to
              you.&rdquo;
            </p>
            <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-cream-200/40">
              The House · Prestige Malts, London
            </p>
          </Reveal>
        </div>
      </section>

      {/* ————— Contact ————— */}
      <section className="mx-auto max-w-container px-6 py-section">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-4 font-display text-display-md text-cream-100">
              Call on the house
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream-200/65">
              For allocations, trade accounts, private commissions — or simply
              advice on a cask — write, call, or arrange to visit us on Paul
              Street. Tastings are held by appointment.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="mailto:info@prestigemalts.com" variant="solid">
                Write to Us
              </ButtonLink>
              <ButtonLink href="/bespoke#enquiry" variant="outline">
                Bespoke Enquiry
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="grid gap-px border border-brass/15 bg-brass/15 sm:grid-cols-2">
              {DETAILS.map(([term, value]) => (
                <div key={term} className="bg-charcoal-900/90 p-8">
                  <dt className="text-[10px] uppercase tracking-[0.24em] text-amber-400">
                    {term}
                  </dt>
                  <dd className="mt-3 whitespace-pre-line text-sm leading-relaxed text-cream-100">
                    {term === "Telephone" ? (
                      <a href="tel:+442076610264" className="hover:text-amber-300">
                        {value}
                      </a>
                    ) : term === "Email" ? (
                      <a
                        href="mailto:info@prestigemalts.com"
                        className="hover:text-amber-300"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-cream-200/40">
              Prestige Malts Ltd · Company No. 13573512 (England &amp; Wales) ·
              AWRS XQAW00000120450
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
