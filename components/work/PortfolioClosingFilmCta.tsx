'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function PortfolioClosingFilmCta() {
  return (
    <section className="relative py-32 md:py-48 bg-[#050505] text-center overflow-hidden border-t border-white/[0.05]">
      {/* Cinematic End-Shot Atmosphere with Ultra-Subtle Neon Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[300px] md:h-[450px] bg-[#C6FF3D]/5 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Film Production Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-white/10 text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-8"
        >
          <Sparkles className="w-3 h-3 text-[#C6FF3D]" />
          <span>PRODUCTION CONSULTATION · Q3/Q4 2026</span>
        </motion.div>

        {/* Ending Cinematic Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-[1.05]"
          style={{ textWrap: 'balance' }}
        >
          HAVE SOMETHING
          <br />
          WORTH MAKING REAL?
        </motion.h2>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl sm:text-3xl md:text-4xl font-bold text-[#C6FF3D] tracking-tight mt-6 mb-12 uppercase"
        >
          LET&apos;S CREATE IT.
        </motion.p>

        {/* Final Master CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/start-a-project"
            className="group relative inline-flex items-center gap-3 px-9 py-5 rounded-2xl bg-[#C6FF3D] text-black font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-[#b2eb2d] shadow-[0_0_40px_rgba(198,255,61,0.3)] hover:shadow-[0_0_60px_rgba(198,255,61,0.55)] active:scale-95 cursor-pointer"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
