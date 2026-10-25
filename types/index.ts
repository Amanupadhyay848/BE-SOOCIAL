export type ProjectCategory =
  | 'brand-management'
  | 'video-editing'
  | 'ai-filmmaking'
  | 'website-development'
  | 'digital-marketing'
  | 'ai-ugc-ads'
  | 'Cinematic Storytelling'
  | 'Brand Motion'
  | 'SaaS / Product Film'
  | 'Commercial / Industrial'
  | 'Social Media / Storytelling'
  | 'Motion Design / SaaS'
  | 'Technology / Educational'
  | 'AI / Education'
  | 'AI / SaaS / Product Film'
  | string;

export interface Service {
  id: string;
  slug: string;
  number?: string;
  title: string;
  shortDescription: string;
  punchyCopy?: string;
  longDescription: string;
  category?: string;
  route?: string;
  heroMediaUrl?: string;
  features: string[];
  deliverables: string[];
  sortOrder: number;
  status: 'draft' | 'published';
  stats?: { label: string; value: string }[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectMediaItem {
  id: string;
  projectId: string;
  type: 'image' | 'video';
  url: string;
  posterUrl?: string;
  caption?: string;
  altText: string;
  sortOrder: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  categoryLabel: string;
  brief: string;
  challenge: string;
  solution: string;
  outcome: string;
  coverUrl: string;
  videoUrl?: string;
  video?: string;
  poster?: string;
  route?: string;
  serviceSlug?: string;
  aspectRatio?: '16/9' | '9/16' | '1/1' | string;
  width?: number;
  height?: number;
  credits: Record<string, string>;
  metrics: ProjectMetric[];
  featured: boolean;
  showOnHome: boolean;
  sortOrder: number;
  status: 'draft' | 'published';
  publishedAt?: string;
  number?: string;
  year?: string;
  type?: string;
  theIdea?: string;
  theApproach?: string;
  theExecution?: string;
  theFinalFilm?: string;
  gallery: ProjectMediaItem[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  brief: string;
  budgetRange: string;
  currency?: string;
  customBudget?: string;
  timeline: string;
  customTimeline?: string;
  services: string[];
  source: 'contact' | 'start-a-project' | 'service-detail';
  status: 'new' | 'in_progress' | 'closed';
  createdAt: string;
  producerNotes?: string;
  mobileVerified?: boolean;
}

export interface Testimonial {
  id: string;
  authorName: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl?: string;
  approved: boolean;
  sortOrder: number;
}

export interface FAQ {
  id: string;
  serviceId?: string | null;
  question: string;
  answer: string;
  sortOrder: number;
  status: 'draft' | 'published';
}
