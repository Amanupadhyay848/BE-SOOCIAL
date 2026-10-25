# BE SOOCIAL — System Architecture & Specifications

### 1. Technology Matrix
- **Runtime**: Node.js 20+ LTS
- **Framework**: Next.js 15+ (App Router) + React 19 + TypeScript Strict Mode
- **Styling**: Tailwind CSS v4 + tw-animate-css
- **3D Spatial Layer**: Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **Animation Orchestration**: Motion (`motion/react`)
- **Persistence & Auth**: Supabase (PostgreSQL, Supabase Auth, Row Level Security)
- **Local Dev Parity**: Repository pattern with in-memory & mock provider providing 100% API compatibility
- **Form & Validation**: React Hook Form + Zod
- **Media Delivery**: Cloudinary CDN (with signed direct uploads)

---

### 2. Route Map
- `/` — Homepage (3D Lens Scene, Services Bento, Featured Work, Pipeline, Testimonials, FAQ, CTA)
- `/work` — Filterable Portfolio (`?category=` with real client case studies)
- `/work/[slug]` — In-depth Case Study Details (Brief, deliverables, metrics, credits)
- `/services` — Agency Services Overview
- `/services/brand-management` — Brand Identity & Creative Strategy
- `/services/video-editing` — High-Pace Commercial & Short-Form Video Editing
- `/services/ai-filmmaking` — Cinematic AI Commercial Production & Narrative
- `/services/website-development` — Headless High-Performance Web Experiences
- `/services/digital-marketing` — Paid Media & Organic Growth Engines
- `/services/ai-ugc-ads` — High-Converting AI-Generated UGC Ad Creative
- `/ai-studio` — Technical breakdown of the BE SOOCIAL AI Production Pipeline
- `/about` — Studio Philosophy, Craft Manifesto & Leadership
- `/contact` — Direct Studio Outreach & Office Location
- `/start-a-project` — 4-Step Interactive Project Scoping Wizard
- `/privacy` — Privacy Notice
- `/terms` — Terms of Engagement
- `/admin` — Protected Management Portal (Inquiries Pipeline, Content Management)

---

### 3. Security & Anti-Spam Architecture
- **Server Route**: `/api/inquiries` processes all inbound project briefs.
- **Bot Defense**: Silent honeypot detection (`_hp_verify`). Submissions with filled honeypots are dropped silently without storage.
- **Rate Limiting**: IP-hashed tracking with strict sliding window to eliminate spam flooding.
- **Server Confirmation**: The client wizard does NOT show success until the server successfully returns HTTP 201 Created.
