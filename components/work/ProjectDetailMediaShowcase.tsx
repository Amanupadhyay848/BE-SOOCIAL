'use client';

import React, { useRef, useState } from 'react';
import { Card3D } from '@/components/ui/Card3D';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface ProjectDetailMediaShowcaseProps {
  videoUrl?: string;
  coverUrl: string;
  poster?: string;
  title: string;
  aspectRatio?: '16/9' | '9/16' | '1/1' | string;
}

export function ProjectDetailMediaShowcase({
  videoUrl,
  coverUrl,
  poster,
  title,
  aspectRatio = '16/9',
}: ProjectDetailMediaShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // Can play with sound on project detail page

  const isVertical = aspectRatio === '9/16';
  const isSquare = aspectRatio === '1/1';

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const posterSrc = poster || (coverUrl && !coverUrl.endsWith('.mp4') ? coverUrl : undefined);

  return (
    <Card3D maxTilt={3} perspective={1400} liftZ={12} className="w-full flex justify-center">
      <div
        className={`relative rounded-3xl overflow-hidden bg-neutral-950 border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex items-center justify-center transition-all duration-500 mx-auto ${
          isVertical
            ? 'aspect-[9/16] w-full max-w-[380px] max-h-[80vh]'
            : isSquare
            ? 'aspect-square w-full max-w-[560px] max-h-[75vh]'
            : 'aspect-[16/9] w-full max-w-5xl'
        }`}
      >
        {/* Ambient Blurred Aura behind player */}
        <div
          className="absolute inset-0 bg-[#C6FF3D]/5 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            aria-label={`${title} Full Film Master`}
            className="w-full h-full object-contain relative z-10 cursor-pointer"
            onClick={togglePlay}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-500 font-mono text-xs">
            {title}
          </div>
        )}

        {/* Video Overlay Control Strip */}
        <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-auto">
          {/* Play / Pause Toggle Button */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause Reel' : 'Play Reel'}
            className="px-3.5 py-1.5 rounded-full bg-black/80 border border-white/15 hover:border-[#C6FF3D] text-white hover:text-[#C6FF3D] text-[11px] font-mono tracking-wider flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>PLAY</span>
              </>
            )}
          </button>

          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
            className="px-3.5 py-1.5 rounded-full bg-black/80 border border-white/15 hover:border-[#C6FF3D] text-white hover:text-[#C6FF3D] text-[11px] font-mono tracking-wider flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                <span>SOUND OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#C6FF3D] animate-pulse" />
                <span className="text-[#C6FF3D] font-bold">SOUND ON</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Card3D>
  );
}
