import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card3D } from '@/components/ui/Card3D';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SpatialConstellationScene } from '@/components/three/SpatialConstellationScene';
import { ArrowRight, Eye, Shield, Zap, Sparkles, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black">
      <Header />

      <main className="flex-1 py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        {/* Real 3D Spatial Constellation in the background */}
        <SpatialConstellationScene className="opacity-30" />

        {/* Hero Manifesto */}
        <div className="relative z-10 mb-16">
          <SectionHeading
            number="MANIFESTO"
            tagline="About BE SOOCIAL"
            title="We Exist to Create Unshakable Cultural Gravity"
            description="In an ocean of algorithmic mediocrity, ordinary brand content evaporates. We build visual worlds that command undivided human attention."
          />
        </div>

        {/* Core Principles Grid with 3D Depth & Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 relative z-10">
          <ScrollReveal variant="perspective-rise" delay={0.05} duration={0.8} className="h-full">
            <Card3D maxTilt={9} perspective={1000} liftZ={15} className="h-full">
              <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors backdrop-blur-md shadow-xl h-full flex flex-col justify-between">
                <div>
                  <Eye className="w-6 h-6 text-[#C6FF3D] mb-4" />
                  <h3 className="text-base font-bold text-white mb-2">Taste Precedes Tooling</h3>
                  <p className="text-xs text-neutral-300/90 leading-relaxed">
                    Anyone can push a prompt into an AI model. Only directors with refined taste and deep film literacy know which 24 frames belong in the cut.
                  </p>
                </div>
              </div>
            </Card3D>
          </ScrollReveal>

          <ScrollReveal variant="perspective-rise" delay={0.15} duration={0.8} className="h-full">
            <Card3D maxTilt={9} perspective={1000} liftZ={15} className="h-full">
              <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors backdrop-blur-md shadow-xl h-full flex flex-col justify-between">
                <div>
                  <Zap className="w-6 h-6 text-[#C6FF3D] mb-4" />
                  <h3 className="text-base font-bold text-white mb-2">Pacing is Currency</h3>
                  <p className="text-xs text-neutral-300/90 leading-relaxed">
                    Feeds reward immediate momentum. We treat the first 800ms of any commercial or video as sacred ground for retention and story setup.
                  </p>
                </div>
              </div>
            </Card3D>
          </ScrollReveal>

          <ScrollReveal variant="perspective-rise" delay={0.25} duration={0.8} className="h-full">
            <Card3D maxTilt={9} perspective={1000} liftZ={15} className="h-full">
              <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors backdrop-blur-md shadow-xl h-full flex flex-col justify-between">
                <div>
                  <Shield className="w-6 h-6 text-[#C6FF3D] mb-4" />
                  <h3 className="text-base font-bold text-white mb-2">Zero Slop Discipline</h3>
                  <p className="text-xs text-neutral-300/90 leading-relaxed">
                    No generic buzzwords, fake engagement vanity metrics, or low-effort filler. Every production is designed to endure as a genuine case study.
                  </p>
                </div>
              </div>
            </Card3D>
          </ScrollReveal>

          <ScrollReveal variant="perspective-rise" delay={0.35} duration={0.8} className="h-full">
            <Card3D maxTilt={9} perspective={1000} liftZ={15} className="h-full">
              <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors backdrop-blur-md shadow-xl h-full flex flex-col justify-between">
                <div>
                  <Sparkles className="w-6 h-6 text-[#C6FF3D] mb-4" />
                  <h3 className="text-base font-bold text-white mb-2">Engineering Parity</h3>
                  <p className="text-xs text-neutral-300/90 leading-relaxed">
                    Our web experiences are built with headless performance, 60fps 3D spatial WebGL, and microsecond latency to mirror our visual standards.
                  </p>
                </div>
              </div>
            </Card3D>
          </ScrollReveal>
        </div>

        {/* Studio Production Hub 3D Card with Scale Settle Reveal */}
        <ScrollReveal variant="scale-settle" duration={0.9} className="mb-16 relative z-10">
          <Card3D maxTilt={5} perspective={1400} liftZ={14}>
            <div className="p-10 md:p-14 rounded-3xl bg-neutral-950/90 border border-white/[0.08] shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-[#C6FF3D]/5 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C6FF3D] mb-6">
                <Globe className="w-4 h-4" />
                <span>STUDIO HEADQUARTERS & PRODUCTION HUB (INDIA)</span>
              </div>
              <div className="mb-8">
                <div className="text-2xl font-bold text-white mb-2">Kolar Road, Bhopal, Madhya Pradesh</div>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-xl">
                  Centralized creative production lab engineering high-velocity social commercials, AI filmmaking pipelines, and high-performance digital brand platforms across India.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-white/[0.08]">
                <div>
                  <div className="text-lg font-bold text-white mb-1">Post-Production Lab</div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    High-tempo editorial suite, DaVinci ACES color grading, kinetic typography, and surgical sound design.
                  </p>
                </div>
                <div>
                  <div className="text-lg font-bold text-white mb-1">AI Filmmaking Pipeline</div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Proprietary neural workflows, character consistency rigs, and cinematic prompt-to-screen worldbuilding.
                  </p>
                </div>
                <div>
                  <div className="text-lg font-bold text-white mb-1">Engineering & Growth</div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    60fps WebGL interfaces, Next.js architecture, and high-converting paid acquisition testing systems.
                  </p>
                </div>
              </div>
            </div>
          </Card3D>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal variant="fade-up" duration={0.7} className="text-center py-8 relative z-10">
          <Link
            href="/start-a-project"
            className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-black bg-[#C6FF3D] hover:bg-[#b2eb2d] rounded-xl transition-all shadow-[0_0_30px_rgba(198,255,61,0.25)] hover:shadow-[0_0_40px_rgba(198,255,61,0.45)] active:scale-95 cursor-pointer"
          >
            <span>Work with BE SOOCIAL</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
