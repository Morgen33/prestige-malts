"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState } from "react";
import { hasWebGL, isLowPowerDevice, prefersReducedMotion } from "@/lib/webgl";

/**
 * Petrol section backdrop: solid petrol navy underneath, lightweight liquid
 * sheen on top. Only one section runs WebGL at a time (page may have several).
 */

const PetrolLiquidScene = dynamic(() => import("./PetrolLiquidScene"), {
  ssr: false,
  loading: () => null,
});

type ClaimState = { id: string | null; version: number };
const claim: ClaimState = { id: null, version: 0 };
const listeners = new Set<() => void>();

function notify() {
  claim.version += 1;
  listeners.forEach((l) => l());
}

function claimBackdrop(id: string): boolean {
  if (claim.id === null || claim.id === id) {
    if (claim.id !== id) {
      claim.id = id;
      notify();
    }
    return true;
  }
  return false;
}

function releaseBackdrop(id: string) {
  if (claim.id === id) {
    claim.id = null;
    notify();
  }
}

export default function PetrolLiquidBackdrop({
  className = "",
}: {
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const inViewRef = useRef(false);
  const [capable, setCapable] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [runWebGL, setRunWebGL] = useState(false);

  useEffect(() => {
    setCapable(hasWebGL() && !isLowPowerDevice());
    setAnimate(!prefersReducedMotion());
  }, []);

  useEffect(() => {
    const sync = () => {
      if (inViewRef.current && capable) {
        setRunWebGL(claimBackdrop(id));
      } else {
        setRunWebGL(false);
      }
    };
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
      releaseBackdrop(id);
    };
  }, [id, capable]);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || !capable) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible =
          entry.isIntersecting && entry.intersectionRatio >= 0.2;
        inViewRef.current = visible;
        if (visible) {
          setRunWebGL(claimBackdrop(id));
        } else {
          releaseBackdrop(id);
          setRunWebGL(false);
        }
      },
      { rootMargin: "0px", threshold: [0, 0.2, 0.5] }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      inViewRef.current = false;
      releaseBackdrop(id);
    };
  }, [id, capable]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={`absolute inset-0 z-0 overflow-hidden bg-petrol ${className}`}
    >
      {runWebGL ? <PetrolLiquidScene animate={animate} /> : null}
    </div>
  );
}
