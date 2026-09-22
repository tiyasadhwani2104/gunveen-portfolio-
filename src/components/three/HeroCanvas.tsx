"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMousePosition } from "@/hooks/useMousePosition";
import HeroBlob from "./HeroBlob";

/**
 * The WebGL hero object. Always mounted through `HeroVisual`, which handles
 * the `next/dynamic` + reduced-motion / touch guards — never import directly.
 */
export default function HeroCanvas() {
  const pointer = useMousePosition();

  return (
    <Canvas
      // alpha so the rosewood page background shows through
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      style={{ pointerEvents: "none" }}
    >
      <HeroBlob pointer={pointer} />

      <EffectComposer>
        <Bloom
          intensity={1.15}
          luminanceThreshold={0.22}
          luminanceSmoothing={0.35}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
