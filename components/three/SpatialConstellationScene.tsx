'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ConstellationPointsProps {
  count?: number;
  pointer: { x: number; y: number };
}

// Deterministic pseudo-random generator for render purity
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9999.123) * 43758.5453;
  return x - Math.floor(x);
}

function ConstellationPoints({ count = 85, pointer }: ConstellationPointsProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Initialize positions and velocities with useMemo for pure rendering & frame mutability
  const initialData = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 16;
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 10;
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 10;

      vel[i * 3] = (pseudoRandom(i * 3 + 4) - 0.5) * 0.008;
      vel[i * 3 + 1] = (pseudoRandom(i * 3 + 5) - 0.5) * 0.008;
      vel[i * 3 + 2] = (pseudoRandom(i * 3 + 6) - 0.5) * 0.008;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  const velocitiesRef = useRef<Float32Array>(initialData.velocities);
  useEffect(() => {
    velocitiesRef.current = initialData.velocities;
  }, [initialData.velocities]);

  // Buffer geometry for dynamic connections
  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame(() => {
    if (!pointsRef.current || !velocitiesRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    const velocities = velocitiesRef.current;

    // Subtle drift + boundary bounce
    for (let i = 0; i < count; i++) {
      array[i * 3] += velocities[i * 3];
      array[i * 3 + 1] += velocities[i * 3 + 1];
      array[i * 3 + 2] += velocities[i * 3 + 2];

      if (Math.abs(array[i * 3]) > 8) velocities[i * 3] *= -1;
      if (Math.abs(array[i * 3 + 1]) > 5) velocities[i * 3 + 1] *= -1;
      if (Math.abs(array[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
    }
    posAttr.needsUpdate = true;

    // Pointer-responsive rotation
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      pointer.x * 0.25,
      0.05
    );
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      -pointer.y * 0.2,
      0.05
    );

    // Compute dynamic interconnecting lines
    if (linesRef.current) {
      const linePositions: number[] = [];
      const maxDistance = 3.2;

      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = array[i * 3] - array[j * 3];
          const dy = array[i * 3 + 1] - array[j * 3 + 1];
          const dz = array[i * 3 + 2] - array[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            linePositions.push(
              array[i * 3],
              array[i * 3 + 1],
              array[i * 3 + 2],
              array[j * 3],
              array[j * 3 + 1],
              array[j * 3 + 2]
            );
          }
        }
      }

      lineGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      linesRef.current.rotation.y = pointsRef.current.rotation.y;
      linesRef.current.rotation.x = pointsRef.current.rotation.x;
    }
  });

  return (
    <group>
      {/* 3D Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[initialData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#C6FF3D"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 3D Interconnect Lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#C6FF3D"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export function SpatialConstellationScene({ className = '' }: { className?: string }) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointer({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Intersection observer so it only renders when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ambientLight intensity={0.5} />
          <ConstellationPoints count={85} pointer={pointer} />
        </Canvas>
      )}
    </div>
  );
}
