'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '@/types';
import { CinematicVideoPlayerCard } from './CinematicVideoPlayerCard';
import { PortfolioCustomCursor } from './PortfolioCustomCursor';
import { PortfolioScrollTracker } from './PortfolioScrollTracker';

interface CinematicPortfolioReelProps {
  projects: Project[];
  activeCategory?: string;
}

export function CinematicPortfolioReel({
  projects,
  activeCategory = 'all',
}: CinematicPortfolioReelProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const [cursorText, setCursorText] = useState<string>('VIEW PROJECT');
  const [isHoveringVideo, setIsHoveringVideo] = useState<boolean>(false);
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  // Set of currently intersecting card indices
  const visibleIndicesRef = useRef<Set<number>>(new Set());

  const handleVisibleChange = useCallback((idx: number, isIntersecting: boolean) => {
    if (isIntersecting) {
      visibleIndicesRef.current.add(idx);
    } else {
      visibleIndicesRef.current.delete(idx);
    }

    const visibleArr = Array.from(visibleIndicesRef.current).sort((a, b) => a - b);
    if (visibleArr.length > 0) {
      setActiveVideoIndex(visibleArr[0]);
    }
  }, []);

  const handleHoverVideo = useCallback((isHovering: boolean, text?: string) => {
    setIsHoveringVideo(isHovering);
    if (text) setCursorText(text);
  }, []);

  // Update vertical scroll percentage for the tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const percent = (window.scrollY / scrollHeight) * 100;
        setScrollPercent(percent);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentActiveProject = projects[activeVideoIndex] || projects[0];
  const activeNumber = currentActiveProject?.number || String(activeVideoIndex + 1).padStart(2, '0');

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Desktop Custom Cursor */}
      <PortfolioCustomCursor
        isHoveringVideo={isHoveringVideo}
        cursorText={cursorText}
      />

      {/* Right Desktop Scroll Tracker */}
      <PortfolioScrollTracker
        currentNumber={activeNumber}
        total={projects.length}
        progressPercent={scrollPercent}
      />

      {/* AnimatePresence for smooth 400-600ms category filter switching */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory || 'all'}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col w-full"
        >
          {projects.length > 0 ? (
            projects.map((project, idx) => {
              const isActive = idx === activeVideoIndex;

              return (
                <CinematicVideoPlayerCard
                  key={project.id}
                  project={project}
                  index={idx}
                  isActiveVideo={isActive}
                  onHoverVideo={handleHoverVideo}
                  onVisibleChange={handleVisibleChange}
                />
              );
            })
          ) : (
            <div className="py-24 text-center">
              <p className="text-sm font-mono text-neutral-400">
                No projects found in this discipline.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
