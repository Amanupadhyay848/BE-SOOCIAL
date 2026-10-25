import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FrontPageCinematicHeroExperience } from '@/components/home/FrontPageCinematicHeroExperience';
import { HomeDisciplinesDiagonalReel } from '@/components/home/HomeDisciplinesDiagonalReel';
import { HomeFeaturedWorkDiagonalReel } from '@/components/home/HomeFeaturedWorkDiagonalReel';
import { InteractiveProcessTimeline3D } from '@/components/process/InteractiveProcessTimeline3D';
import { AgencyManifesto3D } from '@/components/about/AgencyManifesto3D';
import { ClosingCta3D } from '@/components/cta/ClosingCta3D';
import { Card3D } from '@/components/ui/Card3D';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getFeaturedProjects, getServices, getTestimonials, getFAQs } from '@/lib/data/repository';
import { Quote } from 'lucide-react';

export default async function HomePage() {
  const [featuredProjects, services, testimonials, faqs] = await Promise.all([
    getFeaturedProjects(),
    getServices(),
    getTestimonials(),
    getFAQs(null),
  ]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black relative">
      <Header />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION WITH APPLE-CHOREOGRAPHED ELEMENT-BY-ELEMENT ALIGNMENT
           ========================================================================= */}
        <FrontPageCinematicHeroExperience />

        {/* Ambient Continuous Depth Beam: Smooth bridge between Hero and Section 01 */}
        <div
          className="w-full h-px bg-gradient-to-r from-transparent via-[#C6FF3D]/25 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* =========================================================================
            2. SIX DISCIPLINES. ONE CREATIVE SYSTEM. (COMPACT DIAGONAL REEL)
           ========================================================================= */}
        <HomeDisciplinesDiagonalReel services={services} />

        {/* =========================================================================
            3. CURATED PORTFOLIO REEL (DIAGONAL PROJECT TICKETS: AI + NON-AI)
           ========================================================================= */}
        <HomeFeaturedWorkDiagonalReel featuredProjects={featuredProjects} />

        {/* =========================================================================
            4. CREATIVE PRODUCTION METHODOLOGY (3D TIMELINE)
           ========================================================================= */}
        <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] relative">
          <SectionHeading
            number="03"
            tagline="Production Framework"
            title="How We Deliver at 4x Traditional Velocity"
            description="Our end-to-end framework bridges directorial taste with neural workflows to eliminate bloated production timelines."
            align="center"
          />

          <ScrollReveal variant="fade-scale" duration={0.85}>
            <InteractiveProcessTimeline3D />
          </ScrollReveal>
        </section>

        {/* =========================================================================
            5. AGENCY INTRODUCTION & MANIFESTO 3D PREVIEW
           ========================================================================= */}
        <AgencyManifesto3D />

        {/* =========================================================================
            6. AUTHENTIC CLIENT TESTIMONIALS (3D PERSPECTIVE CARDS)
           ========================================================================= */}
        <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] relative">
          <SectionHeading
            number="04"
            tagline="Client Voices"
            title="Endorsements from Industry Leaders"
            description="We pride ourselves on transparent relationships with leaders across luxury, technology, and consumer brands."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {testimonials.map((t, idx) => (
              <ScrollReveal key={t.id} variant="perspective-rise" delay={idx * 0.12} duration={0.8}>
                <Card3D
                  maxTilt={8}
                  perspective={1000}
                  liftZ={16}
                  className="h-full"
                >
                  <div
                    className="h-full p-8 rounded-2xl bg-neutral-900/50 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors duration-300 flex flex-col justify-between backdrop-blur-sm shadow-xl"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div style={{ transform: 'translateZ(20px)' }}>
                      <div className="w-8 h-8 rounded-lg bg-neutral-800/80 flex items-center justify-center text-[#C6FF3D] mb-4 shadow-sm">
                        <Quote className="w-4 h-4" />
                      </div>
                      <blockquote className="text-sm md:text-base text-neutral-200 leading-relaxed mb-6 italic">
                        “{t.quote}”
                      </blockquote>
                    </div>

                    <div
                      className="pt-4 border-t border-white/[0.08] flex items-center gap-3"
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-xs text-[#C6FF3D] shadow-md">
                        {t.authorName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{t.authorName}</div>
                        <div className="text-xs text-neutral-400">
                          {t.role} · {t.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. FREQUENTLY ASKED QUESTIONS
           ========================================================================= */}
        <section className="py-16 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] relative">
          <SectionHeading
            number="05"
            tagline="Clarifications"
            title="Frequently Addressed Questions"
            align="center"
          />

          <ScrollReveal variant="fade-up" duration={0.8}>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group p-6 rounded-2xl bg-neutral-900/30 border border-white/[0.08] open:border-[#C6FF3D]/40 transition-all backdrop-blur-sm"
                >
                  <summary className="text-base font-semibold text-white cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{faq.question}</span>
                    <span className="text-[#C6FF3D] font-mono text-lg transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* =========================================================================
            8. CLOSING CONTACT CTA WITH SPATIAL CONSTELLATION BACKDROP
           ========================================================================= */}
        <ClosingCta3D />
      </main>

      <Footer />
    </div>
  );
}
