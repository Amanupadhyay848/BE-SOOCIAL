'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreativeCameraCelebration } from './CreativeCameraCelebration';
import { AlertCircle, Loader2, Send, Sparkles } from 'lucide-react';

interface ServiceEnquiryFormProps {
  serviceSlug?: string;
  serviceTitle?: string;
  headline?: string;
  subheadline?: string;
}

export function ServiceEnquiryForm({
  serviceSlug = 'general',
  serviceTitle = 'Creative Production',
  headline = 'Commission This Discipline',
  subheadline = 'Share your project brief. We review every submission within 24 business hours.',
}: ServiceEnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    brief: '',
    budgetRange: '$25,000 - $50,000',
    timeline: '4 - 6 Weeks',
    services: [serviceSlug],
    source: 'service-detail' as const,
    _hp_verify: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Validate form fields inline
  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Full name or company representative name is required.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Business email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email format (e.g., name@brand.com).';
    }
    if (!formData.brief.trim()) {
      errors.brief = 'Project scope or narrative brief is required.';
    } else if (formData.brief.trim().length < 10) {
      errors.brief = 'Please describe your objectives in at least 10 characters.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          services: [serviceSlug],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server encountered an error processing your brief.');
      }

      // Backend confirmed success!
      try {
        const bc = new BroadcastChannel('besoocial_realtime');
        bc.postMessage({ type: 'INQUIRY_CREATED', timestamp: Date.now() });
        bc.close();
      } catch {}
      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(err.message);
      } else {
        setApiError('An unexpected network error occurred. Please try again.');
      }
      // Form values are preserved so the user can edit and retry immediately
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setApiError(null);
    setFieldErrors({});
    setFormData({
      name: '',
      email: '',
      company: '',
      brief: '',
      budgetRange: '$25,000 - $50,000',
      timeline: '4 - 6 Weeks',
      services: [serviceSlug],
      source: 'service-detail',
      _hp_verify: '',
    });
  };

  return (
    <div className="relative w-full rounded-3xl bg-neutral-900/60 border border-white/[0.08] p-6 sm:p-10 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Ambient background lime glow */}
      <div
        className="absolute top-0 right-0 w-80 h-80 bg-[#C6FF3D]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {isSuccess ? (
        <CreativeCameraCelebration onReset={handleReset} clientName={formData.name} />
      ) : (
        <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-6">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C6FF3D] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C6FF3D]" />
              <span>DIRECT PRODUCTION SCOPING</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {headline}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {subheadline}
            </p>
          </div>

          {/* Global API Error Alert */}
          {apiError && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-3 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <div>
                <span className="font-semibold block mb-0.5">Submission Error</span>
                <span>{apiError}</span>
              </div>
            </div>
          )}

          {/* Honeypot anti-spam field */}
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

          {/* Grid: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="enquiry-name" className="block text-xs font-mono text-neutral-300 mb-1.5">
                Your Name <span className="text-[#C6FF3D]">*</span>
              </label>
              <input
                id="enquiry-name"
                type="text"
                disabled={isSubmitting}
                placeholder="e.g. Jordan Hayes"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                }}
                className={`w-full px-4 py-3 rounded-xl bg-neutral-950/80 border text-xs text-white placeholder-neutral-500 outline-none transition-all duration-300 ${
                  fieldErrors.name
                    ? 'border-red-500/60 focus:border-red-500'
                    : 'border-white/10 focus:border-[#C6FF3D] focus:ring-2 focus:ring-[#C6FF3D]/20 focus:shadow-[0_0_15px_rgba(198,255,61,0.12)]'
                }`}
              />
              {fieldErrors.name && (
                <p className="mt-1 text-[11px] text-red-400">{fieldErrors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="enquiry-email" className="block text-xs font-mono text-neutral-300 mb-1.5">
                Work Email <span className="text-[#C6FF3D]">*</span>
              </label>
              <input
                id="enquiry-email"
                type="email"
                disabled={isSubmitting}
                placeholder="jordan@brand.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                }}
                className={`w-full px-4 py-3 rounded-xl bg-neutral-950/80 border text-xs text-white placeholder-neutral-500 outline-none transition-all duration-300 ${
                  fieldErrors.email
                    ? 'border-red-500/60 focus:border-red-500'
                    : 'border-white/10 focus:border-[#C6FF3D] focus:ring-2 focus:ring-[#C6FF3D]/20 focus:shadow-[0_0_15px_rgba(198,255,61,0.12)]'
                }`}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-[11px] text-red-400">{fieldErrors.email}</p>
              )}
            </div>
          </div>

          {/* Grid: Company & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="enquiry-company" className="block text-xs font-mono text-neutral-300 mb-1.5">
                Brand / Organization <span className="text-neutral-500">(Optional)</span>
              </label>
              <input
                id="enquiry-company"
                type="text"
                disabled={isSubmitting}
                placeholder="e.g. Apex Hypercars Ltd"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-white/10 text-xs text-white placeholder-neutral-500 outline-none focus:border-[#C6FF3D] focus:ring-2 focus:ring-[#C6FF3D]/20 focus:shadow-[0_0_15px_rgba(198,255,61,0.12)] transition-all duration-300"
              />
            </div>

            <div>
              <label htmlFor="enquiry-budget" className="block text-xs font-mono text-neutral-300 mb-1.5">
                Budget Allocation
              </label>
              <select
                id="enquiry-budget"
                disabled={isSubmitting}
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/10 text-xs text-neutral-200 outline-none focus:border-[#C6FF3D] focus:ring-2 focus:ring-[#C6FF3D]/20 focus:shadow-[0_0_15px_rgba(198,255,61,0.12)] transition-all duration-300 cursor-pointer"
              >
                <option value="$10,000 - $25,000">$10,000 – $25,000 (Sprint)</option>
                <option value="$25,000 - $50,000">$25,000 – $50,000 (Standard)</option>
                <option value="$50,000 - $100,000">$50,000 – $100,000 (Full-Funnel)</option>
                <option value="$100,000+">$100,000+ (Enterprise Worldbuilding)</option>
              </select>
            </div>
          </div>

          {/* Project Brief */}
          <div>
            <label htmlFor="enquiry-brief" className="block text-xs font-mono text-neutral-300 mb-1.5">
              Project Brief & Objectives <span className="text-[#C6FF3D]">*</span>
            </label>
            <textarea
              id="enquiry-brief"
              rows={4}
              disabled={isSubmitting}
              placeholder={`Outline your vision, target launch date, and key deliverables for ${serviceTitle}...`}
              value={formData.brief}
              onChange={(e) => {
                setFormData({ ...formData, brief: e.target.value });
                if (fieldErrors.brief) setFieldErrors({ ...fieldErrors, brief: '' });
              }}
              className={`w-full px-4 py-3 rounded-xl bg-neutral-950/80 border text-xs text-white placeholder-neutral-500 outline-none transition-all duration-300 resize-y ${
                fieldErrors.brief
                  ? 'border-red-500/60 focus:border-red-500'
                  : 'border-white/10 focus:border-[#C6FF3D] focus:ring-2 focus:ring-[#C6FF3D]/20 focus:shadow-[0_0_15px_rgba(198,255,61,0.12)]'
              }`}
            />
            {fieldErrors.brief && (
              <p className="mt-1 text-[11px] text-red-400">{fieldErrors.brief}</p>
            )}
          </div>

          {/* Submit Action Button with Micro-Interaction */}
          <div className="pt-2">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#C6FF3D] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b2eb2d] transition-all flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(198,255,61,0.25)] hover:shadow-[0_0_35px_rgba(198,255,61,0.45)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering Brief...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Studio</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      )}
    </div>
  );
}
