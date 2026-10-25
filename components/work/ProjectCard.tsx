import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  featuredLayout?: boolean;
}

export function ProjectCard({ project, featuredLayout = false }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group block rounded-xl overflow-hidden bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(198,255,61,0.08)] ${
        featuredLayout ? 'md:grid md:grid-cols-12 gap-8' : ''
      }`}
    >
      {/* Cover Image Container */}
      <div
        className={`relative overflow-hidden bg-neutral-950 ${
          featuredLayout ? 'md:col-span-7 aspect-[16/10]' : 'aspect-[16/10]'
        }`}
      >
        <Image
          src={project.coverUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Video Reel Indicator */}
        {project.videoUrl && (
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
            VIDEO SHOWCASE
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div
        className={`p-6 flex flex-col justify-between ${
          featuredLayout ? 'md:col-span-5 md:py-8 md:pr-8' : ''
        }`}
      >
        <div>
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono mb-2">
            <span>{project.client}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#C6FF3D]">{project.categoryLabel}</span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#C6FF3D] transition-colors leading-snug mb-3">
            {project.title}
          </h3>

          <p className="text-xs md:text-sm text-neutral-400 line-clamp-2 leading-relaxed mb-6">
            {project.brief}
          </p>
        </div>

        {/* Verified Quantified Metrics Strip */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-6">
            {project.metrics.slice(0, 2).map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-sm md:text-base font-bold text-white font-mono tabular-nums">
                  {m.value}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono uppercase">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 group-hover:text-black group-hover:bg-[#C6FF3D] group-hover:border-[#C6FF3D] transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
