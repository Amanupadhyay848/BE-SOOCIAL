'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Work' },
  { id: 'ai-film', label: 'AI & Film', isAI: true },
  { id: 'brand-motion', label: 'Brand & Motion' },
  { id: 'saas-product', label: 'SaaS / Product' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'social-ugc', label: 'Social / UGC' },
];

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const handleSelect = (categoryId: string) => {
    if (categoryId === 'all') {
      router.push('/work', { scroll: false });
    } else {
      router.push(`/work?category=${categoryId}`, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-1.5 p-1.5 bg-[#0A0A0A]/90 border border-white/[0.08] rounded-2xl backdrop-blur-xl shadow-2xl max-w-full overflow-x-auto no-scrollbar">
      {CATEGORIES.map((cat) => {
        const isActive =
          currentCategory === cat.id ||
          (cat.id === 'ai-film' && (currentCategory === 'ai-filmmaking' || currentCategory === 'ai'));

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleSelect(cat.id)}
            className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wide rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              isActive
                ? 'text-black font-bold'
                : cat.isAI
                ? 'text-[#C6FF3D] hover:text-white hover:bg-white/[0.05]'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            {/* Active Highlight Pill */}
            {isActive && (
              <motion.span
                layoutId="activeCategoryPill"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                className="absolute inset-0 bg-[#C6FF3D] rounded-xl shadow-[0_0_18px_rgba(198,255,61,0.35)] -z-0"
              />
            )}

            {/* AI Flag Icon with Priority Accent */}
            {cat.isAI && (
              <Sparkles
                className={`w-3 h-3 transition-colors ${
                  isActive ? 'text-black' : 'text-[#C6FF3D]'
                }`}
              />
            )}

            <span className="relative z-10">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
