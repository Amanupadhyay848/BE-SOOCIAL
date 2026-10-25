'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingFilmReelsProps {
  pointer: { x: number; y: number };
  scrollY: number;
}

export function FloatingFilmReels({ pointer, scrollY }: FloatingFilmReelsProps) {
  const containerRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!containerRef.current) return;
    // Scroll depth shift (Z dolly effect)
    const targetZ = scrollY * 0.003;
    const targetY = -scrollY * 0.002;

    containerRef.current.position.z = THREE.MathUtils.damp(
      containerRef.current.position.z,
      targetZ,
      2.5,
      delta
    );
    containerRef.current.position.y = THREE.MathUtils.damp(
      containerRef.current.position.y,
      targetY,
      2.5,
      delta
    );

    // Subtle opposite pointer drift
    containerRef.current.rotation.y = THREE.MathUtils.damp(
      containerRef.current.rotation.y,
      -pointer.x * 0.15,
      3,
      delta
    );
    containerRef.current.rotation.x = THREE.MathUtils.damp(
      containerRef.current.rotation.x,
      -pointer.y * 0.1,
      3,
      delta
    );
  });

  return (
    <group ref={containerRef}>
      {/* Floating 16:9 Screen Left Foreground */}
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.6}>
        <group position={[-4.5, 1.2, 1.2]} rotation={[0.08, 0.35, -0.05]}>
          <mesh>
            <planeGeometry args={[2.8, 1.6]} />
            <meshStandardMaterial
              color="#1a1c23"
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          {/* Border Frame */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(2.8, 1.6)]} />
            <lineBasicMaterial color="#C6FF3D" transparent opacity={0.7} />
          </lineSegments>
        </group>
      </Float>

      {/* Floating 9:16 Vertical Story Frame Right Foreground */}
      <Float speed={2.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <group position={[4.6, -0.6, 1.5]} rotation={[-0.1, -0.4, 0.08]}>
          <mesh>
            <planeGeometry args={[1.4, 2.5]} />
            <meshStandardMaterial
              color="#16171d"
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(1.4, 2.5)]} />
            <lineBasicMaterial color="#ffffff" transparent opacity={0.3} />
          </lineSegments>
        </group>
      </Float>

      {/* Floating Film Strip Top Right Mid-Depth */}
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
        <group position={[3.2, 2.8, -1.8]} rotation={[-0.2, -0.2, 0.25]}>
          <mesh>
            <planeGeometry args={[3.6, 1.0]} />
            <meshStandardMaterial
              color="#0d0e12"
              roughness={0.4}
              metalness={0.6}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(3.6, 1.0)]} />
            <lineBasicMaterial color="#C6FF3D" transparent opacity={0.4} />
          </lineSegments>
        </group>
      </Float>

      {/* Floating Cinematic Panel Deep Background Left */}
      <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.4}>
        <group position={[-3.8, -2.4, -2.5]} rotation={[0.15, 0.25, -0.1]}>
          <mesh>
            <planeGeometry args={[3.2, 1.8]} />
            <meshStandardMaterial
              color="#0a0b0e"
              roughness={0.5}
              metalness={0.5}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(3.2, 1.8)]} />
            <lineBasicMaterial color="#666677" transparent opacity={0.3} />
          </lineSegments>
        </group>
      </Float>
    </group>
  );
}
