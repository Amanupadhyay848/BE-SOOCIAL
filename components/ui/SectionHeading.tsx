'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { TextReveal } from './TextReveal';

interface SectionHeadingProps {
  number?: string;
  tagline?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  number,
  tagline,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();

  const cinematicEase = [0.16, 1, 0.3, 1] as const;

  if (shouldReduceMotion) {
    return (
      <div
        className={`mb-12 md:mb-16 ${
          isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'
        } ${className}`}
      >
        <div
          className={`flex items-center gap-2 text-xs font-mono text-neutral-400 mb-3 tracking-wider uppercase ${
            isCenter ? 'justify-center' : 'justify-start'
          }`}
        >
          {number && <span className="text-[#C6FF3D] font-semibold">{number}</span>}
          {number && tagline && <span aria-hidden="true">·</span>}
          {tagline && <span>{tagline}</span>}
        </div>

        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-tight"
          style={{ textWrap: 'balance' }}
        >
          {title}
        </h2>

        {description && (
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-xl">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mb-12 md:mb-16 ${
        isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'
      } ${className}`}
    >
      {/* Eyebrow Tagline & Step Number */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.6, ease: cinematicEase }}
        className={`flex items-center gap-2 text-xs font-mono text-neutral-400 mb-3 tracking-wider uppercase ${
          isCenter ? 'justify-center' : 'justify-start'
        }`}
      >
        {number && <span className="text-[#C6FF3D] font-semibold">{number}</span>}
        {number && tagline && <span aria-hidden="true">·</span>}
        {tagline && <span>{tagline}</span>}
      </motion.div>

      {/* Main Heading with Progressive Line/Word Mask Reveal */}
      <div className={`mb-4 ${isCenter ? 'flex justify-center' : ''}`}>
        <TextReveal
          text={title}
          tag="h2"
          delay={0.12}
          className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight ${
            isCenter ? 'justify-center text-center' : 'text-left'
          }`}
        />
      </div>

      {/* Supporting Narrative */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.7, delay: 0.28, ease: cinematicEase }}
          className={`text-sm md:text-base text-neutral-400 leading-relaxed max-w-xl ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
