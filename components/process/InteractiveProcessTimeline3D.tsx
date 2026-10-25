'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Card3D } from '@/components/ui/Card3D';
import {
  Compass,
  Layout,
  Film,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

interface ProcessStep {
  phase: string;
  stageName: string;
  tagline: string;
  title: string;
  description: string;
  timeline: string;
  deliverables: string[];
  icon: LucideIcon;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    phase: 'DISCOVER',
    stageName: 'STAGE 01',
    tagline: 'Deconstruct & Position',
    title: 'Strategic Angle & Cultural Deconstruction',
    description:
      'We analyze competitive positioning, audience psychological triggers, and cultural hooks before touching a camera or keyboard. Every asset must serve verified enterprise gravity.',
    timeline: 'Days 1 – 3',
    deliverables: [
      'Competitive Angle Deconstruction',
      'Psychological Retention Hooks Matrix',
      'Visual Narrative Direction Document',
    ],
    icon: Compass,
  },
  {
    phase: 'PLAN',
    stageName: 'STAGE 02',
    tagline: 'Pre-Visualization',
    title: 'Directorial Pre-Viz & Neural Storyboarding',
    description:
      'Rapid animatics and neural style exploration generate 40+ concept moods in 48 hours for immediate stakeholder alignment before primary production begins.',
    timeline: 'Days 4 – 7',
    deliverables: [
      '4K Neural Concept Mood Boards',
      'Timed Pre-Visualization Animatics',
      'Directorial Shot-List & Production Schedule',
    ],
    icon: Layout,
  },
  {
    phase: 'CREATE',
    stageName: 'STAGE 03',
    tagline: 'Cinema Production',
    title: 'Cinema Masters & Neural Synthesis',
    description:
      'High-end camera capture combined with generative virtual sets, custom sound design, bespoke kinetic typography, and broadcast 4K color grading.',
    timeline: 'Days 8 – 14',
    deliverables: [
      'Broadcast 4K Master Cinema Cut',
      'Dolby Atmos Spatial Audio Mix & SFX',
      'Bespoke Kinetic Typography Stems',
    ],
    icon: Film,
  },
  {
    phase: 'DELIVER',
    stageName: 'STAGE 04',
    tagline: 'Distribution & Scale',
    title: 'Algorithmic Distribution & Variant Scale',
    description:
      'Asset slicing into 16:9, 9:16, and 1:1 format cutdowns with variant hooks tested systematically across paid ad networks and organic feeds.',
    timeline: 'Days 15 – 18',
    deliverables: [
      'Multi-Format Cutdowns (9:16, 16:9, 1:1)',
      'Algorithmic Hook Variation Matrix',
      'Performance Retention & Attribution Report',
    ],
    icon: TrendingUp,
  },
];

export function InteractiveProcessTimeline3D() {
  const [activeStep, setActiveStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const cinematicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="w-full">
      {/* 3D Timeline Navigation Beam */}
      <div className="relative mb-12 max-w-4xl mx-auto">
        {/* Progress Background Line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-neutral-800 pointer-events-none" />

        {/* Dynamic Glowing Lime Active Beam */}
        <div
          className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-[#C6FF3D]/50 to-[#C6FF3D] transition-all duration-500 shadow-[0_0_14px_#C6FF3D] pointer-events-none"
          style={{ width: `${(activeStep / (PROCESS_STEPS.length - 1)) * 100}%` }}
        />

        {/* Milestone Buttons */}
        <div className="relative z-10 flex justify-between items-center">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            const isCompleted = activeStep > idx;
            const StepIcon = step.icon;

            return (
              <button
                key={step.phase}
                type="button"
                onClick={() => setActiveStep(idx)}
                className="group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6FF3D] rounded-xl p-2 transition-all cursor-pointer"
                aria-label={`Select stage ${idx + 1}: ${step.phase}`}
              >
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${
                    isActive
                      ? 'bg-[#C6FF3D] text-black ring-4 ring-[#C6FF3D]/25 scale-110 shadow-[0_0_30px_rgba(198,255,61,0.4)]'
                      : isCompleted
                      ? 'bg-neutral-800 text-[#C6FF3D] border border-[#C6FF3D]/50 hover:scale-105'
                      : 'bg-neutral-900 text-neutral-400 border border-neutral-800 group-hover:border-neutral-600 group-hover:text-neutral-200 hover:scale-105'
                  }`}
                >
                  <StepIcon className="w-5 h-5 md:w-6 md:h-6" />
                </div>

                <div className="mt-3 text-center">
                  <div
                    className={`text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase transition-colors ${
                      isActive
                        ? 'text-[#C6FF3D]'
                        : isCompleted
                        ? 'text-neutral-300'
                        : 'text-neutral-500'
                    }`}
                  >
                    {step.phase}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 hidden sm:block">
                    {step.timeline}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Active Stage Floating Presentation Canvas */}
      <div className="max-w-5xl mx-auto">
        <Card3D
          maxTilt={6}
          perspective={1200}
          liftZ={18}
          className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-neutral-900/90 via-neutral-900/60 to-black border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-md"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: cinematicEase }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Left Column: Stage Narrative */}
              <div className="lg:col-span-7 space-y-4" style={{ transform: 'translateZ(25px)' }}>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 text-[#C6FF3D] text-xs font-mono font-bold uppercase tracking-wider">
                    {PROCESS_STEPS[activeStep].stageName}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{PROCESS_STEPS[activeStep].timeline}</span>
                  </span>
                </div>

                <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
                  {PROCESS_STEPS[activeStep].title}
                </h3>

                <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                  {PROCESS_STEPS[activeStep].description}
                </p>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length)
                    }
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#C6FF3D] hover:underline cursor-pointer group"
                  >
                    <span>Advance to Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Right Column: Layered 3D Deliverables Card */}
              <div
                className="lg:col-span-5 p-6 md:p-8 rounded-2xl bg-neutral-950/80 border border-white/10 shadow-2xl relative overflow-hidden"
                style={{ transform: 'translateZ(35px)' }}
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 bg-[#C6FF3D]/10 rounded-full blur-2xl pointer-events-none"
                  aria-hidden="true"
                />

                <div className="flex items-center gap-2 text-xs font-mono text-[#C6FF3D] mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>PHASE PRODUCTION DELIVERABLES</span>
                </div>

                <ul className="space-y-3">
                  {PROCESS_STEPS[activeStep].deliverables.map((item, dIdx) => (
                    <li
                      key={dIdx}
                      className="flex items-start gap-3 text-xs md:text-sm text-neutral-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C6FF3D] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-white/[0.08] text-[11px] font-mono text-neutral-400">
                  Pipelined under BE SOOCIAL Quality Assurance.
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Card3D>
      </div>
    </div>
  );
}
