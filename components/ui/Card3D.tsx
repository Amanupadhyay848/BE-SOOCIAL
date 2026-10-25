'use client';

import React, { useRef, useState, ReactNode, CSSProperties } from 'react';
import { useReducedMotion } from 'motion/react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // Maximum rotation in degrees (default: 8)
  perspective?: number; // Perspective distance in px (default: 1200)
  glare?: boolean; // Enable specular light reflection (default: true)
  glareOpacity?: number; // Max glare opacity (default: 0.16)
  scaleOnHover?: number; // Card scale on hover (default: 1.02)
  liftZ?: number; // Card translation on Z axis on hover in px (default: 16)
  style?: CSSProperties;
  onClick?: () => void;
}

export function Card3D({
  children,
  className = '',
  maxTilt = 8,
  perspective = 1200,
  glare = true,
  glareOpacity = 0.16,
  scaleOnHover = 1.02,
  liftZ = 16,
  style = {},
  onClick,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    const rY = Number((normX * maxTilt).toFixed(2));
    const rX = Number((-normY * maxTilt).toFixed(2));

    setRotateX(rX);
    setRotateY(rY);

    if (glare) {
      setGlarePos({
        x: Math.round((x / rect.width) * 100),
        y: Math.round((y / rect.height) * 100),
        opacity: glareOpacity,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  // Mobile / tablet touch handling: gentle tilt on touch drag
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;
      setRotateX(Number((-normY * (maxTilt * 0.4)).toFixed(2)));
      setRotateY(Number((normX * (maxTilt * 0.4)).toFixed(2)));
      setIsHovered(true);
    }
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const transformStyle: CSSProperties = shouldReduceMotion
    ? { ...style }
    : {
        transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
          isHovered ? scaleOnHover : 1
        }, ${isHovered ? scaleOnHover : 1}, 1) translateZ(${isHovered ? liftZ : 0}px)`,
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)'
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
      style={transformStyle}
      className={`relative ${className}`}
    >
      {children}

      {/* Dynamic Specular Light Glare Layer */}
      {glare && !shouldReduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300"
          style={{ opacity: glarePos.opacity }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background: `radial-gradient(circle 380px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.18), rgba(198, 255, 61, 0.14) 35%, transparent 75%)`,
            }}
          />
        </div>
      )}
    </div>
  );
}
