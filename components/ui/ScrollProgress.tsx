'use client';

import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.0001,
  });

  if (shouldReduceMotion) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none origin-left"
      aria-hidden="true"
    >
      <motion.div
        className="w-full h-full bg-gradient-to-r from-[#C6FF3D] via-[#e2ff85] to-[#C6FF3D] shadow-[0_0_10px_rgba(198,255,61,0.9),0_0_4px_rgba(198,255,61,0.6)]"
        style={{ scaleX }}
      />
    </div>
  );
}
