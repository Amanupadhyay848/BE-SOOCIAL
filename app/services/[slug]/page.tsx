import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CinematicProjectCard3D } from '@/components/work/CinematicProjectCard3D';
import { Card3D } from '@/components/ui/Card3D';
import { ServiceHero3DCenterpiece } from '@/components/services/detail/ServiceHero3DCenterpiece';
import { AIFilmmakingApplePlayer3D } from '@/components/services/ai-filmmaking/AIFilmmakingApplePlayer3D';
import { ServicePillarsInteractive } from '@/components/services/detail/ServicePillarsInteractive';
import { ServiceProcessTimeline3D } from '@/components/services/detail/ServiceProcessTimeline3D';
import { ServiceEnquiryForm } from '@/components/forms/ServiceEnquiryForm';
import { DETAILED_SERVICES_DATA } from '@/components/services/detail/ServiceDetailData';
import { getServiceBySlug, getProjects, getServices } from '@/lib/data/repository';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { ArrowLeft, CheckCircle2, ArrowRight, Sparkles, Shield, Clock, Layers } from 'lucide-react';

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  const detail = DETAILED_SERVICES_DATA[slug];

  if (!service) {
    return { title: 'Service Not Found | BE SOOCIAL' };
  }

  return {
    title: `${detail ? detail.heroHeadline : service.title} | BE SOOCIAL`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const detailConfig = DETAILED_SERVICES_DATA[slug] || DETAILED_SERVICES_DATA['brand-management'];
  const projects = await getProjects(service.slug);
  const allServices = await getServices();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black">
      <Header />

      <main className="flex-1 py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        {/* Subtle Ambient Radial Aura */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-[#C6FF3D]/5 rounded-full blur-[150px] pointer-events-none"
          aria-hidden="true"
        />

        {/* 1. Back to Services Navigation */}
        <div className="mb-6 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#C6FF3D] transition-colors py-1 px-3 rounded-lg bg-neutral-900/60 border border-white/5 hover:border-[#C6FF3D]/40 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All 06 Services</span>
          </Link>
        </div>

        {/* 2. Service-Specific Cinematic Hero with Animated 3D Centerpiece */}
        {service.slug === 'ai-filmmaking' ? (
          <AIFilmmakingApplePlayer3D
            headline={detailConfig.heroHeadline}
            subheadline={detailConfig.heroSubheadline}
            className="mb-16"
          />
        ) : (
          <ServiceHero3DCenterpiece
            slug={service.slug}
            title={service.title}
            headline={detailConfig.heroHeadline}
            subheadline={detailConfig.heroSubheadline}
            centerpieceDescription={detailConfig.centerpieceDescription}
          />
        )}

        {/* 3. Short Overview Explaining the Service */}
        <section className="mb-16 relative z-10">
          <ScrollReveal variant="fade-scale" duration={0.85}>
            <Card3D maxTilt={5} perspective={1200} liftZ={14}>
              <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/50 border border-white/10 backdrop-blur-xl shadow-2xl">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                  <div className="max-w-3xl">
                    <span className="text-xs font-mono text-[#C6FF3D] uppercase tracking-wider block mb-2">
                      DISCIPLINE OVERVIEW
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      {service.title}
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-4">
                      {service.longDescription}
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {detailConfig.overviewSummary}
                    </p>
                  </div>

                  {/* Live Discipline Stats Bar */}
                  {service.stats && (
                    <div className="flex flex-row lg:flex-col gap-4 p-5 rounded-2xl bg-neutral-950/80 border border-white/10 shrink-0 w-full lg:w-auto justify-around">
                      {service.stats.map((s, idx) => (
                        <div key={idx} className="text-center lg:text-left">
                          <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                            {s.value}
                          </div>
                          <div className="text-[10px] font-mono text-neutral-400 uppercase mt-0.5">
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card3D>
          </ScrollReveal>
        </section>

        {/* 4. Interactive Scope Architecture (What We Deliver) */}
        <ServicePillarsInteractive
          pillars={detailConfig.interactivePillars}
          disciplineTitle={service.title}
        />

        {/* 5. Our Creative Process (Animated Timeline) */}
        <ServiceProcessTimeline3D
          stages={detailConfig.processTimeline}
          serviceTitle={service.title}
        />

        {/* 6. Relevant Visual Gallery or Portfolio Examples */}
        {projects.length > 0 && (
          <section className="my-20 relative z-10">
            <SectionHeading
              number="PORTFOLIO"
              tagline="Discipline In Action"
              title={`Selected Work: ${service.title}`}
              description="Real productions created under this offering. Hover for 3D depth and live video preview playback."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((proj) => (
                <CinematicProjectCard3D key={proj.id} project={proj} />
              ))}
            </div>
          </section>
        )}

        {/* 7. Verified Benefits & Deliverables */}
        <section className="my-16 relative z-10">
          <div className="mb-8">
            <span className="text-xs font-mono text-[#C6FF3D] uppercase tracking-wider block mb-2">
              WHY BE SOOCIAL
            </span>
            <TextReveal
              text="Benefits & Delivery Standards"
              tag="h2"
              className="text-2xl sm:text-4xl font-bold text-white tracking-tight"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {detailConfig.verifiedBenefits.map((benefit, bIdx) => (
              <ScrollReveal key={bIdx} variant="perspective-rise" delay={bIdx * 0.12} duration={0.8}>
                <Card3D maxTilt={6} perspective={1000} liftZ={12} className="h-full">
                  <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-[#C6FF3D]/40 transition-colors backdrop-blur-md h-full space-y-3">
                    <div className="w-8 h-8 rounded-lg bg-[#C6FF3D]/10 flex items-center justify-center text-[#C6FF3D]">
                      <Shield className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-white">{benefit.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">{benefit.desc}</p>
                  </div>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 8 & 9. Dedicated Scoping CTA & Functional Enquiry Form */}
        <section className="my-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Start a Project Scoping Pitch */}
            <ScrollReveal variant="slide-left" duration={0.85} className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C6FF3D] uppercase tracking-widest px-3 py-1 rounded-full bg-neutral-900 border border-[#C6FF3D]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#C6FF3D]" />
                <span>COMMISSIONING PIPELINE</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                Ready to Commission {service.title}?
              </h2>

              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                Whether deploying a standalone creative sprint or integrating this capability into a holistic brand transformation, our directorial leads are ready to review your objectives.
              </p>

              {/* Quick Scoping Wizard Link */}
              <div className="p-6 rounded-2xl bg-neutral-950/80 border border-white/10 space-y-4">
                <div className="text-xs font-mono text-neutral-400">
                  Prefer a guided step-by-step budget scoping wizard?
                </div>
                <Link
                  href="/start-a-project"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-[#C6FF3D] text-neutral-200 hover:text-black text-xs font-mono font-bold transition-all border border-white/10 hover:border-[#C6FF3D] cursor-pointer"
                >
                  <span>Launch 4-Step Project Wizard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Right Column: Functional Project Enquiry Form with 3D Celebration */}
            <ScrollReveal variant="slide-right" duration={0.85} className="lg:col-span-7">
              <ServiceEnquiryForm
                serviceSlug={service.slug}
                serviceTitle={service.title}
                headline={`Commission ${service.title}`}
                subheadline={`Direct inquiry for ${service.title}. Guaranteed response within 24 hours.`}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* 10. Related Services Navigation */}
        <section className="pt-12 border-t border-white/[0.08] relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Explore Adjacent Agency Disciplines
            </h3>
            <Link
              href="/services"
              className="text-xs font-mono text-[#C6FF3D] hover:underline"
            >
              View All 06 Disciplines →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {allServices
              .filter((s) => s.slug !== service.slug)
              .slice(0, 3)
              .map((rel) => (
                <Link
                  key={rel.id}
                  href={`/services/${rel.slug}`}
                  className="p-5 rounded-2xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#C6FF3D] uppercase block mb-1">
                      DISCIPLINE
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#C6FF3D] transition-colors mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-neutral-400 line-clamp-2">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-neutral-400 group-hover:text-white flex items-center justify-between">
                    <span>View Scope</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
