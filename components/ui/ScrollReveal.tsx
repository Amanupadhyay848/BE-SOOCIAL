'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'motion/react';

export type RevealVariant =
  | 'fade-up'
  | 'fade-scale'
  | 'scale-settle'
  | 'mask-reveal'
  | 'slide-left'
  | 'slide-right'
  | 'stagger-container'
  | 'perspective-rise'
  | 'parallax';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  parallaxSpeed?: number; // e.g. -40 to 40 for subtle parallax
  once?: boolean;
  threshold?: number;
  staggerChildren?: number;
}

export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.85,
  className = '',
  parallaxSpeed = 30,
  once = true,
  threshold = 0.15,
  staggerChildren = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });
  const shouldReduceMotion = useReducedMotion();

  // Scroll parallax calculation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxSpeed, -parallaxSpeed]
  );

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Smooth cinematic Apple-style deceleration curve
  const cinematicEase = [0.16, 1, 0.3, 1] as const;

  // Stagger container setup
  if (variant === 'stagger-container') {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren,
              delayChildren: delay,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Parallax container setup
  if (variant === 'parallax') {
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <motion.div
          style={{ y: parallaxY }}
          className="w-full h-full will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // Mask reveal setup (expanding clip-path)
  if (variant === 'mask-reveal') {
    return (
      <motion.div
        ref={ref}
        initial={{
          opacity: 0,
          clipPath: 'inset(16% 0% 16% 0% round 16px)',
          scale: 0.96,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                clipPath: 'inset(0% 0% 0% 0% round 0px)',
                scale: 1,
              }
            : {
                opacity: 0,
                clipPath: 'inset(16% 0% 16% 0% round 16px)',
                scale: 0.96,
              }
        }
        transition={{
          duration: Math.max(duration, 0.95),
          delay,
          ease: cinematicEase,
        }}
        className={className}
        style={{ willChange: 'clip-path, transform, opacity' }}
      >
        {children}
      </motion.div>
    );
  }

  // Scale settle (starts subtly zoomed, smoothly settles down)
  if (variant === 'scale-settle') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 1.06, filter: 'blur(4px)' }}
        animate={
          isInView
            ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
            : { opacity: 0, scale: 1.06, filter: 'blur(4px)' }
        }
        transition={{
          duration: Math.max(duration, 0.9),
          delay,
          ease: cinematicEase,
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // 3D Perspective Rise (tilts slightly toward viewer on entrance)
  if (variant === 'perspective-rise') {
    return (
      <div style={{ perspective: 1200 }} className={className}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40, rotateX: 6, scale: 0.97 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, rotateX: 0, scale: 1 }
              : { opacity: 0, y: 40, rotateX: 6, scale: 0.97 }
          }
          transition={{
            duration: Math.max(duration, 0.9),
            delay,
            ease: cinematicEase,
          }}
          style={{ transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // Directional slide left
  if (variant === 'slide-left') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -36 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -36 }}
        transition={{ duration, delay, ease: cinematicEase }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Directional slide right
  if (variant === 'slide-right') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 36 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 36 }}
        transition={{ duration, delay, ease: cinematicEase }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Fade scale
  if (variant === 'fade-scale') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
        transition={{ duration, delay, ease: cinematicEase }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Default: Fade Up with subtle vertical lift & blur clearance
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: 'blur(3px)' }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 32, filter: 'blur(3px)' }
      }
      transition={{ duration, delay, ease: cinematicEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Child item for use inside variant="stagger-container"
 */
export function ScrollRevealItem({
  children,
  className = '',
  yOffset = 24,
}: {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset, filter: 'blur(2px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
