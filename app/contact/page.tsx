'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card3D } from '@/components/ui/Card3D';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SpatialConstellationScene } from '@/components/three/SpatialConstellationScene';
import { CreativeCameraCelebration } from '@/components/forms/CreativeCameraCelebration';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    brief: '',
    budgetRange: '$25,000 - $50,000',
    timeline: '4 - 6 Weeks',
    services: ['brand-management'],
    source: 'contact' as const,
    _hp_verify: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      // Server confirmed
      try {
        const bc = new BroadcastChannel('besoocial_realtime');
        bc.postMessage({ type: 'INQUIRY_CREATED', timestamp: Date.now() });
        bc.close();
      } catch {}
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black">
      <Header />

      <main className="flex-1 py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        {/* Subtle Ambient Spatial Constellation */}
        <SpatialConstellationScene className="opacity-30" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          {/* Left Column: Direct Outreach & Locations with 3D Depth */}
          <ScrollReveal variant="slide-left" duration={0.8} className="lg:col-span-5 space-y-8">
            <SectionHeading
              number="CONTACT"
              tagline="Direct Line"
              title="Initiate Direct Studio Dialogue"
              description="Whether commissioning a high-impact commercial or establishing an ongoing brand partnership, we respond within 24 hours."
            />

            <div className="space-y-6">
              {/* Email Card */}
              <Card3D maxTilt={7} perspective={1000} liftZ={14}>
                <a
                  href="mailto:Besoooocial@gmail.com"
                  className="block p-6 rounded-2xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors backdrop-blur-md space-y-2 shadow-xl group cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-[#C6FF3D]">
                    <Mail className="w-4 h-4" />
                    <span>DIRECT EMAIL</span>
                  </div>
                  <div className="text-base font-bold text-white group-hover:text-[#C6FF3D] transition-colors break-all">
                    Besoooocial@gmail.com
                  </div>
                  <div className="text-xs text-neutral-400">
                    Client briefs, pitch requests, and production inquiries
                  </div>
                </a>
              </Card3D>

              {/* Phone Card */}
              <Card3D maxTilt={7} perspective={1000} liftZ={14}>
                <a
                  href="tel:+916264878719"
                  className="block p-6 rounded-2xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors backdrop-blur-md space-y-2 shadow-xl group cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-[#C6FF3D]">
                    <Phone className="w-4 h-4" />
                    <span>PHONE / WHATSAPP</span>
                  </div>
                  <div className="text-base font-bold text-white group-hover:text-[#C6FF3D] transition-colors font-mono">
                    +91 6264878719
                  </div>
                  <div className="text-xs text-neutral-400">
                    Direct producer line (Mon – Sat, 10:00 AM – 7:00 PM IST)
                  </div>
                </a>
              </Card3D>

              {/* Location Card */}
              <Card3D maxTilt={7} perspective={1000} liftZ={14}>
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors backdrop-blur-md space-y-2 shadow-xl">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#C6FF3D]">
                    <MapPin className="w-4 h-4" />
                    <span>STUDIO LOCATION (INDIA ONLY)</span>
                  </div>
                  <div className="text-sm font-bold text-white">BE SOOCIAL Studio</div>
                  <div className="text-xs text-neutral-400 leading-relaxed">
                    Kolar Road, Bhopal,<br />
                    Madhya Pradesh, India
                  </div>
                </div>
              </Card3D>
            </div>
          </ScrollReveal>

          {/* Right Column: Verified Inquiry Form (Stable and fully accessible) */}
          <ScrollReveal variant="slide-right" duration={0.8} className="lg:col-span-7">
            <div className="p-8 md:p-12 rounded-3xl bg-neutral-900/60 border border-white/[0.08] shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-[#C6FF3D]/5 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              {success ? (
                <CreativeCameraCelebration
                  clientName={formData.name}
                  onReset={() => {
                    setSuccess(false);
                    setFormData({
                      name: '',
                      email: '',
                      company: '',
                      brief: '',
                      budgetRange: '$25,000 - $50,000',
                      timeline: '4 - 6 Weeks',
                      services: ['brand-management'],
                      source: 'contact',
                      _hp_verify: '',
                    });
                  }}
                />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2">Send a Direct Message</h3>

                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center gap-3 text-xs text-red-300">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Honeypot field (hidden from view) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="_hp_verify"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData._hp_verify}
                      onChange={(e) => setFormData({ ...formData, _hp_verify: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C6FF3D] focus:ring-2 focus:ring-[#C6FF3D]/20 focus:shadow-[0_0_15px_rgba(198,255,61,0.12)] transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C6FF3D] focus:ring-2 focus:ring-[#C6FF3D]/20 focus:shadow-[0_0_15px_rgba(198,255,61,0.12)] transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Studios Inc."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C6FF3D] focus:ring-2 focus:ring-[#C6FF3D]/20 focus:shadow-[0_0_15px_rgba(198,255,61,0.12)] transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                      Project Brief or Objectives *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.brief}
                      onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                      placeholder="Outline your target deliverables, key deadlines, and aesthetic vision..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C6FF3D] focus:ring-2 focus:ring-[#C6FF3D]/20 focus:shadow-[0_0_15px_rgba(198,255,61,0.12)] transition-all duration-300 resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className="w-full py-4 rounded-xl bg-[#C6FF3D] text-black font-bold text-sm hover:bg-[#b2eb2d] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_24px_rgba(198,255,61,0.25)] hover:shadow-[0_0_35px_rgba(198,255,61,0.45)]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting to Server...</span>
                      </>
                    ) : (
                      <span>Submit Inquiry</span>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
