import fs from 'node:fs';
import path from 'node:path';
import { Project, Service, Testimonial, FAQ, Inquiry, ProjectCategory } from '@/types';
import { INITIAL_SERVICES, INITIAL_PROJECTS, INITIAL_TESTIMONIALS, INITIAL_FAQS } from './mock-data';
import { InquiryInput } from '@/lib/validation/inquiry';

interface StoreData {
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  inquiries: Inquiry[];
}

const SEED_INQUIRIES: Inquiry[] = [];

// File path for durable local persistence across server restarts
const STORE_FILE_PATH = path.join(process.cwd(), 'lib', 'data', 'runtime-store.json');

// Global symbol to ensure singleton store in Next.js development HMR
const GLOBAL_STORE_KEY = Symbol.for('besoocial_runtime_store');

interface GlobalWithStore {
  [GLOBAL_STORE_KEY]?: StoreData;
}

const globalStoreHolder = globalThis as unknown as GlobalWithStore;

function initStore(): StoreData {
  if (globalStoreHolder[GLOBAL_STORE_KEY]) {
    return globalStoreHolder[GLOBAL_STORE_KEY]!;
  }

  // Try reading from disk
  try {
    if (fs.existsSync(STORE_FILE_PATH)) {
      const fileRaw = fs.readFileSync(STORE_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileRaw) as Partial<StoreData>;
      // Merge initial projects so newly registered projects (e.g. AI filmmaking) are never omitted
      const existingProjectSlugs = new Set((parsed.projects || []).map((p) => p.slug));
      const mergedProjects = [
        ...(parsed.projects || []),
        ...INITIAL_PROJECTS.filter((p) => !existingProjectSlugs.has(p.slug)),
      ];

      const loaded: StoreData = {
        services: parsed.services?.length ? parsed.services : [...INITIAL_SERVICES],
        projects: mergedProjects.length ? mergedProjects : [...INITIAL_PROJECTS],
        testimonials: parsed.testimonials?.length ? parsed.testimonials : [...INITIAL_TESTIMONIALS],
        faqs: parsed.faqs?.length ? parsed.faqs : [...INITIAL_FAQS],
        inquiries: parsed.inquiries?.length ? parsed.inquiries : [...SEED_INQUIRIES],
      };
      globalStoreHolder[GLOBAL_STORE_KEY] = loaded;
      saveStore(loaded);
      return loaded;
    }
  } catch (err) {
    console.warn('Could not read store file, using in-memory defaults:', err);
  }

  const initial: StoreData = {
    services: [...INITIAL_SERVICES],
    projects: [...INITIAL_PROJECTS],
    testimonials: [...INITIAL_TESTIMONIALS],
    faqs: [...INITIAL_FAQS],
    inquiries: [...SEED_INQUIRIES],
  };

  globalStoreHolder[GLOBAL_STORE_KEY] = initial;
  saveStore(initial);
  return initial;
}

function saveStore(data: StoreData) {
  try {
    const dir = path.dirname(STORE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not save store file to disk:', err);
  }
}

function getStore(): StoreData {
  return initStore();
}

// ==========================================
// SERVICES
// ==========================================

export async function getServices(): Promise<Service[]> {
  const store = getStore();
  return [...store.services].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const store = getStore();
  return store.services.find((s) => s.slug === slug) || null;
}

// ==========================================
// PROJECTS & PORTFOLIO
// ==========================================

export async function getProjects(category?: string): Promise<Project[]> {
  const store = getStore();
  let list = [...store.projects].filter((p) => p.status === 'published');
  if (category && category !== 'all') {
    const target = category.toLowerCase().trim();
    list = list.filter((p) => {
      const cat = p.category?.toLowerCase() || '';
      const sSlug = p.serviceSlug?.toLowerCase() || '';
      const cLabel = p.categoryLabel?.toLowerCase() || '';

      if (target === 'ai-filmmaking' || target === 'ai' || target === 'ai-film') {
        return cat.includes('ai') || cLabel.includes('ai') || sSlug === 'ai-filmmaking';
      }
      if (
        target === 'brand-motion' ||
        target === 'brand motion' ||
        target === 'brand-management' ||
        target === 'motion-design'
      ) {
        return (
          cat.includes('brand') ||
          cat.includes('motion') ||
          cLabel.includes('brand') ||
          cLabel.includes('motion') ||
          sSlug === 'brand-management'
        );
      }
      if (target === 'saas-product' || target === 'saas' || target === 'product') {
        return (
          cat.includes('saas') ||
          cat.includes('product') ||
          cLabel.includes('saas') ||
          cLabel.includes('product')
        );
      }
      if (target === 'commercial') {
        return (
          cat.includes('commercial') ||
          cLabel.includes('commercial') ||
          cat.includes('industrial')
        );
      }
      if (target === 'social-ugc' || target === 'social' || target === 'ugc') {
        return (
          cat.includes('social') ||
          cat.includes('ugc') ||
          cLabel.includes('social') ||
          cLabel.includes('ugc')
        );
      }
      if (
        target === 'commercial-social' ||
        target === 'commercial-industrial' ||
        target === 'social-media' ||
        target === 'cinematic-storytelling'
      ) {
        return (
          cat.includes('commercial') ||
          cat.includes('social') ||
          cat.includes('industrial') ||
          cat.includes('storytelling') ||
          cLabel.includes('commercial') ||
          cLabel.includes('social') ||
          cLabel.includes('storytelling')
        );
      }
      if (target === 'technology-education' || target === 'education' || target === 'technology') {
        return cat.includes('technology') || cat.includes('education') || cLabel.includes('technology') || cLabel.includes('education');
      }
      return cat.includes(target) || sSlug === target || cLabel.includes(target);
    });
  }
  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const store = getStore();
  return store.projects
    .filter((p) => p.status === 'published' && (p.featured || p.showOnHome))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const store = getStore();
  return store.projects.find((p) => p.slug === slug) || null;
}

export async function getAllProjectsAdmin(): Promise<Project[]> {
  const store = getStore();
  return [...store.projects].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function toggleProjectPublish(id: string): Promise<Project | null> {
  const store = getStore();
  const index = store.projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const current = store.projects[index].status;
  store.projects[index].status = current === 'published' ? 'draft' : 'published';
  saveStore(store);
  return store.projects[index];
}

export async function toggleProjectFeatured(id: string): Promise<Project | null> {
  const store = getStore();
  const index = store.projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  store.projects[index].featured = !store.projects[index].featured;
  store.projects[index].showOnHome = store.projects[index].featured;
  saveStore(store);
  return store.projects[index];
}

export async function createProject(data: Partial<Project>): Promise<Project> {
  const store = getStore();
  const newProject: Project = {
    id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    slug: data.slug || `project-${Date.now()}`,
    title: data.title || 'Untitled Campaign',
    client: data.client || 'Client Brand',
    category: (data.category as ProjectCategory) || 'ai-filmmaking',
    categoryLabel: data.categoryLabel || 'AI Filmmaking',
    brief: data.brief || 'Client production brief.',
    challenge: data.challenge || 'Key production challenges.',
    solution: data.solution || 'Directorial & technical solution deployed.',
    outcome: data.outcome || 'Measurable verified outcomes.',
    coverUrl: data.coverUrl || 'https://picsum.photos/seed/new-project/1200/800',
    videoUrl: data.videoUrl,
    credits: data.credits || { 'Directorial Lead': 'BE SOOCIAL Studio' },
    metrics: data.metrics || [{ label: 'Reach', value: '1M+' }, { label: 'ROAS', value: '3.5x' }],
    featured: !!data.featured,
    showOnHome: !!data.showOnHome,
    sortOrder: store.projects.length + 1,
    status: data.status || 'published',
    publishedAt: new Date().toISOString().split('T')[0],
    gallery: data.gallery || [],
  };

  store.projects.unshift(newProject);
  saveStore(store);
  return newProject;
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  const store = getStore();
  const index = store.projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  store.projects[index] = { ...store.projects[index], ...updates };
  saveStore(store);
  return store.projects[index];
}

export async function deleteProject(id: string): Promise<boolean> {
  const store = getStore();
  const initialLength = store.projects.length;
  store.projects = store.projects.filter((p) => p.id !== id);
  if (store.projects.length !== initialLength) {
    saveStore(store);
    return true;
  }
  return false;
}

// ==========================================
// TESTIMONIALS
// ==========================================

export async function getTestimonials(): Promise<Testimonial[]> {
  const store = getStore();
  return store.testimonials
    .filter((t) => t.approved)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAllTestimonialsAdmin(): Promise<Testimonial[]> {
  const store = getStore();
  return [...store.testimonials].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function toggleTestimonialApproval(id: string): Promise<Testimonial | null> {
  const store = getStore();
  const index = store.testimonials.findIndex((t) => t.id === id);
  if (index === -1) return null;
  store.testimonials[index].approved = !store.testimonials[index].approved;
  saveStore(store);
  return store.testimonials[index];
}

// ==========================================
// FAQS
// ==========================================

export async function getFAQs(serviceId?: string | null): Promise<FAQ[]> {
  const store = getStore();
  let faqs = store.faqs.filter((f) => f.status === 'published');
  if (serviceId !== undefined && serviceId !== null) {
    faqs = faqs.filter((f) => f.serviceId === serviceId);
  }
  return faqs.sort((a, b) => a.sortOrder - b.sortOrder);
}

// ==========================================
// INQUIRIES (CLIENT PIPELINE)
// ==========================================

export async function getInquiries(): Promise<Inquiry[]> {
  const store = getStore();
  return [...store.inquiries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createInquiry(
  input: InquiryInput & { phone?: string; mobileVerified?: boolean }
): Promise<Inquiry> {
  const store = getStore();
  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: input.name,
    email: input.email,
    phone: input.phone || '',
    company: input.company || '',
    brief: input.brief,
    budgetRange: input.budgetRange,
    currency: input.currency,
    customBudget: input.customBudget,
    timeline: input.timeline,
    customTimeline: input.customTimeline,
    services: input.services,
    source: input.source,
    status: 'new',
    createdAt: new Date().toISOString(),
    mobileVerified: input.mobileVerified,
  };

  store.inquiries.unshift(newInquiry);
  saveStore(store);
  return newInquiry;
}

export async function updateInquiryStatus(
  id: string,
  status: Inquiry['status']
): Promise<Inquiry | null> {
  const store = getStore();
  const index = store.inquiries.findIndex((i) => i.id === id);
  if (index === -1) return null;
  store.inquiries[index].status = status;
  saveStore(store);
  return store.inquiries[index];
}

export async function updateInquiryNotes(
  id: string,
  notes: string
): Promise<Inquiry | null> {
  const store = getStore();
  const index = store.inquiries.findIndex((i) => i.id === id);
  if (index === -1) return null;
  store.inquiries[index].producerNotes = notes;
  saveStore(store);
  return store.inquiries[index];
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const store = getStore();
  const initialLen = store.inquiries.length;
  store.inquiries = store.inquiries.filter((i) => i.id !== id);
  if (store.inquiries.length !== initialLen) {
    saveStore(store);
    return true;
  }
  return false;
}

export async function resetToDefaultData(): Promise<void> {
  const store = getStore();
  store.services = [...INITIAL_SERVICES];
  store.projects = [...INITIAL_PROJECTS];
  store.testimonials = [...INITIAL_TESTIMONIALS];
  store.faqs = [...INITIAL_FAQS];
  store.inquiries = [...SEED_INQUIRIES];
  saveStore(store);
}
