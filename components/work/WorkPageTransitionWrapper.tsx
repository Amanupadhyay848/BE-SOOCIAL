'use client';

import React from 'react';
import { motion } from 'motion/react';

export function WorkPageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full relative"
    >
      {/* Subtle top lime transition line that dissolves */}
      <motion.div
        initial={{ opacity: 1, scaleX: 1 }}
        animate={{ opacity: 0, scaleX: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6FF3D] to-transparent z-[60] origin-center pointer-events-none"
      />
      {children}
    </motion.div>
  );
}
