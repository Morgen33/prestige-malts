"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/data/types";
import BottleViewer from "@/components/three/BottleViewer";
import { ButtonLink } from "@/components/ui/Button";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Homepage hero — a slow, cinematic 3D bottle moment inside a hairline
 * members'-club frame. Low-key light, one gold-foil phrase, nothing loud.
 */
export default function Hero({ product }: { product: Product }) {
  const reduce = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: reduce ? {} : { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section className="grain relative min-h-screen overflow-hidden bg-charcoal-950">
      {/* Cinematic light: a single warm pool behind the bottle, vignetted edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 58% at 71% 44%, rgba(200,149,47,0.22), transparent 68%), radial-gradient(120% 90% at 50% 110%, rgba(20,18,16,0.9), transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid min-h-screen max-w-container items-center gap-8 px-8 pt-28 pb-20 md:grid-cols-[1.05fr_1fr] md:px-12 md:pt-24">
        {/* Editorial copy — the header already carries the emblem; here the
            type does the talking. */}
        <div className="order-2 md:order-1">
          <motion.div {...fade(0)} className="flex items-center gap-4">
            <span className="h-px w-10 bg-brass/50" />
            <p className="eyebrow">London · Single Cask · Est. 2021</p>
          </motion.div>

          <motion.h1
            {...fade(0.12)}
            className="mt-8 font-display text-display-xl font-medium text-cream-100"
          >
            Whisky for those
            <br />
            who know that <em className="gold-text">rare</em>
            <br />
            is an understatement.
          </motion.h1>

          <motion.p
            {...fade(0.26)}
            className="mt-9 max-w-md text-base leading-relaxed text-cream-200/65"
          >
            Prestige Malts bottles exceptional single casks of Scotch whisky —
            each release finite, unrepeatable, drawn from one barrel and never
            blended. No colouring. No compromise. No second chances.
          </motion.p>

          <motion.div
            {...fade(0.4)}
            className="mt-11 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="/shop" variant="solid">
              Explore the Cellar
            </ButtonLink>
            <ButtonLink href="/bespoke" variant="outline">
              Bespoke Bottling
            </ButtonLink>
          </motion.div>

          <motion.p
            {...fade(0.52)}
            className="mt-12 text-[11px] uppercase tracking-[0.24em] text-cream-200/35"
          >
            Allocation-first releases · Outturns of a few hundred, then gone
          </motion.p>
        </div>

        {/* 3D bottle in its pool of light */}
        <motion.div
          className="relative order-1 h-[46vh] w-full md:order-2 md:h-[82vh]"
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={reduce ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
        >
          <BottleViewer product={product} interactive className="h-full w-full" />
        </motion.div>
      </div>
    </section>
  );
}
