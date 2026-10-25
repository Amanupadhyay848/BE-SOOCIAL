'use client';

import React, { useState } from 'react';
import { Card3D } from '@/components/ui/Card3D';
import { Service3DVisual } from '../Service3DVisuals';
import { Sparkles, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ServiceHero3DCenterpieceProps {
  slug: string;
  title: string;
  headline: string;
  subheadline: string;
  centerpieceDescription: string;
}

export function ServiceHero3DCenterpiece({
  slug,
  title,
  headline,
  subheadline,
  centerpieceDescription,
}: ServiceHero3DCenterpieceProps) {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <div className="relative w-full mb-16 pt-4 pb-8">
      {/* Editorial Headline Block */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-[#C6FF3D]/30 text-xs font-mono text-[#C6FF3D] uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(198,255,61,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-[#C6FF3D]" />
          <span>DEDICATED DISCIPLINE · {title}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight mb-6 leading-none">
          {headline}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
          {subheadline}
        </p>
      </div>

      {/* 3D Animated Centerpiece Container */}
      <div className="max-w-4xl mx-auto px-4">
        <Card3D
          maxTilt={8}
          perspective={1200}
          liftZ={25}
          className="w-full"
        >
          <div
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            className={`relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-neutral-900/90 via-neutral-950 to-black border transition-all duration-500 shadow-2xl backdrop-blur-xl overflow-hidden ${
              isInteracting
                ? 'border-[#C6FF3D]/60 shadow-[0_20px_70px_rgba(198,255,61,0.25)]'
                : 'border-white/10'
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Top Toolbar */}
            <div
              className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-6 z-10"
              style={{ transform: 'translateZ(25px)' }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-ping" />
                <span className="text-[#C6FF3D] font-bold">3D SPATIAL SIMULATION</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>INTERACTIVE ENGINE</span>
              </div>
            </div>

            {/* Visual Centerpiece */}
            <div
              className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 border border-white/5 bg-black/40"
              style={{ transform: 'translateZ(35px)' }}
            >
              <Service3DVisual slug={slug} isHovered={isInteracting} className="h-full" />
            </div>

            {/* Description Caption */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400 pt-4 border-t border-white/[0.08]"
              style={{ transform: 'translateZ(20px)' }}
            >
              <p className="max-w-xl text-neutral-300 leading-relaxed text-[11px] sm:text-xs">
                {centerpieceDescription}
              </p>
              <span className="text-[#C6FF3D] font-bold whitespace-nowrap text-[11px]">
                MOVE CURSOR TO ROTATE IN 3D
              </span>
            </div>
          </div>
        </Card3D>
      </div>
    </div>
  );
}
