'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { AI_FILMMAKING_MEDIA } from '@/data/media';

export function PortfolioCinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Phase 1 to Phase 4: Scroll interpolation
  // Hero text slowly moves upward, scales slightly, and fades out
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -60]);
  const textScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [1, 0.85, 0.15]);

  // Phase 2 & 3: Background video slightly scales and shifts diagonally
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const bgX = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.22, 0.15, 0.05]);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-12 md:pb-16 overflow-hidden border-b border-white/[0.06] min-h-[58vh] md:min-h-[64vh]"
    >
      {/* 
        ========================================================================
        1. CINEMATIC VIDEO TEXTURE BACKGROUND (Actual Portfolio Media)
        Low opacity, autoplay, loop, muted, moving texture without overpowering
        ========================================================================
      */}
      <motion.div
        style={
          shouldReduceMotion
            ? { opacity: 0.18 }
            : {
                scale: bgScale,
                x: bgX,
                y: bgY,
                opacity: bgOpacity,
              }
        }
        className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform -z-10"
      >
        <video
          ref={videoRef}
          src={AI_FILMMAKING_MEDIA.hodSampleRender.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover filter blur-[2px] brightness-[0.65] contrast-[1.15]"
        />
      </motion.div>

      {/* 
        ========================================================================
        2. DARK CINEMATIC OVERLAYS & VIGNETTE
        Ensures perfect legibility of typography
        ========================================================================
      */}
      {/* Gradient Wash */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/95 via-[#0A0A0A]/75 to-[#0A0A0A] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.85) 75%, #0A0A0A 100%)',
        }}
        aria-hidden="true"
      />

      {/* Ambient Neon Lime Radial Light Source */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[850px] h-[280px] md:h-[400px] bg-[#C6FF3D]/5 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Faint Architectural Grid Lines */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] opacity-35 pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* 
        ========================================================================
        3. EDITORIAL HERO TYPOGRAPHY & NARRATIVE
        ========================================================================
      */}
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: textY,
                scale: textScale,
                opacity: textOpacity,
              }
        }
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center will-change-transform"
      >
        {/* Production Archive Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-white/10 text-[10px] font-mono tracking-widest text-[#C6FF3D] uppercase mb-5 backdrop-blur-md shadow-lg"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D] animate-ping" />
          <span>PRODUCTION ARCHIVE · 2026</span>
        </motion.div>

        {/* Selected Work Heading: Strong, Controlled, Monumental */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight leading-[0.95] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
        >
          SELECTED WORK
        </motion.h1>

        {/* Narrative Anchor */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl font-semibold text-neutral-100 mt-4 max-w-2xl leading-snug"
        >
          Ideas, brands and products — brought to life.
        </motion.p>

        {/* Concise Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm text-neutral-400 mt-2.5 max-w-lg leading-relaxed"
        >
          A curated body of neural cinema, brand motion design, SaaS storytelling, and performance creative engineered for cultural gravity.
        </motion.p>

        {/* Subtle Floating Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex items-center gap-2.5 text-neutral-400 text-[10px] font-mono tracking-widest uppercase"
        >
          <span>SCROLL TO ENTER REEL</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#C6FF3D]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
