'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'motion/react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Service } from '@/types';

interface DisciplineData {
  id: string;
  number: string;
  title: string;
  slug: string;
  route: string;
  shortDescription: string;
  video: string;
  poster?: string;
  categoryLabel: string;
  aspectRatio: string;
  isAI?: boolean;
}

import { PORTFOLIO_MEDIA, AI_FILMMAKING_MEDIA } from '@/data/media';

const DISCIPLINES: DisciplineData[] = [
  {
    id: 'srv-1',
    number: '01',
    title: 'Brand Management',
    slug: 'brand-management',
    route: '/services/brand-management',
    shortDescription: 'High-gravity visual identities, positioning, and cross-channel guidelines.',
    video: PORTFOLIO_MEDIA.starbucksBrandReveal.video,
    poster: PORTFOLIO_MEDIA.starbucksBrandReveal.poster,
    categoryLabel: 'Brand Identity',
    aspectRatio: '16/9',
  },
  {
    id: 'srv-2',
    number: '02',
    title: 'Short & Long-Form Video',
    slug: 'video-editing',
    route: '/services/video-editing',
    shortDescription: 'Cinematic narrative velocity, surgical cut pacing, and sound architecture.',
    video: PORTFOLIO_MEDIA.ultimateEditors.video,
    poster: PORTFOLIO_MEDIA.ultimateEditors.poster,
    categoryLabel: 'Post-Production',
    aspectRatio: '16/9',
  },
  {
    id: 'srv-3',
    number: '03',
    title: 'AI Filmmaking',
    slug: 'ai-filmmaking',
    route: '/services/ai-filmmaking',
    shortDescription: 'Photorealistic neural worlds, synthetic cinema, and virtual production.',
    video: AI_FILMMAKING_MEDIA.hodSampleRender.video,
    poster: AI_FILMMAKING_MEDIA.hodSampleRender.poster,
    categoryLabel: 'Neural Cinema',
    aspectRatio: '1/1',
    isAI: true,
  },
  {
    id: 'srv-4',
    number: '04',
    title: 'Website Development',
    slug: 'website-development',
    route: '/services/website-development',
    shortDescription: 'Interactive 3D WebGL experiences and responsive creative engineering.',
    video: PORTFOLIO_MEDIA.blinkpic.video,
    poster: PORTFOLIO_MEDIA.blinkpic.poster,
    categoryLabel: 'Creative Web',
    aspectRatio: '16/9',
  },
  {
    id: 'srv-5',
    number: '05',
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    route: '/services/digital-marketing',
    shortDescription: 'Paid media architecture, organic growth engines, and high-intent acquisition.',
    video: PORTFOLIO_MEDIA.livzo.video,
    poster: PORTFOLIO_MEDIA.livzo.poster,
    categoryLabel: 'Growth Engines',
    aspectRatio: '9/16',
  },
  {
    id: 'srv-6',
    number: '06',
    title: 'AI UGC Ads',
    slug: 'ai-ugc-ads',
    route: '/services/ai-ugc-ads',
    shortDescription: 'Performance-tuned synthetic creator batches, emotional hooks, and high-tempo direct response.',
    video: PORTFOLIO_MEDIA.breakingFinancialCycle.video,
    poster: PORTFOLIO_MEDIA.breakingFinancialCycle.poster,
    categoryLabel: 'Performance Creative',
    aspectRatio: '9/16',
    isAI: true,
  },
];

function DisciplineCard({
  item,
  index,
}: {
  item: DisciplineData;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking per card for the cinematic diagonal progression
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Reversible diagonal trajectory: alternates left / right
  const isEven = index % 2 === 0;
  const xOffset = isEven ? -20 : 20;

  const cardX = useTransform(scrollYProgress, [0, 0.5, 1], [xOffset, 0, -xOffset * 0.6]);
  const cardY = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -15]);
  const cardScale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.95, 1.0, 1.0, 0.95]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0.6, 1.0, 1.0, 0.6]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsVideoReady(true);
        })
        .catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsVideoReady(false);
    }
  };

  const isVertical = item.aspectRatio === '9/16';
  const isSquare = item.aspectRatio === '1/1';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={
        shouldReduceMotion
          ? undefined
          : {
              x: cardX,
              y: cardY,
              scale: cardScale,
              opacity: cardOpacity,
            }
      }
      className="will-change-transform"
    >
      <Link
        href={item.route}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative block h-full rounded-2xl p-5 md:p-6 bg-neutral-900/40 hover:bg-neutral-900/80 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_16px_45px_rgba(198,255,61,0.12)] hover:-translate-y-1.5 overflow-hidden backdrop-blur-md"
      >
        {/* Subtle Ambient Backlight Aura on Hover */}
        <div
          className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#C6FF3D]/10 blur-3xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* Card Header Strip: Index & Category */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#C6FF3D] tracking-wider">
              {item.number}
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-600" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              {item.categoryLabel}
            </span>
          </div>

          {item.isAI && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#C6FF3D]/15 border border-[#C6FF3D]/30 text-[9px] font-mono text-[#C6FF3D] font-bold">
              <Sparkles className="w-2.5 h-2.5" />
              <span>AI</span>
            </span>
          )}
        </div>

        {/* Video Thumbnail Centerpiece with Real Ratio Handling */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-950 border border-white/[0.06] mb-4 flex items-center justify-center">
          {/* Ambient Blurred Mirror for Vertical or Square Videos */}
          {(isVertical || isSquare) && item.poster && (
            <div
              className="absolute inset-0 opacity-25 filter blur-xl pointer-events-none scale-125"
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.poster} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Real Media Box */}
          <div
            className="relative h-full w-full flex items-center justify-center overflow-hidden"
          >
            {/* Poster fallback with smooth crossfade */}
            {item.poster && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={item.poster}
                alt={item.title}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 z-10 ${
                  isVertical || isSquare ? 'object-contain' : 'object-cover'
                } ${isVideoReady && isPlaying ? 'opacity-0' : 'opacity-100'}`}
              />
            )}

            <video
              ref={videoRef}
              src={item.video}
              poster={item.poster}
              muted
              loop
              playsInline
              preload="metadata"
              className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none ${
                isVertical || isSquare ? 'object-contain' : 'object-cover'
              }`}
            />
          </div>

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />

          {/* Video Preview Indicator */}
          <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono text-neutral-300">
            <Play className={`w-2.5 h-2.5 text-[#C6FF3D] ${isPlaying ? 'animate-pulse' : ''}`} />
            <span>{isPlaying ? 'PREVIEW' : 'HOVER'}</span>
          </div>
        </div>

        {/* Content: Title & Short 1-2 Line Description */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#C6FF3D] group-hover:translate-x-1 transition-all duration-200 mb-2">
              {item.title}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mb-5">
              {item.shortDescription}
            </p>
          </div>

          {/* Small CTA Strip: 100% Clickable Link feedback */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono font-medium text-neutral-300 group-hover:text-[#C6FF3D] transition-colors">
            <span>Explore Discipline</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function HomeDisciplinesDiagonalReel({
  services,
}: {
  services?: Service[];
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.25 });

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] relative">
      {/* Subtle Ambient Radial Aura crossing boundary */}
      <div
        className="absolute -top-24 right-1/4 w-[450px] h-[260px] bg-[#C6FF3D]/5 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Progressive Scroll Reveal Section Header */}
      <div ref={headerRef} className="mb-12 max-w-3xl">
        {/* 1. Small Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C6FF3D] mb-3"
        >
          <span>01</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D]" />
          <span>Core Capabilities</span>
        </motion.div>

        {/* 2. Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4"
        >
          Six Disciplines. <span className="text-[#C6FF3D]">One Creative System.</span>
        </motion.h2>

        {/* 3. Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-2xl"
        >
          We eliminate agency fragmentation by integrating brand strategy, post-production, neural filmmaking, and digital engineering under a singular standard.
        </motion.p>
      </div>

      {/* Compact Diagonal Ticket Track: 3 Columns Desktop, 2 Columns Tablet, 1 Column Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {DISCIPLINES.map((item, index) => (
          <DisciplineCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
