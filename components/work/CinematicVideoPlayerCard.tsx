'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'motion/react';
import { Volume2, VolumeX, ArrowRight, Play, Sparkles } from 'lucide-react';
import { Project } from '@/types';

interface CinematicVideoPlayerCardProps {
  project: Project;
  index: number;
  isActiveVideo: boolean;
  onHoverVideo?: (isHovering: boolean, text?: string) => void;
  onVisibleChange?: (index: number, isIntersecting: boolean) => void;
}

export function CinematicVideoPlayerCard({
  project,
  index,
  isActiveVideo,
  onHoverVideo,
  onVisibleChange,
}: CinematicVideoPlayerCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [detectedRatio, setDetectedRatio] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const formattedNumber = project.number || String(index + 1).padStart(2, '0');

  // Compute initial numeric ratio from project data
  const defaultNumericRatio = useMemo(() => {
    if (project.width && project.height) {
      return project.width / project.height;
    }
    if (project.aspectRatio === '9/16') return 9 / 16;
    if (project.aspectRatio === '1/1') return 1;
    if (project.aspectRatio === '16/9') return 16 / 9;
    return 16 / 9;
  }, [project.aspectRatio, project.width, project.height]);

  const activeRatio = detectedRatio || defaultNumericRatio;
  const isVertical = activeRatio < 0.8;
  const isSquare = activeRatio >= 0.8 && activeRatio <= 1.15;
  const isWidescreen = activeRatio > 1.15;

  const isAI =
    project.category?.toLowerCase().includes('ai') ||
    project.categoryLabel?.toLowerCase().includes('ai') ||
    project.serviceSlug === 'ai-filmmaking';

  // Alternating layout rhythm: even = video left, odd = video right
  const isEven = index % 2 === 0;

  // Viewport intersection detection
  const isInView = useInView(cardRef, {
    amount: 0.25,
    margin: '-40px 0px -40px 0px',
  });

  useEffect(() => {
    onVisibleChange?.(index, isInView);
  }, [isInView, index, onVisibleChange]);

  // Video hover / active play management
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if ((isHovered || isActiveVideo) && isInView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoReady(true);
          })
          .catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isHovered, isActiveVideo, isInView]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverVideo?.(true, 'VIEW PROJECT');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverVideo?.(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsVideoReady(false);
    }
  };

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  // 4-pattern alternating directional scroll choreography as requested in prompt:
  // Project 01: LEFT → CENTER
  // Project 02: RIGHT → CENTER
  // Project 03: DIAGONAL LEFT → CENTER
  // Project 04: DIAGONAL RIGHT → CENTER
  // Project 05: LEFT → CENTER (repeats)
  const patternIndex = index % 4;
  let startX = 0;
  let startY = 32;
  let startRotate = 0;

  if (patternIndex === 0) {
    startX = -40; // LEFT → CENTER
    startY = 20;
    startRotate = 0;
  } else if (patternIndex === 1) {
    startX = 40; // RIGHT → CENTER
    startY = 20;
    startRotate = 0;
  } else if (patternIndex === 2) {
    startX = -36; // DIAGONAL LEFT → CENTER
    startY = 36;
    startRotate = -2;
  } else {
    startX = 36; // DIAGONAL RIGHT → CENTER
    startY = 36;
    startRotate = 2;
  }

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const scrollX = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [startX, 0, 0, -startX * 0.5]);
  const scrollY = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [startY, 0, 0, -startY * 0.6]);
  const scrollRotate = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [startRotate, 0, 0, -startRotate * 0.4]);
  const cardScale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.94, 1.0, 1.0, 0.95]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.55, 1.0, 1.0, 0.55]);

  const posterSrc =
    project.poster ||
    (project.coverUrl && !project.coverUrl.endsWith('.mp4') ? project.coverUrl : undefined);

  return (
    <article
      ref={cardRef}
      className="py-12 md:py-16 w-full border-b border-white/[0.06] last:border-b-0"
    >
      {/* 1. Subtle Project Section Divider with Index & Category */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-sm font-black text-[#C6FF3D] tracking-wider">
          {formattedNumber}
        </span>
        <div className="flex-1 h-px bg-white/[0.08]" />
        <div className="flex items-center gap-2">
          {isAI && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C6FF3D]/15 border border-[#C6FF3D]/30 text-[9px] font-mono font-bold text-[#C6FF3D]">
              <Sparkles className="w-2.5 h-2.5" />
              <span>AI & FILM</span>
            </span>
          )}
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
            {project.categoryLabel}
          </span>
        </div>
      </div>

      {/* 2. Motion Animated Card Wrapper */}
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                x: scrollX,
                y: scrollY,
                rotateZ: scrollRotate,
                scale: cardScale,
                opacity: cardOpacity,
              }
        }
        className="will-change-transform"
      >
        {/* 100% Clickable Card Container in Same Tab */}
        <Link
          href={`/work/${project.slug}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`group block rounded-2xl md:rounded-3xl p-5 md:p-8 bg-neutral-900/40 hover:bg-neutral-900/80 border transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(198,255,61,0.12)] backdrop-blur-md cursor-pointer overflow-hidden ${
            isInView ? 'border-white/[0.12]' : 'border-white/[0.06]'
          } hover:border-[#C6FF3D]/50`}
        >
          {/* Responsive 12-Column Master Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 
              ========================================================================
              MEDIA SHOWCASE STAGE (7 Columns)
              Preserves REAL video aspect ratio (16:9, 9:16 vertical, 1:1 square).
              Never stretched, never squashed, never awkwardly cropped!
              ========================================================================
            */}
            <div
              className={`w-full ${
                isEven ? 'lg:col-span-7 lg:order-1' : 'lg:col-span-7 lg:order-2'
              }`}
            >
              <div className="relative w-full min-h-[300px] md:h-[420px] rounded-xl md:rounded-2xl overflow-hidden bg-neutral-950/80 border border-white/[0.08] group-hover:border-[#C6FF3D]/40 transition-colors duration-300 shadow-2xl flex items-center justify-center p-2 sm:p-4">
                {/* Ambient Blurred Backlight for Vertical/Square Video Framing */}
                {(isVertical || isSquare) && (
                  <div
                    className="absolute inset-0 opacity-20 filter blur-2xl pointer-events-none scale-125 overflow-hidden"
                    aria-hidden="true"
                  >
                    {posterSrc ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={posterSrc}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#C6FF3D]/10" />
                    )}
                  </div>
                )}

                {/* Natural Ratio Stage: Video & Poster align with exact intrinsic geometry */}
                <div
                  className="relative max-h-full max-w-full overflow-hidden rounded-lg md:rounded-xl shadow-xl flex items-center justify-center bg-black"
                  style={{
                    aspectRatio: `${activeRatio}`,
                    height: isVertical ? '100%' : isSquare ? '90%' : 'auto',
                    width: isWidescreen ? '100%' : 'auto',
                  }}
                >
                  {/* Poster Image (Visible until video is ready, smooth crossfade) */}
                  {posterSrc && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={posterSrc}
                      alt={project.title}
                      className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-500 z-10 ${
                        isVideoReady && isPlaying ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                  )}

                  {/* Real Video Element */}
                  <video
                    ref={videoRef}
                    src={project.videoUrl}
                    poster={posterSrc}
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
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="w-full h-full object-contain pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />

                  {/* Subtle Cinematic Contrast Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none z-10" />

                  {/* Aspect Ratio Badge Top Left */}
                  <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold text-[#C6FF3D] uppercase tracking-wider">
                      {isVertical
                        ? '9:16 VERTICAL'
                        : isSquare
                        ? '1:1 SQUARE'
                        : '16:9 CINEMA'}
                    </span>
                  </div>

                  {/* Top Right: Sound Button & Preview Indicator */}
                  <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-2">
                    {isPlaying && (
                      <button
                        type="button"
                        onClick={handleSoundToggle}
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
                      <Play
                        className={`w-2.5 h-2.5 text-[#C6FF3D] ${
                          isPlaying ? 'animate-pulse' : ''
                        }`}
                      />
                      <span>{isPlaying ? 'PREVIEW' : 'HOVER'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 
              ========================================================================
              EDITORIAL PROJECT CONTENT (5 Columns)
              ========================================================================
            */}
            <div
              className={`flex flex-col justify-between ${
                isEven ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-5 lg:order-1'
              }`}
            >
              <div>
                {/* Category & Year */}
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                  <span className="text-[#C6FF3D] font-semibold">
                    {project.categoryLabel}
                  </span>
                  <span>·</span>
                  <span>{project.year || '2026'}</span>
                </div>

                {/* Project Title */}
                <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#C6FF3D] transition-colors duration-200 leading-tight mb-3">
                  {project.title}
                </h2>

                {/* Client Reference */}
                <div className="text-[11px] font-mono text-neutral-400 mb-4">
                  CLIENT: <span className="text-neutral-200 font-semibold">{project.client}</span>
                </div>

                {/* Concise Narrative Excerpt */}
                <p className="text-xs sm:text-sm text-neutral-300/90 leading-relaxed mb-6 line-clamp-3">
                  {project.brief}
                </p>
              </div>

              {/* Bottom Strip: Explore CTA */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#C6FF3D] group-hover:underline">
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                </span>

                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  MASTER REEL
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </article>
  );
}
