'use client';

import React, { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RotateCcw } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled applet error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black">
      <Header />

      <main className="flex-1 flex items-center justify-center py-24 px-4 text-center">
        <div className="max-w-md space-y-6">
          <div className="text-xs font-mono text-red-400 uppercase tracking-widest">
            SYSTEM ANOMALY
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Unexpected Render Fault
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            A temporary render error occurred. Our logging systems have recorded the event.
          </p>
          <div className="pt-4">
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Re-attempt Render
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
