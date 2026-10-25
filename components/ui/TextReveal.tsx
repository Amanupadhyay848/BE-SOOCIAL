'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
  delay?: number;
  highlightWords?: string[];
  highlightClassName?: string;
  once?: boolean;
}

export function TextReveal({
  text,
  className = '',
  tag = 'h2',
  delay = 0,
  highlightWords = [],
  highlightClassName = 'text-[#C6FF3D]',
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();

  const words = text.split(' ');

  if (shouldReduceMotion) {
    const Tag = tag;
    return (
      <Tag className={className}>
        {words.map((word, i) => {
          const isHighlight = highlightWords.some(
            (hw) => word.toLowerCase().includes(hw.toLowerCase())
          );
          return (
            <span key={i} className={isHighlight ? highlightClassName : undefined}>
              {word}{i < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </Tag>
    );
  }

  const Tag = tag;

  return (
    <div ref={ref} className="inline-block overflow-hidden">
      <Tag className={`${className} flex flex-wrap gap-x-[0.28em] gap-y-1`}>
        {words.map((word, idx) => {
          const isHighlight = highlightWords.some(
            (hw) => word.toLowerCase().includes(hw.toLowerCase())
          );

          return (
            <span key={idx} className="inline-block overflow-hidden py-0.5">
              <motion.span
                initial={{ y: '115%', opacity: 0, filter: 'blur(3px)' }}
                animate={
                  isInView
                    ? { y: '0%', opacity: 1, filter: 'blur(0px)' }
                    : { y: '115%', opacity: 0, filter: 'blur(3px)' }
                }
                transition={{
                  duration: 0.75,
                  delay: delay + idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block ${isHighlight ? highlightClassName : ''}`}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </Tag>
    </div>
  );
}
