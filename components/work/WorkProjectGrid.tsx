'use client';

import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Project } from '@/types';
import { CinematicProjectCard3D } from './CinematicProjectCard3D';

interface WorkProjectGridProps {
  projects: Project[];
  activeCategory?: string;
}

export function WorkProjectGrid({ projects, activeCategory = 'all' }: WorkProjectGridProps) {
  const shouldReduceMotion = useReducedMotion();

  if (projects.length === 0) {
    return (
      <div className="p-16 text-center rounded-2xl bg-neutral-900/40 border border-white/10 relative z-10">
        <h3 className="text-lg font-bold text-white mb-2">No projects found in this discipline</h3>
        <p className="text-xs text-neutral-400">
          Try selecting another discipline tab above or check back shortly.
        </p>
      </div>
    );
  }

  if (shouldReduceMotion) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {projects.map((project) => (
          <CinematicProjectCard3D key={project.id} project={project} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <CinematicProjectCard3D project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
