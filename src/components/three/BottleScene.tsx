"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  OrbitControls,
} from "@react-three/drei";

// Backdrop the clear glass transmits. A warm mid-charcoal keeps the empty
// glass reading as clear (see-through) and lit, without tipping back into the
// milky white field of a bright backdrop.
const GLASS_BACKGROUND = new THREE.Color("#38332c");
import type { Product } from "@/data/types";
import {
  createBespokeLabelTexture,
  createLabelTexture,
  type BespokeLabelData,
} from "@/lib/label-texture";

/**
 * Outer glass silhouette, revolved with LatheGeometry.
 * Points are [radius, height] from the base up through body, shoulder,
 * neck and lip. Fully parametric — no GLB asset to ship or version.
 */
const GLASS_PROFILE: [number, number][] = [
  [0.0, 0.0],
  [0.6, 0.0],
  [0.62, 0.05],
  [0.62, 1.6],
  [0.61, 1.7],
  [0.55, 1.95],
  [0.4, 2.15],
  [0.26, 2.32],
  [0.21, 2.45],
  [0.2, 2.95],
  [0.22, 3.02],
  [0.26, 3.06],
  [0.26, 3.2],
  [0.22, 3.22],
];

/** Inner liquid column, filled partway up the body. */
const LIQUID_PROFILE: [number, number][] = [
  [0.0, 0.04],
  [0.57, 0.04],
  [0.57, 1.4],
  [0.0, 1.4],
];

function toLathe(points: [number, number][]): THREE.Vector2[] {
  return points.map(([x, y]) => new THREE.Vector2(x, y));
}

function Bottle({
  product,
  interactive,
  animate,
  label,
  glass,
}: {
  product: Product;
  interactive: boolean;
  animate: boolean;
  label?: BespokeLabelData;
  glass: "high" | "low";
}) {
  const group = useRef<THREE.Group>(null);

  const glassGeo = useMemo(
    () => new THREE.LatheGeometry(toLathe(GLASS_PROFILE), 64),
    []
  );
  const liquidGeo = useMemo(
    () => new THREE.LatheGeometry(toLathe(LIQUID_PROFILE), 64),
    []
  );
  // A bespoke label (live personalisation) overrides the product label.
  const labelTexture = useMemo(
    () => (label ? createBespokeLabelTexture(label) : createLabelTexture(product)),
    [product, label]
  );

  // Dispose replaced textures so live retyping doesn't leak GPU memory.
  useEffect(() => {
    return () => labelTexture.dispose();
  }, [labelTexture]);

  const liquid = useMemo(
    () => new THREE.Color(product.liquidColor),
    [product.liquidColor]
  );

  // Slow, deliberate idle rotation; frozen when animation is disabled
  // (reduced motion). Unhurried — the pace of a decanter being admired.
  useFrame((_, delta) => {
    if (animate && group.current) {
      group.current.rotation.y += delta * 0.16;
    }
  });

  return (
    <group ref={group} position={[0, -1.6, 0]}>
      {/* Liquid — colour driven by product data. Mostly opaque and saturated
          so the whisky tone reads clearly through the clear glass rather than
          being washed out by the bright studio environment. */}
      <mesh geometry={liquidGeo}>
        {/* Opaque coloured volume — reads its whisky tone cleanly through the
            clear glass instead of compositing with the bright environment. */}
        <meshPhysicalMaterial
          color={liquid}
          transmission={0}
          roughness={0.28}
          metalness={0}
          ior={1.37}
          emissive={liquid}
          emissiveIntensity={0.08}
          clearcoat={0.35}
          clearcoatRoughness={0.25}
          envMapIntensity={0.4}
        />
      </mesh>

      {/* Glass — clear, not frosted. Single-sided thin shell (no back-face
          doubling), no volume thickness (which fogged the neck), smooth, with
          a restrained envMap so it shows crisp highlight streaks over a dark
          transmitted background rather than a white field. */}
      <mesh geometry={glassGeo} renderOrder={1}>
        {glass === "high" ? (
          // Full-fidelity clear glass — one scene-render into a buffer per
          // frame. Reserved for single large bottles (product / hero / showcase).
          <MeshTransmissionMaterial
            transmission={1}
            thickness={0.18}
            roughness={0.02}
            ior={1.5}
            chromaticAberration={0.03}
            anisotropy={0.1}
            distortion={0}
            temporalDistortion={0}
            background={GLASS_BACKGROUND}
            samples={6}
            resolution={512}
            transparent
            side={THREE.DoubleSide}
          />
        ) : (
          // Cheap glass for grid thumbnails — a low-opacity transparent shell
          // (no transmission buffer, no attenuation) so the whisky colour and
          // label read at full strength while the bright strips still catch as
          // highlight streaks. Empty neck shows the dark scene through it.
          <meshPhysicalMaterial
            color={"#d8d2c6"}
            transparent
            opacity={0.16}
            roughness={0.12}
            metalness={0}
            ior={1.5}
            envMapIntensity={1.4}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        )}
      </mesh>

      {/* Bespoke label, generated from product fields. Sits just proud of the
          glass and draws AFTER it (renderOrder) so the glass highlight falls
          behind the label rather than washing across it. Single-sided so the
          far-side label doesn't ghost through the clear glass. */}
      <mesh position={[0, 0.95, 0]} rotation={[0, Math.PI, 0]} renderOrder={3}>
        <cylinderGeometry args={[0.645, 0.645, 0.98, 64, 1, true]} />
        <meshStandardMaterial
          map={labelTexture}
          transparent
          roughness={0.7}
          metalness={0}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </mesh>

      {/* Brass capsule at the lip */}
      <mesh position={[0, 3.05, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.34, 32]} />
        <meshStandardMaterial color={"#b89258"} roughness={0.35} metalness={0.85} />
      </mesh>

      {interactive && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.8}
          rotateSpeed={0.6}
          // stop idle spin while the user is dragging handled by parent `animate`
        />
      )}
    </group>
  );
}

export interface BottleSceneProps {
  product: Product;
  interactive?: boolean;
  animate?: boolean;
  /** demand = render once (reduced motion / off-screen); always = live */
  frameloop?: "always" | "demand";
  className?: string;
  /** Personalised label data — overrides the product label when present. */
  label?: BespokeLabelData;
  /** high = MeshTransmissionMaterial (single bottles); low = cheap grid glass. */
  glass?: "high" | "low";
}

export default function BottleScene({
  product,
  interactive = false,
  animate = true,
  frameloop = "always",
  label,
  glass = "high",
}: BottleSceneProps) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.15, 7.4], fov: 30 }}
      // Measure size from a debounced ResizeObserver only — never re-measure on
      // scroll. Scroll-driven re-measures (e.g. the mobile URL bar showing and
      // hiding) otherwise mis-size the canvas and zoom the bottle as you scroll.
      resize={{ scroll: false, debounce: { scroll: 0, resize: 60 } }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      {/* Low-key studio. Direct lights carry the opaque liquid and the brass
          cap so they stay rich, while the environment (below) is kept dark so
          the transmissive glass reads clear-through-dark, not milky. */}
      <ambientLight intensity={0.4} />
      <spotLight
        position={[5, 8, 6]}
        angle={0.4}
        penumbra={1}
        intensity={14}
        color={"#fff3dd"}
      />
      <spotLight
        position={[-6, 5, -5]}
        angle={0.5}
        penumbra={1}
        intensity={26}
        color={"#fdf6e9"}
      />
      <pointLight position={[-6, 2, -4]} intensity={8} color={"#e0b45c"} />

      {/* Dark surround so the clear glass transmits dark (not milky), with two
          tall bright strips the glass reflects as clean vertical highlights.
          Direct lights (above) carry the opaque liquid and brass cap. */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={0.16}
          position={[0, 0, -6]}
          scale={[16, 16, 1]}
          color={"#1b1713"}
        />
        <Lightformer
          form="rect"
          intensity={3}
          position={[2.6, 1.5, 4]}
          scale={[0.7, 8, 1]}
          color={"#fff6e6"}
        />
        <Lightformer
          form="rect"
          intensity={1.4}
          position={[-2.6, 1, 3.5]}
          scale={[0.45, 7, 1]}
          color={"#f6e7c8"}
        />
        <Lightformer
          form="rect"
          intensity={0.7}
          position={[-4, 0, 2]}
          scale={[2, 5, 1]}
          color={"#c8952f"}
        />
      </Environment>

      <Bottle
        product={product}
        interactive={interactive}
        animate={animate}
        label={label}
        glass={glass}
      />

      {/* Grounds the bottle — a soft pool of shadow beneath the glass. */}
      <ContactShadows
        position={[0, -1.61, 0]}
        opacity={0.55}
        scale={7}
        blur={2.6}
        far={3.2}
        color="#000000"
      />
    </Canvas>
  );
}
