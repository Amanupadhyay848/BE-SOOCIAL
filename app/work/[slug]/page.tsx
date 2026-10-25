import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card3D } from '@/components/ui/Card3D';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getProjectBySlug, getProjects } from '@/lib/data/repository';
import { ArrowLeft, ArrowUpRight, Sparkles, Film, Disc } from 'lucide-react';
import { ProjectDetailMediaShowcase } from '@/components/work/ProjectDetailMediaShowcase';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const relatedProjects = allProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  const formattedNumber = project.number || '01';

  return (
    <div className="min-h-screen bg-[#070707] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black overflow-x-hidden">
      <Header />

      <main className="flex-1 py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        {/* Subtle Ambient Radial Aura */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C6FF3D]/5 rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Navigation Breadcrumb (In Same Tab) */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#C6FF3D] transition-colors mb-8 relative z-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Selected Work</span>
        </Link>

        {/* Header Block */}
        <header className="mb-12 relative z-10">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 mb-4">
            <span className="text-xl font-black text-[#C6FF3D] tabular-nums font-mono">
              {formattedNumber}
            </span>
            <span className="text-neutral-600">/</span>
            <span className="text-white font-semibold uppercase tracking-wider">
              {project.categoryLabel}
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400">{project.client}</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase max-w-5xl mb-6 leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
            {project.brief}
          </p>
        </header>

        {/* 1. Master Cinematic Video Player Showcase with Sound Control */}
        <div className="w-full mb-16 relative z-10">
          <ProjectDetailMediaShowcase
            videoUrl={project.videoUrl}
            coverUrl={project.coverUrl}
            poster={project.poster}
            title={project.title}
            aspectRatio={project.aspectRatio}
          />
        </div>

        {/* 2. Technical & Visual Highlights Strip */}
        <div className="mb-20 relative z-10">
          <Card3D maxTilt={4} perspective={1200} liftZ={10}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-white/[0.08] backdrop-blur-md shadow-2xl">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                  CATEGORY
                </span>
                <span className="text-xs sm:text-sm font-bold text-white uppercase">
                  {project.categoryLabel}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                  FORMAT & RATIO
                </span>
                <span className="text-xs sm:text-sm font-bold text-white font-mono uppercase">
                  {project.aspectRatio === '9/16'
                    ? '9:16 Vertical Reel'
                    : project.aspectRatio === '1/1'
                    ? '1:1 Square Frame'
                    : '16:9 Master 4K'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                  PRODUCTION YEAR
                </span>
                <span className="text-xs sm:text-sm font-bold text-white font-mono">
                  {project.year || '2026'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                  AUDIO SPECIFICATION
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#C6FF3D] font-mono uppercase">
                  Master Stereo / Atmos
                </span>
              </div>
            </div>
          </Card3D>
        </div>

        {/* 3. Deep Dive Editorial Narrative: THE IDEA -> THE APPROACH -> THE EXECUTION -> THE FINAL FILM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 relative z-10">
          <div className="lg:col-span-8 space-y-12">
            {/* 01. THE IDEA */}
            {project.theIdea && (
              <ScrollReveal variant="fade-scale" className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C6FF3D]">
                  <Film className="w-3.5 h-3.5" />
                  <span>01. The Idea</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Conceptual Genesis</h2>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {project.theIdea}
                </p>
              </ScrollReveal>
            )}

            {/* 02. THE APPROACH */}
            {project.theApproach && (
              <ScrollReveal variant="fade-scale" className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C6FF3D]">
                  <Disc className="w-3.5 h-3.5" />
                  <span>02. The Approach</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Directorial Strategy</h2>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {project.theApproach}
                </p>
              </ScrollReveal>
            )}

            {/* 03. THE EXECUTION */}
            {project.theExecution && (
              <ScrollReveal variant="fade-scale" className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C6FF3D]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>03. The Execution</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Craft & Suite Workflow</h2>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {project.theExecution}
                </p>
              </ScrollReveal>
            )}

            {/* 04. THE FINAL FILM */}
            {project.theFinalFilm && (
              <ScrollReveal variant="fade-scale" className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C6FF3D]">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>04. The Final Film</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Outcome & Cultural Resonance</h2>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {project.theFinalFilm}
                </p>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar: Production Credits & Studio Inquiry */}
          <aside className="lg:col-span-4 space-y-8">
            <Card3D maxTilt={6} perspective={1000} liftZ={12}>
              <div className="p-6 rounded-3xl bg-neutral-900/60 border border-white/[0.08] backdrop-blur-md shadow-xl">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 pb-3 border-b border-white/[0.08]">
                  Production Credits
                </h3>
                <dl className="space-y-3 text-xs">
                  {Object.entries(project.credits).map(([role, person]) => (
                    <div key={role} className="flex justify-between items-baseline gap-2">
                      <dt className="text-neutral-400 font-mono">{role}</dt>
                      <dd className="text-white font-medium text-right">{person}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Card3D>

            <Card3D maxTilt={6} perspective={1000} liftZ={12}>
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-[#C6FF3D]/30 text-center shadow-2xl">
                <div className="w-9 h-9 rounded-full bg-[#C6FF3D]/10 text-[#C6FF3D] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Have a Similar Vision?</h3>
                <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                  Commission our studio team for commercial filmmaking, motion design, or digital storytelling.
                </p>
                <Link
                  href="/start-a-project"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-[#C6FF3D] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b2eb2d] transition-all shadow-[0_0_20px_rgba(198,255,61,0.25)] active:scale-95 cursor-pointer"
                >
                  <span>Inquire on this Discipline</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card3D>
          </aside>
        </div>

        {/* 4. MORE WORK (Related Projects Section) */}
        {relatedProjects.length > 0 && (
          <section className="pt-16 border-t border-white/[0.08] mb-20 relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-[#C6FF3D] uppercase tracking-wider">
                  CONTINUE EXPLORING
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1">
                  MORE WORK
                </h2>
              </div>
              <Link
                href="/work"
                className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
              >
                View All Projects →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <Card3D key={rel.id} maxTilt={6} perspective={1000} liftZ={12} className="h-full">
                  <Link
                    href={`/work/${rel.slug}`}
                    className="group block h-full p-5 rounded-2xl bg-neutral-900/50 border border-white/[0.08] hover:border-[#C6FF3D]/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-950 border border-white/5 mb-4">
                        {rel.videoUrl && (
                          <video
                            src={rel.videoUrl}
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUpRight className="w-3 h-3 text-[#C6FF3D]" />
                        </div>
                      </div>

                      <div className="text-[10px] font-mono text-[#C6FF3D] uppercase tracking-wider mb-1">
                        {rel.categoryLabel}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#C6FF3D] transition-colors leading-snug">
                        {rel.title}
                      </h3>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span>{rel.year || '2026'}</span>
                      <span className="text-[#C6FF3D] group-hover:translate-x-0.5 transition-transform">
                        Explore Film →
                      </span>
                    </div>
                  </Link>
                </Card3D>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
