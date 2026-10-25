'use client';

import React from 'react';
export { FrontPageCinematicHeroExperience } from './FrontPageCinematicHeroExperience';

interface FrontPageOpeningExperienceProps {
  children?: React.ReactNode;
}

/**
 * FrontPageOpeningExperience
 * Passthrough container preserving component interface compatibility.
 * The choreographed Apple-style opening sequence and precision-aligned hero
 * elements are managed by FrontPageCinematicHeroExperience inside app/page.tsx.
 */
export function FrontPageOpeningExperience({ children }: FrontPageOpeningExperienceProps) {
  return <>{children}</>;
}
