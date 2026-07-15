"use client";

import { useState } from "react";

const INTERESTS = [
  "A private cask of my own",
  "Selling a bottle or collection",
  "A valuation",
  "Sourcing a specific bottle",
  "Corporate & gifting",
  "Hospitality — bar or restaurant list",
  "Import & distribution",
  "Bonded storage & bottling services",
] as const;

const inputCls =
  "w-full border border-brass/25 bg-charcoal-950/60 px-4 py-3.5 text-sm text-cream-100 placeholder:text-cream-200/30 transition-colors duration-300 focus:border-amber-400 focus:outline-none";

/**
 * Bespoke / trade enquiry form. Submission is a placeholder success state —
 * wire to your email provider or CRM endpoint before launch.
 */
export default function EnquiryForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border border-brass/25 bg-charcoal-900/60 px-8 py-16 text-center">
        <p className="font-display text-3xl text-amber-300">Received.</p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-cream-200/65">
          Thank you — the house will be in touch within two working days.
          Conversations of this kind are best had over a dram; we look forward
          to it.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-name" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream-200/50">
            Name
          </label>
          <input id="enq-name" name="name" required autoComplete="name" className={inputCls} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="enq-company" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream-200/50">
            Company <span className="text-cream-200/30">(optional)</span>
          </label>
          <input id="enq-company" name="company" autoComplete="organization" className={inputCls} placeholder="Company or venue" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-email" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream-200/50">
            Email
          </label>
          <input id="enq-email" name="email" type="email" required autoComplete="email" className={inputCls} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="enq-phone" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream-200/50">
            Telephone <span className="text-cream-200/30">(optional)</span>
          </label>
          <input id="enq-phone" name="phone" type="tel" autoComplete="tel" className={inputCls} placeholder="+44" />
        </div>
      </div>

      <div>
        <label htmlFor="enq-interest" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream-200/50">
          Nature of enquiry
        </label>
        <select id="enq-interest" name="interest" required defaultValue="" className={`${inputCls} appearance-none`}>
          <option value="" disabled>
            Select…
          </option>
          {INTERESTS.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="enq-message" className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream-200/50">
          Your story
        </label>
        <textarea
          id="enq-message"
          name="message"
          rows={5}
          className={inputCls}
          placeholder="The occasion, the character you're after, quantities, timelines — whatever you know so far."
        />
      </div>

      <div className="flex flex-col items-start justify-between gap-6 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="bg-amber-500 px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] text-charcoal-950 transition-all duration-300 ease-silk hover:bg-amber-400 hover:shadow-[0_8px_30px_-8px_rgba(200,149,47,0.6)]"
        >
          Begin the Conversation
        </button>
        <p className="text-xs leading-relaxed text-cream-200/40">
          Or directly:{" "}
          <a href="mailto:info@prestigemalts.com" className="text-amber-300/80 underline decoration-brass/40 underline-offset-4 hover:text-amber-300">
            info@prestigemalts.com
          </a>{" "}
          ·{" "}
          <a href="tel:+442076610264" className="text-amber-300/80 underline decoration-brass/40 underline-offset-4 hover:text-amber-300">
            +44 (0) 20 7661 0264
          </a>
        </p>
      </div>
    </form>
  );
}
