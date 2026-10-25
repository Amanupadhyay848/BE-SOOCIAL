'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Crown, Film, Video, BarChart3, Laptop, Smartphone, Sparkles, Check, Play, Activity } from 'lucide-react';

interface VisualProps {
  isHovered?: boolean;
  className?: string;
}

/**
 * A. Brand Management 3D Visual
 * Metallic crown surrounded by floating brand boards, typography samples, logos, packaging mockup, and color palette.
 * On Hover: Crown rises, branding panels spread outward in 3D, lime outline activates.
 */
export function BrandManagementVisual({ isHovered = false, className = '' }: VisualProps) {
  return (
    <div
      className={`relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900/90 to-black border border-white/10 flex items-center justify-center p-4 transition-all duration-500 ${className}`}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {/* Ambient background glow */}
      <div
        className={`absolute inset-0 bg-radial from-[#C6FF3D]/10 via-transparent to-transparent transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100 scale-125' : 'opacity-30 scale-100'
        }`}
      />

      {/* Floating Brand Color Swatches (Top Left) */}
      <motion.div
        animate={{
          x: isHovered ? -22 : 0,
          y: isHovered ? -16 : 0,
          z: isHovered ? 35 : 10,
          rotate: isHovered ? -8 : -3,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="absolute top-4 left-4 z-20 bg-neutral-900/90 border border-white/15 p-2 rounded-xl shadow-xl backdrop-blur-md"
      >
        <div className="text-[9px] font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">Palette System</div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-[#0A0A0A] border border-white/30" title="Obsidian" />
          <span className="w-4 h-4 rounded-full bg-[#C6FF3D] shadow-[0_0_8px_#C6FF3D]" title="Electric Lime" />
          <span className="w-4 h-4 rounded-full bg-white" title="Pure White" />
          <span className="w-4 h-4 rounded-full bg-neutral-500" title="Concrete" />
        </div>
      </motion.div>

      {/* Floating Typography Specimen (Top Right) */}
      <motion.div
        animate={{
          x: isHovered ? 24 : 0,
          y: isHovered ? -18 : 0,
          z: isHovered ? 30 : 8,
          rotate: isHovered ? 6 : 2,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="absolute top-4 right-4 z-20 bg-neutral-900/90 border border-white/15 px-3 py-2 rounded-xl shadow-xl backdrop-blur-md"
      >
        <div className="text-[9px] font-mono text-[#C6FF3D] font-bold">Aa · NEUE EDITORIAL</div>
        <div className="text-[10px] text-neutral-300 font-serif tracking-widest uppercase">Identity Hierarchy</div>
      </motion.div>

      {/* Centerpiece: Metallic Crown */}
      <motion.div
        animate={{
          y: isHovered ? -18 : 0,
          z: isHovered ? 55 : 20,
          rotateX: isHovered ? 12 : 0,
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="relative z-30 flex flex-col items-center justify-center"
      >
        <div
          className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br from-neutral-200 via-neutral-400 to-neutral-700 p-0.5 shadow-2xl transition-all duration-500 ${
            isHovered
              ? 'ring-4 ring-[#C6FF3D]/40 shadow-[0_0_40px_rgba(198,255,61,0.5)]'
              : 'shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          }`}
        >
          <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-black rounded-[14px] flex items-center justify-center relative overflow-hidden">
            {/* Metallic Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
            <Crown
              className={`w-10 h-10 transition-colors duration-500 ${
                isHovered ? 'text-[#C6FF3D] drop-shadow-[0_0_12px_#C6FF3D]' : 'text-neutral-200'
              }`}
            />
          </div>
        </div>
        <span className="mt-2 text-[10px] font-mono tracking-widest text-[#C6FF3D] uppercase font-bold">
          Brand Authority
        </span>
      </motion.div>

      {/* Floating Packaging Mockup Board (Bottom Left) */}
      <motion.div
        animate={{
          x: isHovered ? -26 : 0,
          y: isHovered ? 18 : 0,
          z: isHovered ? 28 : 5,
          rotate: isHovered ? -10 : -2,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="absolute bottom-4 left-4 z-20 bg-neutral-950/90 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-md"
      >
        <div className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D]" />
          <span>Packaging System 01</span>
        </div>
        <div className="text-[8px] text-neutral-400">Embossed Foil & UV</div>
      </motion.div>

      {/* Floating Vector Logo Frame (Bottom Right) */}
      <motion.div
        animate={{
          x: isHovered ? 26 : 0,
          y: isHovered ? 18 : 0,
          z: isHovered ? 32 : 6,
          rotate: isHovered ? 8 : 3,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="absolute bottom-4 right-4 z-20 bg-neutral-950/90 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-md"
      >
        <div className="text-[9px] font-mono text-neutral-300 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#C6FF3D]" />
          <span>SVG Vectors</span>
        </div>
        <div className="text-[8px] text-neutral-400 font-mono">1:1 Lockup Kit</div>
      </motion.div>
    </div>
  );
}

/**
 * B. AI Filmmaking 3D Visual
 * Cinematic camera, floating film frames, miniature cinematic environment, layered storyboard panels.
 * On Hover: Film frames move in depth, camera rotates, preview frame enlarges.
 */
export function AIFilmmakingVisual({ isHovered = false, className = '' }: VisualProps) {
  return (
    <div
      className={`relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900/90 to-black border border-white/10 flex items-center justify-center p-4 transition-all duration-500 ${className}`}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <div
        className={`absolute inset-0 bg-radial from-[#C6FF3D]/10 via-transparent to-transparent transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100 scale-125' : 'opacity-30 scale-100'
        }`}
      />

      {/* Cinematic Film Strip Frame 1 (Top Left) */}
      <motion.div
        animate={{
          x: isHovered ? -20 : 0,
          y: isHovered ? -14 : 0,
          z: isHovered ? 40 : 10,
          rotate: isHovered ? -10 : -4,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="absolute top-4 left-4 z-20 w-24 h-14 rounded-lg bg-neutral-800 border border-white/20 overflow-hidden shadow-xl"
      >
        <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-neutral-900 to-black p-1.5 flex flex-col justify-between">
          <div className="flex justify-between items-center text-[7px] font-mono text-[#C6FF3D]">
            <span>SCENE 04</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          </div>
          <div className="text-[8px] font-mono text-neutral-300">Anamorphic 2.39:1</div>
        </div>
      </motion.div>

      {/* Enlarging Preview Frame (Top Right) */}
      <motion.div
        animate={{
          x: isHovered ? 24 : 0,
          y: isHovered ? -16 : 0,
          z: isHovered ? 55 : 12,
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? 6 : 2,
        }}
        transition={{ type: 'spring', stiffness: 240, damping: 20 }}
        className={`absolute top-4 right-4 z-25 w-28 h-16 rounded-xl bg-neutral-900 border overflow-hidden shadow-2xl transition-colors duration-300 ${
          isHovered ? 'border-[#C6FF3D] ring-2 ring-[#C6FF3D]/30' : 'border-white/20'
        }`}
      >
        <div className="w-full h-full bg-gradient-to-br from-emerald-950/60 via-black to-neutral-900 p-2 flex flex-col justify-between">
          <div className="flex items-center gap-1 text-[8px] font-mono text-[#C6FF3D]">
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>AI NEURAL PREVIEW</span>
          </div>
          <div className="text-[7px] text-neutral-400 font-mono">Runway Gen-3 / Kling</div>
        </div>
      </motion.div>

      {/* Centerpiece: Cinematic Cinema Camera */}
      <motion.div
        animate={{
          y: isHovered ? -10 : 0,
          z: isHovered ? 45 : 18,
          rotateY: isHovered ? 18 : 0,
          rotateX: isHovered ? -6 : 0,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        className="relative z-30 flex flex-col items-center justify-center"
      >
        <div
          className={`w-20 h-20 rounded-2xl bg-neutral-950 border p-1 shadow-2xl flex items-center justify-center transition-all duration-300 ${
            isHovered
              ? 'border-[#C6FF3D] shadow-[0_0_35px_rgba(198,255,61,0.4)]'
              : 'border-white/20 shadow-xl'
          }`}
        >
          {/* Camera Lens Body Ring */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neutral-800 via-black to-neutral-900 border-2 border-[#C6FF3D]/50 flex items-center justify-center relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-950 via-neutral-950 to-emerald-950 border border-white/30 flex items-center justify-center">
              <Film className="w-5 h-5 text-[#C6FF3D]" />
            </div>
            {/* Tally Light */}
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </div>
        </div>
        <span className="mt-2 text-[10px] font-mono tracking-widest text-neutral-300 uppercase">
          Cinema Engine
        </span>
      </motion.div>

      {/* Layered Storyboard Panels (Bottom) */}
      <motion.div
        animate={{
          y: isHovered ? 16 : 0,
          z: isHovered ? 30 : 6,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="absolute bottom-4 inset-x-8 z-20 flex justify-between text-[9px] font-mono text-neutral-400 bg-neutral-950/80 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md"
      >
        <span className="text-[#C6FF3D]">Shot 01: Prompt Genesis</span>
        <span>Shot 02: Volumetric Lighting</span>
      </motion.div>
    </div>
  );
}

/**
 * C. Video Editing 3D Visual
 * Floating professional editing monitor, video timeline, waveform, color grading wheels, film strips.
 * On Hover: Timeline animates, preview slides, monitor moves forward in 3D.
 */
export function VideoEditingVisual({ isHovered = false, className = '' }: VisualProps) {
  return (
    <div
      className={`relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900/90 to-black border border-white/10 flex items-center justify-center p-4 transition-all duration-500 ${className}`}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <div
        className={`absolute inset-0 bg-radial from-[#C6FF3D]/10 via-transparent to-transparent transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100 scale-125' : 'opacity-30 scale-100'
        }`}
      />

      {/* Color Grading Wheel Badge (Top Left) */}
      <motion.div
        animate={{
          x: isHovered ? -18 : 0,
          y: isHovered ? -14 : 0,
          z: isHovered ? 35 : 10,
          rotate: isHovered ? -6 : 0,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="absolute top-4 left-4 z-20 bg-neutral-900/90 border border-white/15 p-2 rounded-xl backdrop-blur-md shadow-xl"
      >
        <div className="text-[8px] font-mono text-neutral-400 mb-1">Color Grade / LUTs</div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-[#C6FF3D] to-red-500 p-0.5">
          <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>
      </motion.div>

      {/* Centerpiece: Professional Editing Workstation Monitor */}
      <motion.div
        animate={{
          y: isHovered ? -12 : 0,
          z: isHovered ? 52 : 20,
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        className="relative z-30 w-44 rounded-xl bg-neutral-950 border border-white/20 p-2 shadow-2xl flex flex-col gap-1.5"
      >
        {/* Monitor Screen Frame */}
        <div className="w-full h-20 rounded-lg bg-black border border-white/10 overflow-hidden relative p-1.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[7px] font-mono text-[#C6FF3D]">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              00:01:24:18
            </span>
            <span>4K DCI · 60 FPS</span>
          </div>

          <div className="flex items-center justify-center">
            <Video
              className={`w-6 h-6 transition-colors duration-300 ${
                isHovered ? 'text-[#C6FF3D]' : 'text-neutral-400'
              }`}
            />
          </div>

          {/* Audio Waveform */}
          <div className="flex items-center gap-0.5 h-3 justify-center">
            {[4, 8, 12, 6, 14, 10, 5, 12, 16, 9, 7, 13, 8, 5].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: isHovered ? [h, h * 1.4, h] : h }}
                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.05 }}
                className="w-1 bg-[#C6FF3D] rounded-full opacity-80"
              />
            ))}
          </div>
        </div>

        {/* Multi-Track Timeline Bar */}
        <div className="w-full bg-neutral-900 rounded p-1 space-y-0.5 border border-white/5">
          <div className="h-1.5 w-full bg-neutral-800 rounded relative overflow-hidden">
            <motion.div
              animate={{ x: isHovered ? ['0%', '80%', '0%'] : '35%' }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              className="w-1/3 h-full bg-[#C6FF3D] rounded"
            />
          </div>
          <div className="h-1.5 w-full bg-neutral-800 rounded relative overflow-hidden">
            <div className="w-2/3 h-full bg-cyan-400/80 rounded" />
          </div>
        </div>
      </motion.div>

      {/* Floating Film Strips / Subtitle Preview (Bottom Right) */}
      <motion.div
        animate={{
          x: isHovered ? 20 : 0,
          y: isHovered ? 14 : 0,
          z: isHovered ? 34 : 10,
          rotate: isHovered ? 6 : 2,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="absolute bottom-4 right-4 z-20 bg-neutral-900/90 border border-white/15 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-xl"
      >
        <div className="text-[8px] font-mono text-[#C6FF3D]">Kinetic SFX & Subs</div>
        <div className="text-[7px] text-neutral-400">Retention Optimized</div>
      </motion.div>
    </div>
  );
}

/**
 * D. Digital Marketing 3D Visual
 * Floating campaign dashboards, analytics charts, social platform content tiles, campaign performance visuals.
 * On Hover: Charts animate, panels separate in depth, campaign tiles orbit.
 */
export function DigitalMarketingVisual({ isHovered = false, className = '' }: VisualProps) {
  return (
    <div
      className={`relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900/90 to-black border border-white/10 flex items-center justify-center p-4 transition-all duration-500 ${className}`}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <div
        className={`absolute inset-0 bg-radial from-[#C6FF3D]/10 via-transparent to-transparent transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100 scale-125' : 'opacity-30 scale-100'
        }`}
      />

      {/* Campaign Tile: Meta / TikTok (Top Left) */}
      <motion.div
        animate={{
          x: isHovered ? -24 : 0,
          y: isHovered ? -16 : 0,
          z: isHovered ? 38 : 10,
          rotate: isHovered ? -8 : -2,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="absolute top-4 left-4 z-20 bg-neutral-900/95 border border-white/15 px-3 py-2 rounded-xl backdrop-blur-md shadow-xl"
      >
        <div className="flex items-center gap-1.5 text-[8px] font-mono text-[#C6FF3D]">
          <Activity className="w-3 h-3 text-[#C6FF3D]" />
          <span>PAID ACQUISITION</span>
        </div>
        <div className="text-[9px] font-bold text-white mt-0.5">Multi-Variant Testing</div>
      </motion.div>

      {/* Centerpiece: Floating Analytics & Growth Dashboard */}
      <motion.div
        animate={{
          y: isHovered ? -14 : 0,
          z: isHovered ? 55 : 20,
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        className="relative z-30 w-44 rounded-2xl bg-neutral-950 border border-white/20 p-3 shadow-2xl flex flex-col gap-2"
      >
        <div className="flex items-center justify-between text-[9px] font-mono">
          <span className="text-white font-bold flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5 text-[#C6FF3D]" />
            Growth Engine
          </span>
          <span className="text-[#C6FF3D] font-bold bg-[#C6FF3D]/10 px-1.5 py-0.5 rounded">
            ROAS Tuned
          </span>
        </div>

        {/* Dynamic Growth Bar Chart */}
        <div className="flex items-end justify-between gap-1.5 h-16 pt-2 px-1 border-b border-white/10">
          {[20, 35, 50, 42, 68, 85, 95].map((val, idx) => (
            <motion.div
              key={idx}
              animate={{ height: isHovered ? `${Math.min(val * 1.15, 100)}%` : `${val}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: idx * 0.05 }}
              className={`w-3 rounded-t ${
                idx >= 5 ? 'bg-[#C6FF3D]' : 'bg-neutral-700'
              } transition-colors`}
            />
          ))}
        </div>

        <div className="flex justify-between text-[8px] font-mono text-neutral-400">
          <span>Target Reach</span>
          <span className="text-[#C6FF3D]">Optimized CAC</span>
        </div>
      </motion.div>

      {/* Floating Content Tile (Bottom Right) */}
      <motion.div
        animate={{
          x: isHovered ? 24 : 0,
          y: isHovered ? 16 : 0,
          z: isHovered ? 32 : 8,
          rotate: isHovered ? 8 : 3,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="absolute bottom-4 right-4 z-20 bg-neutral-900/95 border border-white/15 px-3 py-2 rounded-xl backdrop-blur-md shadow-xl"
      >
        <div className="text-[8px] font-mono text-neutral-400">Algorithmic Distribution</div>
        <div className="text-[9px] font-mono text-[#C6FF3D] font-bold">Retention Funnel</div>
      </motion.div>
    </div>
  );
}

/**
 * E. Website Development 3D Visual
 * Floating laptop displaying responsive website, layered browser windows, UI components, 3D wireframe structure.
 * On Hover: Browser panels fan out, laptop tilts, UI elements move forward.
 */
export function WebsiteDevelopmentVisual({ isHovered = false, className = '' }: VisualProps) {
  return (
    <div
      className={`relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900/90 to-black border border-white/10 flex items-center justify-center p-4 transition-all duration-500 ${className}`}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <div
        className={`absolute inset-0 bg-radial from-[#C6FF3D]/10 via-transparent to-transparent transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100 scale-125' : 'opacity-30 scale-100'
        }`}
      />

      {/* Floating Fanned-out Browser Panel 1 (Top Left) */}
      <motion.div
        animate={{
          x: isHovered ? -26 : 0,
          y: isHovered ? -16 : 0,
          z: isHovered ? 45 : 12,
          rotate: isHovered ? -12 : -3,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="absolute top-4 left-4 z-20 bg-neutral-900/90 border border-white/20 p-2 rounded-xl backdrop-blur-md shadow-xl"
      >
        <div className="flex items-center gap-1 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        </div>
        <div className="text-[8px] font-mono text-[#C6FF3D]">Three.js / WebGL 60FPS</div>
      </motion.div>

      {/* Centerpiece: Floating Modern Laptop */}
      <motion.div
        animate={{
          y: isHovered ? -12 : 0,
          z: isHovered ? 52 : 20,
          rotateX: isHovered ? 14 : 0,
          rotateY: isHovered ? -8 : 0,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        className="relative z-30 flex flex-col items-center"
      >
        {/* Laptop Screen */}
        <div className="w-44 h-28 rounded-t-xl bg-neutral-950 border-2 border-neutral-700 p-1.5 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-[7px] font-mono text-neutral-400 border-b border-white/10 pb-1">
            <span className="text-[#C6FF3D]">besoocial.com/app</span>
            <span>Next.js 15</span>
          </div>

          <div className="p-1 space-y-1">
            <div className="w-3/4 h-2 rounded bg-white/20" />
            <div className="w-1/2 h-1.5 rounded bg-[#C6FF3D]/70" />
            <div className="grid grid-cols-3 gap-1 pt-1">
              <div className="h-6 rounded bg-neutral-800 border border-white/10" />
              <div className="h-6 rounded bg-neutral-800 border border-white/10" />
              <div className="h-6 rounded bg-neutral-800 border border-[#C6FF3D]/40" />
            </div>
          </div>

          <div className="text-[6px] font-mono text-neutral-500 text-right">98/100 Lighthouse</div>
        </div>

        {/* Laptop Base Keyboard Deck */}
        <div className="w-52 h-3.5 rounded-b-xl bg-neutral-800 border-t border-neutral-600 shadow-xl flex items-center justify-center">
          <div className="w-12 h-1 rounded-full bg-neutral-600" />
        </div>
      </motion.div>

      {/* Floating Interactive UI Component (Bottom Right) */}
      <motion.div
        animate={{
          x: isHovered ? 26 : 0,
          y: isHovered ? 16 : 0,
          z: isHovered ? 38 : 10,
          rotate: isHovered ? 8 : 2,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="absolute bottom-4 right-4 z-20 bg-neutral-900/90 border border-white/20 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-xl"
      >
        <div className="text-[8px] font-mono text-[#C6FF3D]">Headless App Router</div>
        <div className="text-[7px] text-neutral-400 font-mono">Microsecond TTFB</div>
      </motion.div>
    </div>
  );
}

/**
 * F. AI UGC Ads 3D Visual
 * Creator recording a product video, floating smartphone, product display, social-video preview frames.
 * On Hover: Phone rotates slightly, video frames slide into view, recording indicator animates.
 */
export function AIUgcAdsVisual({ isHovered = false, className = '' }: VisualProps) {
  return (
    <div
      className={`relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900/90 to-black border border-white/10 flex items-center justify-center p-4 transition-all duration-500 ${className}`}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <div
        className={`absolute inset-0 bg-radial from-[#C6FF3D]/10 via-transparent to-transparent transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100 scale-125' : 'opacity-30 scale-100'
        }`}
      />

      {/* Floating Product Hero Display (Top Left) */}
      <motion.div
        animate={{
          x: isHovered ? -22 : 0,
          y: isHovered ? -16 : 0,
          z: isHovered ? 40 : 12,
          rotate: isHovered ? -8 : -2,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="absolute top-4 left-4 z-20 bg-neutral-900/90 border border-white/15 px-3 py-2 rounded-xl backdrop-blur-md shadow-xl"
      >
        <div className="text-[8px] font-mono text-neutral-400">Hero Product Placement</div>
        <div className="text-[9px] font-mono text-[#C6FF3D] font-bold">Unboxing & Demo</div>
      </motion.div>

      {/* Centerpiece: Floating Smartphone Recording Studio */}
      <motion.div
        animate={{
          y: isHovered ? -12 : 0,
          z: isHovered ? 52 : 20,
          rotateY: isHovered ? 14 : 0,
          rotateX: isHovered ? -6 : 0,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        className="relative z-30 w-28 h-44 rounded-2xl bg-neutral-950 border-2 border-neutral-700 p-1.5 shadow-2xl flex flex-col justify-between"
      >
        {/* Dynamic Island / Notch */}
        <div className="w-8 h-2 rounded-full bg-black mx-auto border border-white/10" />

        {/* Video Canvas */}
        <div className="flex-1 my-1 rounded-xl bg-gradient-to-b from-neutral-800 to-black border border-white/10 p-2 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-[7px] font-mono">
            <span className="flex items-center gap-1 text-red-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              REC
            </span>
            <span className="text-[#C6FF3D]">9:16 UGC</span>
          </div>

          <div className="text-center">
            <Smartphone className="w-6 h-6 text-[#C6FF3D] mx-auto opacity-90" />
            <div className="text-[8px] font-bold text-white mt-1">Creator Persona</div>
          </div>

          <div className="space-y-1">
            <div className="w-full h-1 bg-[#C6FF3D] rounded-full" />
            <div className="text-[6px] font-mono text-neutral-400">50+ Hook Permutations</div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="w-10 h-1 rounded-full bg-white/40 mx-auto" />
      </motion.div>

      {/* Social Engagement Metrics Badge (Bottom Right) */}
      <motion.div
        animate={{
          x: isHovered ? 24 : 0,
          y: isHovered ? 16 : 0,
          z: isHovered ? 35 : 10,
          rotate: isHovered ? 6 : 2,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="absolute bottom-4 right-4 z-20 bg-neutral-900/90 border border-white/15 px-3 py-2 rounded-xl backdrop-blur-md shadow-xl"
      >
        <div className="text-[8px] font-mono text-[#C6FF3D]">Hook Retention Lift</div>
        <div className="text-[9px] font-bold text-white font-mono">+62% 3s Hold</div>
      </motion.div>
    </div>
  );
}

/**
 * Universal dynamic dispatcher component mapping service slug to its bespoke 3D visual
 */
export function Service3DVisual({ slug, isHovered = false, className = '' }: { slug: string; isHovered?: boolean; className?: string }) {
  switch (slug) {
    case 'brand-management':
      return <BrandManagementVisual isHovered={isHovered} className={className} />;
    case 'ai-filmmaking':
      return <AIFilmmakingVisual isHovered={isHovered} className={className} />;
    case 'video-editing':
      return <VideoEditingVisual isHovered={isHovered} className={className} />;
    case 'digital-marketing':
      return <DigitalMarketingVisual isHovered={isHovered} className={className} />;
    case 'website-development':
      return <WebsiteDevelopmentVisual isHovered={isHovered} className={className} />;
    case 'ai-ugc-ads':
      return <AIUgcAdsVisual isHovered={isHovered} className={className} />;
    default:
      return <BrandManagementVisual isHovered={isHovered} className={className} />;
  }
}
