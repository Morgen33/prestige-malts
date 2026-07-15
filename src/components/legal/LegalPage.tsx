import type { ReactNode } from "react";

/** Shared shell for legal / policy pages. Content is placeholder. */
export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-prose2 px-6 pt-28 pb-section">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 font-display text-display-md text-cream-100">{title}</h1>
      <div className="mt-4 rounded border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-xs text-amber-300">
        Placeholder content — to be reviewed and completed by the business and its
        legal advisers before launch.
      </div>
      <div className="prose-legal mt-10 space-y-6 text-sm leading-relaxed text-cream-200/70 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-cream-100">
        {children}
      </div>
    </div>
  );
}
