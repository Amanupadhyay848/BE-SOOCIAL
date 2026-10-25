'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Camera, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CreativeCameraCelebrationProps {
  onReset: () => void;
  clientName?: string;
}

export function CreativeCameraCelebration({ onReset, clientName }: CreativeCameraCelebrationProps) {
  const shouldReduceMotion = useReducedMotion();
  const [animationStage, setAnimationStage] = useState<'raise' | 'flash' | 'reveal'>('raise');

  useEffect(() => {
    // Stage 1: Camera raise
    const timer1 = setTimeout(() => {
      setAnimationStage('flash');

      // Trigger safe, restrained neon-lime particle burst
      if (!shouldReduceMotion) {
        try {
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.5 },
            colors: ['#C6FF3D', '#FFFFFF', '#1a1a1a'],
            ticks: 160,
            gravity: 1.1,
            scalar: 0.9,
          });
        } catch {
          // fallback gracefully if canvas-confetti is unavailable
        }
      }
    }, 450);

    // Stage 2: Reveal the polaroid & success details
    const timer2 = setTimeout(() => {
      setAnimationStage('reveal');
    }, 850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="relative w-full max-w-lg mx-auto py-8 px-4 text-center overflow-hidden">
      {/* Soft, photosensitive-safe luminous flash pulse */}
      {!shouldReduceMotion && animationStage === 'flash' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0] }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="absolute inset-0 bg-gradient-to-r from-[#C6FF3D]/20 via-white/40 to-[#C6FF3D]/20 pointer-events-none z-50 rounded-3xl"
        />
      )}

      {/* Stylized 3D Creative Character Raising Camera */}
      <div className="relative w-44 h-44 mx-auto mb-6 flex items-center justify-center">
        {/* Ambient Halo */}
        <motion.div
          animate={{
            scale: animationStage === 'reveal' ? [1, 1.15, 1] : 1,
            opacity: animationStage === 'reveal' ? 0.8 : 0.4,
          }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute inset-0 rounded-full bg-[#C6FF3D]/15 blur-2xl pointer-events-none"
        />

        {/* Character Illustration Container */}
        <motion.div
          animate={{
            y: animationStage === 'raise' ? 10 : 0,
            scale: animationStage === 'reveal' ? 1.05 : 1,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative z-10 w-36 h-36 rounded-3xl bg-neutral-900 border-2 border-white/10 flex flex-col items-center justify-center p-3 shadow-2xl overflow-hidden"
        >
          {/* Studio Headphones on Character */}
          <div className="w-24 h-6 border-t-2 border-l-2 border-r-2 border-neutral-400 rounded-t-full mb-1 flex justify-between px-1">
            <span className="w-2.5 h-3.5 bg-neutral-700 rounded-sm" />
            <span className="w-2.5 h-3.5 bg-neutral-700 rounded-sm" />
          </div>

          {/* Character Head & Eyes */}
          <div className="w-14 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center relative mb-1 border border-white/5">
            <div className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D]" />
            </div>
          </div>

          {/* Raised Camera Unit */}
          <motion.div
            animate={{
              y: animationStage === 'raise' ? 8 : -4,
              scale: animationStage === 'flash' ? 1.2 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="relative z-20 w-20 h-12 rounded-xl bg-neutral-950 border border-[#C6FF3D] flex items-center justify-between px-2 shadow-[0_0_20px_rgba(198,255,61,0.3)]"
          >
            {/* Lens Aperture */}
            <div className="w-7 h-7 rounded-full bg-neutral-900 border-2 border-[#C6FF3D] flex items-center justify-center relative">
              <div className="w-3 h-3 rounded-full bg-[#C6FF3D] animate-pulse" />
              <Sparkles className="w-3 h-3 text-white absolute -top-1 -right-1" />
            </div>
            {/* Shutter Button & Flash Lamp */}
            <div className="flex flex-col items-end gap-1">
              <span className="w-3 h-1.5 rounded bg-red-500" />
              <Camera className="w-3.5 h-3.5 text-neutral-400" />
            </div>
          </motion.div>
        </motion.div>

        {/* Floating miniature captured frames drifting outward */}
        {animationStage === 'reveal' && !shouldReduceMotion && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
              animate={{ opacity: 1, x: -60, y: -40, rotate: -15 }}
              transition={{ duration: 0.5 }}
              className="absolute z-30 w-10 h-7 rounded bg-neutral-950 border border-[#C6FF3D]/60 p-1 shadow-lg"
            >
              <div className="w-full h-full bg-[#C6FF3D]/20 rounded-sm flex items-center justify-center text-[6px] font-mono text-[#C6FF3D]">
                RAW
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
              animate={{ opacity: 1, x: 60, y: -35, rotate: 12 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute z-30 w-10 h-7 rounded bg-neutral-950 border border-white/40 p-1 shadow-lg"
            >
              <div className="w-full h-full bg-white/20 rounded-sm flex items-center justify-center text-[6px] font-mono text-white">
                4K
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Polaroid-Style Confirmation Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-4"
      >
        {/* Checkmark Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C6FF3D]/10 border border-[#C6FF3D]/40 text-[#C6FF3D] text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(198,255,61,0.2)]">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>BRIEF REGISTERED & VERIFIED</span>
        </div>

        {/* Exact Required Prompt Copy */}
        <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          PROJECT RECEIVED!
        </h3>

        <p className="text-sm sm:text-base text-neutral-300 max-w-md mx-auto leading-relaxed">
          {clientName ? `Thanks for reaching out, ${clientName}. ` : 'Thanks for reaching out. '}
          We&apos;ll review your brief and get back to you.
        </p>

        {/* Working Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#C6FF3D] text-black font-bold text-xs hover:bg-[#b2eb2d] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(198,255,61,0.25)] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-900 border border-white/10 hover:border-neutral-600 text-xs font-mono text-neutral-300 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Submit Another Enquiry</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
