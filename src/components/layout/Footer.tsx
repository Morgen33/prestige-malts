import Image from "next/image";
import Link from "next/link";

const shopLinks = [
  { href: "/shop", label: "The Cellar" },
  { href: "/bespoke", label: "Bespoke Bottling" },
  { href: "/buy-and-sell", label: "Buy & Sell" },
  { href: "/distilleries", label: "Distilleries" },
  { href: "/about", label: "About & Contact" },
];

const legalLinks = [
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/delivery-returns", label: "Delivery & Returns" },
  { href: "/legal/shipping-restrictions", label: "Shipping Restrictions" },
];

export default function Footer() {
  return (
    <footer className="border-t border-brass/20 bg-charcoal-950">
      <div className="mx-auto max-w-container px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand + address */}
          <div className="md:col-span-2">
            <Image
              src="/emblem.png"
              alt="Prestige Malts"
              width={112}
              height={140}
              className="h-auto w-28"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-200/60">
              A London bottler of rare single-cask Scotch whisky, selected for
              collectors, the trade and the discerning few.
            </p>
            <address className="mt-6 space-y-1 text-sm not-italic text-cream-200/60">
              <p>86–90 Paul Street, London EC2A 4NE</p>
              <p>
                <a href="tel:+442076610264" className="hover:text-amber-300">
                  +44 (0) 20 7661 0264
                </a>
              </p>
              <p>
                <a href="mailto:info@prestigemalts.com" className="hover:text-amber-300">
                  info@prestigemalts.com
                </a>
              </p>
            </address>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-400">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-cream-200/70 hover:text-amber-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-400">
              Legal
            </h3>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-cream-200/70 hover:text-amber-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule my-12" />

        {/* Responsible drinking */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-sm text-cream-200/60">
            Please drink responsibly. For the facts, visit{" "}
            <a
              href="https://www.drinkaware.co.uk/"
              className="text-amber-300 underline underline-offset-2"
            >
              drinkaware.co.uk
            </a>
            . ID may be required on delivery — Challenge 25.
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-cream-200/40">
            18+ only
          </p>
        </div>

        {/* Compliance block */}
        <div className="mt-8 grid gap-2 border-t border-brass/15 pt-8 text-xs leading-relaxed text-cream-200/40 sm:grid-cols-2 lg:grid-cols-4">
          <p>
            AWRS No.
            <br />
            <span className="text-cream-200/70">XQAW00000120450</span>
          </p>
          <p>
            Excise ID
            <br />
            <span className="text-cream-200/70">GBOG030931300</span>
          </p>
          <p>
            VAT No.
            <br />
            <span className="text-cream-200/70">GB 000 0000 00 (placeholder)</span>
          </p>
          <p>
            Company No.
            <br />
            <span className="text-cream-200/70">13573512 (England &amp; Wales)</span>
          </p>
        </div>

        <p className="mt-10 text-xs text-cream-200/30">
          © {new Date().getFullYear()} Prestige Malts Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
