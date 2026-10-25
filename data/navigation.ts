/**
 * BE SOOCIAL — Centralized Navigation Architecture (Single Source of Truth)
 */

export interface NavItem {
  href: string;
  label: string;
  badge?: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/ai-studio', label: 'AI Studio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const PRIMARY_CTA: NavItem = {
  href: '/start-a-project',
  label: 'Start a Project',
};

export const SERVICES_NAV_ITEMS: NavItem[] = [
  { href: '/services/brand-management', label: 'Brand Management' },
  { href: '/services/video-editing', label: 'Video Editing' },
  { href: '/services/ai-filmmaking', label: 'AI Filmmaking' },
  { href: '/services/website-development', label: 'Website Development' },
  { href: '/services/digital-marketing', label: 'Digital Marketing' },
  { href: '/services/ai-ugc-ads', label: 'AI UGC Ads' },
];

export const AGENCY_NAV_ITEMS: NavItem[] = [
  { href: '/work', label: 'Selected Work' },
  { href: '/ai-studio', label: 'AI Studio Pipeline' },
  { href: '/about', label: 'Manifesto & Team' },
  { href: '/contact', label: 'Direct Inquiries' },
  { href: '/start-a-project', label: 'Start a Project' },
];

export const LEGAL_NAV_ITEMS: NavItem[] = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Engagement' },
  { href: '/admin', label: 'Admin' },
];
