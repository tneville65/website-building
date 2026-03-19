"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

function Particles() {
  const mesh = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const [positions, colors, sizes] = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const goldColor = new THREE.Color("#C9A84C");
    const goldBright = new THREE.Color("#FFE08A");
    const navyColor = new THREE.Color("#1a3a6e");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.0 + (Math.random() - 0.5) * 1.2;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const rand = Math.random();
      let col: THREE.Color;
      if (rand > 0.92) col = white;
      else if (rand > 0.75) col = goldBright;
      else if (rand > 0.5) col = goldColor;
      else col = navyColor;

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
      sizes[i] = rand > 0.92 ? 0.04 : 0.015 + Math.random() * 0.01;
    }
    return [positions, colors, sizes];
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.07 + mouse.x * 0.4;
    mesh.current.rotation.x = mouse.y * 0.25;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleGlobe() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 55 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#C9A84C" />
        <Particles />
        <EffectComposer>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.0008, 0.0008)}
            radialModulation={false}
            modulationOffset={0}
          />
          <Noise
            blendFunction={BlendFunction.SOFT_LIGHT}
            opacity={0.05}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
