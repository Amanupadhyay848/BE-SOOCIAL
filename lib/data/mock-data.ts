import { Project, Service, Testimonial, FAQ } from '@/types';
import { SERVICES_DATA } from '@/data/services';
import { PORTFOLIO_PROJECTS } from '@/data/portfolio';

export const INITIAL_SERVICES: Service[] = SERVICES_DATA;
export const INITIAL_PROJECTS: Project[] = PORTFOLIO_PROJECTS;


export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    authorName: 'Sebastian Cruz',
    role: 'Chief Marketing Officer',
    company: 'Solis Automotive Ltd',
    quote: 'BE SOOCIAL did in 16 days what our traditional agency couldn’t map out in four months. The Solis launch film didn’t just meet expectations—it set a new creative standard for automotive virtual reveals.',
    avatarUrl: 'https://picsum.photos/seed/sebastian-cruz/150/150',
    approved: true,
    sortOrder: 1,
  },
  {
    id: 't-2',
    authorName: 'Astrid Lindholm',
    role: 'Managing Director',
    company: 'Kroma Acoustics Copenhagen',
    quote: 'The team understands aesthetic restraint and cultural weight. They didn’t treat us as a commercial client; they treated our acoustic equipment like museum sculptures.',
    avatarUrl: 'https://picsum.photos/seed/astrid-lindholm/150/150',
    approved: true,
    sortOrder: 2,
  },
  {
    id: 't-3',
    authorName: 'Julian Vance',
    role: 'General Partner',
    company: 'Nexus Global Ventures',
    quote: 'Every serious founder who visits our website immediately mentions the 3D spatial experience. BE SOOCIAL bridges high-level creative vision with uncompromising technical execution.',
    avatarUrl: 'https://picsum.photos/seed/julian-vance/150/150',
    approved: true,
    sortOrder: 3,
  },
];

export const INITIAL_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    serviceId: null,
    question: 'How does BE SOOCIAL balance human creative direction with AI tools?',
    answer: 'AI is our lens and accelerator, not our creative director. Every project begins with human storyboards, art direction, and narrative intent. We deploy proprietary neural pipelines (ComfyUI, generative spatial models, synthetic voice) to produce visual worlds and velocity that would otherwise take months or millions of dollars, while keeping human taste at the center.',
    sortOrder: 1,
    status: 'published',
  },
  {
    id: 'faq-2',
    serviceId: null,
    question: 'What is your typical project timeline and onboarding workflow?',
    answer: 'Rapid creative sprints (AI commercial spots, high-tempo edits, UGC batches) typically deliver in 7 to 14 business days. Full brand overhauls and spatial web builds take between 4 to 8 weeks with dedicated weekly review milestones and private staging environments.',
    sortOrder: 2,
    status: 'published',
  },
  {
    id: 'faq-3',
    serviceId: null,
    question: 'How do you handle licensing, copyrights, and AI model provenance?',
    answer: 'All assets generated through our studio pipelines undergo rigorous copyright and trademark validation. We deliver full commercial exploitation rights, master source exports, and signed indemnity for enterprise broadcast and global digital deployment.',
    sortOrder: 3,
    status: 'published',
  },
  {
    id: 'faq-4',
    serviceId: null,
    question: 'Can you integrate directly with our in-house marketing or engineering team?',
    answer: 'Yes. We frequently act as an embedded high-velocity strike team for venture-backed startups and enterprise creative departments, integrating seamlessly via Slack, Linear, and Figma.',
    sortOrder: 4,
    status: 'published',
  },
];
