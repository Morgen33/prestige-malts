"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/data/types";
import ProductCard from "@/components/shop/ProductCard";

/**
 * A draggable "shelf" of bottlings — grab and slide horizontally with momentum,
 * scroll-snap, edge fades and arrow controls. Native swipe on touch/trackpad;
 * click-and-drag on desktop mice. A drag that moves is suppressed from firing
 * the underlying card link so sliding never navigates by accident.
 */
export default function BottleCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: 0 });

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : 340;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || e.pointerType === "touch") return; // native touch scrolling
    drag.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: 0,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
  };
  // Cancel the card's navigation if the pointer was dragged rather than clicked.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="relative">
      {/* Edge fades hint there is more to either side */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-charcoal-800 to-transparent transition-opacity duration-300 md:w-20"
        style={{ opacity: canLeft ? 1 : 0 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-charcoal-800 to-transparent transition-opacity duration-300 md:w-20"
        style={{ opacity: canRight ? 1 : 0 }}
      />

      <div
        ref={trackRef}
        onScroll={updateEdges}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto pb-2 active:cursor-grabbing"
      >
        {products.map((p) => (
          <div
            key={p.id}
            data-card
            className="w-[78vw] shrink-0 snap-start sm:w-[340px] lg:w-[360px]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* Controls + drag hint */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.24em] text-cream-200/35">
          Drag to explore
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Previous bottlings"
            onClick={() => step(-1)}
            disabled={!canLeft}
            className="flex h-11 w-11 items-center justify-center border border-brass/30 text-cream-100 transition-all duration-300 ease-silk hover:border-amber-400 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-25"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next bottlings"
            onClick={() => step(1)}
            disabled={!canRight}
            className="flex h-11 w-11 items-center justify-center border border-brass/30 text-cream-100 transition-all duration-300 ease-silk hover:border-amber-400 hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-25"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
