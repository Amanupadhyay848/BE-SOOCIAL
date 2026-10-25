'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { Service } from '@/types';
import { Service3DVisual } from './Service3DVisuals';
import { ArrowRight, Layers, ArrowUpRight, Sparkles } from 'lucide-react';

interface CinematicServicesScrollShowcaseProps {
  services: Service[];
}

export function CinematicServicesScrollShowcase({ services }: CinematicServicesScrollShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Vertical scroll drives the overall sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    restDelta: 0.001,
  });

  // Calculate active index based on scroll progress for indicator highlights
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const count = services.length;
      const index = Math.min(Math.floor(latest * count), count - 1);
      setActiveIdx(Math.max(0, index));
    });
    return () => unsubscribe();
  }, [scrollYProgress, services.length]);

  return (
    <div className="w-full relative">
      {/* =========================================================================
          DESKTOP: Pinned Scroll-Controlled Multidirectional 3D Composition
          ========================================================================= */}
      <div
        ref={containerRef}
        className="hidden md:block relative h-[420vh] w-full"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-12 py-8">
          {/* Top Bar: Section Tagline & Progress Meter */}
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-30 pt-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-pulse shadow-[0_0_8px_#C6FF3D]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#C6FF3D] font-semibold">
                SCROLL SHOWCASE · 06 CORE DISCIPLINES
              </span>
            </div>

            {/* Quick-Jump Step Indicators */}
            <div className="flex items-center gap-2">
              {services.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    if (containerRef.current) {
                      const containerTop = containerRef.current.offsetTop;
                      const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
                      const targetScroll = containerTop + (i / (services.length - 1)) * containerHeight;
                      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                    }
                  }}
                  className={`group relative h-8 px-2.5 rounded-lg flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                    activeIdx === i
                      ? 'bg-neutral-900 border border-[#C6FF3D]/40 text-[#C6FF3D]'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                  aria-label={`Jump to service ${s.title}`}
                >
                  <span className="text-[11px] font-mono font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {activeIdx === i && (
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-white hidden lg:inline">
                      {s.title.split(' ')[0]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Center Stage: Multidirectional 3D Cards Horizon */}
          <div
            className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center"
            style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
          >
            {services.map((service, i) => {
              return (
                <DesktopService3DCard
                  key={service.id}
                  service={service}
                  index={i}
                  total={services.length}
                  progress={smoothProgress}
                  isActive={activeIdx === i}
                  isHovered={hoveredIdx === i}
                  onHover={(val) => setHoveredIdx(val ? i : null)}
                  reduceMotion={shouldReduceMotion || false}
                />
              );
            })}
          </div>

          {/* Bottom Bar: Ambient Scroll Hint & Indicator Strip */}
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-neutral-500 font-mono z-30 pb-4 border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{String(activeIdx + 1).padStart(2, '0')}</span>
              <span className="text-neutral-600">/</span>
              <span>{String(services.length).padStart(2, '0')}</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-300 uppercase tracking-wider font-semibold">
                {services[activeIdx]?.title}
              </span>
            </div>

            <div className="flex items-center gap-3 text-neutral-400">
              <span className="text-[11px] uppercase tracking-wider">Scroll vertically to navigate</span>
              <div className="w-16 h-1 bg-neutral-900 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-[#C6FF3D]"
                  style={{
                    width: `${((activeIdx + 1) / services.length) * 100}%`,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE: Clean Compact Vertical Composition (Section 35)
          ========================================================================= */}
      <div className="block md:hidden px-4 py-8 space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C6FF3D] uppercase tracking-widest mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>06 SPECIALIZED DISCIPLINES</span>
        </div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6">
          Creative Capabilities
        </h2>

        <div className="space-y-6">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-neutral-900/70 border border-white/10 relative overflow-hidden backdrop-blur-md space-y-4"
            >
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-lg font-black text-[#C6FF3D]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  {service.category || 'Discipline'}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-[#C6FF3D] font-mono leading-relaxed mb-3 font-semibold">
                  {service.punchyCopy || service.shortDescription}
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              {/* Service 3D Visual */}
              <div className="w-full py-1">
                <Service3DVisual slug={service.slug} isHovered={false} className="h-44" />
              </div>

              <div className="pt-2">
                <Link
                  href={`/services/${service.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#C6FF3D] text-white hover:text-black border border-white/10 hover:border-[#C6FF3D] text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Individual Desktop 3D Service Card driven by horizontal + diagonal scroll interpolation
 */
interface DesktopService3DCardProps {
  service: Service;
  index: number;
  total: number;
  progress: any;
  isActive: boolean;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  reduceMotion: boolean;
}

function DesktopService3DCard({
  service,
  index,
  total,
  progress,
  isActive,
  isHovered,
  onHover,
  reduceMotion,
}: DesktopService3DCardProps) {
  // Step center occurs at index / (total - 1)
  const centerStep = total > 1 ? index / (total - 1) : 0;
  const stepSpan = total > 1 ? 1 / (total - 1) : 1;

  // Calculate input ranges for motion transformations
  const pEnter = centerStep - stepSpan;
  const pCenter = centerStep;
  const pExit = centerStep + stepSpan;

  // Horizontal translation (Section 8: user scrolls vertically, cards move horizontally)
  // Diagonal translation (Section 10: x -> -120px, y -> -40px, rot -> -2deg on exit; +120px, +40px, +2deg on enter)
  const x = useTransform(
    progress,
    [pEnter, pCenter, pExit],
    reduceMotion ? [0, 0, 0] : [720, 0, -720]
  );

  const y = useTransform(
    progress,
    [pEnter, pCenter, pExit],
    reduceMotion ? [0, 0, 0] : [40, 0, -40]
  );

  const rotateZ = useTransform(
    progress,
    [pEnter, pCenter, pExit],
    reduceMotion ? [0, 0, 0] : [2.5, 0, -2.5]
  );

  const rotateY = useTransform(
    progress,
    [pEnter, pCenter, pExit],
    reduceMotion ? [0, 0, 0] : [-12, 0, 12]
  );

  const scale = useTransform(
    progress,
    [pEnter, pCenter, pExit],
    reduceMotion ? [0.95, 1, 0.95] : [0.88, 1, 0.88]
  );

  const opacity = useTransform(
    progress,
    [centerStep - stepSpan * 1.2, pCenter, centerStep + stepSpan * 1.2],
    [0.15, 1, 0.15]
  );

  const zIndex = useTransform(
    progress,
    [pEnter, pCenter, pExit],
    [index * 5, 50, (total - index) * 5]
  );

  const formattedNum = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        rotateZ,
        rotateY,
        opacity,
        zIndex,
        transformStyle: 'preserve-3d',
      }}
      className="absolute w-full max-w-[940px] pointer-events-auto"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div
        className={`relative rounded-3xl p-8 lg:p-10 bg-neutral-900/90 border transition-all duration-500 backdrop-blur-2xl shadow-2xl ${
          isActive
            ? 'border-[#C6FF3D]/40 shadow-[0_20px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(198,255,61,0.12)] ring-1 ring-[#C6FF3D]/20'
            : 'border-white/10 opacity-75'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          className={`absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#C6FF3D]/10 blur-3xl pointer-events-none transition-opacity duration-500 ${
            isActive ? 'opacity-100' : 'opacity-20'
          }`}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Editorial Information & CTA */}
          <div className="lg:col-span-6 space-y-5" style={{ transform: 'translateZ(24px)' }}>
            {/* Header: Service Number & Category */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black font-mono text-[#C6FF3D] tabular-nums">
                {formattedNum}
              </span>
              <span className="h-4 w-px bg-white/20" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                {service.category || 'Discipline'}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-tight">
              {service.title}
            </h3>

            {/* Concise Punchy Copy (Section 12) */}
            <p className="text-sm sm:text-base text-[#C6FF3D] font-mono leading-relaxed font-semibold">
              {service.punchyCopy || service.shortDescription}
            </p>

            {/* Concise Description */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light line-clamp-3">
              {service.shortDescription}
            </p>

            {/* Key Deliverables Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {service.deliverables.slice(0, 3).map((d, dIdx) => (
                <span
                  key={dIdx}
                  className="text-[10px] font-mono text-neutral-300 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Dedicated Action Button (Section 14: Same Browser Tab) */}
            <div className="pt-2">
              <Link
                href={`/services/${service.slug}`}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#C6FF3D] hover:bg-[#b2eb2d] text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_24px_rgba(198,255,61,0.25)] hover:shadow-[0_0_36px_rgba(198,255,61,0.45)] cursor-pointer"
              >
                <span>Explore Service</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: High-Fidelity 3D Visual Centerpiece */}
          <div
            className="lg:col-span-6 relative flex items-center justify-center"
            style={{ transform: 'translateZ(36px)' }}
          >
            <div className="w-full relative group">
              <Service3DVisual
                slug={service.slug}
                isHovered={isHovered || isActive}
                className="h-64 sm:h-72 lg:h-80 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
