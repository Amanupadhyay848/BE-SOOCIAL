'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { DynamicHeroScene } from '@/components/three/DynamicHeroScene';
import { Card3D } from '@/components/ui/Card3D';
import { ReplayIntroButton } from '@/components/home/ReplayIntroButton';
import { ArrowRight, X } from 'lucide-react';

export function FrontPageCinematicHeroExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Animation timeline state:
  // 1. 'center': 0.0s – 0.8s (Wordmark presented bold and centered)
  // 2. 'flying': 0.8s – 2.2s (Wordmark glides to header logo. Hero elements align row-by-row in sync!)
  // 3. 'landed': 2.2s – 2.5s (Wordmark docks seamlessly on header logo, crossfades smoothly)
  // 4. 'complete': 2.5s+ (Animation complete, zero ongoing GPU load)
  const [animState, setAnimState] = useState<'center' | 'flying' | 'landed' | 'complete'>('center');
  
  const [targetCoords, setTargetCoords] = useState<{ x: number; y: number; scale: number }>({
    x: 0,
    y: 0,
    scale: 0.25,
  });

  // Layered pointer-based parallax state
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  const introWordmarkRef = useRef<HTMLHeadingElement>(null);
  const animTimersRef = useRef<{ tFlight?: NodeJS.Timeout; tLanded?: NodeJS.Timeout; tComplete?: NodeJS.Timeout }>({});

  // Scroll depth parallax & cinematic camera pull-back
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.65, 0.2]);
  
  const headlineScrollY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const paragraphScrollY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const ctaScrollY = useTransform(scrollYProgress, [0, 1], [0, -115]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.85, 0.3]);
  const proofBarScrollY = useTransform(scrollYProgress, [0, 1], [0, -135]);
  const heroOverallOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.88, 0.2]);

  // Precision calculation: measures exact center of header logo vs center of screen
  const calculateExactTarget = useCallback(() => {
    if (typeof window === 'undefined') return { x: 0, y: 0, scale: 0.25 };

    const headerLogo = document.querySelector('header a[href="/"]');
    const introWordmark = introWordmarkRef.current;

    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;

    if (headerLogo) {
      const logoRect = headerLogo.getBoundingClientRect();
      const logoCenterX = logoRect.left + logoRect.width / 2;
      const logoCenterY = logoRect.top + logoRect.height / 2;

      const deltaX = logoCenterX - screenCenterX;
      const deltaY = logoCenterY - screenCenterY;

      let scale = 0.25;
      if (introWordmark) {
        const introRect = introWordmark.getBoundingClientRect();
        if (introRect.width > 0) {
          scale = logoRect.width / introRect.width;
        }
      }

      return { x: deltaX, y: deltaY, scale };
    }

    // Responsive fallback if header logo is not yet measured
    const isMobile = window.innerWidth < 768;
    const containerLeft = Math.max(16, (window.innerWidth - 1280) / 2 + (isMobile ? 16 : 32));
    const fallbackLogoCenterX = containerLeft + (isMobile ? 60 : 75);
    const fallbackLogoCenterY = 40; // 80px header height / 2

    return {
      x: fallbackLogoCenterX - screenCenterX,
      y: fallbackLogoCenterY - screenCenterY,
      scale: isMobile ? 0.30 : 0.25,
    };
  }, []);

  const startSequence = useCallback(() => {
    // Clear any previous timers
    if (animTimersRef.current.tFlight) clearTimeout(animTimersRef.current.tFlight);
    if (animTimersRef.current.tLanded) clearTimeout(animTimersRef.current.tLanded);
    if (animTimersRef.current.tComplete) clearTimeout(animTimersRef.current.tComplete);

    setAnimState('center');

    // Measure target coordinates immediately
    const initialCoords = calculateExactTarget();
    setTargetCoords(initialCoords);

    // 1. At 0.8s: Flight begins! Elements align one by one during the flight!
    const tFlight = setTimeout(() => {
      const freshCoords = calculateExactTarget();
      setTargetCoords(freshCoords);
      setAnimState('flying');
    }, 800);

    // 2. At 2.2s: Wordmark arrives and docks on the header logo
    const tLanded = setTimeout(() => {
      setAnimState('landed');
    }, 2200);

    // 3. At 2.5s: Sequence fully completed
    const tComplete = setTimeout(() => {
      setAnimState('complete');
    }, 2500);

    animTimersRef.current = { tFlight, tLanded, tComplete };
  }, [calculateExactTarget]);

  // Synchronize header logo and nav with the intro flight
  useEffect(() => {
    const headerLogo = document.querySelector('header a[href="/"]') as HTMLElement | null;
    const headerNav = document.querySelector('header nav') as HTMLElement | null;
    const headerAction = document.querySelector('header .hidden.md\\:flex.items-center.gap-4') as HTMLElement | null;

    if (animState === 'center') {
      if (headerLogo) headerLogo.style.opacity = '0';
      if (headerNav) headerNav.style.opacity = '0';
      if (headerAction) headerAction.style.opacity = '0';
    } else if (animState === 'flying') {
      if (headerLogo) headerLogo.style.opacity = '0';
      if (headerNav) {
        headerNav.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s';
        headerNav.style.opacity = '1';
      }
      if (headerAction) {
        headerAction.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s';
        headerAction.style.opacity = '1';
      }
    } else {
      // Landed or Complete: Header logo seamlessly takes over
      if (headerLogo) {
        headerLogo.style.transition = 'opacity 0.3s ease';
        headerLogo.style.opacity = '1';
        headerLogo.style.pointerEvents = 'auto';
      }
      if (headerNav) headerNav.style.opacity = '1';
      if (headerAction) headerAction.style.opacity = '1';
    }

    return () => {
      if (headerLogo) headerLogo.style.opacity = '1';
      if (headerNav) headerNav.style.opacity = '1';
      if (headerAction) headerAction.style.opacity = '1';
    };
  }, [animState]);

  useEffect(() => {
    // Schedule flight initial calculation cleanly
    const initTimer = setTimeout(() => {
      startSequence();
    }, 20);

    const handleResize = () => {
      setTargetCoords(calculateExactTarget());
    };
    window.addEventListener('resize', handleResize);

    const handleReplay = () => {
      startSequence();
    };
    window.addEventListener('replay-apple-intro', handleReplay);

    return () => {
      clearTimeout(initTimer);
      if (animTimersRef.current.tFlight) clearTimeout(animTimersRef.current.tFlight);
      if (animTimersRef.current.tLanded) clearTimeout(animTimersRef.current.tLanded);
      if (animTimersRef.current.tComplete) clearTimeout(animTimersRef.current.tComplete);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('replay-apple-intro', handleReplay);
    };
  }, [startSequence, calculateExactTarget]);

  // Pointer movement tracking for multi-layered depth parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setPointerOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  // Quick skip handler (click anywhere, Esc, or Space)
  const handleSkip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAnimState('complete');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isFlight = animState === 'flying' || animState === 'landed' || animState === 'complete';
  const isLanded = animState === 'landed' || animState === 'complete';
  const isComplete = animState === 'complete';

  // Apple-grade decelerating ease curve with zero jerk
  const appleEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-white/[0.08]"
    >
      {/* 
        ==========================================================================
        DEPTH LAYER 1: Background 3D Scene + Radial Ambient Aura (Very Subtle Movement)
        ==========================================================================
      */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isFlight ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 1.0, delay: isComplete ? 0 : 0.1, ease: appleEase }}
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: bgScrollY,
                scale: bgScale,
                opacity: bgOpacity,
                x: pointerOffset.x * 5,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }
        }
        className="absolute inset-0 will-change-transform"
      >
        <DynamicHeroScene />
      </motion.div>

      {/* 
        ==========================================================================
        THE FLYING MONOLITHIC WORDMARK "BE SOOCIAL"
        Starts centered in viewport (0.0s – 0.8s).
        At 0.8s, glides to the exact coordinates of the header logo (0.8s – 2.2s).
        ==========================================================================
      */}
      <AnimatePresence>
        {!isComplete && (
          <div className="fixed inset-0 z-[100] pointer-events-none select-none flex items-center justify-center">
            {/* Ambient Radial Glow in Center (dissolves as flight starts) */}
            <motion.div
              animate={{
                opacity: isFlight ? 0 : 0.3,
                scale: isFlight ? 0.7 : 1,
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(198, 255, 61, 0.25) 0%, rgba(0, 0, 0, 0) 70%)',
              }}
              aria-hidden="true"
            />

            {/* The Precision Flying Wordmark Container */}
            <motion.div
              initial={{ x: 0, y: 0, scale: 1, opacity: 0 }}
              animate={
                isFlight
                  ? {
                      x: targetCoords.x,
                      y: targetCoords.y,
                      scale: targetCoords.scale,
                      opacity: isLanded ? 0 : 1,
                    }
                  : {
                      x: 0,
                      y: 0,
                      scale: 1,
                      opacity: 1,
                    }
              }
              transition={
                isFlight
                  ? {
                      duration: 1.4,
                      ease: appleEase,
                    }
                  : {
                      duration: 0.6,
                      ease: appleEase,
                    }
              }
              className="flex flex-col items-center justify-center text-center"
              style={{
                willChange: 'transform, opacity',
                transformOrigin: 'center center',
              }}
            >
              <h1
                ref={introWordmarkRef}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white whitespace-nowrap drop-shadow-[0_0_35px_rgba(198,255,61,0.25)]"
              >
                BE SOOCIAL
              </h1>

              {/* Subtitle Pill (Fades out cleanly before flight begins) */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: isFlight ? 0 : 1,
                  y: isFlight ? -8 : 0,
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900/90 border border-white/10 text-[10px] sm:text-xs font-mono text-neutral-300 tracking-widest uppercase shadow-md pointer-events-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D] animate-ping" />
                <span>CREATIVE MEDIA & PRODUCTION AGENCY</span>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 
        ==========================================================================
        DEPTH LAYER 2 & 3: Semantic DOM Content Overlay (Midground & Foreground)
        ==========================================================================
      */}
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                opacity: heroOverallOpacity,
              }
        }
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center flex flex-col items-center w-full will-change-transform"
      >
        {/* 
          ROW 1: Lead Tagline Badge & Replay Controller
        */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isFlight ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.65, delay: isComplete ? 0 : 0.20, ease: appleEase }}
          style={
            shouldReduceMotion
              ? undefined
              : {
                  x: pointerOffset.x * 9,
                  y: pointerOffset.y * 7,
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }
          }
          className="inline-flex items-center gap-3 mb-6 flex-wrap justify-center will-change-transform"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C6FF3D] px-3.5 py-1.5 rounded-full bg-black/70 border border-[#C6FF3D]/30 backdrop-blur-md shadow-lg">
            <span>CREATIVE MEDIA & PRODUCTION AGENCY</span>
          </div>
          <ReplayIntroButton />
        </motion.div>

        {/* 
          ROW 2: Main Balanced Headline (Midground Movement with Scroll Scaling)
        */}
        <motion.h1
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          animate={isFlight ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 28, filter: 'blur(6px)' }}
          transition={{ duration: 0.75, delay: isComplete ? 0 : 0.40, ease: appleEase }}
          style={
            shouldReduceMotion
              ? { textWrap: 'balance' }
              : {
                  textWrap: 'balance',
                  y: headlineScrollY,
                  scale: headlineScale,
                  x: pointerOffset.x * 12,
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }
          }
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase max-w-5xl leading-[0.95] mb-8 text-center will-change-transform"
        >
          CRAFTING THE CULTURE OF <span className="text-[#C6FF3D]">MODERN BRANDS</span>
        </motion.h1>

        {/* 
          ROW 3: Value Proposition (Midground Movement with Scroll Upward Drift)
        */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isFlight ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: isComplete ? 0 : 0.60, ease: appleEase }}
          style={
            shouldReduceMotion
              ? undefined
              : {
                  y: paragraphScrollY,
                  x: pointerOffset.x * 10,
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }
          }
          className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-10 text-center will-change-transform"
        >
          We fuse cinematic storytelling, advanced generative AI filmmaking, and high-velocity digital growth engines to build unmistakable brand authority.
        </motion.p>

        {/* 
          ROW 4: Action Controls (Foreground Movement with Scroll Fade/Shift)
        */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isFlight ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.65, delay: isComplete ? 0 : 0.80, ease: appleEase }}
          style={
            shouldReduceMotion
              ? undefined
              : {
                  y: ctaScrollY,
                  opacity: ctaOpacity,
                  x: pointerOffset.x * 16,
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }
          }
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto will-change-transform"
        >
          <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
            <Link
              href="/start-a-project"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-black bg-[#C6FF3D] hover:bg-[#b2eb2d] rounded-xl transition-all shadow-[0_0_35px_rgba(198,255,61,0.35)] hover:shadow-[0_0_45px_rgba(198,255,61,0.55)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
            <Link
              href="/work"
              className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer shadow-lg"
            >
              Explore Selected Work
            </Link>
          </motion.div>
        </motion.div>

        {/* 
          ROW 5: 3D Elevated Quantified Proof Bar (Foreground Movement)
        */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isFlight ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.75, delay: isComplete ? 0 : 1.00, ease: appleEase }}
          style={
            shouldReduceMotion
              ? undefined
              : {
                  y: proofBarScrollY,
                  x: pointerOffset.x * 18,
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }
          }
          className="mt-16 w-full max-w-4xl will-change-transform"
        >
          <Card3D
            maxTilt={6}
            perspective={1200}
            liftZ={14}
            className="pt-6 pb-6 px-8 rounded-2xl bg-neutral-950/70 border border-white/10 backdrop-blur-md shadow-2xl"
          >
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex flex-col items-center text-center" style={{ transform: 'translateZ(20px)' }}>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#C6FF3D] font-mono tabular-nums">
                  500K+
                </span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-1 text-center">
                  Organic Video Reach
                </span>
              </div>
              <div className="flex flex-col items-center text-center" style={{ transform: 'translateZ(20px)' }}>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  25+
                </span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-1 text-center">
                  Brand Projects Delivered
                </span>
              </div>
              <div className="flex flex-col items-center text-center" style={{ transform: 'translateZ(20px)' }}>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  3.4x
                </span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-1 text-center">
                  Average Engagement Lift
                </span>
              </div>
              <div className="flex flex-col items-center text-center" style={{ transform: 'translateZ(20px)' }}>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  99.2%
                </span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-1 text-center">
                  On-Time Delivery Rate
                </span>
              </div>
            </div>
          </Card3D>
        </motion.div>
      </motion.div>

      {/* Instant Skip Button during animation */}
      {!isComplete && (
        <button
          type="button"
          onClick={handleSkip}
          className="absolute top-6 right-6 z-50 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-white/10 text-neutral-400 hover:text-white text-[11px] font-mono backdrop-blur-md transition-all cursor-pointer shadow-lg hover:border-white/30 active:scale-95"
          title="Skip Intro (Esc or Space)"
        >
          <span>Skip</span>
          <X className="w-3 h-3" />
        </button>
      )}
    </section>
  );
}
