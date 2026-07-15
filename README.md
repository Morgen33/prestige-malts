# Prestige Malts

A premium, interactive storefront for a London bespoke single-cask whisky bottler.
Built with **Next.js (App Router) + TypeScript + Tailwind**, a data-driven
**react-three-fiber** 3D bottle system (no product photography), and
**Framer Motion** for editorial motion.

> **Status:** scaffold. The homepage hero, the shop grid, one full product
> detail page, the 3D `BottleViewer`, the compliance layer, and all legal/nav
> stubs are built. Cart/checkout, accounts, the bespoke enquiry flow,
> distillery editorial and catalogue filtering are the next pass.

---

## Setup

```bash
npm install
npm run dev        # http://localhost:3008
npm run build      # production build (static export of all routes)
npm run typecheck  # tsc --noEmit
npm run lint
```

Requires Node 18.18+ (developed on Node 22).

The dev server runs on **port 3008** (`next dev -p 3008`) to avoid colliding
with other local projects on 3000/3007. Change it in `package.json` and
`.claude/launch.json` if you prefer another port.

---

## Project structure

```
src/
  app/
    layout.tsx                 # fonts, header/footer, age gate, cookie banner
    page.tsx                   # homepage (3D hero + storytelling sections)
    shop/page.tsx              # catalogue grid (filtering stub)
    shop/[slug]/page.tsx       # full product detail page (SSG)
    bespoke, distilleries,
    about, cart, account/      # elegant "coming soon" stubs (no dead links)
    legal/*                    # terms, privacy, delivery-returns, shipping
  components/
    three/
      BottleViewer.tsx         # public API: capability detection + lazy-load
      BottleScene.tsx          # the r3f Canvas (code-split, never in first load)
      BottleFallback.tsx       # 2D typographic bottle card
    home/Hero.tsx
    shop/ProductCard.tsx, AddToCart.tsx
    layout/Header.tsx, Footer.tsx
    compliance/AgeGate.tsx, CookieBanner.tsx
    legal/LegalPage.tsx
    ui/                        # Button, ScarcityBadge, Reveal, ComingSoon
  data/
    types.ts                   # Product / Distillery types
    products.ts                # seed catalogue (8 bottlings) + accessors
  lib/
    label-texture.ts           # generates the bespoke label onto a canvas
    format.ts, webgl.ts        # price/age formatting, capability detection
```

---

## The 3D bottle system

There is **one reusable component**, `<BottleViewer product={...} />`. Everything
else is derived from product data — no photography.

- **Geometry** is procedural: a `LatheGeometry` revolved from a bottle
  silhouette (`GLASS_PROFILE` in `BottleScene.tsx`). No GLB to ship or version.
  Swap in a GLB later by replacing the `<mesh geometry={glassGeo}>` with a
  `useGLTF` load — the material/label logic stays.
- **Liquid colour** is driven by `product.liquidColor` (pale straw → deep amber
  → sherried mahogany). It's rendered as an opaque coloured volume so the tone
  reads cleanly through the clear glass.
- **Label** is generated at runtime in `lib/label-texture.ts` from the
  distillery, region, vintage, age, cask number and ABV, drawn onto a 2D canvas
  and wrapped on the bottle as a `CanvasTexture`. Edit that file to restyle
  every label at once.
- **Glass** uses `MeshPhysicalMaterial` transmission for real refraction, lit by
  drei `<Lightformer>`s inside `<Environment>` — **no external HDR download**.

### Guardrails (all implemented)

| Guardrail | Where |
|---|---|
| Lazy-load + code-split every scene | `BottleViewer` uses `next/dynamic({ ssr:false })`; three.js is not in First Load JS |
| 2D fallback when WebGL is unavailable / low-power | `BottleFallback` via `lib/webgl.ts` detection |
| Respect `prefers-reduced-motion` | idle rotation frozen; `Reveal`/`Hero` render static |
| Cap pixel ratio & pause off-screen | `dpr={[1,1.75]}`; `IntersectionObserver` → `frameloop="demand"` |
| Prefer clean 2D if 3D looks cheap | pass `forceFallback` / `autoRotate={false}` per surface |

`BottleViewer` props: `interactive` (drag-to-rotate), `autoRotate` (idle spin —
on for hero/thumbnails, off for detail pages so the label faces front),
`forceFallback` (force the 2D card).

---

## Design system

Tokens live in `tailwind.config.ts` and are mirrored as CSS variables in
`src/app/globals.css` (so the 3D scene and label generator read the same
palette).

- **Colour:** `charcoal` base `#211e1b`, `amber` whisky-golds, `cream`
  aged-paper surfaces, `brass` detail.
- **Type:** `font-display` = Cormorant Garamond (serif), `font-sans` = Inter,
  loaded via `next/font`. Fluid `display-*` scale + `eyebrow` small-caps.
- **Motion:** `ease-silk` cubic-bezier, `Reveal` scroll component.

---

## Adding a product

Append an object to `products` in `src/data/products.ts` matching the `Product`
type. `id` becomes the URL slug and is picked up automatically by
`generateStaticParams`. `liquidColor` and the label fields feed the 3D viewer —
no image asset needed.

## Swapping in a CMS (Sanity)

`data/products.ts` exposes `products`, `getProduct(id)`, `getAllProductIds()`.
Replace their bodies with CMS fetches returning the same `Product` shape;
components and the 3D system need no changes.

## Stripe

Cart/checkout is stubbed (`AddToCart.tsx`, `/cart`). To wire real payments:
add `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env.local`,
create a Checkout Session route handler, and post the cart to it from
`AddToCart`. Add the age/ID confirmation step to the checkout flow.

## Updating the emblem

The brand emblem lives at `public/emblem.png` (gold, transparent) and
`public/emblem-ink.png` (dark ink, used on the generated bottle labels). Both
are produced from the raw artwork by `scripts/process-emblem.mjs`, which keys
out the black background and recolours onto the site's gold ramp. To update:
replace `assets-src-emblem.png` and run `node scripts/process-emblem.mjs`.

The age-gate background is `public/barrels.webp` — swap in a real warehouse
photograph (dark, landscape) under the same name to replace the generated one.

---

## Compliance checklist — **placeholders for the business to review before launch**

- [x] 18+ age gate on first visit, remembered via essential cookie (`AgeGate`)
- [x] Age/ID confirmation note at checkout — Challenge 25 (`AddToCart`, terms)
- [x] Footer compliance block: AWRS `XQAW00000120450`, Excise ID
      `GBOG030931300`, VAT (**placeholder — add real number**), Company No.
      `13573512` (England & Wales)
- [x] Responsible-drinking notice + Drinkaware link (footer, age gate)
- [x] Terms, Privacy, Delivery & Returns, Shipping Restrictions pages (**placeholder copy**)
- [x] Cookie consent banner — essential vs. non-essential (`CookieBanner`)
- [ ] Have legal counsel review all policy copy and the VAT number before launch
- [ ] Confirm shipping-restriction logic against real destination rules
- [ ] Wire cookie consent to the actual analytics/consent manager

All legal text in this repo is **placeholder** and must be reviewed and
completed by Prestige Malts and its advisers prior to going live.
