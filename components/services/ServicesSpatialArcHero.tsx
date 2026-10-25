'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Service } from '@/types';
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Service3DVisual } from './Service3DVisuals';

interface ServicesSpatialArcHeroProps {
  services: Service[];
}

export function ServicesSpatialArcHero({ services }: ServicesSpatialArcHeroProps) {
  const [activeIndex, setActiveIndex] = useState(2); // Start centered (e.g. AI Filmmaking / Video Editing)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const nextCard = React.useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  }, [services.length]);

  const prevCard = React.useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  }, [services.length]);

  // Keyboard arrow controls for accessibility
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextCard();
      if (e.key === 'ArrowLeft') prevCard();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nextCard, prevCard]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden pt-12 pb-20 select-none"
    >
      {/* Editorial Headline Block */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-14 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-[#C6FF3D]/30 text-xs font-mono text-[#C6FF3D] uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(198,255,61,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C6FF3D]" />
          <span>CAPABILITIES ARCHITECTURE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight mb-6 leading-none"
        >
          06 SERVICES. <span className="text-[#C6FF3D]">ONE VISION.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed"
        >
          From ideas to impact — we create, manage and grow your brand through creativity and technology.
        </motion.p>
      </div>

      {/* 3D Spatial Arc Composition Container */}
      <div
        className="relative h-[420px] sm:h-[480px] w-full max-w-6xl mx-auto flex items-center justify-center"
        style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
      >
        {/* Subtle Spatial Ring Orbit in the background */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
          style={{
            transform: `rotateX(65deg) translateZ(-60px) rotate(${mouseOffset.x * 20}deg)`,
            transition: 'transform 0.4s ease-out',
          }}
        >
          <div className="w-[700px] h-[700px] rounded-full border border-dashed border-[#C6FF3D]/60" />
          <div className="w-[900px] h-[900px] rounded-full border border-white/20 absolute" />
        </div>

        {/* Floating Service Cards in 3D Arc */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transform: `rotateY(${mouseOffset.x * 12}deg) rotateX(${-mouseOffset.y * 10}deg)`,
            transition: 'transform 0.25s ease-out',
            transformStyle: 'preserve-3d',
          }}
        >
          {services.map((service, index) => {
            // Calculate spatial offset relative to activeIndex
            const offset = (index - activeIndex + services.length) % services.length;
            // Normalize offset around center: e.g. -2, -1, 0, 1, 2
            const normalizedOffset = offset > services.length / 2 ? offset - services.length : offset;

            const isCenter = normalizedOffset === 0;
            const isVisible = Math.abs(normalizedOffset) <= 2;

            if (!isVisible) return null;

            // Compute 3D translation & rotation for natural spatial arc
            const translateX = normalizedOffset * 220; // horizontal separation
            const translateZ = isCenter ? 60 : -Math.abs(normalizedOffset) * 120; // depth arc
            const rotateY = normalizedOffset * -16; // curvature tilt
            const scale = isCenter ? 1.05 : 0.88 - Math.abs(normalizedOffset) * 0.08;
            const opacity = isCenter ? 1 : 0.65 - Math.abs(normalizedOffset) * 0.15;

            return (
              <motion.div
                key={service.id}
                onClick={() => setActiveIndex(index)}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                className={`absolute w-72 sm:w-80 rounded-3xl p-5 bg-gradient-to-b from-neutral-900/95 via-neutral-950 to-black border cursor-pointer backdrop-blur-xl transition-colors duration-300 ${
                  isCenter
                    ? 'border-[#C6FF3D] shadow-[0_20px_60px_rgba(198,255,61,0.25)] z-30'
                    : 'border-white/10 hover:border-white/30 z-10'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-[#C6FF3D] font-bold">
                    0{index + 1} · {service.slug.replace('-', ' ').toUpperCase()}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      isCenter ? 'bg-[#C6FF3D] text-black font-bold' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 3D Visual Centerpiece */}
                <div className="h-36 rounded-xl overflow-hidden mb-3 border border-white/5">
                  <Service3DVisual slug={service.slug} isHovered={isCenter} className="h-full scale-90" />
                </div>

                {/* Card Title & Link */}
                <h3 className="text-lg font-bold text-white mb-1.5 truncate">
                  {service.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 mb-3">
                  {service.shortDescription}
                </p>

                {isCenter ? (
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center justify-center w-full py-2 rounded-xl bg-[#C6FF3D] text-black font-mono text-xs font-bold hover:bg-[#b2eb2d] transition-colors"
                  >
                    Explore Service →
                  </Link>
                ) : (
                  <div className="text-[11px] font-mono text-neutral-500 text-center">
                    Click to Focus
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Arc Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-6 z-20 relative">
        <button
          type="button"
          onClick={prevCard}
          aria-label="Previous service card"
          className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 hover:border-[#C6FF3D] text-white hover:text-[#C6FF3D] flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5">
          {services.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to service ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeIndex === idx ? 'w-8 bg-[#C6FF3D]' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextCard}
          aria-label="Next service card"
          className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 hover:border-[#C6FF3D] text-white hover:text-[#C6FF3D] flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
