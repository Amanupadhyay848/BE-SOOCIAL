'use client';

import React, { useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import { SceneFallback } from './SceneFallback';

const HeroSceneComponent = dynamic(
  () => import('./HeroScene').then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  }
);

function subscribe(callback: () => void) {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', callback);
  window.addEventListener('resize', callback);
  return () => {
    mql.removeEventListener('change', callback);
    window.removeEventListener('resize', callback);
  };
}

function getSnapshot() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;
  return prefersReduced || isMobile ? 'fallback' : 'canvas';
}

function getServerSnapshot() {
  return 'loading';
}

export function DynamicHeroScene() {
  const sceneMode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (sceneMode === 'loading' || sceneMode === 'fallback') {
    return <SceneFallback />;
  }

  return <HeroSceneComponent />;
}
