'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Card3D } from '@/components/ui/Card3D';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  Film,
  Layers,
  Smartphone,
  Square,
  Radio,
  CheckCircle2,
} from 'lucide-react';

import { AI_FILMMAKING_MEDIA } from '@/data/media';

export interface AIFilmVideo {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  duration: string;
  aspectRatio: '1/1' | '9/16';
  aspectRatioClass: string;
  aspectBadge: string;
  resolution: string;
  glowColor: string;
  specs: string[];
  techStack: string[];
}

export const AI_FILMMAKING_ASSETS: AIFilmVideo[] = [
  {
    id: 'hod-render',
    title: 'House of Doom: Neural Genesis',
    subtitle: 'Gothic Citadel Volumetric VFX',
    tagline: 'DARK FANTASY WORLDBUILDING',
    description:
      'Photorealistic neural worldbuilding rendered with custom LoRA weights and ControlNet geometry passes. Volumetric ember storms and atmospheric lighting.',
    videoUrl: AI_FILMMAKING_MEDIA.hodSampleRender.video,
    posterUrl: AI_FILMMAKING_MEDIA.hodSampleRender.poster,
    duration: '0:45',
    aspectRatio: '1/1',
    aspectRatioClass: 'aspect-square max-w-[500px]',
    aspectBadge: '1:1 SQUARE',
    resolution: '1080 × 1080 px',
    glowColor: 'rgba(255, 95, 31, 0.35)', // Ember fiery glow
    specs: ['1:1 Square', '4K Master', 'Dolby Atmos', '60 FPS'],
    techStack: ['ComfyUI', 'ControlNet CAD', 'DaVinci Resolve'],
  },
  {
    id: 'me-vs-dooms',
    title: 'Me vs. Dooms: Quantum Clash',
    subtitle: 'Multiverse Superhero Duel',
    tagline: 'CHARACTER CONSISTENCY & VFX',
    description:
      'High-velocity superhero action duel combining live keypoints with generative comic-universe visual effects, dynamic camera tracking, and spatial sound design.',
    videoUrl: AI_FILMMAKING_MEDIA.meVsDooms.video,
    posterUrl: AI_FILMMAKING_MEDIA.meVsDooms.poster,
    duration: '1:15',
    aspectRatio: '9/16',
    aspectRatioClass: 'aspect-[9/16] max-w-[340px] sm:max-w-[360px]',
    aspectBadge: '9:16 VERTICAL REEL',
    resolution: '1080 × 1920 px',
    glowColor: 'rgba(198, 255, 61, 0.35)', // Neon lime glow
    specs: ['9:16 Vertical', '4K Cinema', 'Spatial Audio', 'HDR10'],
    techStack: ['Runway Gen-3', 'AnimateDiff', 'Atmos 7.1'],
  },
  {
    id: 'sample-master',
    title: 'BE SOOCIAL: Studio Master Reel',
    subtitle: 'Directorial Showreel Anthem',
    tagline: 'FLAGSHIP COMMERCIAL SHOWREEL',
    description:
      'Comprehensive directorial synthesis showreel highlighting generative commercial campaigns, luxury brand visuals, and hyper-velocity digital storytelling.',
    videoUrl: AI_FILMMAKING_MEDIA.sample.video,
    posterUrl: AI_FILMMAKING_MEDIA.sample.poster,
    duration: '1:40',
    aspectRatio: '9/16',
    aspectRatioClass: 'aspect-[9/16] max-w-[340px] sm:max-w-[360px]',
    aspectBadge: '9:16 4K UHD MASTER',
    resolution: '2160 × 3840 px',
    glowColor: 'rgba(74, 222, 128, 0.35)', // Emerald master glow
    specs: ['9:16 Vertical', 'UHD 4K Master', 'ProRes 4444', 'Original Score'],
    techStack: ['Kling 1.5', 'Midjourney v6.1', 'Studio Sound'],
  },
];

interface AIFilmmakingApplePlayer3DProps {
  className?: string;
  headline?: string;
  subheadline?: string;
}

export function AIFilmmakingApplePlayer3D({
  className = '',
  headline = 'CINEMATIC NEURAL MASTERS',
  subheadline = 'Experience three studio productions rendered in their exact native aspect ratios with Dolby spatial audio.',
}: AIFilmmakingApplePlayer3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasUserStarted, setHasUserStarted] = useState(false);

  const activeVideo = AI_FILMMAKING_ASSETS[activeIndex];
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Switch video handler
  const handleSelectVideo = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setIsPlaying(false);
    setHasUserStarted(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Play / Pause toggle with Audio unmuted
  const handleTogglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      // Ensure audio is unmuted when user clicks play
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.volume = volume;
      setHasUserStarted(true);

      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Playback error:', err);
        });
    }
  };

  // Volume & Mute control
  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  // Progress scrubbing
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = fraction * duration;
    setCurrentTime(fraction * duration);
  };

  // Fullscreen toggle
  const handleToggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Video event listeners
  const onTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const onVideoEnded = () => {
    setIsPlaying(false);
  };

  // Auto-hide controls while playing on mouse idle
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2800);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Apple-Style Section Title Block */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-4xl mx-auto px-4 mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-[#C6FF3D]/30 text-xs font-mono text-[#C6FF3D] uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(198,255,61,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#C6FF3D]" />
          <span>DIRECTORIAL ASSETS SHOWCASE · NATIVE ASPECT RATIOS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase mb-4">
          {headline}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
          {subheadline}
        </p>

        {/* Aspect Ratio Format Switcher Buttons */}
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          {AI_FILMMAKING_ASSETS.map((video, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => handleSelectVideo(idx)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#C6FF3D] text-black font-bold shadow-[0_0_20px_rgba(198,255,61,0.35)] scale-105'
                    : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-white/10 hover:border-neutral-700'
                }`}
              >
                {video.aspectRatio === '1/1' ? (
                  <Square className="w-3.5 h-3.5" />
                ) : (
                  <Smartphone className="w-3.5 h-3.5" />
                )}
                <span>{video.title.split(':')[0]}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-black/20 text-black' : 'bg-neutral-800 text-neutral-400'}`}>
                  {video.aspectBadge}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* 3D Master Apple Cinema Showcase Card */}
      <div className="max-w-5xl mx-auto px-4 flex justify-center">
        <Card3D maxTilt={5} perspective={1400} liftZ={18} className="w-full flex justify-center">
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
            className="group relative rounded-3xl overflow-hidden bg-neutral-950 border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-500 hover:border-[#C6FF3D]/50 hover:shadow-[0_25px_90px_rgba(198,255,61,0.2)] p-4 sm:p-8 flex flex-col items-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Ambient Reactive Dynamic Backlight Glow based on video aesthetic */}
            <div
              className="absolute inset-0 rounded-3xl blur-[120px] pointer-events-none transition-all duration-700"
              style={{ backgroundColor: activeVideo.glowColor }}
              aria-hidden="true"
            />

            {/* Top Pro Metadata Header */}
            <div className="w-full max-w-2xl flex items-center justify-between mb-4 z-20 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF3D] animate-ping" />
                <span className="text-[#C6FF3D] font-bold uppercase">{activeVideo.tagline}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 text-[10px]">
                  {activeVideo.resolution}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 text-[#C6FF3D] text-[10px] font-bold">
                  {activeVideo.aspectBadge}
                </span>
              </div>
            </div>

            {/* Adaptive Aspect Ratio Video Frame */}
            <div
              className={`relative w-full ${activeVideo.aspectRatioClass} max-h-[72vh] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl transition-all duration-500 mx-auto`}
              style={{
                transformStyle: 'preserve-3d',
                aspectRatio: activeVideo.aspectRatio === '1/1' ? '1 / 1' : '9 / 16',
              }}
            >
              {/* Native HTML5 Video Element with Full Audio & Native Aspect Ratio */}
              <video
                key={activeVideo.id}
                ref={videoRef}
                src={activeVideo.videoUrl}
                playsInline
                preload="metadata"
                onClick={handleTogglePlay}
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={onVideoEnded}
                className="w-full h-full object-contain bg-black cursor-pointer"
              />

              {/* Apple-Style Thumbnail Poster Overlay (Visible Before Play) */}
              <AnimatePresence>
                {!hasUserStarted && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="absolute inset-0 z-20 cursor-pointer"
                    onClick={handleTogglePlay}
                  >
                    {/* Exact Native Aspect Ratio Poster Image */}
                    <Image
                      src={activeVideo.posterUrl}
                      alt={activeVideo.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />

                    {/* Vignette Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/30" />

                    {/* Centered Glowing Apple Play Button */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
                      <motion.button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTogglePlay();
                        }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                        className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full flex items-center justify-center bg-white/10 hover:bg-[#C6FF3D] border border-white/30 hover:border-[#C6FF3D] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_0_50px_rgba(198,255,61,0.6)] transition-colors duration-300 group/btn cursor-pointer mb-4"
                        aria-label="Play video with full sound"
                      >
                        {/* Outer pulsating echo ring */}
                        <span className="absolute inset-0 rounded-full border-2 border-[#C6FF3D] opacity-60 animate-ping pointer-events-none" />

                        {/* Play Icon */}
                        <Play className="w-8 h-8 sm:w-9 sm:h-9 text-white group-hover/btn:text-black fill-current translate-x-0.5 transition-colors duration-300" />
                      </motion.button>

                      <div className="max-w-md px-2">
                        <span className="text-[10px] font-mono text-[#C6FF3D] tracking-widest uppercase block mb-1">
                          {activeVideo.subtitle}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">
                          {activeVideo.title}
                        </h3>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 border border-white/15 text-[10px] font-mono text-[#C6FF3D]">
                          <span>▶ Click to Play with Cinema Audio</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Centered Pause Overlay when video paused after start */}
              <AnimatePresence>
                {hasUserStarted && !isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleTogglePlay}
                    className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-18 h-18 rounded-full bg-white/15 border border-[#C6FF3D]/70 backdrop-blur-xl flex items-center justify-center shadow-[0_0_40px_rgba(198,255,61,0.3)]">
                      <Play className="w-7 h-7 text-[#C6FF3D] fill-current translate-x-0.5" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating Bottom Apple Controls Bar (Fitted to Video Width) */}
              <div
                className="absolute bottom-0 inset-x-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-opacity duration-300"
                style={{
                  opacity: showControls || !isPlaying ? 1 : 0,
                  pointerEvents: showControls || !isPlaying ? 'auto' : 'none',
                }}
              >
                {/* Scrubbable Progress Bar */}
                <div
                  onClick={handleSeek}
                  className="group/scrub relative w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full cursor-pointer mb-2.5 transition-all duration-200"
                >
                  <div
                    className="absolute top-0 left-0 bottom-0 bg-[#C6FF3D] rounded-full shadow-[0_0_10px_#C6FF3D] transition-all duration-75 relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover/scrub:scale-100 transition-transform duration-150" />
                  </div>
                </div>

                {/* Control Action Buttons */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    {/* Play / Pause Toggle */}
                    <button
                      type="button"
                      onClick={handleTogglePlay}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C6FF3D] text-white hover:text-black border border-white/20 hover:border-[#C6FF3D] flex items-center justify-center transition-colors cursor-pointer"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                      )}
                    </button>

                    {/* Timecode */}
                    <span className="text-neutral-300 text-[10px] tabular-nums">
                      {formatTime(currentTime)} / {formatTime(duration || 0)}
                    </span>

                    {/* Volume & Audio Controls */}
                    <div className="flex items-center gap-1.5 pl-1.5 border-l border-white/15">
                      <button
                        type="button"
                        onClick={handleToggleMute}
                        className="text-neutral-300 hover:text-[#C6FF3D] transition-colors cursor-pointer"
                        title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-3.5 h-3.5 text-red-400" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-[#C6FF3D]" />
                        )}
                      </button>

                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-12 sm:w-16 accent-[#C6FF3D] cursor-pointer"
                        title="Volume Slider"
                      />
                    </div>
                  </div>

                  {/* Fullscreen Button */}
                  <button
                    type="button"
                    onClick={handleToggleFullscreen}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-neutral-800 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-3.5 h-3.5" />
                    ) : (
                      <Maximize2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Meta Bar */}
            <div className="w-full max-w-2xl mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
              <div>
                <div className="text-white font-bold">{activeVideo.title}</div>
                <div className="text-[11px] text-neutral-400">
                  {activeVideo.description}
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {activeVideo.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded bg-neutral-900 border border-white/10 text-[10px] text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </Card3D>
      </div>

      {/* 3-Card Apple Spatial Theater Grid / Switcher (Showing Exact Native Aspect Ratios) */}
      <div className="max-w-5xl mx-auto px-4 mt-12">
        <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#C6FF3D]" />
            <span>NATIVE PRODUCTION ASSETS (03 VAULT PRODUCTIONS)</span>
          </div>
          <span className="text-neutral-500 hidden sm:inline">Select video to load in native ratio</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {AI_FILMMAKING_ASSETS.map((video, idx) => {
            const isSelected = activeIndex === idx;

            return (
              <motion.div
                key={video.id}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectVideo(idx)}
                className={`relative rounded-3xl overflow-hidden p-4 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-neutral-900 border-[#C6FF3D] shadow-[0_0_30px_rgba(198,255,61,0.25)] ring-1 ring-[#C6FF3D]/50'
                    : 'bg-neutral-900/40 border-white/10 hover:border-neutral-600 hover:bg-neutral-900/70'
                }`}
              >
                {/* Native Aspect Ratio Thumbnail Container */}
                <div className="w-full flex justify-center mb-4">
                  <div
                    className={`relative w-full rounded-2xl overflow-hidden bg-black ${
                      video.aspectRatio === '1/1' ? 'aspect-square max-w-[280px]' : 'aspect-[9/16] max-w-[220px]'
                    }`}
                    style={{
                      aspectRatio: video.aspectRatio === '1/1' ? '1 / 1' : '9 / 16',
                    }}
                  >
                    <Image
                      src={video.posterUrl}
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    {/* Aspect Ratio Badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-[#C6FF3D] font-bold">
                      {video.aspectBadge}
                    </div>

                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[9px] font-mono text-white">
                      {video.duration}
                    </div>

                    {/* Centered Play Pill */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                          isSelected
                            ? 'bg-[#C6FF3D] text-black shadow-lg scale-110'
                            : 'bg-black/60 text-white border border-white/20'
                        }`}
                      >
                        <Play className="w-4 h-4 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Title & Specs */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-[#C6FF3D] font-semibold">STAGE 0{idx + 1}</span>
                    <span className="text-[10px] font-mono text-neutral-400">{video.resolution}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{video.title}</h4>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 mb-3">
                    {video.description}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-white/[0.08]">
                    {video.specs.slice(0, 3).map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-1.5 py-0.5 rounded bg-neutral-800 text-[9px] font-mono text-neutral-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
