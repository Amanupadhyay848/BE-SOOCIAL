'use client';

import React, { useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight, Play, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { Project } from '@/types';

interface FeaturedTicket {
  id: string;
  number: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  brief: string;
  video: string;
  poster: string;
  aspectRatio: '16/9' | '9/16' | '1/1';
  width: number;
  height: number;
  isAI?: boolean;
}

import { PORTFOLIO_MEDIA, AI_FILMMAKING_MEDIA } from '@/data/media';

// Curated according to exact specification:
// 1. Strongest AI filmmaking project (me-vs-dooms)
// 2. Strong commercial / brand film (starbucks-brand-reveal)
// 3. Another AI cinematic project (hod-sample-render)
// 4. Product / SaaS film (blinkpic)
// 5. Brand motion (ultimate-editors)
// 6. Other relevant work (breaking-financial-cycle)
const FEATURED_TICKETS: FeaturedTicket[] = [
  {
    id: 't-1',
    number: '01',
    slug: 'me-vs-dooms',
    title: 'Violet — Cyberpunk Story',
    category: 'AI & Film',
    client: 'BE SOOCIAL Neural Lab',
    brief: 'High-fidelity cinematic worldbuilding with neural lighting and synthetic character consistency.',
    video: AI_FILMMAKING_MEDIA.meVsDooms.video,
    poster: AI_FILMMAKING_MEDIA.meVsDooms.poster,
    aspectRatio: '9/16',
    width: 1080,
    height: 1920,
    isAI: true,
  },
  {
    id: 't-2',
    number: '02',
    slug: 'starbucks-brand-reveal',
    title: 'Starbucks Brand Reveal',
    category: 'Brand & Motion',
    client: 'Heritage Mark Showcase',
    brief: 'Deconstructing iconic circular geometry through fluid vector easing and spatial logo SFX.',
    video: PORTFOLIO_MEDIA.starbucksBrandReveal.video,
    poster: PORTFOLIO_MEDIA.starbucksBrandReveal.poster,
    aspectRatio: '16/9',
    width: 1280,
    height: 720,
  },
  {
    id: 't-3',
    number: '03',
    slug: 'hod-sample-render',
    title: 'House of Dragons — Virtual Set',
    category: 'AI & Film',
    client: 'Fantasy Cinematic Universe',
    brief: 'Complex photorealistic dungeon architecture and ambient torchlight generated with ComfyUI.',
    video: AI_FILMMAKING_MEDIA.hodSampleRender.video,
    poster: AI_FILMMAKING_MEDIA.hodSampleRender.poster,
    aspectRatio: '1/1',
    width: 1080,
    height: 1080,
    isAI: true,
  },
  {
    id: 't-4',
    number: '04',
    slug: 'blinkpic',
    title: 'BlinkPic — Photography Platform',
    category: 'SaaS / Product',
    client: 'BlinkPic OS',
    brief: 'All-in-one photography studio operating system featuring AI face discovery and automated workflows.',
    video: PORTFOLIO_MEDIA.blinkpic.video,
    poster: PORTFOLIO_MEDIA.blinkpic.poster,
    aspectRatio: '16/9',
    width: 3840,
    height: 2160,
  },
  {
    id: 't-5',
    number: '05',
    slug: 'ultimate-editors',
    title: 'Ultimate Editors 2.0',
    category: 'Brand & Motion',
    client: 'Creator Community',
    brief: 'Surgical cut pacing, kinetic typography choreography, and multi-stem audio master mixing.',
    video: PORTFOLIO_MEDIA.ultimateEditors.video,
    poster: PORTFOLIO_MEDIA.ultimateEditors.poster,
    aspectRatio: '16/9',
    width: 3840,
    height: 2160,
  },
  {
    id: 't-6',
    number: '06',
    slug: 'breaking-financial-cycle',
    title: 'Breaking the Financial Cycle',
    category: 'Commercial',
    client: 'Financial Mindset',
    brief: 'Editorial pacing with low-key cinematography examining psychological spending loops.',
    video: PORTFOLIO_MEDIA.breakingFinancialCycle.video,
    poster: PORTFOLIO_MEDIA.breakingFinancialCycle.poster,
    aspectRatio: '9/16',
    width: 736,
    height: 1308,
  },
];

function ProjectTicketCard({
  ticket,
  index,
}: {
  ticket: FeaturedTicket;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [detectedRatio, setDetectedRatio] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking per ticket for continuous diagonal entrance, hold, and exit
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Alternating diagonal trajectory:
  // Even: enters ↘ (starts from -48px X, 60px Y, -3deg rotate) -> center & hold -> exits ↙ (+36px X, -50px Y)
  // Odd: enters ↙ (starts from +48px X, 60px Y, +3deg rotate) -> center & hold -> exits ↘ (-36px X, -50px Y)
  const isOdd = index % 2 !== 0;
  const initialX = isOdd ? 48 : -48;
  const initialRotate = isOdd ? 3 : -3;

  const cardX = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [initialX, 0, 0, -initialX * 0.6]);
  const cardY = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [60, 0, 0, -50]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [initialRotate, 0, 0, -initialRotate * 0.5]);
  const cardScale = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [0.93, 1.0, 1.0, 0.94]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.55, 1.0, 1.0, 0.55]);

  const numericRatio = useMemo(() => {
    if (detectedRatio) return detectedRatio;
    if (ticket.aspectRatio === '9/16') return 9 / 16;
    if (ticket.aspectRatio === '1/1') return 1;
    return 16 / 9;
  }, [detectedRatio, ticket.aspectRatio]);

  const isVertical = numericRatio < 0.8;
  const isSquare = numericRatio >= 0.8 && numericRatio <= 1.15;
  const isWidescreen = numericRatio > 1.15;

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

  const toggleSound = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={
        shouldReduceMotion
          ? undefined
          : {
              x: cardX,
              y: cardY,
              rotateZ: cardRotate,
              scale: cardScale,
              opacity: cardOpacity,
            }
      }
      className="will-change-transform"
    >
      {/* 100% Clickable Card wrapped in Link in same browser tab */}
      <Link
        href={`/work/${ticket.slug}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative block rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-900/40 hover:bg-neutral-900/80 border border-white/[0.08] hover:border-[#C6FF3D]/50 transition-all duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.55)] hover:shadow-[0_20px_55px_rgba(198,255,61,0.14)] hover:-translate-y-1.5 backdrop-blur-md"
      >
        {/* Subtle Ambient Backlight Glow on Hover */}
        <div
          className={`absolute -top-24 -left-24 w-60 h-60 rounded-full bg-[#C6FF3D]/10 blur-3xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* 
          ========================================================================
          MEDIA SHOWCASE STAGE
          Preserves the REAL intrinsic video aspect ratio with clean letterboxing
          ========================================================================
        */}
        <div className="relative w-full h-[260px] sm:h-[300px] md:h-[340px] overflow-hidden bg-neutral-950 border-b border-white/[0.06] flex items-center justify-center p-3">
          {/* Ambient blurred reflection for vertical or square videos */}
          {(isVertical || isSquare) && ticket.poster && (
            <div
              className="absolute inset-0 opacity-20 filter blur-xl pointer-events-none scale-125"
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ticket.poster} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Real Media Frame */}
          <div
            className="relative max-h-full max-w-full overflow-hidden rounded-xl shadow-lg flex items-center justify-center bg-black"
            style={{
              aspectRatio: `${numericRatio}`,
              height: isVertical ? '100%' : isSquare ? '90%' : 'auto',
              width: isWidescreen ? '100%' : 'auto',
            }}
          >
            {/* Poster image visible until video ready */}
            {ticket.poster && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={ticket.poster}
                alt={ticket.title}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 z-10 ${
                  isVertical || isSquare ? 'object-contain' : 'object-cover'
                } ${isVideoReady && isPlaying ? 'opacity-0' : 'opacity-100'}`}
              />
            )}

            <video
              ref={videoRef}
              src={ticket.video}
              poster={ticket.poster}
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              onLoadedMetadata={(e) => {
                const { videoWidth, videoHeight } = e.currentTarget;
                if (videoWidth > 0 && videoHeight > 0) {
                  setDetectedRatio(videoWidth / videoHeight);
                }
              }}
              className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
            />
          </div>

          {/* Vignette & Contrast Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none z-10" />

          {/* Top Left: Category Badge & AI Flag */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold text-[#C6FF3D] uppercase tracking-wider">
              {ticket.category}
            </span>
            {ticket.isAI && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C6FF3D]/20 border border-[#C6FF3D]/40 text-[9px] font-mono text-[#C6FF3D] font-bold">
                <Sparkles className="w-2.5 h-2.5" />
                <span>AI FOCUS</span>
              </span>
            )}
          </div>

          {/* Top Right: Sound Button & Preview Indicator */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
            {isPlaying && (
              <button
                type="button"
                onClick={toggleSound}
                className="p-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title={isMuted ? 'Turn Sound On' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#C6FF3D]" />
                )}
              </button>
            )}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-neutral-300">
              <Play className={`w-2.5 h-2.5 text-[#C6FF3D] ${isPlaying ? 'animate-pulse' : ''}`} />
              <span>{isPlaying ? 'PREVIEW' : 'HOVER'}</span>
            </div>
          </div>

          {/* Bottom Left on Video: Project Ticket Number */}
          <div className="absolute bottom-3 left-3 z-20 font-mono text-xs font-bold text-white/90 drop-shadow">
            PRODUCTION TICKET {ticket.number}
          </div>
        </div>

        {/* Ticket Details Body */}
        <div className="p-5 md:p-6 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-neutral-400 mb-1.5">
              {ticket.client}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#C6FF3D] group-hover:translate-x-1 transition-all duration-200 mb-2">
              {ticket.title}
            </h3>
            <p className="text-xs text-neutral-300/80 leading-relaxed line-clamp-2 mb-4">
              {ticket.brief}
            </p>
          </div>

          {/* Small CTA Footer */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono font-medium text-neutral-300 group-hover:text-[#C6FF3D] transition-colors">
            <span>Explore Production</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function HomeFeaturedWorkDiagonalReel({
  featuredProjects,
}: {
  featuredProjects?: Project[];
}) {
  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] relative">
      {/* Ambient Left Aura */}
      <div
        className="absolute top-1/4 -left-32 w-[500px] h-[350px] bg-[#C6FF3D]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C6FF3D] mb-3">
            <span>02</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D]" />
            <span>Curated Portfolio Reel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-3">
            Selected Work. <span className="text-[#C6FF3D]">Cultural Gravity.</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">
            Real productions, verified case studies, and hybrid neural cinema engineered without compromise.
          </p>
        </div>

        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-xs md:text-sm font-mono font-semibold text-[#C6FF3D] hover:underline whitespace-nowrap self-start md:self-end"
        >
          <span>View Complete Archive</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Diagonal Project Tickets Track: 2 Columns on Desktop, 1 Column on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {FEATURED_TICKETS.map((ticket, index) => (
          <ProjectTicketCard key={ticket.id} ticket={ticket} index={index} />
        ))}
      </div>
    </section>
  );
}
