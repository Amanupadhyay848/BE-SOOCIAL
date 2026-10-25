'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card3D } from '@/components/ui/Card3D';
import { SpatialConstellationScene } from '@/components/three/SpatialConstellationScene';
import { validateMobileNumber } from '@/lib/validation/phone';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Layers,
  Film,
  Code2,
  TrendingUp,
  Smartphone,
  ShieldCheck,
  KeyRound,
  RotateCcw,
} from 'lucide-react';

const AVAILABLE_SERVICES = [
  {
    id: 'ai-filmmaking',
    title: 'AI Filmmaking',
    description: 'Generative worldbuilding, 4K commercials, neural avatars',
    icon: Sparkles,
  },
  {
    id: 'video-editing',
    title: 'High-Impact Video Editing',
    description: 'Short-form pacing, commercials, 35mm film color grading',
    icon: Film,
  },
  {
    id: 'brand-management',
    title: 'Brand Management',
    description: 'Identity systems, positioning, tone of voice, guidelines',
    icon: Layers,
  },
  {
    id: 'website-development',
    title: 'Website Development',
    description: 'Headless Next.js, Three.js 3D WebGL, 98+ Lighthouse',
    icon: Code2,
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    description: 'Paid media engines, Meta/TikTok performance, funnel CRO',
    icon: TrendingUp,
  },
  {
    id: 'ai-ugc-ads',
    title: 'AI UGC Ads',
    description: 'High-velocity 9:16 ad hooks, creator avatars, ad testing',
    icon: Smartphone,
  },
];

const PREDEFINED_BUDGETS = [
  '$15,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+',
];

const PREDEFINED_TIMELINES = [
  'ASAP (Under 2 Weeks)',
  '4 - 6 Weeks',
  '2 - 3 Months',
  'Quarterly or Ongoing Retainer',
];

type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';
const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export default function StartAProjectPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [services, setServices] = useState<string[]>(['ai-filmmaking']);

  // Budget state
  const [budgetType, setBudgetType] = useState<'predefined' | 'custom'>('predefined');
  const [selectedPredefinedBudget, setSelectedPredefinedBudget] = useState('$25,000 - $50,000');
  const [customCurrency, setCustomCurrency] = useState<Currency>('INR');
  const [customBudgetAmount, setCustomBudgetAmount] = useState<string>('');

  // Timeline state
  const [timelineType, setTimelineType] = useState<'predefined' | 'custom'>('predefined');
  const [selectedPredefinedTimeline, setSelectedPredefinedTimeline] = useState('4 - 6 Weeks');
  const [customTimelineValue, setCustomTimelineValue] = useState<string>('');
  const [customTimelineUnit, setCustomTimelineUnit] = useState<'Days' | 'Weeks' | 'Months'>('Weeks');

  // Contact & Brief State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [brief, setBrief] = useState('');
  const [_hp_verify, setHpVerify] = useState('');

  // Mobile Validation & OTP States
  const [countryCode, setCountryCode] = useState('+91');
  const [mobileRaw, setMobileRaw] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [verifiedToken, setVerifiedToken] = useState('');
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpFeedback, setOtpFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Submission States
  const [submitting, setSubmitting] = useState(false);
  const [serverConfirmed, setServerConfirmed] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // OTP Countdown Timer
  useEffect(() => {
    if (otpCountdown <= 0) return;
    const timer = setInterval(() => {
      setOtpCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCountdown]);

  // Derived Values
  const mobileValidation = validateMobileNumber(mobileRaw, countryCode);

  const formattedBudget =
    budgetType === 'predefined'
      ? selectedPredefinedBudget
      : customBudgetAmount && !isNaN(Number(customBudgetAmount))
      ? `${CURRENCY_SYMBOLS[customCurrency]}${Number(customBudgetAmount).toLocaleString()} (${customCurrency})`
      : 'Custom Budget';

  const formattedTimeline =
    timelineType === 'predefined'
      ? selectedPredefinedTimeline
      : customTimelineValue && !isNaN(Number(customTimelineValue))
      ? `${customTimelineValue} ${customTimelineUnit}`
      : 'Custom Timeline';

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  // Toggle Services
  const toggleService = (id: string) => {
    setServices((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((s) => s !== id);
      }
      return [...prev, id];
    });
  };

  // Step 1 -> Step 2 validation
  const handleProceedToBudget = () => {
    if (services.length === 0) {
      setErrorMsg('Please select at least one discipline.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  // Step 2 -> Step 3 validation (Continue to Brief)
  const handleProceedToBrief = () => {
    if (budgetType === 'custom') {
      const num = Number(customBudgetAmount);
      if (!customBudgetAmount.trim() || isNaN(num) || num <= 0) {
        setErrorMsg('Please enter a valid positive custom budget amount.');
        return;
      }
    }
    if (timelineType === 'custom') {
      const num = Number(customTimelineValue);
      if (!customTimelineValue.trim() || isNaN(num) || num <= 0 || !Number.isInteger(num)) {
        setErrorMsg('Please enter a valid positive whole number for your custom timeline.');
        return;
      }
    }
    setErrorMsg('');
    setStep(3);
  };

  // Trigger Send OTP
  const handleSendOtp = async () => {
    if (!mobileValidation.isValid || !mobileValidation.normalized) {
      setOtpFeedback({
        message: mobileValidation.error || 'Please enter a valid mobile number first.',
        type: 'error',
      });
      return;
    }

    setOtpSending(true);
    setOtpFeedback(null);

    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: mobileValidation.normalized }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch verification code');
      }

      setOtpSent(true);
      setOtpCountdown(30); // 30 second cooldown before resend
      setOtpFeedback({
        message: data.message || 'Verification code dispatched.',
        type: 'success',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send OTP';
      setOtpFeedback({ message: msg, type: 'error' });
    } finally {
      setOtpSending(false);
    }
  };

  // Trigger Verify OTP
  const handleVerifyOtp = async () => {
    if (!otpCode.trim() || otpCode.trim().length < 6) {
      setOtpFeedback({ message: 'Please enter the complete 6-digit code.', type: 'error' });
      return;
    }

    setOtpVerifying(true);
    setOtpFeedback(null);

    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: mobileValidation.normalized,
          code: otpCode.trim(),
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.verified) {
        throw new Error(data.error || 'Invalid verification code');
      }

      setMobileVerified(true);
      setVerifiedToken(data.verificationToken || '');
      setOtpFeedback({
        message: 'Mobile number verified successfully.',
        type: 'success',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Verification failed';
      setOtpFeedback({ message: msg, type: 'error' });
    } finally {
      setOtpVerifying(false);
    }
  };

  // Reset Mobile Number (unlock to enter a new one)
  const handleResetMobile = () => {
    setMobileVerified(false);
    setOtpSent(false);
    setOtpCode('');
    setVerifiedToken('');
    setOtpFeedback(null);
  };

  // Final Brief Submission
  const handleSubmitBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Pre-flight checks
    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg('Full Name must be at least 2 characters.');
      return;
    }
    if (!isEmailValid) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }
    if (!mobileVerified || !verifiedToken) {
      setErrorMsg('Mobile number verification is required. Please verify via OTP.');
      return;
    }
    if (!brief.trim() || brief.trim().length < 10) {
      setErrorMsg('Project brief must be at least 10 characters.');
      return;
    }

    setSubmitting(true);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: mobileValidation.normalized,
      verificationToken: verifiedToken,
      company: company.trim() || undefined,
      brief: brief.trim(),
      budgetRange: formattedBudget,
      currency: budgetType === 'custom' ? customCurrency : undefined,
      customBudget: budgetType === 'custom' ? customBudgetAmount : undefined,
      timeline: formattedTimeline,
      customTimeline: timelineType === 'custom' ? `${customTimelineValue} ${customTimelineUnit}` : undefined,
      services,
      source: 'start-a-project',
      _hp_verify,
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Server rejected brief submission');
      }

      // Notify BroadcastChannel for real-time admin sync
      try {
        const bc = new BroadcastChannel('besoocial_realtime');
        bc.postMessage({ type: 'INQUIRY_CREATED', timestamp: Date.now() });
        bc.close();
      } catch {}

      setServerConfirmed(true);
      setInquiryId(data.inquiryId || `INQ-${Date.now().toString().slice(-6)}`);

      // Celebration Confetti
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#C6FF3D', '#FFFFFF', '#141414'],
        });
      } catch {}
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please check your network.';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black">
      <Header />

      <main className="flex-1 py-14 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <SpatialConstellationScene className="opacity-25" />

        <div className="relative z-10">
          <SectionHeading
            number="COMMISSION"
            tagline="Production Intake"
            title="Start a Project with BE SOOCIAL"
            description="Bridge cinematic direction with neural velocity. Complete the structured brief below to reserve studio allocation."
            align="center"
          />

          {/* Stepper Progress Bar (3 Logical Stages) */}
          {!serverConfirmed && (
            <div className="flex items-center justify-between mb-10 max-w-lg mx-auto">
              {[
                { s: 1, label: 'Disciplines' },
                { s: 2, label: 'Budget & Timeline' },
                { s: 3, label: 'Client Brief' },
              ].map(({ s, label }, idx) => {
                const isActive = step === s;
                const isDone = step > s;
                return (
                  <React.Fragment key={s}>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                          isActive
                            ? 'bg-[#C6FF3D] text-black shadow-[0_0_20px_rgba(198,255,61,0.4)] ring-4 ring-[#C6FF3D]/20 scale-105'
                            : isDone
                            ? 'bg-neutral-800 text-[#C6FF3D] border border-[#C6FF3D]/40'
                            : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                        }`}
                      >
                        {isDone ? <Check className="w-4 h-4 stroke-[2.5]" /> : s}
                      </div>
                      <span className="hidden sm:inline text-xs font-mono text-neutral-400">
                        {label}
                      </span>
                    </div>
                    {idx < 2 && <div className="w-10 sm:w-16 h-[1px] bg-neutral-800 mx-1" />}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {/* Error Notification Strip */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center gap-3 text-xs text-red-300 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Main Card Container */}
          <div className="p-6 md:p-10 rounded-3xl bg-neutral-900/60 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-md relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-64 h-64 bg-[#C6FF3D]/5 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {serverConfirmed ? (
              /* Success / Confirmed View */
              <div className="py-10 text-center space-y-6 relative z-10 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-[#C6FF3D]/20 border border-[#C6FF3D] text-[#C6FF3D] flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(198,255,61,0.35)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  Brief Successfully Registered
                </h3>
                <p className="text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. Your brief has been verified and registered in the BE SOOCIAL executive pipeline. An assigned producer will review your parameters and follow up within one business day.
                </p>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 max-w-md mx-auto text-xs font-mono text-neutral-400 flex justify-between items-center shadow-inner">
                  <span>DISPATCH REFERENCE:</span>
                  <span className="text-[#C6FF3D] font-bold">{inquiryId}</span>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/work"
                    className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white transition-colors"
                  >
                    Explore Studio Archive
                  </Link>
                  <Link
                    href="/"
                    className="px-6 py-3 rounded-xl bg-[#C6FF3D] text-black font-bold text-xs hover:bg-[#b2eb2d] transition-colors"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              <div className="relative z-10">
                {/* ============================================================== */}
                {/* STAGE 1: PROJECT DETAILS (DISCIPLINES) */}
                {/* ============================================================== */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Select Project Disciplines
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Choose one or multiple creative workflows for this production.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {AVAILABLE_SERVICES.map((srv) => {
                        const isSelected = services.includes(srv.id);
                        const Icon = srv.icon;
                        return (
                          <Card3D key={srv.id} maxTilt={5} perspective={1000} liftZ={6} className="h-full">
                            <button
                              type="button"
                              onClick={() => toggleService(srv.id)}
                              className={`w-full h-full p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between backdrop-blur-sm ${
                                isSelected
                                  ? 'bg-neutral-900 border-[#C6FF3D] shadow-[0_0_20px_rgba(198,255,61,0.15)] ring-1 ring-[#C6FF3D]/30'
                                  : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-3 w-full">
                                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center">
                                  <Icon
                                    className={`w-4 h-4 ${
                                      isSelected ? 'text-[#C6FF3D]' : 'text-neutral-400'
                                    }`}
                                  />
                                </div>
                                <div
                                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? 'bg-[#C6FF3D] border-[#C6FF3D] text-black'
                                      : 'border-neutral-700 bg-neutral-900'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-bold text-white mb-1">{srv.title}</div>
                                <div className="text-[11px] text-neutral-400 leading-snug">
                                  {srv.description}
                                </div>
                              </div>
                            </button>
                          </Card3D>
                        );
                      })}
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={handleProceedToBudget}
                        className="px-6 py-3.5 rounded-xl bg-[#C6FF3D] text-black font-bold text-xs hover:bg-[#b2eb2d] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(198,255,61,0.25)] active:scale-95"
                      >
                        <span>Continue to Budget & Timeline</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ============================================================== */}
                {/* STAGE 2: BUDGET & TIMELINE (WITH CUSTOM OPTIONS & CURRENCIES) */}
                {/* ============================================================== */}
                {step === 2 && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Budget & Delivery Timeline
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Choose from our standardized production brackets or enter your custom budget & deadline.
                      </p>
                    </div>

                    {/* SECTION: BUDGET SELECTION */}
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-3">
                        Production Budget
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                        {PREDEFINED_BUDGETS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setBudgetType('predefined');
                              setSelectedPredefinedBudget(opt);
                            }}
                            className={`p-4 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${
                              budgetType === 'predefined' && selectedPredefinedBudget === opt
                                ? 'bg-neutral-900 border-[#C6FF3D] text-[#C6FF3D] font-bold shadow-[0_0_15px_rgba(198,255,61,0.15)] ring-1 ring-[#C6FF3D]/30'
                                : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}

                        {/* Custom Budget Toggle Option */}
                        <button
                          type="button"
                          onClick={() => setBudgetType('custom')}
                          className={`p-4 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer sm:col-span-2 md:col-span-1 ${
                            budgetType === 'custom'
                              ? 'bg-neutral-900 border-[#C6FF3D] text-[#C6FF3D] font-bold shadow-[0_0_15px_rgba(198,255,61,0.15)] ring-1 ring-[#C6FF3D]/30'
                              : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          + Custom Budget
                        </button>
                      </div>

                      {/* Custom Budget Inputs (Amount + Currency Selector) */}
                      {budgetType === 'custom' && (
                        <div className="p-4 rounded-2xl bg-neutral-950 border border-[#C6FF3D]/40 space-y-3 animate-in fade-in slide-in-from-top-2">
                          <span className="text-[11px] font-mono uppercase text-[#C6FF3D] block font-semibold">
                            Enter Custom Investment Parameters
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* Currency Selector */}
                            <div>
                              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                                Currency
                              </label>
                              <select
                                value={customCurrency}
                                onChange={(e) => setCustomCurrency(e.target.value as Currency)}
                                className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:border-[#C6FF3D] outline-none"
                              >
                                <option value="INR">INR — Indian Rupee (₹)</option>
                                <option value="USD">USD — US Dollar ($)</option>
                                <option value="EUR">EUR — Euro (€)</option>
                                <option value="GBP">GBP — British Pound (£)</option>
                              </select>
                            </div>

                            {/* Amount Input */}
                            <div className="sm:col-span-2">
                              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                                Amount ({CURRENCY_SYMBOLS[customCurrency]})
                              </label>
                              <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 font-mono text-xs">
                                  {CURRENCY_SYMBOLS[customCurrency]}
                                </span>
                                <input
                                  type="number"
                                  min="1"
                                  placeholder="e.g. 150000"
                                  value={customBudgetAmount}
                                  onChange={(e) => setCustomBudgetAmount(e.target.value)}
                                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-mono text-white placeholder-neutral-600 focus:border-[#C6FF3D] outline-none"
                                />
                              </div>
                            </div>
                          </div>
                          {customBudgetAmount && !isNaN(Number(customBudgetAmount)) && (
                            <div className="text-[11px] font-mono text-neutral-400">
                              Selected Budget: <strong className="text-white">{CURRENCY_SYMBOLS[customCurrency]}{Number(customBudgetAmount).toLocaleString()} {customCurrency}</strong>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* SECTION: TIMELINE SELECTION */}
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-3">
                        Desired Delivery Timeline
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                        {PREDEFINED_TIMELINES.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setTimelineType('predefined');
                              setSelectedPredefinedTimeline(opt);
                            }}
                            className={`p-4 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${
                              timelineType === 'predefined' && selectedPredefinedTimeline === opt
                                ? 'bg-neutral-900 border-[#C6FF3D] text-[#C6FF3D] font-bold shadow-[0_0_15px_rgba(198,255,61,0.15)] ring-1 ring-[#C6FF3D]/30'
                                : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}

                        {/* Custom Timeline Toggle Option */}
                        <button
                          type="button"
                          onClick={() => setTimelineType('custom')}
                          className={`p-4 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer sm:col-span-2 md:col-span-1 ${
                            timelineType === 'custom'
                              ? 'bg-neutral-900 border-[#C6FF3D] text-[#C6FF3D] font-bold shadow-[0_0_15px_rgba(198,255,61,0.15)] ring-1 ring-[#C6FF3D]/30'
                              : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          + Custom Timeline
                        </button>
                      </div>

                      {/* Custom Timeline Inputs */}
                      {timelineType === 'custom' && (
                        <div className="p-4 rounded-2xl bg-neutral-950 border border-[#C6FF3D]/40 space-y-3 animate-in fade-in slide-in-from-top-2">
                          <span className="text-[11px] font-mono uppercase text-[#C6FF3D] block font-semibold">
                            Define Specific Production Deadline
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                                Duration Number
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="365"
                                placeholder="e.g. 10"
                                value={customTimelineValue}
                                onChange={(e) => setCustomTimelineValue(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-mono text-white placeholder-neutral-600 focus:border-[#C6FF3D] outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                                Unit of Time
                              </label>
                              <select
                                value={customTimelineUnit}
                                onChange={(e) => setCustomTimelineUnit(e.target.value as 'Days' | 'Weeks' | 'Months')}
                                className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:border-[#C6FF3D] outline-none"
                              >
                                <option value="Days">Days</option>
                                <option value="Weeks">Weeks</option>
                                <option value="Months">Months</option>
                              </select>
                            </div>
                          </div>
                          {customTimelineValue && (
                            <div className="text-[11px] font-mono text-neutral-400">
                              Selected Timeline: <strong className="text-white">{customTimelineValue} {customTimelineUnit}</strong>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-6 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-300 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleProceedToBrief}
                        className="px-6 py-3.5 rounded-xl bg-[#C6FF3D] text-black font-bold text-xs hover:bg-[#b2eb2d] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(198,255,61,0.25)] active:scale-95"
                      >
                        <span>Continue to Brief</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ============================================================== */}
                {/* STAGE 3: CLIENT CONTACT & DETAILED PROJECT BRIEF */}
                {/* ============================================================== */}
                {step === 3 && (
                  <form onSubmit={handleSubmitBrief} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Client Contact & Project Brief
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Please provide your official contact information. Mobile OTP verification is required to guarantee communication under NDA.
                      </p>
                    </div>

                    {/* Honeypot field for bot mitigation */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="_hp_verify"
                        tabIndex={-1}
                        autoComplete="off"
                        value={_hp_verify}
                        onChange={(e) => setHpVerify(e.target.value)}
                      />
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jordan Miller"
                          className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C6FF3D] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jordan@company.com"
                          className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                            email && !isEmailValid ? 'border-red-500' : 'border-neutral-800 focus:border-[#C6FF3D]'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Mobile Number & Real OTP Verification Section */}
                    <div className="p-5 rounded-2xl bg-neutral-950/80 border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono text-neutral-300 uppercase flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-[#C6FF3D]" />
                          <span>Mobile Number (Verification Required) *</span>
                        </label>
                        {mobileVerified && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Mobile Verified</span>
                          </span>
                        )}
                      </div>

                      {!mobileVerified ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                            {/* Country Code */}
                            <div className="sm:col-span-3">
                              <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="w-full px-3 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-mono text-white focus:border-[#C6FF3D] outline-none"
                              >
                                <option value="+91">India (+91)</option>
                                <option value="+1">US / CA (+1)</option>
                                <option value="+44">UK (+44)</option>
                                <option value="+971">UAE (+971)</option>
                                <option value="+65">Singapore (+65)</option>
                              </select>
                            </div>

                            {/* Mobile Input */}
                            <div className="sm:col-span-6">
                              <input
                                type="tel"
                                required
                                value={mobileRaw}
                                onChange={(e) => {
                                  setMobileRaw(e.target.value);
                                  setOtpFeedback(null);
                                }}
                                placeholder="98765 43210"
                                className={`w-full px-4 py-3 rounded-xl bg-neutral-900 border text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                                  mobileRaw && !mobileValidation.isValid
                                    ? 'border-red-500/60'
                                    : 'border-neutral-700 focus:border-[#C6FF3D]'
                                }`}
                              />
                            </div>

                            {/* Send OTP Button */}
                            <div className="sm:col-span-3">
                              <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={!mobileValidation.isValid || otpSending || otpCountdown > 0}
                                className="w-full h-full py-3 px-3 rounded-xl bg-neutral-800 hover:bg-[#C6FF3D] hover:text-black text-neutral-200 font-mono text-xs font-bold transition-all disabled:opacity-40 disabled:hover:bg-neutral-800 disabled:hover:text-neutral-200 flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                {otpSending ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : otpCountdown > 0 ? (
                                  <span>Resend in {otpCountdown}s</span>
                                ) : otpSent ? (
                                  <span>Resend OTP</span>
                                ) : (
                                  <span>Send OTP</span>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Level 1 Validation Feedback */}
                          {mobileRaw && !mobileValidation.isValid && (
                            <div className="text-[11px] text-red-400 font-mono">
                              {mobileValidation.error}
                            </div>
                          )}

                          {/* Level 2: OTP Verification Field (Reveals after clicking Send OTP) */}
                          {otpSent && (
                            <div className="pt-3 border-t border-white/[0.08] space-y-3 animate-in fade-in slide-in-from-top-2">
                              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                                <span className="flex items-center gap-1.5">
                                  <KeyRound className="w-3.5 h-3.5 text-[#C6FF3D]" />
                                  <span>Enter 6-Digit Verification Code</span>
                                </span>
                                <span className="text-[10px] text-neutral-500">Expires in 5m</span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                                <div className="sm:col-span-8">
                                  <input
                                    type="text"
                                    maxLength={6}
                                    value={otpCode}
                                    onChange={(e) => {
                                      setOtpCode(e.target.value.replace(/\D/g, ''));
                                      setOtpFeedback(null);
                                    }}
                                    placeholder="e.g. 849201"
                                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-sm font-mono tracking-widest text-white text-center focus:border-[#C6FF3D] outline-none"
                                  />
                                </div>
                                <div className="sm:col-span-4">
                                  <button
                                    type="button"
                                    onClick={handleVerifyOtp}
                                    disabled={otpCode.length < 6 || otpVerifying}
                                    className="w-full h-full py-2.5 px-4 rounded-xl bg-[#C6FF3D] text-black font-mono text-xs font-bold hover:bg-[#b2eb2d] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                                  >
                                    {otpVerifying ? (
                                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    ) : (
                                      <span>Verify OTP</span>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Live Feedback Toast */}
                          {otpFeedback && (
                            <div
                              className={`p-3 rounded-xl text-xs font-mono flex items-start gap-2 ${
                                otpFeedback.type === 'success'
                                  ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                                  : otpFeedback.type === 'error'
                                  ? 'bg-red-950/60 border border-red-500/40 text-red-300'
                                  : 'bg-neutral-900 border border-neutral-700 text-neutral-300'
                              }`}
                            >
                              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                              <div className="leading-relaxed">{otpFeedback.message}</div>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Mobile Verified State */
                        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs font-mono text-emerald-300">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Verified Mobile: <strong className="text-white">{mobileValidation.display}</strong></span>
                          </div>
                          <button
                            type="button"
                            onClick={handleResetMobile}
                            className="text-[11px] text-neutral-400 hover:text-white underline flex items-center gap-1 cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Change</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Company (Optional) */}
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                        Company or Brand Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Apex Luxury Media"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      />
                    </div>

                    {/* Project Brief */}
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                        Project Brief & Vision *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={brief}
                        onChange={(e) => setBrief(e.target.value)}
                        placeholder="Outline key deliverables, reference aesthetic styles, target launch date, and key metrics for success..."
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C6FF3D] transition-colors resize-none"
                      />
                    </div>

                    {/* Structured Summary Strip */}
                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-400 space-y-1">
                      <div>
                        <strong className="text-white">Disciplines:</strong> {services.join(', ')}
                      </div>
                      <div>
                        <strong className="text-white">Allocated Budget:</strong> {formattedBudget} ·{' '}
                        <strong className="text-white">Target Timeline:</strong> {formattedTimeline}
                      </div>
                    </div>

                    {/* Navigation & Submit Button */}
                    <div className="pt-6 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-300 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={submitting || !mobileVerified || !name.trim() || !isEmailValid || brief.trim().length < 10}
                        className="px-8 py-3.5 rounded-xl bg-[#C6FF3D] text-black font-bold text-sm hover:bg-[#b2eb2d] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_24px_rgba(198,255,61,0.3)] cursor-pointer active:scale-95"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Registering Brief...</span>
                          </>
                        ) : !mobileVerified ? (
                          <span>Verify Mobile to Submit Brief</span>
                        ) : (
                          <span>Submit Project Brief</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
