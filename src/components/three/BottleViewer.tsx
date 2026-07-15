"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/data/types";
import type { BespokeLabelData } from "@/lib/label-texture";
import { hasWebGL, isLowPowerDevice, prefersReducedMotion } from "@/lib/webgl";
import BottleFallback from "./BottleFallback";

/**
 * Code-split the entire three.js scene. It is never part of the initial JS
 * payload and never blocks first paint — the fallback renders immediately and
 * the 3D chunk streams in only when we've decided the device can handle it.
 */
const BottleScene = dynamic(() => import("./BottleScene"), {
  ssr: false,
  loading: () => null,
});

export interface BottleViewerProps {
  product: Product;
  /** Enable drag-to-rotate (product pages). Thumbnails stay non-interactive. */
  interactive?: boolean;
  className?: string;
  /** Force the 2D card regardless of capability (e.g. dense grids). */
  forceFallback?: boolean;
  /**
   * Gentle idle rotation. On for hero/thumbnails; off for product detail so
   * the bespoke label faces the camera and the user drags to explore.
   */
  autoRotate?: boolean;
  /** Personalised label data — overrides the product label when present. */
  label?: BespokeLabelData;
  /**
   * Glass fidelity. "high" (default) uses the buffer-based transmission glass —
   * only for single large bottles. Dense grids MUST pass "low" or the stacked
   * per-bottle buffer renders will hang the GPU.
   */
  glass?: "high" | "low";
}

export default function BottleViewer({
  product,
  interactive = false,
  className = "",
  forceFallback = false,
  autoRotate = true,
  label,
  glass = "high",
}: BottleViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [render3D, setRender3D] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);

  // Decide capability on the client only.
  useEffect(() => {
    if (forceFallback) return;
    const capable = hasWebGL() && !isLowPowerDevice();
    setReducedMotion(prefersReducedMotion());
    setRender3D(capable);
  }, [forceFallback]);

  // Pause rendering when off-screen.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px", threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Idle rotation only when requested, in view, and motion is allowed.
  const animate = render3D && inView && !reducedMotion && autoRotate;
  // Live loop when spinning or draggable & on-screen; otherwise render on
  // demand (a single frame) to keep static / off-screen viewers at ~0 GPU.
  const frameloop: "always" | "demand" =
    inView && (animate || interactive) ? "always" : "demand";

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {render3D && inView ? (
        <BottleScene
          product={product}
          interactive={interactive}
          animate={animate}
          frameloop={frameloop}
          label={label}
          glass={glass}
        />
      ) : (
        <BottleFallback product={product} />
      )}
    </div>
  );
}
