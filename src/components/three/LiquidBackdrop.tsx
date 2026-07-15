"use client";

/**
 * Flowing "liquid whisky" backdrop — slow-drifting amber light, heavily blurred
 * so the blobs read as flowing liquid rather than discrete shapes.
 *
 * Pure CSS / compositor (see globals.css `.liquid-*`): no WebGL context, so it
 * never competes with the 3D bottles for a GL context or gets evicted, renders
 * on every device, and freezes under prefers-reduced-motion.
 */
export default function LiquidBackdrop({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{ background: "#14110d" }}
    >
      <div className="liquid-inner">
        <span className="liquid-blob liquid-b1" />
        <span className="liquid-blob liquid-b2" />
        <span className="liquid-blob liquid-b3" />
        <span className="liquid-blob liquid-b4" />
      </div>
    </div>
  );
}
