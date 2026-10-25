'use client';

import React from 'react';

export function SceneFallback() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none"
      style={{ perspective: '1000px' }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#0A0A0A]" />

      {/* Layer 1: Ambient Studio Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#14280f]/30 via-[#C6FF3D]/10 to-transparent rounded-full blur-3xl opacity-70" />

      {/* Layer 2: Central Photographic Lens Graphic (CSS Simulated Iris) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-neutral-800 bg-neutral-950/80 shadow-[0_0_80px_rgba(0,0,0,0.9)] flex items-center justify-center transition-transform duration-700"
        style={{ transform: 'rotateX(12deg) rotateY(-8deg)' }}
      >
        {/* Outer Ribbed Barrel */}
        <div className="w-64 h-64 rounded-full border-2 border-neutral-800/80 p-3 flex items-center justify-center">
          {/* Lime Accent Ring */}
          <div className="w-56 h-56 rounded-full border border-[#C6FF3D]/70 p-4 flex items-center justify-center shadow-[0_0_20px_rgba(198,255,61,0.2)]">
            {/* Multi-Coated Optical Glass Sim */}
            <div className="w-44 h-44 rounded-full bg-gradient-to-br from-emerald-950/80 via-neutral-900 to-cyan-950/80 border border-emerald-500/20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 transform -translate-x-4" />
              {/* Inner Aperture Aperture Hole */}
              <div className="w-16 h-16 rounded-full bg-black/95 border border-neutral-800 shadow-inner" />
            </div>
          </div>
        </div>
      </div>

      {/* Layer 3: Floating Left Film Strip Card */}
      <div
        className="absolute top-1/4 left-8 md:left-24 w-48 h-28 rounded-lg border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm p-3 opacity-60 shadow-2xl"
        style={{ transform: 'rotate(-6deg) translateZ(40px)' }}
      >
        <div className="flex items-center justify-between border-b border-neutral-800 pb-1 mb-2">
          <span className="text-[10px] font-mono text-neutral-400">FRAME 042</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D]" />
        </div>
        <div className="w-full h-12 bg-neutral-950 rounded border border-neutral-800/50 flex items-center justify-center text-[9px] font-mono text-neutral-400">
          4K ANAMORPHIC RAW
        </div>
      </div>

      {/* Layer 4: Floating Right Vertical Reel */}
      <div
        className="absolute bottom-1/4 right-8 md:right-28 w-32 h-52 rounded-lg border border-[#C6FF3D]/30 bg-neutral-900/60 backdrop-blur-sm p-2.5 opacity-60 shadow-2xl"
        style={{ transform: 'rotate(8deg) translateZ(60px)' }}
      >
        <div className="text-[10px] font-mono text-[#C6FF3D] mb-2 text-right">9:16 CUT</div>
        <div className="w-full h-36 bg-neutral-950 rounded border border-neutral-800 flex items-center justify-center text-[9px] font-mono text-neutral-400 text-center px-2">
          AI GENERATIVE REEL
        </div>
      </div>
    </div>
  );
}
