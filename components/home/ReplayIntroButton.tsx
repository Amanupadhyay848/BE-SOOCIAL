'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export function ReplayIntroButton() {
  const handleReplay = () => {
    window.dispatchEvent(new CustomEvent('replay-apple-intro'));
  };

  return (
    <button
      type="button"
      onClick={handleReplay}
      className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-400 hover:text-[#C6FF3D] px-3 py-1.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 hover:border-[#C6FF3D]/40 backdrop-blur-md transition-all cursor-pointer shadow-md group"
      title="Replay 5s Apple Opening Animation"
    >
      <Sparkles className="w-3 h-3 text-[#C6FF3D] group-hover:rotate-12 transition-transform" />
      <span>Replay Intro</span>
    </button>
  );
}
