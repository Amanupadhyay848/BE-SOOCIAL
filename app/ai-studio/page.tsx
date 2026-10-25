import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card3D } from '@/components/ui/Card3D';
import { SpatialConstellationScene } from '@/components/three/SpatialConstellationScene';
import { AIFilmmakingApplePlayer3D } from '@/components/services/ai-filmmaking/AIFilmmakingApplePlayer3D';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight, Sparkles, Cpu, ShieldCheck, Layers, Terminal } from 'lucide-react';

export default function AIStudioPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black">
      <Header />

      <main className="flex-1 py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        {/* Real 3D Spatial Constellation in the background */}
        <SpatialConstellationScene className="opacity-40" />

        <div className="relative z-10 mb-12">
          <SectionHeading
            number="AI STUDIO"
            tagline="Virtual Production & Generative Pipelines"
            title="Directorial Taste Meets Neural Computation"
            description="We do not make disposable AI novelties. We engineer broadcast-grade cinematic commercials, virtual worldbuilding, and native UGC at four times traditional velocity."
          />
        </div>

        {/* 3D Apple-Style Master Cinema Showcase with User Media Assets */}
        <div className="relative z-10 mb-24">
          <AIFilmmakingApplePlayer3D
            headline="STUDIO REEL & PRODUCTION PIPELINE"
            subheadline="Select between our latest commercial renders. Tap any video to experience full 4K playback with Dolby cinema sound."
          />
        </div>

        {/* 3D Studio Philosophy Block */}
        <ScrollReveal variant="stagger-container" staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 relative z-10">
          <Card3D maxTilt={8} perspective={1000} liftZ={15}>
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors backdrop-blur-md shadow-xl h-full space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700/80 flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6 text-[#C6FF3D]" />
              </div>
              <h3 className="text-xl font-bold text-white">Directorial Authority</h3>
              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                Every frame begins with human cinematography principles: aspect ratios, lens focal lengths, lighting ratios, and narrative pacing.
              </p>
            </div>
          </Card3D>

          <Card3D maxTilt={8} perspective={1000} liftZ={15}>
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors backdrop-blur-md shadow-xl h-full space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700/80 flex items-center justify-center shadow-md">
                <Cpu className="w-6 h-6 text-[#C6FF3D]" />
              </div>
              <h3 className="text-xl font-bold text-white">Bespoke ComfyUI Nodes</h3>
              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                Custom trained LoRAs and ControlNet rigs maintain absolute character, product, and lighting consistency across dozens of camera setups.
              </p>
            </div>
          </Card3D>

          <Card3D maxTilt={8} perspective={1000} liftZ={15}>
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors backdrop-blur-md shadow-xl h-full space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700/80 flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6 text-[#C6FF3D]" />
              </div>
              <h3 className="text-xl font-bold text-white">Copyright & Legal Safety</h3>
              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                Commercial broadcast rights and model training provenance checks ensure full brand safety for Fortune 500 and global campaigns.
              </p>
            </div>
          </Card3D>
        </ScrollReveal>

        {/* Detailed 4-Step Technical Workflow in 3D */}
        <ScrollReveal variant="fade-scale" className="mb-20 relative z-10">
          <SectionHeading
            number="THE PIPELINE"
            tagline="Engineering Workflow"
            title="From Concept to Master 4K Delivery"
            description="How our studio moves from initial brief to broadcast-ready assets."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card3D maxTilt={6} perspective={1200} liftZ={14}>
              <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-all backdrop-blur-md shadow-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[#C6FF3D] font-bold">PHASE 01</span>
                    <Terminal className="w-4 h-4 text-neutral-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    Pre-Visualization & Style Exploration
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-300 leading-relaxed mb-6">
                    Rather than standard static storyboards, we generate high-fidelity animatics within 48 hours. This allows clients to test tone, color palettes, and pacing before committing to full asset production.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-[11px] font-mono text-[#C6FF3D]">
                  Stack: Midjourney v6.1 · Custom LoRA Conditioning · Frame Animators
                </div>
              </div>
            </Card3D>

            <Card3D maxTilt={6} perspective={1200} liftZ={14}>
              <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-all backdrop-blur-md shadow-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[#C6FF3D] font-bold">PHASE 02</span>
                    <Layers className="w-4 h-4 text-neutral-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    Neural Generation & Motion Consistency
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-300 leading-relaxed mb-6">
                    We synthesize motion shots using multi-pass generative video engines (Runway Gen-3, Kling, Wan2.1), guided by depth maps and camera trajectory keyframes to prevent hallucinations.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-[11px] font-mono text-[#C6FF3D]">
                  Stack: ComfyUI Rigs · Depth ControlNet · Latent Upscaling
                </div>
              </div>
            </Card3D>

            <Card3D maxTilt={6} perspective={1200} liftZ={14}>
              <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-all backdrop-blur-md shadow-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[#C6FF3D] font-bold">PHASE 03</span>
                    <Sparkles className="w-4 h-4 text-neutral-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    Hybrid Finishing, VFX & Color Grading
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-300 leading-relaxed mb-6">
                    Our Hollywood-trained post team composites generative elements with live-action plates, cleans up micro-artifacts, and applies 35mm film grain emulation and ACES color grading in DaVinci Resolve.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-[11px] font-mono text-[#C6FF3D]">
                  Stack: DaVinci Resolve Studio · Nuke · Flame Compositing
                </div>
              </div>
            </Card3D>

            <Card3D maxTilt={6} perspective={1200} liftZ={14}>
              <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-all backdrop-blur-md shadow-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[#C6FF3D] font-bold">PHASE 04</span>
                    <Cpu className="w-4 h-4 text-neutral-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    Sound Design & Multi-Format Delivery
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-300 leading-relaxed mb-6">
                    We layer spatial sound effects, cinematic orchestral scoring, and voice synthesis or human voiceover, then export broadcast-certified packages in 16:9, 9:16, and 1:1 format aspect ratios.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-[11px] font-mono text-[#C6FF3D]">
                  Deliverables: ProRes 4444 Master · Dolby Atmos Stems · Social Cutdowns
                </div>
              </div>
            </Card3D>
          </div>
        </ScrollReveal>

        {/* 3D Case Study Highlight Callout */}
        <ScrollReveal variant="scale-settle" className="mb-16">
          <Card3D maxTilt={5} perspective={1200} liftZ={15}>
            <div className="p-10 rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-black border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl backdrop-blur-md">
              <div>
                <span className="text-xs font-mono text-[#C6FF3D] uppercase tracking-wider">CASE HIGHLIGHT</span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-2">
                  Solis Hypercar: Neural Genesis Film
                </h3>
                <p className="text-xs md:text-sm text-neutral-300 max-w-xl">
                  680K+ organic views, rapid 14-day turnaround with zero physical vehicle filming.
                </p>
              </div>
              <Link
                href="/work/solis-automotive-ai-launch"
                className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-white flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors active:scale-95 cursor-pointer"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C6FF3D]" />
              </Link>
            </div>
          </Card3D>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal variant="perspective-rise" className="text-center py-12 relative z-10">
          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-black bg-[#C6FF3D] hover:bg-[#b2eb2d] rounded-xl transition-all shadow-[0_0_30px_rgba(198,255,61,0.25)] active:scale-95 cursor-pointer"
          >
            <span>Commission an AI Studio Production</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
