"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE } from "@/lib/motion";
import type { MousePos } from "@/hooks/useMousePosition";
import { blobFragmentShader, blobVertexShader } from "./shaders/blob";

type HeroBlobProps = {
  /** Pointer ref from `useMousePosition` — read every frame, never re-rendered. */
  pointer: React.RefObject<MousePos>;
};

const DAMP = 3.2;

export default function HeroBlob({ pointer }: HeroBlobProps) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const geometry = useRef<THREE.IcosahedronGeometry>(null);

  // Smoothed pointer target — the object eases toward it, it never jumps.
  const eased = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNoiseFreq: { value: 1.15 },
      uNoiseAmp: { value: 0.3 },
      uPointerAmp: { value: 0 },
      uPointer: { value: new THREE.Vector3(0, 0, 1) },
      uColorDeep: { value: new THREE.Color(PALETTE.coffeeBean) },
      uColorBase: { value: new THREE.Color(PALETTE.rosewood) },
      uColorGlow: { value: new THREE.Color(PALETTE.lemonChiffon) },
      uColorRim: { value: new THREE.Color(PALETTE.botticelli) },
      uOpacity: { value: 1 },
    }),
    []
  );

  // Explicit teardown: R3F disposes on unmount, but uniforms hold GPU-free
  // objects and we want the material gone deterministically either way.
  useEffect(() => {
    const mat = material.current;
    const geo = geometry.current;
    return () => {
      mat?.dispose();
      geo?.dispose();
    };
  }, []);

  useFrame((state, delta) => {
    // clamp delta so a backgrounded tab doesn't snap the animation forward
    const dt = Math.min(delta, 0.05);
    const p = pointer.current ?? { nx: 0, ny: 0 };

    // exponential smoothing, frame-rate independent
    const k = 1 - Math.exp(-DAMP * dt);
    eased.current.x += (p.nx - eased.current.x) * k;
    eased.current.y += (p.ny - eased.current.y) * k;

    const mat = material.current;
    if (mat) {
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      mat.uniforms.uPointer.value.set(eased.current.x * 1.6, -eased.current.y * 1.6, 1);
      // bulge grows with how far the cursor is from center
      const reach = Math.min(Math.hypot(eased.current.x, eased.current.y), 1);
      mat.uniforms.uPointerAmp.value = reach * 0.16;
    }

    const g = group.current;
    if (g) {
      // slow continuous rotation…
      g.rotation.y += dt * 0.12;
      g.rotation.z += dt * 0.03;
      // …plus a gentle tilt toward the cursor
      g.rotation.x = eased.current.y * 0.35;
      g.position.x = eased.current.x * 0.18;
      g.position.y = -eased.current.y * 0.12 + Math.sin(state.clock.elapsedTime * 0.5) * 0.06;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry ref={geometry} args={[1.35, 32]} />
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={blobVertexShader}
          fragmentShader={blobFragmentShader}
          transparent
        />
      </mesh>
    </group>
  );
}
