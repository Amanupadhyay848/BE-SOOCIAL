import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-neutral-400 mb-12">
          Effective Date: October 10, 2026 · BE SOOCIAL LLC
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-neutral-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase font-mono">
              1. Information We Collect
            </h2>
            <p>
              BE SOOCIAL collects information you provide directly through our project wizard, contact forms, or email correspondence. This includes your name, work email address, company name, project brief details, and budget parameters.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase font-mono">
              2. Use of Information
            </h2>
            <p>
              Information collected is used strictly to evaluate inbound project briefs, prepare commercial proposals, execute non-disclosure agreements, and coordinate ongoing production services. We do not sell, rent, or monetize your client data to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase font-mono">
              3. AI & Generative Model Privacy
            </h2>
            <p>
              Client raw footage, brand assets, and proprietary strategy documents submitted to BE SOOCIAL are never used to train public generative foundation models. All neural studio workflows operate within isolated enterprise instances.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white uppercase font-mono">
              4. Data Retention & Deletion
            </h2>
            <p>
              Inquiry submissions are retained for business communication purposes. You may request the immediate deletion of your submitted briefs and contact records at any time by contacting Besoooocial@gmail.com.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
