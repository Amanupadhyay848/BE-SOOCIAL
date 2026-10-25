import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black">
      <Header />

      <main className="flex-1 flex items-center justify-center py-24 px-4 text-center">
        <div className="max-w-md space-y-6">
          <div className="text-xs font-mono text-[#C6FF3D] uppercase tracking-widest">
            ERROR 404
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Frame Not Found
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            The studio page or project reel you are attempting to view does not exist or has been archived.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6FF3D] text-black font-bold text-xs hover:bg-[#b2eb2d] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Agency Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
