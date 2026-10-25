'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Project } from '@/types';
import { Card3D } from '@/components/ui/Card3D';
import { ArrowUpRight, Play, Eye } from 'lucide-react';

interface CinematicProjectCard3DProps {
  project: Project;
  featuredLayout?: boolean;
}

export function CinematicProjectCard3D({
  project,
  featuredLayout = false,
}: CinematicProjectCard3DProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseShift, setMouseShift] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.15 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (project.videoUrl && videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay may be restricted by browser policy
        });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseShift({ x: 0, y: 0 });
    if (project.videoUrl && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setMouseShift({ x, y });
  };

  const cinematicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 36, scale: 0.98 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 36, scale: 0.98 }
      }
      transition={{ duration: 0.85, ease: cinematicEase }}
      className="w-full"
    >
      <Card3D
        maxTilt={7}
        perspective={1200}
        liftZ={16}
        scaleOnHover={1.018}
        className="group block w-full"
      >
        <Link
          href={`/work/${project.slug}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className={`block rounded-2xl overflow-hidden bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/50 transition-colors duration-300 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.6)] group-hover:shadow-[0_20px_60px_rgba(198,255,61,0.14)] ${
            featuredLayout ? 'md:grid md:grid-cols-12 gap-8' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Layer 1: Media Showcase Container with Cinematic Mask Reveal */}
          <div
            className={`relative overflow-hidden bg-neutral-950 ${
              featuredLayout ? 'md:col-span-7 aspect-[16/10]' : 'aspect-[16/10]'
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Ambient Blurred Background to Fill Frame */}
            {project.coverUrl && !project.coverUrl.endsWith('.mp4') ? (
              <Image
                src={project.coverUrl}
                alt=""
                fill
                className="object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                aria-hidden="true"
              />
            ) : (
              <div className="absolute inset-0 bg-[#C6FF3D]/5 blur-2xl pointer-events-none" />
            )}

            {/* Media Canvas with Subtle Cursor Interpolation */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: isHovered ? 1.03 : 1,
                      x: mouseShift.x,
                      y: mouseShift.y,
                    }
              }
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              {project.videoUrl ? (
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  muted
                  loop
                  playsInline
                  className={`w-full h-full z-10 transition-transform duration-500 pointer-events-none ${
                    project.aspectRatio === '9/16' ? 'object-contain' : 'object-cover'
                  }`}
                />
              ) : project.coverUrl && !project.coverUrl.endsWith('.mp4') ? (
                <Image
                  src={project.coverUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                  className="object-contain z-10 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-500 font-mono text-xs">
                  {project.title}
                </div>
              )}
            </motion.div>

            {/* Cinematic Vignette & Ambient Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none transition-opacity duration-300 ${
                isHovered ? 'opacity-90' : 'opacity-75'
              }`}
            />

            {/* Aspect Ratio Badge */}
            {project.aspectRatio && (
              <div
                className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-[#C6FF3D] font-bold shadow-md"
                style={{ transform: 'translateZ(30px)' }}
              >
                {project.aspectRatio === '1/1'
                  ? '1:1 SQUARE'
                  : project.aspectRatio === '9/16'
                  ? '9:16 VERTICAL'
                  : '16:9 CINEMA'}
              </div>
            )}

            {/* 3D Floating Media Indicator Badge */}
            <div
              className="absolute top-4 right-4 flex items-center gap-2 transition-transform duration-300"
              style={{ transform: 'translateZ(30px)' }}
            >
              {project.videoUrl ? (
                <div className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-200 flex items-center gap-1.5 shadow-lg">
                  <Play className={`w-3 h-3 text-[#C6FF3D] ${isPlaying ? 'animate-pulse' : ''}`} />
                  <span>{isPlaying ? 'PREVIEWING' : 'VIDEO SHOWCASE'}</span>
                </div>
              ) : (
                <div className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-200 flex items-center gap-1.5 shadow-lg">
                  <Eye className="w-3 h-3 text-[#C6FF3D]" />
                  <span>CASE STUDY</span>
                </div>
              )}
            </div>
          </div>

          {/* Layer 2: Metadata & Detailed Content Strip */}
          <div
            className={`p-6 md:p-8 flex flex-col justify-between ${
              featuredLayout ? 'md:col-span-5 md:py-8 md:pr-8' : ''
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div style={{ transform: 'translateZ(25px)' }} className="transition-transform duration-300">
              {/* Unboxed Metadata Tagline */}
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono mb-3">
                <span className="font-semibold text-neutral-300">{project.client}</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="text-[#C6FF3D] font-mono">{project.categoryLabel}</span>
              </div>

              {/* Title with 3D Depth */}
              <h3
                className="text-xl md:text-2xl font-bold text-white group-hover:text-[#C6FF3D] transition-colors duration-300 leading-snug mb-3"
                style={{ transform: 'translateZ(15px)' }}
              >
                {project.title}
              </h3>

              {/* Brief Excerpt */}
              <p
                className="text-xs md:text-sm text-neutral-300/90 line-clamp-3 leading-relaxed mb-6"
                style={{ transform: 'translateZ(10px)' }}
              >
                {project.brief}
              </p>
            </div>

            {/* Layer 3: Quantified Metrics Bar & View Action */}
            <div
              className="pt-5 border-t border-white/[0.08] flex items-center justify-between transition-transform duration-300"
              style={{ transform: 'translateZ(35px)' }}
            >
              <div className="flex items-center gap-6">
                {project.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-base md:text-lg font-bold text-white font-mono tabular-nums">
                      {m.value}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="w-10 h-10 rounded-full border border-neutral-700 bg-neutral-800/80 flex items-center justify-center text-neutral-300 group-hover:text-black group-hover:bg-[#C6FF3D] group-hover:border-[#C6FF3D] transition-all duration-300 shadow-md">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </Link>
      </Card3D>
    </motion.div>
  );
}
