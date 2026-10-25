'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { MAIN_NAV_ITEMS, PRIMARY_CTA } from '@/data/navigation';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled ? 'pt-3 pb-2 px-3 sm:px-6' : 'pt-0 pb-0 px-0'
      }`}
    >
      <div
        className={`mx-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'max-w-6xl h-14 md:h-16 px-4 sm:px-6 rounded-2xl bg-[#0A0A0A]/75 backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.08)]'
            : 'max-w-7xl h-20 px-4 sm:px-6 lg:px-8 bg-transparent border-b border-white/[0.06]'
        } flex items-center justify-between gap-8`}
      >
        {/* Zone 1: Brand Wordmark (Retains selector `header a[href="/"]` for hero intro flight) */}
        <Link
          href="/"
          className="group text-lg md:text-xl font-black tracking-tight text-white transition-colors whitespace-nowrap shrink-0 uppercase relative flex items-center gap-2"
        >
          <span className="group-hover:text-[#C6FF3D] transition-colors duration-200 tracking-wider">
            BE SOOCIAL
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D] opacity-80 group-hover:scale-125 transition-transform duration-200" />
        </Link>

        {/* Zone 2: Glass Single-Line Nav Links with Apple Restraint */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-medium text-neutral-300"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {MAIN_NAV_ITEMS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(`${link.href}/`));
            const isHovered = hoveredNav === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredNav(link.href)}
                className={`relative px-3.5 py-1.5 rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#C6FF3D]'
                    : isHovered
                    ? 'text-white'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {/* Tiny background highlight on hover */}
                {isHovered && !isActive && (
                  <motion.span
                    layoutId="hoverNavPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-white/[0.05] rounded-lg -z-0"
                  />
                )}

                {/* Subtle upward text shift on hover */}
                <span
                  className={`relative z-10 inline-block transition-transform duration-200 ${
                    isHovered ? '-translate-y-[1.5px]' : 'translate-y-0'
                  }`}
                >
                  {link.label}
                </span>

                {/* Smooth Animated Active Underline with Spring */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C6FF3D] rounded-full shadow-[0_0_8px_rgba(198,255,61,0.6)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action with Micro-Interactions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href={PRIMARY_CTA.href}
            className="group px-4 py-2 text-xs md:text-sm font-semibold text-black bg-[#C6FF3D] hover:bg-[#d2ff55] rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(198,255,61,0.25)] hover:shadow-[0_0_28px_rgba(198,255,61,0.45)] hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>{PRIMARY_CTA.label}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2.5">
          <Link
            href={PRIMARY_CTA.href}
            className="px-3 py-1.5 text-xs font-semibold text-black bg-[#C6FF3D] rounded-lg whitespace-nowrap shrink-0 shadow-sm"
          >
            Start
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6FF3D] rounded-lg transition-transform active:scale-95"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer with Translucent Glass */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mt-2 mx-3 rounded-2xl border border-white/[0.08] bg-[#0A0A0A]/95 backdrop-blur-2xl px-6 py-6 space-y-4 overflow-hidden shadow-2xl"
          >
            <nav className="flex flex-col space-y-2">
              {MAIN_NAV_ITEMS.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium py-2 transition-colors flex items-center justify-between ${
                      pathname === link.href
                        ? 'text-[#C6FF3D]'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {pathname === link.href && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D]" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
              <Link
                href="/start-a-project"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-sm font-semibold text-black bg-[#C6FF3D] rounded-xl shadow-lg active:scale-95 transition-transform"
              >
                Start a Project
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-xs text-neutral-400 hover:text-neutral-200"
              >
                Admin Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
