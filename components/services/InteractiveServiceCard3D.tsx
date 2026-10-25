'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { Service } from '@/types';
import { Card3D } from '@/components/ui/Card3D';
import { Service3DVisual } from './Service3DVisuals';
import {
  Layers,
  Film,
  Sparkles,
  Code2,
  TrendingUp,
  Smartphone,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface InteractiveServiceCard3DProps {
  service: Service;
  index: number;
  isMarquee?: boolean;
}

const serviceIconMap: Record<string, React.ReactNode> = {
  'brand-management': <Layers className="w-5 h-5 text-[#C6FF3D]" />,
  'video-editing': <Film className="w-5 h-5 text-[#C6FF3D]" />,
  'ai-filmmaking': <Sparkles className="w-5 h-5 text-[#C6FF3D]" />,
  'website-development': <Code2 className="w-5 h-5 text-[#C6FF3D]" />,
  'digital-marketing': <TrendingUp className="w-5 h-5 text-[#C6FF3D]" />,
  'ai-ugc-ads': <Smartphone className="w-5 h-5 text-[#C6FF3D]" />,
};

export function InteractiveServiceCard3D({
  service,
  index,
  isMarquee = false,
}: InteractiveServiceCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.15 });

  const cinematicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 32, scale: 0.97 }
      }
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.12,
        ease: cinematicEase,
      }}
      className={`h-full ${isMarquee ? 'lg:col-span-2' : ''}`}
    >
      <Card3D
        maxTilt={10}
        perspective={1200}
        liftZ={20}
        scaleOnHover={1.02}
        className="group h-full"
      >
        <Link
          href={`/services/${service.slug}`}
          className="block h-full rounded-2xl p-7 md:p-8 bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/50 transition-colors duration-300 relative overflow-hidden backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_50px_rgba(198,255,61,0.14)] flex flex-col justify-between"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Layer: 3D Ambient Aura in background */}
          <div
            className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#C6FF3D]/5 group-hover:bg-[#C6FF3D]/15 blur-3xl transition-all duration-700 pointer-events-none"
            style={{ transform: 'translateZ(-10px)' }}
            aria-hidden="true"
          />

          {/* Layer: Top Header with Icon & Counter */}
          <div style={{ transform: 'translateZ(25px)' }} className="transition-transform duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-neutral-800/90 border border-neutral-700/80 group-hover:border-[#C6FF3D]/40 group-hover:bg-neutral-800 flex items-center justify-center transition-all duration-300 shadow-md">
                {serviceIconMap[service.slug] || <Layers className="w-5 h-5 text-[#C6FF3D]" />}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest px-2.5 py-1 rounded bg-black/40 border border-white/5 group-hover:border-[#C6FF3D]/30 transition-colors">
                  DISCIPLINE 0{index + 1}
                </span>
              </div>
            </div>

            {/* 3D Elevated Title */}
            <h3
              className="text-xl md:text-2xl font-bold text-white group-hover:text-[#C6FF3D] transition-colors duration-300 mb-3"
              style={{ transform: 'translateZ(18px)' }}
            >
              {service.title}
            </h3>

            {/* Description */}
            <p
              className="text-xs md:text-sm text-neutral-300/90 leading-relaxed mb-6"
              style={{ transform: 'translateZ(12px)' }}
            >
              {service.shortDescription}
            </p>

            {/* 3D Visual Centerpiece */}
            <div
              className="mb-5 h-36 rounded-xl overflow-hidden border border-white/5 transition-transform duration-300 group-hover:scale-[1.02]"
              style={{ transform: 'translateZ(24px)' }}
            >
              <Service3DVisual slug={service.slug} className="h-full scale-95" />
            </div>

            {/* Features Bullets */}
            <ul
              className="space-y-2.5 mb-8"
              style={{ transform: 'translateZ(20px)' }}
            >
              {service.features.slice(0, 3).map((feat, fIdx) => (
                <li
                  key={fIdx}
                  className="flex items-start gap-2.5 text-xs text-neutral-200 group-hover:text-white transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C6FF3D] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Layer: 3D Elevated Bottom Strip */}
          <div
            className="pt-5 border-t border-white/[0.08] flex items-center justify-between transition-transform duration-300"
            style={{ transform: 'translateZ(30px)' }}
          >
            <span className="text-xs font-mono font-semibold text-[#C6FF3D] group-hover:underline flex items-center gap-1.5">
              <span>Explore Discipline</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>

            {service.stats && service.stats[0] && (
              <span className="text-[11px] font-mono text-neutral-400 bg-neutral-950/80 px-2.5 py-1 rounded-md border border-white/5">
                {service.stats[0].label}:{' '}
                <strong className="text-white font-mono">{service.stats[0].value}</strong>
              </span>
            )}
          </div>
        </Link>
      </Card3D>
    </motion.div>
  );
}
