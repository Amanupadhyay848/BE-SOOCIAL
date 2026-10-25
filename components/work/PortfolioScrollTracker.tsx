'use client';

import React from 'react';
import { motion } from 'motion/react';

interface PortfolioScrollTrackerProps {
  currentNumber: string;
  total: number;
  progressPercent: number; // 0 to 100
}

export function PortfolioScrollTracker({
  currentNumber = '01',
  total = 10,
  progressPercent = 0,
}: PortfolioScrollTrackerProps) {
  const totalFormatted = String(total).padStart(2, '0');

  return (
    <div
      className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-4 pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Current project number */}
      <div className="flex flex-col items-center">
        <motion.span
          key={currentNumber}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-mono font-bold text-[#C6FF3D] tracking-widest"
        >
          {currentNumber}
        </motion.span>
        <span className="text-[10px] font-mono text-neutral-600">/</span>
        <span className="text-[10px] font-mono text-neutral-500 tracking-wider">
          {totalFormatted}
        </span>
      </div>

      {/* Thin vertical progress track */}
      <div className="w-[1.5px] h-28 bg-white/10 rounded-full relative overflow-hidden">
        <motion.div
          style={{ height: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          className="w-full bg-[#C6FF3D] shadow-[0_0_10px_rgba(198,255,61,0.6)] rounded-full transition-all duration-150"
        />
      </div>

      <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 rotate-90 origin-center translate-y-3">
        REEL
      </span>
    </div>
  );
}
