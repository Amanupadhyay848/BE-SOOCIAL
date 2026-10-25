'use client';

import React, { useState } from 'react';
import { Card3D } from '@/components/ui/Card3D';
import { ServicePillar } from './ServiceDetailData';
import { CheckCircle2, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicePillarsInteractiveProps {
  pillars: ServicePillar[];
  disciplineTitle: string;
}

export function ServicePillarsInteractive({ pillars, disciplineTitle }: ServicePillarsInteractiveProps) {
  const [selectedPillarIndex, setSelectedPillarIndex] = useState(0);

  const activePillar = pillars[selectedPillarIndex] || pillars[0];

  return (
    <div className="w-full my-16">
      <div className="mb-8">
        <span className="text-xs font-mono text-[#C6FF3D] uppercase tracking-wider block mb-2">
          MODULAR CAPABILITIES
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Interactive Scope Architecture
        </h2>
        <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
          Inspect the structural components engineered under our {disciplineTitle} offering. Select any pillar to reveal associated workflows and deliverables.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Pillar Selector List */}
        <div className="lg:col-span-5 space-y-3">
          {pillars.map((pillar, idx) => {
            const isSelected = selectedPillarIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedPillarIndex(idx)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 border-[#C6FF3D] shadow-[0_0_30px_rgba(198,255,61,0.15)] ring-1 ring-[#C6FF3D]/40'
                    : 'bg-neutral-950/60 border-white/[0.08] hover:border-white/20 hover:bg-neutral-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono tracking-widest font-bold uppercase ${
                        isSelected ? 'text-[#C6FF3D]' : 'text-neutral-500 group-hover:text-neutral-300'
                      }`}
                    >
                      PILLAR 0{idx + 1} · {pillar.tagline}
                    </span>
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-bold transition-colors ${
                      isSelected ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                    }`}
                  >
                    {pillar.title}
                  </h3>
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                    isSelected
                      ? 'bg-[#C6FF3D] text-black translate-x-1'
                      : 'bg-neutral-900 text-neutral-500 group-hover:text-white'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: 3D Active Pillar Deep Dive Card */}
        <div className="lg:col-span-7">
          <Card3D maxTilt={6} perspective={1200} liftZ={18} className="w-full">
            <motion.div
              key={selectedPillarIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Radial Aura */}
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-[#C6FF3D]/10 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div style={{ transform: 'translateZ(25px)' }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 text-xs font-mono text-[#C6FF3D] font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6FF3D]" />
                  <span>ACTIVE PILLAR SCOPE</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {activePillar.title}
                </h3>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8">
                  {activePillar.description}
                </p>

                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                  <span>Standard Deliverables Package</span>
                  <span className="w-12 h-px bg-white/20" />
                </h4>

                <div className="space-y-3">
                  {activePillar.deliverableList.map((del, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-3.5 rounded-xl bg-neutral-950/80 border border-white/5 flex items-center gap-3 text-xs sm:text-sm text-neutral-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C6FF3D] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Card3D>
        </div>
      </div>
    </div>
  );
}
