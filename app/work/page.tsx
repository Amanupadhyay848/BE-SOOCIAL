import React, { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PortfolioCinematicHero } from '@/components/work/PortfolioCinematicHero';
import { CategoryFilter } from '@/components/work/CategoryFilter';
import { CinematicPortfolioReel } from '@/components/work/CinematicPortfolioReel';
import { PortfolioClosingFilmCta } from '@/components/work/PortfolioClosingFilmCta';
import { WorkPageTransitionWrapper } from '@/components/work/WorkPageTransitionWrapper';
import { getProjects } from '@/lib/data/repository';

interface WorkPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams?.category;
  const projects = await getProjects(activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full relative">
        <WorkPageTransitionWrapper>
          {/* 1. Cinematic Scroll Hero: SELECTED WORK */}
          <PortfolioCinematicHero />

          {/* 2. Compact Sticky Category Filter Bar */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 flex justify-center sticky top-20 md:top-24 z-30 pointer-events-auto">
            <Suspense fallback={<div className="h-10 w-48 bg-neutral-900 rounded-xl animate-pulse" />}>
              <CategoryFilter />
            </Suspense>
          </div>

          {/* 3. Alternating Cinematic Film Reel (Consistent Max Width) */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
            <CinematicPortfolioReel
              projects={projects}
              activeCategory={activeCategory}
            />
          </div>

          {/* 4. Final Film Ending CTA */}
          <PortfolioClosingFilmCta />
        </WorkPageTransitionWrapper>
      </main>

      <Footer />
    </div>
  );
}
