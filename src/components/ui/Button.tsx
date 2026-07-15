import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 ease-silk disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-800";

const variants: Record<Variant, string> = {
  solid:
    "bg-amber-500 text-charcoal-950 px-7 py-3.5 hover:bg-amber-400 hover:shadow-[0_8px_30px_-8px_rgba(200,149,47,0.6)]",
  outline:
    "border border-brass/50 text-cream-100 px-7 py-3.5 hover:border-amber-400 hover:text-amber-300",
  ghost: "text-cream-100 px-2 py-1 hover:text-amber-300",
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "solid",
  className = "",
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "solid",
  className = "",
  children,
  href,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
