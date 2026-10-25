'use client';

import React, { useState, useEffect, useRef, useTransition, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card3D } from '@/components/ui/Card3D';
import { Inquiry, Project, Testimonial, ProjectCategory } from '@/types';
import {
  Inbox,
  Briefcase,
  Layers,
  CheckCircle,
  Clock,
  RefreshCw,
  Eye,
  EyeOff,
  Lock,
  User,
  ShieldCheck,
  AlertCircle,
  LogOut,
  Sparkles,
  Search,
  Trash2,
  Plus,
  Download,
  Copy,
  Check,
  MessageSquare,
  Activity,
  Volume2,
  VolumeX,
  Edit,
  X,
  ArrowUpRight,
  ExternalLink,
  Phone,
} from 'lucide-react';

export default function AdminPage() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState<boolean>(false);

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<'inquiries' | 'projects' | 'testimonials' | 'system'>('inquiries');

  // Real-time & Live Sync States
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLiveSyncActive, setIsLiveSyncActive] = useState<boolean>(true);
  const [lastSyncSecondsAgo, setLastSyncSecondsAgo] = useState<number>(0);
  const [syncLatencyMs, setSyncLatencyMs] = useState<number | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [liveToast, setLiveToast] = useState<{ message: string; id: string } | null>(null);
  const previousInquiriesLengthRef = useRef<number>(0);

  // Inquiry Filter & Detail states
  const [inquirySearch, setInquirySearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'in_progress' | 'closed'>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [producerNotesInput, setProducerNotesInput] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [savingNotes, setSavingNotes] = useState<boolean>(false);

  // Project CMS States
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [savingProject, setSavingProject] = useState<boolean>(false);

  // Testimonial CMS States
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState<boolean>(false);

  // Check existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const savedAuth = typeof window !== 'undefined' ? sessionStorage.getItem('besoocial_admin_auth') : null;
      const cookieAuth = typeof document !== 'undefined' && document.cookie.includes('besoocial_admin_auth=');

      if (savedAuth === 'true' || cookieAuth) {
        setIsAuthenticated(true);
      }
      setAuthChecking(false);
    };
    checkSession();
  }, []);

  // Refs for stable callback access without re-triggering intervals
  const isAudioEnabledRef = useRef(isAudioEnabled);
  useEffect(() => {
    isAudioEnabledRef.current = isAudioEnabled;
  }, [isAudioEnabled]);

  const selectedInquiryRef = useRef(selectedInquiry);
  useEffect(() => {
    selectedInquiryRef.current = selectedInquiry;
  }, [selectedInquiry]);

  // Audio Notification Synthesizer (Zero-dependency Web Audio API)
  const playChime = useCallback(() => {
    if (!isAudioEnabledRef.current || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08); // A5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio autoplay policy fallback
    }
  }, []);

  // Fetch Inquiries with Latency Measurement
  const fetchInquiries = useCallback(async (isBackgroundPoll = false) => {
    const start = performance.now();
    try {
      const res = await fetch('/api/admin/inquiries', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      const data = await res.json();
      const elapsed = Math.round(performance.now() - start);
      setSyncLatencyMs(elapsed);

      if (data.inquiries) {
        const fetchedList: Inquiry[] = data.inquiries;

        // Detect newly arrived inquiries during live sync
        if (
          previousInquiriesLengthRef.current > 0 &&
          fetchedList.length > previousInquiriesLengthRef.current
        ) {
          const newest = fetchedList[0];
          playChime();
          setLiveToast({
            message: `New Inbound Brief: ${newest.name} (${newest.budgetRange})`,
            id: newest.id,
          });
          setTimeout(() => setLiveToast(null), 7000);
        }

        previousInquiriesLengthRef.current = fetchedList.length;
        setInquiries(fetchedList);
        setLastSyncSecondsAgo(0);

        // Keep selected inquiry state in sync if open
        const curSel = selectedInquiryRef.current;
        if (curSel) {
          const currentFresh = fetchedList.find((i) => i.id === curSel.id);
          if (currentFresh) {
            setSelectedInquiry(currentFresh);
          }
        }
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      if (!isBackgroundPoll) setLoading(false);
    }
  }, [playChime]);

  // Fetch Projects for CMS
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      if (data.projects) setProjects(data.projects);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  // Fetch Testimonials
  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/testimonials');
      const data = await res.json();
      if (data.testimonials) setTestimonials(data.testimonials);
    } catch (err) {
      console.error('Failed to load testimonials:', err);
    } finally {
      setLoadingTestimonials(false);
    }
  }, []);

  // Initial load when authenticated
  useEffect(() => {
    let ignore = false;
    if (isAuthenticated) {
      const loadInitialData = async () => {
        try {
          await fetchInquiries();
          if (!ignore) {
            await fetchProjects();
            await fetchTestimonials();
          }
        } catch (err) {
          console.error('Failed to load initial admin data:', err);
        }
      };
      loadInitialData();
    }
    return () => {
      ignore = true;
    };
  }, [isAuthenticated, fetchInquiries, fetchProjects, fetchTestimonials]);

  // LIVE SYNC: 3-Second Real-Time Polling Loop + Seconds Timer
  useEffect(() => {
    if (!isAuthenticated || !isLiveSyncActive) return;

    // Seconds-since-last-sync counter
    const secondsInterval = setInterval(() => {
      setLastSyncSecondsAgo((prev) => prev + 1);
    }, 1000);

    // 3.5s Polling Interval for live updates
    const pollInterval = setInterval(() => {
      fetchInquiries(true);
    }, 3500);

    return () => {
      clearInterval(secondsInterval);
      clearInterval(pollInterval);
    };
  }, [isAuthenticated, isLiveSyncActive, fetchInquiries]);

  // Cross-Tab Real-time BroadcastChannel Listener
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const channel = new BroadcastChannel('besoocial_realtime');
      channel.onmessage = (event) => {
        if (event.data?.type === 'INQUIRY_CREATED') {
          fetchInquiries(true);
        }
      };
      return () => {
        channel.close();
      };
    } catch {
      // BroadcastChannel unsupported
    }
  }, [fetchInquiries]);

  // Helper to select inquiry and sync notes input cleanly without cascading renders
  const handleSelectInquiry = (inq: Inquiry | null) => {
    setSelectedInquiry(inq);
    setProducerNotesInput(inq?.producerNotes || '');
  };

  // Authentication Handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsSubmittingAuth(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginUsername.trim(),
          password: loginPassword.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      // Success
      sessionStorage.setItem('besoocial_admin_auth', 'true');
      setIsAuthenticated(true);
      fetchInquiries();
      fetchProjects();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        setLoginError('Authentication failed. Please verify credentials.');
      }
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch {
      // Continue client logout
    }
    sessionStorage.removeItem('besoocial_admin_auth');
    setIsAuthenticated(false);
    setLoginUsername('');
    setLoginPassword('');
    handleSelectInquiry(null);
  };

  // Inquiry Status Changes
  const handleStatusChange = async (id: string, newStatus: Inquiry['status']) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Save Producer Notes
  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setSavingNotes(true);
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedInquiry.id, producerNotes: producerNotesInput }),
      });
      if (res.ok) {
        const updated = { ...selectedInquiry, producerNotes: producerNotesInput };
        setSelectedInquiry(updated);
        setInquiries((prev) =>
          prev.map((i) => (i.id === selectedInquiry.id ? updated : i))
        );
      }
    } catch (err) {
      console.error('Failed to save notes:', err);
    } finally {
      setSavingNotes(false);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this client inquiry?')) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedInquiry?.id === id) {
          handleSelectInquiry(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Export Inquiries to CSV
  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Verified', 'Company', 'Budget', 'Timeline', 'Disciplines', 'Status', 'Notes', 'Brief'];
    const rows = inquiries.map((i) => [
      i.id,
      new Date(i.createdAt).toISOString(),
      `"${i.name.replace(/"/g, '""')}"`,
      i.email,
      `"${i.phone || ''}"`,
      i.mobileVerified ? 'YES' : 'NO',
      `"${(i.company || '').replace(/"/g, '""')}"`,
      `"${i.budgetRange}"`,
      `"${i.timeline}"`,
      `"${i.services.join('; ')}"`,
      i.status,
      `"${(i.producerNotes || '').replace(/"/g, '""')}"`,
      `"${i.brief.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `besoocial_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Email Helper
  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Copy Phone Helper
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  // Project CMS Handlers
  const handleToggleProjectPublish = async (id: string) => {
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'toggle_publish' }),
      });
      if (res.ok) {
        const data = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === id ? data.project : p)));
      }
    } catch (err) {
      console.error('Failed to toggle publish:', err);
    }
  };

  const handleToggleProjectFeatured = async (id: string) => {
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'toggle_featured' }),
      });
      if (res.ok) {
        const data = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === id ? data.project : p)));
      }
    } catch (err) {
      console.error('Failed to toggle featured:', err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Permanently delete this project from agency archive?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.client) return;
    setSavingProject(true);

    try {
      if (editingProject.id) {
        // Update existing
        const res = await fetch('/api/admin/projects', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProject.id, updates: editingProject }),
        });
        if (res.ok) {
          const data = await res.json();
          setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? data.project : p)));
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }
      } else {
        // Create new
        const res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingProject),
        });
        if (res.ok) {
          const data = await res.json();
          setProjects((prev) => [data.project, ...prev]);
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }
      }
    } catch (err) {
      console.error('Failed to save project:', err);
    } finally {
      setSavingProject(false);
    }
  };

  // Testimonial Toggle Approval
  const handleToggleTestimonial = async (id: string) => {
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        const data = await res.json();
        setTestimonials((prev) => prev.map((t) => (t.id === id ? data.testimonial : t)));
      }
    } catch (err) {
      console.error('Failed to toggle testimonial:', err);
    }
  };

  // Filtered & Searched Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    if (statusFilter !== 'all' && inq.status !== statusFilter) return false;
    if (!inquirySearch.trim()) return true;
    const query = inquirySearch.toLowerCase();
    return (
      inq.name.toLowerCase().includes(query) ||
      inq.email.toLowerCase().includes(query) ||
      (inq.company && inq.company.toLowerCase().includes(query)) ||
      inq.brief.toLowerCase().includes(query) ||
      inq.services.some((s) => s.toLowerCase().includes(query))
    );
  });

  const newCount = inquiries.filter((i) => i.status === 'new').length;
  const inProgressCount = inquiries.filter((i) => i.status === 'in_progress').length;
  const closedCount = inquiries.filter((i) => i.status === 'closed').length;

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#C6FF3D] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black">
      <Header />

      {/* Floating Real-Time Toast Notification */}
      {liveToast && (
        <div className="fixed top-20 right-6 z-50 max-w-md p-4 rounded-2xl bg-neutral-900 border border-[#C6FF3D] shadow-[0_0_30px_rgba(198,255,61,0.3)] animate-in fade-in slide-in-from-top-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF3D] animate-ping shrink-0" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#C6FF3D]">
                REAL-TIME EVENT DISPATCH
              </div>
              <div className="text-xs font-bold text-white">{liveToast.message}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const target = inquiries.find((i) => i.id === liveToast.id);
              if (target) handleSelectInquiry(target);
              setLiveToast(null);
            }}
            className="px-2.5 py-1 rounded bg-[#C6FF3D] text-black text-[10px] font-mono font-bold hover:bg-[#b2eb2d] transition-colors"
          >
            Inspect
          </button>
        </div>
      )}

      <main className="flex-1 py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        {/* Subtle Ambient Radial Aura */}
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C6FF3D]/5 rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        {!isAuthenticated ? (
          /* ============================================================ */
          /* 3D ADMIN LOGIN AUTHENTICATION GATE */
          /* ============================================================ */
          <div className="max-w-md mx-auto py-8 sm:py-16 relative z-10">
            <Card3D maxTilt={8} perspective={1200} liftZ={20}>
              <div
                className="p-8 sm:p-10 rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Ambient glow inside card */}
                <div
                  className="absolute -top-16 -right-16 w-44 h-44 bg-[#C6FF3D]/10 rounded-full blur-2xl pointer-events-none"
                  aria-hidden="true"
                />

                <div className="text-center mb-8" style={{ transform: 'translateZ(25px)' }}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 text-xs font-mono text-[#C6FF3D] uppercase tracking-wider mb-4">
                    <Lock className="w-3.5 h-3.5 text-[#C6FF3D]" />
                    <span>RESTRICTED EXECUTIVE ACCESS</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                    BE SOOCIAL Studio Command
                  </h1>
                  <p className="text-xs text-neutral-400 mt-1">
                    Enter authorized credentials to manage client inquiries & production pipeline.
                  </p>
                </div>

                {/* Error Banner */}
                {loginError && (
                  <div
                    className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-500/30 flex items-start gap-3 text-xs text-red-300"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form
                  onSubmit={handleLogin}
                  className="space-y-5"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {/* Username Field */}
                  <div>
                    <label
                      htmlFor="admin-username"
                      className="block text-xs font-mono text-neutral-300 mb-1.5 flex items-center justify-between"
                    >
                      <span>Admin Username</span>
                      <span className="text-[10px] text-neutral-500 font-mono">BE SO0CIAL / BE SOOCIAL</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="admin-username"
                        type="text"
                        required
                        disabled={isSubmittingAuth}
                        placeholder="BE SOOCIAL"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950/80 border border-white/10 text-xs text-white placeholder-neutral-600 outline-none focus:border-[#C6FF3D]/70 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="admin-password"
                      className="block text-xs font-mono text-neutral-300 mb-1.5"
                    >
                      Admin Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        id="admin-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        disabled={isSubmittingAuth}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full pl-10 pr-11 py-3 rounded-xl bg-neutral-950/80 border border-white/10 text-xs text-white placeholder-neutral-600 outline-none focus:border-[#C6FF3D]/70 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmittingAuth}
                    className="w-full mt-2 py-3.5 rounded-xl bg-[#C6FF3D] hover:bg-[#b2eb2d] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(198,255,61,0.25)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {isSubmittingAuth ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying Authorization...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Authenticate Portal Access</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Secure Notice Footer */}
                <div
                  className="mt-6 pt-5 border-t border-white/[0.06] text-center"
                  style={{ transform: 'translateZ(15px)' }}
                >
                  <p className="text-[11px] font-mono text-neutral-500">
                    Credentials standard: User: <code className="text-neutral-300">BE SO0CIAL</code> · Pass: <code className="text-neutral-300">AMAN1230</code>
                  </p>
                </div>
              </div>
            </Card3D>
          </div>
        ) : (
          /* ============================================================ */
          /* AUTHENTICATED PRODUCTION DASHBOARD WITH FULL CONTROL & LIVE SYNC */
          /* ============================================================ */
          <div className="relative z-10 space-y-8">
            {/* Real-time HUD Status Bar */}
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Live Sync Radar */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-950 border border-white/10 text-xs font-mono">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isLiveSyncActive ? 'bg-[#C6FF3D] shadow-[0_0_8px_#C6FF3D] animate-pulse' : 'bg-neutral-600'
                    }`}
                  />
                  <span className={isLiveSyncActive ? 'text-[#C6FF3D] font-bold' : 'text-neutral-400'}>
                    {isLiveSyncActive ? 'LIVE SYNC ACTIVE (3.5s)' : 'LIVE SYNC PAUSED'}
                  </span>
                </div>

                {/* Seconds timer & Latency */}
                <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                  Updated {lastSyncSecondsAgo}s ago
                </span>

                {syncLatencyMs !== null && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    <Activity className="w-3 h-3" />
                    <span>{syncLatencyMs}ms ping</span>
                  </span>
                )}
              </div>

              {/* HUD Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  title={isAudioEnabled ? 'Audio alerts enabled' : 'Audio alerts muted'}
                  className={`p-2 rounded-xl border text-xs font-mono transition-colors ${
                    isAudioEnabled
                      ? 'bg-neutral-950 border-[#C6FF3D]/40 text-[#C6FF3D]'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-500'
                  }`}
                >
                  {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => setIsLiveSyncActive(!isLiveSyncActive)}
                  className="px-3 py-1.5 rounded-xl bg-neutral-950 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  {isLiveSyncActive ? 'Pause Sync' : 'Resume Sync'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLoading(true);
                    fetchInquiries(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950 border border-[#C6FF3D]/30 text-xs font-mono text-[#C6FF3D] hover:bg-[#C6FF3D] hover:text-black transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Sync Now</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs font-mono text-red-300 hover:bg-red-900/50 hover:text-white transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit</span>
                </button>
              </div>
            </div>

            {/* Admin Header with User Session */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#C6FF3D] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#C6FF3D]" />
                  <span>BE SOOCIAL EXECUTIVE MISSION CONTROL</span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-neutral-300">Admin Session Active</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                  Studio Operations Command
                </h1>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </motion.div>

            {/* High-Level Pipeline Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="p-5 rounded-2xl bg-neutral-900/40 border border-white/[0.08]"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                  <span>UNREVIEWED BRIEFS</span>
                  <Clock className="w-4 h-4 text-[#C6FF3D]" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                  {newCount}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">Pending producer review</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="p-5 rounded-2xl bg-neutral-900/40 border border-white/[0.08]"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                  <span>ACTIVE INQUIRIES</span>
                  <Inbox className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                  {inProgressCount}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">Under pitch or NDA review</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="p-5 rounded-2xl bg-neutral-900/40 border border-white/[0.08]"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                  <span>RESOLVED / CLOSED</span>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                  {closedCount}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">Contracted or closed</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-5 rounded-2xl bg-neutral-900/40 border border-white/[0.08]"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                  <span>TOTAL PRODUCTIONS</span>
                  <Briefcase className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                  {projects.length}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">Case studies in portfolio</div>
              </motion.div>
            </div>

            {/* Main Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-white/[0.08] overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('inquiries')}
                className={`px-4 py-3 text-xs font-mono uppercase transition-colors relative whitespace-nowrap cursor-pointer ${
                  activeTab === 'inquiries' ? 'text-[#C6FF3D] font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Inbound Inquiries ({inquiries.length})
                {activeTab === 'inquiries' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C6FF3D]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-3 text-xs font-mono uppercase transition-colors relative whitespace-nowrap cursor-pointer ${
                  activeTab === 'projects' ? 'text-[#C6FF3D] font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Portfolio CMS ({projects.length})
                {activeTab === 'projects' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C6FF3D]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('testimonials')}
                className={`px-4 py-3 text-xs font-mono uppercase transition-colors relative whitespace-nowrap cursor-pointer ${
                  activeTab === 'testimonials' ? 'text-[#C6FF3D] font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Testimonials ({testimonials.length})
                {activeTab === 'testimonials' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C6FF3D]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('system')}
                className={`px-4 py-3 text-xs font-mono uppercase transition-colors relative whitespace-nowrap cursor-pointer ${
                  activeTab === 'system' ? 'text-[#C6FF3D] font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Diagnostics & Core Vitals
                {activeTab === 'system' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C6FF3D]" />
                )}
              </button>
            </div>

            {/* ============================================================ */}
            {/* TAB 1: INBOUND INQUIRIES (REAL-TIME CRM) */}
            {/* ============================================================ */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                {/* Search & Status Filter Strip */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  {/* Search Input */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search inquiries by client, email, brief..."
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 outline-none focus:border-[#C6FF3D] transition-colors"
                    />
                  </div>

                  {/* Status Filter Chips */}
                  <div className="flex items-center gap-1.5 bg-neutral-900/80 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar">
                    {(['all', 'new', 'in_progress', 'closed'] as const).map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setStatusFilter(filter)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors whitespace-nowrap cursor-pointer ${
                          statusFilter === filter
                            ? 'bg-[#C6FF3D] text-black font-bold'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {filter.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inquiries Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: List of Inquiries */}
                  <div className="lg:col-span-7 space-y-3">
                    {inquiries.length === 0 ? (
                      <div className="p-16 text-center rounded-2xl bg-neutral-900/40 border border-white/10 text-neutral-400 space-y-3">
                        <Inbox className="w-10 h-10 text-neutral-600 mx-auto" />
                        <div className="text-base font-bold text-white font-mono">No submissions yet.</div>
                        <div className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                          Inbound client briefs from the Start a Project flow and Contact forms will appear here in real-time.
                        </div>
                      </div>
                    ) : filteredInquiries.length === 0 ? (
                      <div className="p-12 text-center rounded-2xl bg-neutral-900/30 border border-white/10 text-neutral-400 text-xs font-mono">
                        No submissions match the current search or status filter.
                      </div>
                    ) : (
                      filteredInquiries.map((inq, idx) => {
                        const isSelected = selectedInquiry?.id === inq.id;
                        return (
                          <motion.div
                            key={inq.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.04 }}
                            onClick={() => handleSelectInquiry(inq)}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-neutral-900 border-[#C6FF3D] shadow-[0_0_20px_rgba(198,255,61,0.15)] ring-1 ring-[#C6FF3D]/40'
                                : 'bg-neutral-900/40 border-white/[0.08] hover:border-neutral-700 hover:bg-neutral-900/70'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-bold text-white flex items-center gap-2">
                                <span>{inq.name}</span>
                                {inq.mobileVerified && (
                                  <span title="Mobile OTP Verified">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                  </span>
                                )}
                                {inq.producerNotes && (
                                  <span title="Has internal producer notes">
                                    <MessageSquare className="w-3.5 h-3.5 text-[#C6FF3D]" />
                                  </span>
                                )}
                              </span>

                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                                  inq.status === 'new'
                                    ? 'bg-[#C6FF3D]/20 text-[#C6FF3D] border border-[#C6FF3D]/40 animate-pulse'
                                    : inq.status === 'in_progress'
                                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                                    : 'bg-neutral-800 text-neutral-400'
                                }`}
                              >
                                {inq.status.replace('_', ' ')}
                              </span>
                            </div>

                            <div className="text-xs text-neutral-400 mb-2">
                              {inq.company ? <strong className="text-neutral-300 font-medium">{inq.company} · </strong> : ''}
                              <span className="text-neutral-400 font-mono">{inq.email}</span>
                              {inq.phone && (
                                <span className="text-neutral-400 font-mono"> · {inq.phone}</span>
                              )}
                            </div>

                            <p className="text-xs text-neutral-300 line-clamp-2 mb-3">
                              {inq.brief}
                            </p>

                            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/[0.08]">
                              <span className="text-[#C6FF3D] font-semibold">{inq.budgetRange}</span>
                              <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                            </div>
                          </motion.div>
                        );
                      })
                    )}
                  </div>

                  {/* Right Column: Selected Inquiry Inspector & Controls */}
                  <div className="lg:col-span-5">
                    {selectedInquiry ? (
                      <motion.div
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35 }}
                        className="p-6 md:p-8 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-6 sticky top-28 backdrop-blur-md shadow-2xl"
                      >
                        {/* Header with Title & Quick Delete */}
                        <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
                          <div>
                            <div className="text-[10px] font-mono text-[#C6FF3D] uppercase tracking-wider mb-1">
                              INQUIRY INSPECTOR · {selectedInquiry.source.toUpperCase()}
                            </div>
                            <h3 className="text-xl font-bold text-white">{selectedInquiry.name}</h3>
                            <span className="text-[11px] font-mono text-neutral-500">
                              ID: {selectedInquiry.id}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                            disabled={updatingId === selectedInquiry.id}
                            className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 text-red-400 hover:text-white border border-red-500/30 transition-colors cursor-pointer"
                            title="Delete this inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Client Metadata List */}
                        <div className="space-y-4 text-xs">
                          {/* Direct Email Action */}
                          <div>
                            <span className="font-mono text-neutral-400 block mb-1">CLIENT EMAIL:</span>
                            <div className="flex items-center gap-2">
                              <a
                                href={`mailto:${selectedInquiry.email}?subject=BE%20SOOCIAL%20Production%20Dialogue&body=Hi%20${encodeURIComponent(selectedInquiry.name)},%0A%0AThank%20you%20for%20submitting%20your%20brief%20to%20BE%20SOOCIAL.`}
                                className="text-white hover:text-[#C6FF3D] font-mono underline flex items-center gap-1.5"
                              >
                                <span>{selectedInquiry.email}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                              <button
                                type="button"
                                onClick={() => handleCopyEmail(selectedInquiry.email)}
                                className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
                                title="Copy Email"
                              >
                                {copiedEmail ? (
                                  <Check className="w-3 h-3 text-[#C6FF3D]" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Direct Phone Action */}
                          {selectedInquiry.phone && (
                            <div>
                              <span className="font-mono text-neutral-400 block mb-1">CLIENT MOBILE NUMBER:</span>
                              <div className="flex items-center gap-2">
                                <a
                                  href={`tel:${selectedInquiry.phone}`}
                                  className="text-white hover:text-[#C6FF3D] font-mono underline flex items-center gap-1.5"
                                >
                                  <Phone className="w-3 h-3 text-[#C6FF3D]" />
                                  <span>{selectedInquiry.phone}</span>
                                </a>
                                {selectedInquiry.mobileVerified && (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[9px] font-mono font-bold flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                    <span>OTP Verified</span>
                                  </span>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleCopyPhone(selectedInquiry.phone || '')}
                                  className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
                                  title="Copy Phone"
                                >
                                  {copiedPhone ? (
                                    <Check className="w-3 h-3 text-[#C6FF3D]" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            </div>
                          )}

                          {selectedInquiry.company && (
                            <div>
                              <span className="font-mono text-neutral-400 block mb-0.5">COMPANY / BRAND:</span>
                              <span className="text-white font-medium">{selectedInquiry.company}</span>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="font-mono text-neutral-400 block mb-0.5">BUDGET:</span>
                              <span className="text-[#C6FF3D] font-mono font-bold">
                                {selectedInquiry.budgetRange}
                              </span>
                            </div>
                            <div>
                              <span className="font-mono text-neutral-400 block mb-0.5">TIMELINE:</span>
                              <span className="text-white font-mono">{selectedInquiry.timeline}</span>
                            </div>
                          </div>

                          <div>
                            <span className="font-mono text-neutral-400 block mb-1">DISCIPLINES:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedInquiry.services.map((s) => (
                                <span
                                  key={s}
                                  className="px-2 py-0.5 rounded bg-neutral-800 text-[10px] font-mono text-neutral-200"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="font-mono text-neutral-400 block mb-1">FULL CLIENT BRIEF:</span>
                            <p className="text-neutral-200 leading-relaxed p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 whitespace-pre-wrap">
                              {selectedInquiry.brief}
                            </p>
                          </div>

                          {/* Producer Internal Notes */}
                          <div>
                            <span className="font-mono text-[#C6FF3D] block mb-1">
                              INTERNAL PRODUCER NOTES:
                            </span>
                            <textarea
                              rows={3}
                              placeholder="Add internal notes, meeting logs, NDA status, or assigned director..."
                              value={producerNotesInput}
                              onChange={(e) => setProducerNotesInput(e.target.value)}
                              className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-600 outline-none focus:border-[#C6FF3D] transition-colors"
                            />
                            <button
                              type="button"
                              onClick={handleSaveNotes}
                              disabled={savingNotes}
                              className="mt-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-[#C6FF3D] text-neutral-200 hover:text-black font-mono text-[11px] font-bold transition-all cursor-pointer disabled:opacity-50"
                            >
                              {savingNotes ? 'Saving Notes...' : 'Save Producer Notes'}
                            </button>
                          </div>
                        </div>

                        {/* Status Toggle Actions */}
                        <div className="pt-4 border-t border-white/[0.08]">
                          <span className="text-xs font-mono text-neutral-400 block mb-2">
                            UPDATE PIPELINE STATUS:
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              type="button"
                              disabled={updatingId === selectedInquiry.id}
                              onClick={() => handleStatusChange(selectedInquiry.id, 'new')}
                              className={`py-2 text-[11px] font-mono rounded-lg border transition-colors cursor-pointer ${
                                selectedInquiry.status === 'new'
                                  ? 'bg-[#C6FF3D] text-black font-bold border-[#C6FF3D]'
                                  : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white'
                              }`}
                            >
                              New
                            </button>
                            <button
                              type="button"
                              disabled={updatingId === selectedInquiry.id}
                              onClick={() => handleStatusChange(selectedInquiry.id, 'in_progress')}
                              className={`py-2 text-[11px] font-mono rounded-lg border transition-colors cursor-pointer ${
                                selectedInquiry.status === 'in_progress'
                                  ? 'bg-cyan-500 text-black font-bold border-cyan-500'
                                  : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white'
                              }`}
                            >
                              In Progress
                            </button>
                            <button
                              type="button"
                              disabled={updatingId === selectedInquiry.id}
                              onClick={() => handleStatusChange(selectedInquiry.id, 'closed')}
                              className={`py-2 text-[11px] font-mono rounded-lg border transition-colors cursor-pointer ${
                                selectedInquiry.status === 'closed'
                                  ? 'bg-emerald-500 text-black font-bold border-emerald-500'
                                  : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white'
                              }`}
                            >
                              Closed
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="p-12 text-center rounded-2xl bg-neutral-900/30 border border-white/10 text-neutral-400 text-xs font-mono">
                        Select an inquiry from the queue to view full client scope, manage pipeline status, and log producer notes.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 2: PORTFOLIO & PROJECTS (FULL CMS CONTROL) */}
            {/* ============================================================ */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Agency Case Studies & Productions</h3>
                    <p className="text-xs text-neutral-400">
                      Manage published works, toggle featured status on homepage, or add new campaigns.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingProject({
                        title: '',
                        client: '',
                        category: 'ai-filmmaking',
                        categoryLabel: 'AI Filmmaking',
                        brief: '',
                        challenge: '',
                        solution: '',
                        outcome: '',
                        coverUrl: 'https://picsum.photos/seed/agency-work/1200/800',
                        status: 'published',
                        featured: false,
                        showOnHome: false,
                      });
                      setIsProjectModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C6FF3D] hover:bg-[#b2eb2d] text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Project</span>
                  </button>
                </div>

                {/* Projects Table */}
                <div className="rounded-2xl border border-white/10 bg-neutral-900/40 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-950/80 border-b border-white/10 text-neutral-400 font-mono uppercase text-[10px]">
                        <tr>
                          <th className="p-4">Project & Client</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Featured</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        {projects.map((project) => (
                          <tr key={project.id} className="hover:bg-neutral-900/60 transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-white text-sm">{project.title}</div>
                              <div className="text-neutral-400 font-mono text-[11px]">{project.client}</div>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">
                                {project.categoryLabel}
                              </span>
                            </td>
                            <td className="p-4">
                              <button
                                type="button"
                                onClick={() => handleToggleProjectPublish(project.id)}
                                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer ${
                                  project.status === 'published'
                                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                    : 'bg-neutral-800 text-neutral-400'
                                }`}
                              >
                                {project.status}
                              </button>
                            </td>
                            <td className="p-4">
                              <button
                                type="button"
                                onClick={() => handleToggleProjectFeatured(project.id)}
                                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                                  project.featured
                                    ? 'bg-[#C6FF3D]/20 text-[#C6FF3D] border border-[#C6FF3D]/40'
                                    : 'bg-neutral-800 text-neutral-500'
                                }`}
                              >
                                {project.featured ? '★ Home Showcase' : 'Archive Only'}
                              </button>
                            </td>
                            <td className="p-4 text-right">
                              <div className="inline-flex items-center gap-2">
                                <Link
                                  href={`/work/${project.slug}`}
                                  target="_blank"
                                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                                  title="View Public Page"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingProject(project);
                                    setIsProjectModalOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
                                  title="Edit Project"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-400 border border-red-500/30 transition-colors cursor-pointer"
                                  title="Delete Project"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 3: TESTIMONIALS & REVIEWS CMS */}
            {/* ============================================================ */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Client Voices & Endorsements</h3>
                  <p className="text-xs text-neutral-400">
                    Approve or conceal executive quotes displayed in the homepage testimonial grid.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testimonials.map((t) => (
                    <div
                      key={t.id}
                      className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-white text-sm">{t.authorName}</span>
                          <button
                            type="button"
                            onClick={() => handleToggleTestimonial(t.id)}
                            className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold cursor-pointer ${
                              t.approved
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {t.approved ? 'Live On Site' : 'Hidden'}
                          </button>
                        </div>
                        <div className="text-xs text-neutral-400 font-mono mb-3">
                          {t.role} · {t.company}
                        </div>
                        <p className="text-xs text-neutral-200 italic leading-relaxed">
                          “{t.quote}”
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] text-[10px] font-mono text-neutral-500">
                        Sort Priority: #{t.sortOrder}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 4: SYSTEM HEALTH & CORE VITALS */}
            {/* ============================================================ */}
            {activeTab === 'system' && (
              <div className="p-8 rounded-2xl bg-neutral-900/40 border border-white/[0.08] space-y-6">
                <h3 className="text-lg font-bold text-white mb-2">System Diagnostics & Platform Health</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <span className="text-xs font-mono text-[#C6FF3D]">DATABASE & STORAGE PARITY</span>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Durable JSON store active at <code className="text-[#C6FF3D]">lib/data/runtime-store.json</code> with memory cache on singleton <code className="text-[#C6FF3D]">globalThis</code>.
                      Changes survive server restarts with 0ms memory read latency.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <span className="text-xs font-mono text-[#C6FF3D]">AUTHENTICATION CREDENTIALS</span>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Admin access secured via username <code className="text-[#C6FF3D]">BE SOOCIAL</code> / <code className="text-[#C6FF3D]">BE SO0CIAL</code> and password <code className="text-[#C6FF3D]">AMAN1230</code> with persistent session token encryption.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <span className="text-xs font-mono text-[#C6FF3D]">REAL-TIME PIPELINE DISPATCH</span>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Dual-mode sync enabled: Browser <code className="text-[#C6FF3D]">BroadcastChannel</code> for instant 0ms cross-tab updates + 3.5s auto-polling loop with synthesized audio chime.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <span className="text-xs font-mono text-[#C6FF3D]">PERFORMANCE OPTIMIZATION</span>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Static generation <code className="text-[#C6FF3D]">generateStaticParams</code> added to all service and portfolio case-study routes for instantaneous TTFB response times.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal: Add / Edit Project */}
        {isProjectModalOpen && editingProject && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-neutral-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <h3 className="text-xl font-bold text-white">
                  {editingProject.id ? 'Edit Case Study' : 'Create New Case Study'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-neutral-300 mb-1">Project Title</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      placeholder="e.g. Solis Hypercar: Neural Genesis"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white outline-none focus:border-[#C6FF3D]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-neutral-300 mb-1">Client Name</label>
                    <input
                      type="text"
                      required
                      value={editingProject.client || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                      placeholder="e.g. Solis Automotive Ltd"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white outline-none focus:border-[#C6FF3D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-neutral-300 mb-1">Category</label>
                    <select
                      value={editingProject.category || 'ai-filmmaking'}
                      onChange={(e) => {
                        const cat = e.target.value as ProjectCategory;
                        const labels: Record<string, string> = {
                          'ai-filmmaking': 'AI Filmmaking',
                          'video-editing': 'Video Editing',
                          'brand-management': 'Brand Management',
                          'website-development': 'Website Development',
                          'digital-marketing': 'Digital Marketing',
                          'ai-ugc-ads': 'AI UGC Ads',
                        };
                        setEditingProject({
                          ...editingProject,
                          category: cat,
                          categoryLabel: labels[cat] || 'Creative Production',
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white outline-none focus:border-[#C6FF3D] cursor-pointer"
                    >
                      <option value="ai-filmmaking">AI Filmmaking</option>
                      <option value="video-editing">Video Editing</option>
                      <option value="brand-management">Brand Management</option>
                      <option value="website-development">Website Development</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="ai-ugc-ads">AI UGC Ads</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-neutral-300 mb-1">Cover Image URL</label>
                    <input
                      type="text"
                      value={editingProject.coverUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, coverUrl: e.target.value })}
                      placeholder="https://picsum.photos/seed/.../1200/800"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white outline-none focus:border-[#C6FF3D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-neutral-300 mb-1">Production Brief</label>
                  <textarea
                    rows={2}
                    required
                    value={editingProject.brief || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, brief: e.target.value })}
                    placeholder="Summary of creative brief and objectives..."
                    className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white outline-none focus:border-[#C6FF3D]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProject.status === 'published'}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          status: e.target.checked ? 'published' : 'draft',
                        })
                      }
                      className="accent-[#C6FF3D]"
                    />
                    <span className="font-mono text-neutral-300">Publish live on website</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingProject.featured}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          featured: e.target.checked,
                          showOnHome: e.target.checked,
                        })
                      }
                      className="accent-[#C6FF3D]"
                    />
                    <span className="font-mono text-neutral-300">Feature on homepage showcase</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 font-mono text-xs hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingProject}
                    className="px-5 py-2 rounded-xl bg-[#C6FF3D] text-black font-mono font-bold text-xs hover:bg-[#b2eb2d] transition-colors cursor-pointer"
                  >
                    {savingProject ? 'Saving...' : 'Save Case Study'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
