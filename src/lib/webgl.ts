/**
 * Capability detection for the 3D system. Used to decide whether to render
 * the r3f BottleViewer or fall back to the 2D typographic bottle card.
 */

export function hasWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Rough low-power heuristic: few logical cores usually means a modest device
 * where a transmission-heavy scene would drop frames. Errs toward the 2D card.
 */
export function isLowPowerDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const cores = navigator.hardwareConcurrency ?? 8;
  return cores > 0 && cores <= 4;
}
