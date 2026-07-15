import { ButtonLink } from "./Button";

/**
 * Elegant placeholder for routes scheduled in a later pass, so no navigation
 * link 404s during review. Replace each with its real page.
 */
export default function ComingSoon({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-container flex-col justify-center px-6 pt-28 pb-section">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 max-w-3xl font-display text-display-lg text-cream-100">
        {title}
      </h1>
      <p className="mt-6 max-w-prose2 text-base leading-relaxed text-cream-200/70">
        {body}
      </p>
      <div className="mt-10">
        <ButtonLink href="/shop" variant="outline">
          Browse the Cellar
        </ButtonLink>
      </div>
    </div>
  );
}
