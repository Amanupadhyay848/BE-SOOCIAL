import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black">
      <Header />

      <main className="flex-1 py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#C6FF3D] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Return to Agency Home
        </Link>

        <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
          Terms of Engagement
        </h1>
        <p className="text-xs font-mono text-neutral-400 mb-12">
          Effective Date: October 10, 2026 · BE SOOCIAL LLC
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-neutral-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase font-mono">
              1. Commissioning & Master Service Agreements
            </h2>
            <p>
              Submitting a brief through this website initiates preliminary discussions and scoping. Formal project execution commences upon the mutual signature of a Master Services Agreement (MSA) and Statement of Work (SOW) specifying milestone deliverables and payment schedules.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase font-mono">
              2. Intellectual Property & Commercial Exploitation
            </h2>
            <p>
              Upon final milestone invoice settlement, clients receive full, exclusive worldwide commercial exploitation rights to completed final master exports, video cuts, web codebases, and brand assets created specifically for the project.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase font-mono">
              3. AI Provenance & Warranty
            </h2>
            <p>
              BE SOOCIAL warrants that all generative elements incorporated into final commercial deliverables are compliant with relevant commercial software licenses and do not intentionally infringe on third-party trademarks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase font-mono">
              4. Governing Law
            </h2>
            <p>
              These terms are governed by and construed in accordance with the laws of India, with jurisdiction in Bhopal, Madhya Pradesh.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
