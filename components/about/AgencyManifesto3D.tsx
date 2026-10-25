'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { Card3D } from '@/components/ui/Card3D';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight, Sparkles, Globe2, ShieldCheck, Zap } from 'lucide-react';

const DISCIPLINES = [
  'Brand Management & Visual Identity',
  'Commercial Video Editing & Sound Design',
  'Cinematic AI Filmmaking & Virtual Sets',
  'Headless Next.js & 3D WebGL Experiences',
  'Digital Marketing & Paid Media Engines',
  'High-Velocity AI UGC Ad Creatives',
];

export function AgencyManifesto3D() {
  return (
    <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] relative overflow-hidden">
      <SectionHeading
        number="PHILOSOPHY"
        tagline="Agency Manifesto"
        title="In an Era of Algorithmic Noise, We Engineer Cultural Gravity."
        description="We eliminate agency fragmentation by combining human directorial taste with state-of-the-art generative pipelines."
        align="center"
      />

      <div className="max-w-6xl mx-auto">
        <ScrollReveal variant="scale-settle" duration={0.95}>
          <Card3D
            maxTilt={6}
            perspective={1400}
            liftZ={20}
            className="rounded-3xl p-8 md:p-14 bg-gradient-to-br from-neutral-900/80 via-neutral-950 to-black border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-all duration-500 shadow-[0_30px_80px_rgba(0,0,0,0.8)] backdrop-blur-md relative overflow-hidden"
          >
            {/* Spatial Ambient Radial Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C6FF3D]/10 rounded-full blur-[100px] pointer-events-none"
              aria-hidden="true"
            />

            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Left Column: Editorial Statement */}
              <div className="lg:col-span-7 space-y-6" style={{ transform: 'translateZ(30px)' }}>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C6FF3D] px-3 py-1 rounded-full bg-black/60 border border-[#C6FF3D]/30 backdrop-blur-md shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6FF3D]" />
                  <span>DIRECTORIAL CRAFT + NEURAL VELOCITY</span>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.05]">
                  Ordinary content evaporates. <br />
                  <span className="text-[#C6FF3D]">We create work that commands attention.</span>
                </h3>

                <p className="text-sm md:text-base text-neutral-300 leading-relaxed max-w-xl">
                  BE SOOCIAL was founded on a singular conviction: creative media shouldn’t take six months of bureaucratic agency bloat. We unite world-class cinematographers, 3D engineers, and generative architects to build visual worlds at software speed.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-[#C6FF3D] hover:text-black transition-all shadow-lg active:scale-95"
                    >
                      <span>Explore Studio Manifesto</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                    >
                      <span>All Capabilities</span>
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Right Column: Layered 3D Capabilities Matrix */}
              <div
                className="lg:col-span-5 space-y-4"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="p-6 md:p-8 rounded-2xl bg-neutral-950/90 border border-white/10 shadow-2xl space-y-4">
                  <div className="text-xs font-mono uppercase text-[#C6FF3D] tracking-wider flex items-center justify-between">
                    <span>UNIFIED DISCIPLINES</span>
                    <Zap className="w-4 h-4" />
                  </div>

                  <div className="space-y-2.5">
                    {DISCIPLINES.map((discipline, dIdx) => (
                      <motion.div
                        key={dIdx}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + dIdx * 0.06 }}
                        className="p-3 rounded-xl bg-neutral-900/60 border border-white/5 flex items-center gap-3 hover:border-[#C6FF3D]/30 transition-all group"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#C6FF3D] group-hover:scale-125 transition-transform" />
                        <span className="text-xs font-semibold text-neutral-200 group-hover:text-white transition-colors">
                          {discipline}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-[#C6FF3D]" />
                      <span>NYC · LDN · TYO</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C6FF3D]" />
                      <span>Zero Slop Guarantee</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card3D>
        </ScrollReveal>
      </div>
    </section>
  );
}
