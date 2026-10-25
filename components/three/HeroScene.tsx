'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraLensModel } from './CameraLensModel';
import { FloatingFilmReels } from './FloatingFilmReels';

export function HeroScene() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize pointer between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointer({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#0A0A0A']} />
        <fog attach="fog" args={['#0A0A0A', 6, 16]} />

        {/* 3-Point Studio Lighting */}
        <ambientLight intensity={0.4} />

        {/* Key Light (Cool Studio White) */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          color="#ffffff"
        />

        {/* Fill Light (Soft Teal/Charcoal Ambient) */}
        <directionalLight
          position={[-6, -4, 3]}
          intensity={0.6}
          color="#103038"
        />

        {/* Rim Light (Sharp High-Contrast Neon Lime Reflection) */}
        <directionalLight
          position={[0, 5, -5]}
          intensity={2.2}
          color="#C6FF3D"
        />

        {/* Centerpiece Anamorphic Camera Lens */}
        <CameraLensModel pointer={pointer} />

        {/* Surrounding Floating Film Panels & Parallax Layers */}
        <FloatingFilmReels pointer={pointer} scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
