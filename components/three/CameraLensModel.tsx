'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraLensModelProps {
  pointer: { x: number; y: number };
}

export function CameraLensModel({ pointer }: CameraLensModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const barrelRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth pointer damping
    const targetRotX = pointer.y * 0.35;
    const targetRotY = pointer.x * 0.45;

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      3.5,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY + state.clock.getElapsedTime() * 0.05,
      3.5,
      delta
    );

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Main Lens Barrel */}
      <mesh ref={barrelRef} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.2, 2.3, 3.2, 48]} />
        <meshStandardMaterial
          color="#0f0f11"
          metalness={0.88}
          roughness={0.25}
        />
      </mesh>

      {/* Front Filter Ring (Accent Neon Lime Bezel) */}
      <mesh position={[0, 0, 1.62]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.22, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#C6FF3D"
          emissive="#C6FF3D"
          emissiveIntensity={0.65}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Knurled Focus Grip Ribs */}
      <mesh position={[0, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.35, 2.35, 1.0, 32]} />
        <meshStandardMaterial
          color="#18181c"
          metalness={0.7}
          roughness={0.5}
          wireframe={true}
        />
      </mesh>

      {/* Distance Scale Ring */}
      <mesh ref={ringRef} position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.28, 2.28, 0.5, 48]} />
        <meshStandardMaterial
          color="#121214"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Primary Optical Front Element (Convex Curved Glass with Anti-Reflective Coating) */}
      <mesh position={[0, 0, 1.45]}>
        <sphereGeometry args={[2.1, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.32]} />
        <meshPhysicalMaterial
          color="#10252b"
          metalness={0.1}
          roughness={0.05}
          transmission={0.85}
          thickness={1.5}
          ior={1.62}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          reflectivity={0.9}
        />
      </mesh>

      {/* Internal Iris / Aperture Ring */}
      <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 1.8, 36]} />
        <meshStandardMaterial
          color="#080809"
          metalness={0.95}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Internal Core Optical Glass (Emerald / Cyan Multi-coat) */}
      <mesh position={[0, 0, 0.4]}>
        <sphereGeometry args={[1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.25]} />
        <meshPhysicalMaterial
          color="#063228"
          metalness={0.05}
          roughness={0.05}
          transmission={0.9}
          thickness={0.8}
          ior={1.5}
        />
      </mesh>

      {/* Rear Mount Flange (Chrome Plated Cine Mount) */}
      <mesh position={[0, 0, -1.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.7, 1.8, 0.4, 48]} />
        <meshStandardMaterial
          color="#b8b8b8"
          metalness={0.98}
          roughness={0.12}
        />
      </mesh>
    </group>
  );
}
