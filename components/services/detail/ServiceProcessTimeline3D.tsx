'use client';

import React, { useState } from 'react';
import { Card3D } from '@/components/ui/Card3D';
import { ServiceProcessStage } from './ServiceDetailData';
import { Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ServiceProcessTimeline3DProps {
  stages: ServiceProcessStage[];
  serviceTitle: string;
}

export function ServiceProcessTimeline3D({ stages, serviceTitle }: ServiceProcessTimeline3DProps) {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="w-full my-16">
      <div className="mb-8">
        <span className="text-xs font-mono text-[#C6FF3D] uppercase tracking-wider block mb-2">
          EXECUTION CHOREOGRAPHY
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          How We Deliver {serviceTitle}
        </h2>
        <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
          A disciplined multi-stage timeline eliminating scope creep and ensuring cinematic fidelity at every milestone.
        </p>
      </div>

      {/* Interactive Step Track */}
      <div className="relative mb-10">
        <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-800 -translate-y-1/2 z-0" />
        <div
          className="hidden sm:block absolute top-1/2 left-0 h-0.5 bg-[#C6FF3D] -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(activeStage / (stages.length - 1)) * 100}%` }}
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
          {stages.map((stage, idx) => {
            const isActive = activeStage === idx;
            const isCompleted = activeStage > idx;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 border-[#C6FF3D] ring-2 ring-[#C6FF3D]/30 shadow-[0_0_25px_rgba(198,255,61,0.2)]'
                    : isCompleted
                    ? 'bg-neutral-950/80 border-[#C6FF3D]/40 text-neutral-300'
                    : 'bg-neutral-950/60 border-white/[0.08] hover:border-white/20 text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-mono font-bold tracking-widest ${
                      isActive ? 'text-[#C6FF3D]' : 'text-neutral-500'
                    }`}
                  >
                    {stage.phase}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C6FF3D]" />
                    {stage.duration}
                  </span>
                </div>
                <div
                  className={`text-sm font-bold truncate ${
                    isActive ? 'text-white' : 'text-neutral-300'
                  }`}
                >
                  {stage.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detail Canvas */}
      <Card3D maxTilt={5} perspective={1200} liftZ={15} className="w-full">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="p-8 sm:p-10 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="max-w-2xl" style={{ transform: 'translateZ(20px)' }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 text-[#C6FF3D] text-xs font-mono font-bold">
                {stages[activeStage].stageName}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                Timeline: {stages[activeStage].duration}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {stages[activeStage].title}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {stages[activeStage].description}
            </p>
          </div>

          <div style={{ transform: 'translateZ(25px)' }} className="shrink-0">
            <button
              type="button"
              onClick={() => setActiveStage((prev) => (prev + 1) % stages.length)}
              className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-[#C6FF3D] hover:text-black text-xs font-mono text-neutral-200 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Next Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </Card3D>
    </div>
  );
}
