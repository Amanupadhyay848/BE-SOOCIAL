import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CinematicServicesScrollShowcase } from '@/components/services/CinematicServicesScrollShowcase';
import { Card3D } from '@/components/ui/Card3D';
import { ClosingCta3D } from '@/components/cta/ClosingCta3D';
import { getServices } from '@/lib/data/repository';
import { ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata = {
  title: '06 Services. One Vision. | BE SOOCIAL',
  description:
    'From ideas to impact — we create, manage and grow your brand through creativity and technology. Explore our 6 core agency disciplines.',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black">
      <Header />

      <main className="flex-1 w-full relative">
        {/* Subtle Ambient Radial Aura */}
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C6FF3D]/5 rounded-full blur-[160px] pointer-events-none"
          aria-hidden="true"
        />

        {/* 1. Services Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-8 text-center relative z-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-[#C6FF3D]/30 text-xs font-mono text-[#C6FF3D] uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(198,255,61,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#C6FF3D]" />
            <span>06 SERVICES · ONE UNIFIED VISION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight mb-6 leading-none">
            ENGINEERED TO <span className="text-[#C6FF3D]">OUTPACE</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            From brand architecture to high-tempo video editing, neural filmmaking, and spatial engineering — every discipline operates under a singular creative standard.
          </p>
        </div>

        {/* 2. Scroll-Controlled Multidirectional 3D Services Showcase */}
        <CinematicServicesScrollShowcase services={services} />

        {/* 3. The BE SOOCIAL Advantage Strip */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 border-t border-white/[0.08]">
          <ScrollReveal variant="fade-scale" duration={0.85}>
            <Card3D maxTilt={5} perspective={1400} liftZ={15}>
              <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl grid grid-cols-1 md:grid-cols-3 gap-8 shadow-2xl">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 flex items-center justify-center text-[#C6FF3D]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">High Velocity Production</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    Generative pre-visualization and modular edit suites cut campaign turnaround from months to weeks without compromising fidelity.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 flex items-center justify-center text-[#C6FF3D]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Full Intellectual Property</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    Every asset, codebase, 3D model, token system, and audio stem delivered is 100% owned by your enterprise with zero recurring royalties.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 flex items-center justify-center text-[#C6FF3D]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Global Scalability</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    From localized social cutdowns to multi-currency 3D digital flagships, our outputs are tested across international viewing environments.
                  </p>
                </div>
              </div>
            </Card3D>
          </ScrollReveal>
        </section>

        {/* 4. Closing CTA */}
        <ClosingCta3D />
      </main>

      <Footer />
    </div>
  );
}
