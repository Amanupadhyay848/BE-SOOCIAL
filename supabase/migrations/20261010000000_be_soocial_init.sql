-- =============================================================================
-- BE SOOCIAL: Database Schema & Row Level Security (RLS) Policies
-- Migration: 20261010000000_be_soocial_init.sql
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USER PROFILES & ROLES
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('admin', 'editor', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Security Definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 2. SERVICES
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  hero_media_url TEXT,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. PROJECTS & CASE STUDIES
DO $$ BEGIN
  CREATE TYPE project_category AS ENUM (
    'brand-management',
    'video-editing',
    'ai-filmmaking',
    'website-development',
    'digital-marketing',
    'ai-ugc-ads'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  category project_category NOT NULL,
  brief TEXT NOT NULL,
  challenge TEXT,
  solution TEXT,
  outcome TEXT,
  cover_url TEXT NOT NULL,
  video_url TEXT,
  credits JSONB NOT NULL DEFAULT '{}'::jsonb,
  metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN NOT NULL DEFAULT false,
  show_on_home BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. PROJECT MEDIA
CREATE TABLE IF NOT EXISTS public.project_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  poster_url TEXT,
  caption TEXT,
  alt_text TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. PROJECT SERVICES JOIN
CREATE TABLE IF NOT EXISTS public.project_services (
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, service_id)
);

-- 6. INQUIRIES & LEAD FUNNEL
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  brief TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  timeline TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('contact', 'start-a-project')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'closed')),
  ip_hash TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.inquiry_services (
  inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  PRIMARY KEY (inquiry_id, service_id)
);

-- 7. TESTIMONIALS (ATTRIBUTABLE)
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  quote TEXT NOT NULL,
  avatar_url TEXT,
  approved BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. FAQS
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_status_sort ON public.services(status, sort_order);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_home ON public.projects(show_on_home) WHERE show_on_home = true;
CREATE INDEX IF NOT EXISTS idx_projects_status_sort ON public.projects(status, sort_order);
CREATE INDEX IF NOT EXISTS idx_project_media_proj ON public.project_media(project_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_inquiries_status_created ON public.inquiries(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_faqs_service ON public.faqs(service_id, sort_order);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- POLICIES
DROP POLICY IF EXISTS "Profiles self view" ON public.profiles;
CREATE POLICY "Profiles self view" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Profiles admin manage" ON public.profiles;
CREATE POLICY "Profiles admin manage" ON public.profiles FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Services public select" ON public.services;
CREATE POLICY "Services public select" ON public.services FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Services admin all" ON public.services;
CREATE POLICY "Services admin all" ON public.services FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Projects public select" ON public.projects;
CREATE POLICY "Projects public select" ON public.projects FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Projects admin all" ON public.projects;
CREATE POLICY "Projects admin all" ON public.projects FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Project media public select" ON public.project_media;
CREATE POLICY "Project media public select" ON public.project_media FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_media.project_id AND projects.status = 'published')
);

DROP POLICY IF EXISTS "Project media admin all" ON public.project_media;
CREATE POLICY "Project media admin all" ON public.project_media FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Project services public select" ON public.project_services;
CREATE POLICY "Project services public select" ON public.project_services FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_services.project_id AND projects.status = 'published')
);

DROP POLICY IF EXISTS "Project services admin all" ON public.project_services;
CREATE POLICY "Project services admin all" ON public.project_services FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Testimonials public select" ON public.testimonials;
CREATE POLICY "Testimonials public select" ON public.testimonials FOR SELECT USING (approved = true);

DROP POLICY IF EXISTS "Testimonials admin all" ON public.testimonials;
CREATE POLICY "Testimonials admin all" ON public.testimonials FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "FAQs public select" ON public.faqs;
CREATE POLICY "FAQs public select" ON public.faqs FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "FAQs admin all" ON public.faqs;
CREATE POLICY "FAQs admin all" ON public.faqs FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Settings public select" ON public.site_settings;
CREATE POLICY "Settings public select" ON public.site_settings FOR SELECT USING (is_public = true);

DROP POLICY IF EXISTS "Settings admin all" ON public.site_settings;
CREATE POLICY "Settings admin all" ON public.site_settings FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Inquiries admin select" ON public.inquiries;
CREATE POLICY "Inquiries admin select" ON public.inquiries FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Inquiries admin update" ON public.inquiries;
CREATE POLICY "Inquiries admin update" ON public.inquiries FOR UPDATE USING (public.is_admin());

DROP POLICY IF EXISTS "Inquiry services admin select" ON public.inquiry_services;
CREATE POLICY "Inquiry services admin select" ON public.inquiry_services FOR SELECT USING (public.is_admin());
