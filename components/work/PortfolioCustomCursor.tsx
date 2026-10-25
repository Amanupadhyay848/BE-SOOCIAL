'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface PortfolioCustomCursorProps {
  cursorText?: string;
  isHoveringVideo?: boolean;
}

export function PortfolioCustomCursor({
  cursorText = 'VIEW PROJECT',
  isHoveringVideo = false,
}: PortfolioCustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth cinematic spring interpolation
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [rawX, rawY]);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: isHoveringVideo ? 1 : 0.85,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 pointer-events-none z-50 select-none hidden md:block [@media(pointer:coarse)]:hidden"
      aria-hidden="true"
    >
      {isHoveringVideo ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="px-4 py-2 rounded-full bg-black/85 border border-[#C6FF3D]/70 text-[#C6FF3D] backdrop-blur-md shadow-[0_0_25px_rgba(198,255,61,0.35)] flex items-center gap-2 whitespace-nowrap"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D] animate-ping" />
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase">
            {cursorText}
          </span>
        </motion.div>
      ) : (
        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      )}
    </motion.div>
  );
}
