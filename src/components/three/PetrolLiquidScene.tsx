"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight liquid sheen — flat plane, fragment-only motion, ~24fps demand loop.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAmp;
  uniform vec3 uPetrol;
  uniform vec3 uPetrolDeep;
  uniform vec3 uHighlight;
  uniform vec3 uSheen;

  float field(vec2 uv) {
    float t = uTime;
    float e = sin(uv.x * 2.8 + t * 0.32) * cos(uv.y * 2.2 - t * 0.24);
    e += 0.45 * sin((uv.x + uv.y) * 4.2 - t * 0.48);
    return e * uAmp;
  }

  void main() {
    vec2 uv = vUv;
    float e = field(uv);

    float eX = field(uv + vec2(0.012, 0.0));
    float eY = field(uv + vec2(0.0, 0.012));
    vec3 N = normalize(vec3(e - eX, e - eY, 0.4));

    vec3 L = normalize(vec3(-0.4, 0.5, 0.9));
    float ndl = max(dot(N, L), 0.0);
    float fresnel = pow(1.0 - max(N.z, 0.0), 2.4);
    float spec = pow(max(dot(reflect(-L, N), vec3(0.0, 0.0, 1.0)), 0.0), 36.0);

    float drift = 0.5 + 0.5 * sin(uv.x * 2.4 + uTime * 0.18);
    vec3 base = mix(uPetrolDeep, uPetrol, drift);
    base = mix(base, uSheen, fresnel * 0.45 + ndl * 0.15);
    vec3 col = base + uHighlight * (spec * 1.1 + fresnel * 0.2);

    float alpha = clamp(0.14 + fresnel * 0.5 + abs(e) * 0.9 + spec * 0.35, 0.1, 0.78);
    gl_FragColor = vec4(col, alpha);
  }
`;

function LiquidMesh({ animate }: { animate: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, invalidate } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: animate ? 0.85 : 0.2 },
      uPetrol: { value: new THREE.Color("#023047") },
      uPetrolDeep: { value: new THREE.Color("#011828") },
      uHighlight: { value: new THREE.Color("#e0b45c") },
      uSheen: { value: new THREE.Color("#1a8fc4") },
    }),
    [animate]
  );

  // Drive a low-rate demand loop instead of a continuous 60fps render.
  useEffect(() => {
    if (!animate) {
      invalidate();
      return;
    }
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now - last >= 1000 / 24) {
        last = now;
        invalidate();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, invalidate]);

  useFrame((state) => {
    const mat = matRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uAmp.value = animate ? 0.85 : 0.2;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function PetrolLiquidScene({ animate }: { animate: boolean }) {
  return (
    <Canvas
      className="!absolute inset-0 h-full w-full pointer-events-none"
      orthographic
      camera={{ position: [0, 0, 5], near: 0.1, far: 100 }}
      dpr={1}
      frameloop="demand"
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
        premultipliedAlpha: true,
        stencil: false,
        depth: false,
      }}
      onCreated={({ gl, invalidate }) => {
        gl.setClearColor(0x000000, 0);
        invalidate();
      }}
      style={{ background: "transparent" }}
    >
      <LiquidMesh animate={animate} />
    </Canvas>
  );
}
