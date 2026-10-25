'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Card3D } from '@/components/ui/Card3D';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SpatialConstellationScene } from '@/components/three/SpatialConstellationScene';
import { ArrowRight, Mail, Sparkles, MessageSquare } from 'lucide-react';

export function ClosingCta3D() {
  return (
    <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      <ScrollReveal variant="perspective-rise" duration={0.95}>
        <div className="relative rounded-3xl p-10 md:p-20 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-[#C6FF3D]/30 overflow-hidden shadow-[0_0_90px_rgba(198,255,61,0.14)]">
          {/* Real 3D Spatial Constellation in the background */}
          <SpatialConstellationScene className="opacity-60" />

          {/* Ambient Top Glow */}
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C6FF3D]/15 rounded-full blur-[120px] pointer-events-none"
            aria-hidden="true"
          />

          {/* 3D Foreground Container */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <Card3D
              maxTilt={6}
              perspective={1200}
              liftZ={16}
              className="p-6 md:p-10 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md shadow-2xl"
            >
              <div style={{ transformStyle: 'preserve-3d' }}>
                <div
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#C6FF3D] tracking-widest uppercase mb-4 px-3 py-1 rounded-full bg-black/80 border border-[#C6FF3D]/30 shadow-md"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C6FF3D]" />
                  <span>LET’S CREATE GRAVITY</span>
                </div>

                <h2
                  className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-6 leading-tight"
                  style={{ textWrap: 'balance', transform: 'translateZ(35px)' }}
                >
                  HAVE A PROJECT <br className="hidden sm:block" />
                  <span className="text-[#C6FF3D]">IN MIND?</span>
                </h2>

                <p
                  className="text-sm md:text-base text-neutral-300 mb-10 max-w-xl mx-auto leading-relaxed"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  Whether commissioning a global commercial campaign or establishing an enterprise creative retainer, we engineer unmistakable brand authority.
                </p>

                <div
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                    <Link
                      href="/start-a-project"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-black bg-[#C6FF3D] hover:bg-[#b2eb2d] rounded-xl transition-all shadow-[0_0_35px_rgba(198,255,61,0.35)] hover:shadow-[0_0_45px_rgba(198,255,61,0.55)] cursor-pointer"
                    >
                      <span>Launch Project Wizard</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                    <Link
                      href="/contact"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 rounded-xl transition-all cursor-pointer shadow-lg"
                    >
                      <MessageSquare className="w-4 h-4 text-[#C6FF3D]" />
                      <span>Direct Studio Dialogue</span>
                    </Link>
                  </motion.div>
                </div>

                <div
                  className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-center gap-2 text-xs font-mono text-neutral-400"
                  style={{ transform: 'translateZ(15px)' }}
                >
                  <Mail className="w-3.5 h-3.5 text-[#C6FF3D]" />
                  <span>Or email direct:</span>
                  <a
                    href="mailto:Besoooocial@gmail.com"
                    className="text-white hover:text-[#C6FF3D] transition-colors font-medium underline"
                  >
                    Besoooocial@gmail.com
                  </a>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
