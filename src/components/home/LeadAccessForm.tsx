"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const ROLES = [
  "Private collector",
  "Family office",
  "Trade / hospitality",
  "Distillery partner",
  "Other",
] as const;

const AGES = [
  "2–5 years old",
  "6–10 years old",
  "10–16 years old",
  "Above 16 years old",
] as const;

const TIMING = [
  "Within 2 months",
  "Upcoming 2–12 months",
  "Flexible",
] as const;

const VOLUME = [
  "1–5 casks",
  "5–15 casks",
  "15+ casks",
] as const;

const BUDGETS = [
  "Up to £50,000",
  "£50,000–£150,000",
  "£150,000–£500,000",
  "£500,000+",
] as const;

const inputCls =
  "w-full rounded-full border border-brass/25 bg-charcoal-950/50 px-5 py-3.5 text-sm text-cream-100 placeholder:text-cream-200/30 transition-colors duration-300 focus:border-amber-400 focus:outline-none";

const pillBase =
  "rounded-full border px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-300";

const pillIdle =
  "border-brass/30 bg-charcoal-950/40 text-cream-200/75 hover:border-brass/55 hover:text-cream-100";

const pillActive =
  "border-amber-400/70 bg-amber-500/15 text-amber-300";

function PillGroup({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-[11px] uppercase tracking-[0.22em] text-cream-200/55">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(opt)}
              className={`${pillBase} ${selected ? pillActive : pillIdle}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <input type="hidden" name={name} value={value} />
    </fieldset>
  );
}

/**
 * Homepage lead / access form. Submission is a local success state —
 * wire to CRM or email before launch. Currency framed in GBP throughout.
 */
export default function LeadAccessForm() {
  const [sent, setSent] = useState(false);
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [timing, setTiming] = useState("");
  const [volume, setVolume] = useState("");
  const [budget, setBudget] = useState("");

  if (sent) {
    return (
      <div className="rounded-3xl border border-brass/20 bg-petrol/90 px-8 py-16 text-center md:px-12">
        <p className="font-display text-3xl text-amber-300">Received.</p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream-200/65">
          Thank you — Prestige Malts will be in touch within two working days
          to guide you through allocation and ownership.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!role || !age || !timing || !volume || !budget) return;
        setSent(true);
      }}
      className="rounded-3xl border border-brass/20 bg-petrol/90 px-6 py-10 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.65)] backdrop-blur-sm md:px-10 md:py-12"
    >
      <div className="text-center md:text-left">
        <p className="eyebrow">Private Access</p>
        <h2 className="mt-4 font-display text-display-sm text-cream-100 md:text-display-md">
          Get access now
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream-200/65">
          Start your journey to single-cask ownership. Share your details and
          we&apos;ll guide you through availability, pricing in GBP, and next
          steps.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="lead-first"
            className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream-200/50"
          >
            First name
          </label>
          <input
            id="lead-first"
            name="firstName"
            required
            autoComplete="given-name"
            className={inputCls}
            placeholder="James"
          />
        </div>
        <div>
          <label
            htmlFor="lead-last"
            className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream-200/50"
          >
            Last name
          </label>
          <input
            id="lead-last"
            name="lastName"
            required
            autoComplete="family-name"
            className={inputCls}
            placeholder="MacLeod"
          />
        </div>
        <div>
          <label
            htmlFor="lead-email"
            className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream-200/50"
          >
            Email address
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputCls}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="lead-phone"
            className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-cream-200/50"
          >
            Phone number
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputCls}
            placeholder="+44 7700 900000"
          />
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <PillGroup
          legend="Which of the following are you?"
          name="role"
          options={ROLES}
          value={role}
          onChange={setRole}
        />
        <PillGroup
          legend="What age range of casks are you looking for?"
          name="ageRange"
          options={AGES}
          value={age}
          onChange={setAge}
        />
        <PillGroup
          legend="When do you need the inventory by?"
          name="timing"
          options={TIMING}
          value={timing}
          onChange={setTiming}
        />
        <PillGroup
          legend="How many casks are you in the market for?"
          name="volume"
          options={VOLUME}
          value={volume}
          onChange={setVolume}
        />
        <PillGroup
          legend="Indicative budget (GBP)"
          name="budget"
          options={BUDGETS}
          value={budget}
          onChange={setBudget}
        />
      </div>

      <label className="mt-10 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-cream-200/55">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-amber-500"
        />
        <span>
          I agree to be contacted by Prestige Malts about cask opportunities,
          allocations and private bottling. Message frequency varies. Reply
          STOP to opt out of SMS. See our{" "}
          <a
            href="/legal/privacy"
            className="text-cream-100 underline decoration-brass/40 underline-offset-2 hover:text-amber-300"
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Button type="submit" variant="solid" className="min-w-[12rem] rounded-full px-10">
          Get Started
        </Button>
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-cream-200/40">
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 fill-none stroke-brass"
            strokeWidth="1.4"
          >
            <rect x="3" y="7" width="10" height="7" rx="1.5" />
            <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
          </svg>
          Your information is private and will never be shared
        </p>
      </div>
    </form>
  );
}
