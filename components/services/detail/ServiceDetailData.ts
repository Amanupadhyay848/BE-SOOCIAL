export interface ServicePillar {
  title: string;
  tagline: string;
  description: string;
  deliverableList: string[];
}

export interface ServiceProcessStage {
  phase: string;
  stageName: string;
  title: string;
  description: string;
  duration: string;
}

export interface ServiceDetailedConfig {
  slug: string;
  heroHeadline: string;
  heroSubheadline: string;
  centerpieceDescription: string;
  overviewSummary: string;
  interactivePillars: ServicePillar[];
  processTimeline: ServiceProcessStage[];
  verifiedBenefits: { title: string; desc: string }[];
  relatedSlugs: string[];
}

export const DETAILED_SERVICES_DATA: Record<string, ServiceDetailedConfig> = {
  'brand-management': {
    slug: 'brand-management',
    heroHeadline: 'BRANDS THAT LEAVE A MARK.',
    heroSubheadline:
      'We forge holistic brand identities, typography guidelines, and executive positioning that turn businesses into cultural fixtures.',
    centerpieceDescription:
      'A metallic crown suspended in 3D space, surrounded by floating brand identity boards, typographic specimens, vector monograms, and physical packaging mockups.',
    overviewSummary:
      'In saturated global markets, brand equity is the ultimate moat. BE SOOCIAL architects cohesive brand universes that command premium pricing and institutional loyalty.',
    interactivePillars: [
      {
        title: 'Brand Strategy & Positioning',
        tagline: 'Foundational Gravity',
        description: 'Competitive deconstruction, category defining angles, target persona psychographics, and long-term positioning narratives.',
        deliverableList: ['Brand Positioning Blueprint', 'Market White Space Map', 'Brand Voice & Verbal Architecture'],
      },
      {
        title: 'Identity Design & Systems',
        tagline: 'Visual Tokenization',
        description: 'Vector logo systems, primary & secondary monograms, bespoke typography selection, and comprehensive color palettes.',
        deliverableList: ['Complete Vector Master Kit', 'Color Systems & HSL Tokens', 'Custom Glyph & Typography Rules'],
      },
      {
        title: 'Visual Consistency & Guidelines',
        tagline: 'Global Governance',
        description: 'Exhaustive digital brand book covering multi-channel social layouts, digital advertising, print standards, and motion behavior.',
        deliverableList: ['Digital Interactive Brand Portal', 'Print & Packaging Specs', 'Social Media Asset Templates'],
      },
      {
        title: 'Content Direction & Playbooks',
        tagline: 'Editorial Voice',
        description: 'Directorial guidance for commercial photography, cinematic lighting standards, and branded video art direction.',
        deliverableList: ['Lighting & Photography Playbook', 'Social Content Style Guide', 'Executive Keynote Decks'],
      },
      {
        title: 'Brand Development & Evolution',
        tagline: 'Sustained Momentum',
        description: 'Continuous brand governance, product launch packaging extensions, and quarterly brand audits.',
        deliverableList: ['Packaging Expansion Templates', 'Quarterly Brand Health Audits', 'Sub-Brand Architecture'],
      },
    ],
    processTimeline: [
      {
        phase: 'DISCOVER',
        stageName: 'STAGE 01',
        title: 'Cultural & Competitive Audit',
        description: 'Deconstruct market landscape, identify enterprise whitespace, and define core positioning pillars.',
        duration: 'Week 1',
      },
      {
        phase: 'EXPLORE',
        stageName: 'STAGE 02',
        title: 'Visual Universe Prototyping',
        description: 'Present 3 divergent identity directions with real packaging, typographic hierarchy, and digital applications.',
        duration: 'Week 2',
      },
      {
        phase: 'REFINE',
        stageName: 'STAGE 03',
        title: 'Tokenization & Guidelines',
        description: 'Finalize master vectors, build tokens for web and motion, and document exhaustive governance rules.',
        duration: 'Week 3',
      },
      {
        phase: 'DEPLOY',
        stageName: 'STAGE 04',
        title: 'Asset Vault & Team Handover',
        description: 'Deliver production-ready asset archives, interactive guidelines portal, and stakeholder implementation workshop.',
        duration: 'Week 4',
      },
    ],
    verifiedBenefits: [
      { title: 'Unified Consistency', desc: 'Eliminates fragmented creative across internal teams and external agency partners.' },
      { title: 'Premium Value Perception', desc: 'Elevates customer willingness to pay through unmistakable visual refinement.' },
      { title: 'Speed of Execution', desc: 'Design systems and template kits accelerate future asset creation by up to 5x.' },
    ],
    relatedSlugs: ['website-development', 'digital-marketing', 'ai-filmmaking'],
  },

  'ai-filmmaking': {
    slug: 'ai-filmmaking',
    heroHeadline: 'VISIONS BEYOND REALITY.',
    heroSubheadline:
      'Cinematic commercials, surreal worldbuilding, and visual storytelling powered by proprietary generative neural production pipelines.',
    centerpieceDescription:
      'A floating cinema camera with an active tally lamp, surrounded by drifting 3D film strip frames, depth environment grids, and animated storyboard panels.',
    overviewSummary:
      'We combine human directorial craft with cutting-edge neural video models (ComfyUI, Midjourney, Kling, Runway Gen-3) to produce visuals that were previously unattainable without eight-figure physical set budgets.',
    interactivePillars: [
      {
        title: 'Concept Development & Narrative',
        tagline: 'World Genesis',
        description: 'Original screenplays, shot architecture, character bibles, and directorial visual style frames.',
        deliverableList: ['Directorial Shot Script', 'Style Frame Mood Bible', 'Character Consistency Model Sheets'],
      },
      {
        title: 'Visual Storytelling & Pre-Viz',
        tagline: 'Directorial Timing',
        description: 'Timed animatic sequences with scratch audio and camera lens focal length planning.',
        deliverableList: ['Full Length Pre-Viz Animatic', 'Camera Movement Track Sheets', 'Audio Pacing Master'],
      },
      {
        title: 'AI-Assisted Production',
        tagline: 'Neural Generation',
        description: 'High-resolution generative rendering utilizing ControlNet CAD passes, neural character consistency, and photorealistic lighting.',
        deliverableList: ['4K Neural Scene Renders', 'Volumetric Lighting Passes', 'Complex Physics Simulation Cuts'],
      },
      {
        title: 'Cinematic Post-Production',
        tagline: 'Human Polishing',
        description: 'Professional optical upscaling, temporal deflickering, DaVinci Resolve color grading, and Hollywood-grade sound design.',
        deliverableList: ['ProRes 4444 Master Export', 'Atmos Surround Sound Mix', 'Broadcast Cutdowns (16:9, 9:16)'],
      },
    ],
    processTimeline: [
      {
        phase: 'BRIEF',
        stageName: 'STAGE 01',
        title: 'Script & World Exploration',
        description: 'Directorial concept alignment, script lock, and generative style exploration across 50+ aesthetic moods.',
        duration: 'Days 1 – 3',
      },
      {
        phase: 'PRE-VIZ',
        stageName: 'STAGE 02',
        title: 'Storyboard & Animatic Timing',
        description: 'Assembly of timed storyboard sequence with temp soundscape for rhythm approval.',
        duration: 'Days 4 – 7',
      },
      {
        phase: 'SYNTHESIS',
        stageName: 'STAGE 03',
        title: 'High-Fidelity Neural Passes',
        description: 'Iterative generation of final scenes with rigorous prompt geometry and facial keypoint adherence.',
        duration: 'Days 8 – 14',
      },
      {
        phase: 'FINISH',
        stageName: 'STAGE 04',
        title: 'Master Grade & Audio Mix',
        description: 'Colorist pass, sound effects layering, voiceover sync, and multi-format commercial mastering.',
        duration: 'Days 15 – 18',
      },
    ],
    verifiedBenefits: [
      { title: 'Zero Location Constraints', desc: 'Shoot on Mars, deep underwater, or in futuristic megacities without physical travel.' },
      { title: 'Rapid Creative Iteration', desc: 'Revise camera angles and art direction in hours rather than re-mounting costly shoots.' },
      { title: 'Commercial Turnaround', desc: 'Complete broadcast campaigns delivered in under 3 weeks.' },
    ],
    relatedSlugs: ['video-editing', 'brand-management', 'ai-ugc-ads'],
  },

  'video-editing': {
    slug: 'video-editing',
    heroHeadline: 'RAW FOOTAGE. REAL EMOTIONS.',
    heroSubheadline:
      'Surgical narrative pacing, custom kinetic typography, bespoke SFX, and high-velocity short & long-form video editing.',
    centerpieceDescription:
      'A professional editing workstation with an animated multi-track timeline, glowing audio waveform visualizer, 3-way color wheel, and floating film strips.',
    overviewSummary:
      'Modern audience retention is decided within the first second. Our edit suites engineer maximum narrative retention with kinetic cuts, immersive sound design, and custom motion graphics tuned for both mobile feeds and cinematic screens.',
    interactivePillars: [
      {
        title: 'Short-Form Video Editing',
        tagline: 'High Retention Velocity',
        description: 'Reels, TikToks, and YouTube Shorts engineered with sub-second hook pacing, animated captions, and dynamic sound design.',
        deliverableList: ['9:16 Vertical Master Packages', 'Animated Kinetic Subtitles', 'Sound Design & SFX Stems'],
      },
      {
        title: 'Long-Form Video Editing',
        tagline: 'Narrative Storytelling',
        description: 'Documentaries, keynote speeches, podcast visualizers, and brand films cut for sustained viewer immersion.',
        deliverableList: ['16:9 DCI 4K Master Cuts', 'Multicam Switching & Color Matching', 'Custom Intro & Outro Motion Packages'],
      },
      {
        title: 'Commercial Editing & Cutdowns',
        tagline: 'High-Impact Spots',
        description: 'Broadcast and digital ad spots delivered in 60s, 30s, 15s, and 6s bumper permutations.',
        deliverableList: ['Multi-Ratio Aspect Cuts (16:9, 1:1, 9:16)', 'Split Testing Variants', 'Clean & Texted Video Masters'],
      },
      {
        title: 'Cinematic Color Grading & Audio',
        tagline: 'Sensory Immersion',
        description: 'DaVinci Resolve color passes for filmic density, dialogue de-noising, atmospheric Foley, and spatial audio.',
        deliverableList: ['Custom Show LUTs', 'Stem Separated Audio Packs', 'Loudness Compliant Masters'],
      },
    ],
    processTimeline: [
      {
        phase: 'INGEST',
        stageName: 'STAGE 01',
        title: 'Footage Ingestion & Script Sync',
        description: 'Organization of raw footage, transcription, selects reel assembly, and narrative story arc planning.',
        duration: 'Days 1 – 2',
      },
      {
        phase: 'ROUGH CUT',
        stageName: 'STAGE 02',
        title: 'Assembly & Hook Architecture',
        description: 'First assembly cut focused on pacing, retention hooks, and emotional beats.',
        duration: 'Days 3 – 5',
      },
      {
        phase: 'POLISH',
        stageName: 'STAGE 03',
        title: 'Sound Design & Motion Typography',
        description: 'Layering custom SFX, cinematic ambient risers, custom titles, and kinetic typography.',
        duration: 'Days 6 – 8',
      },
      {
        phase: 'GRADE & QC',
        stageName: 'STAGE 04',
        title: 'Final Color Grade & Deliverables',
        description: 'DaVinci color pass, multi-ratio exports, bit-rate optimization for platforms, and archive delivery.',
        duration: 'Days 9 – 10',
      },
    ],
    verifiedBenefits: [
      { title: 'Higher Watch-Through Rate', desc: 'Micro-pacing and custom SFX prevent audience fatigue and boost algorithm metrics.' },
      { title: 'Omnichannel Readiness', desc: 'Every asset delivered pre-formatted for TikTok, Instagram, YouTube, and digital billboard specs.' },
      { title: 'Streamlined Revisions', desc: 'Frame.io collaborative review allows precise timestamped feedback.' },
    ],
    relatedSlugs: ['ai-filmmaking', 'ai-ugc-ads', 'digital-marketing'],
  },

  'digital-marketing': {
    slug: 'digital-marketing',
    heroHeadline: 'STRATEGY. CREATIVITY. GROWTH.',
    heroSubheadline:
      'Omnichannel performance creative, multi-variant ad testing, and data-driven customer acquisition pipelines.',
    centerpieceDescription:
      'A floating campaign performance ecosystem with live growth bar charts, platform content tiles, and retention funnel visualizers.',
    overviewSummary:
      'Creative without intelligent distribution is invisible. BE SOOCIAL deploys agile media frameworks spanning Meta, TikTok, YouTube, and programmatic networks to sustainably grow enterprise brand equity and conversion volume.',
    interactivePillars: [
      {
        title: 'Growth Strategy & Market Architecture',
        tagline: 'Strategic Foundation',
        description: 'Customer journey mapping, attribution modeling, competitor paid spend deconstruction, and media mix modeling.',
        deliverableList: ['Omnichannel Growth Blueprint', 'Audience Segment Matrix', 'Unit Economics & CAC Targets'],
      },
      {
        title: 'Content Planning & Hook Calendars',
        tagline: 'High-Velocity Cadence',
        description: 'Structured monthly testing matrices testing divergent creative angles, headlines, and creator scripts.',
        deliverableList: ['Monthly Testing Roadmap', '50+ Hook Angles Matrix', 'Script & Copy Briefs'],
      },
      {
        title: 'Campaign Creative & Multi-Variant Assets',
        tagline: 'Ad Fatigue Elimination',
        description: 'Continuous batches of fresh static, motion, and video creative designed to break algorithmic plateaus.',
        deliverableList: ['Weekly Creative Ad Drops', 'Display & Carousel Formats', 'High-Converting Landing Page Modules'],
      },
      {
        title: 'Attribution & Transparent Reporting',
        tagline: 'Live Performance Analytics',
        description: 'Real-time performance dashboards tracking blended ROAS, customer acquisition costs, and cohort retention.',
        deliverableList: ['Live Looker Studio / GA4 Portal', 'Weekly Strategic Video Summaries', 'Creative Win/Loss Post-Mortems'],
      },
    ],
    processTimeline: [
      {
        phase: 'AUDIT',
        stageName: 'STAGE 01',
        title: 'Funnel Audit & Pixel Instrumentation',
        description: 'Inspect past ad account history, verify tracking pixels and conversions API, and establish benchmark KPIs.',
        duration: 'Week 1',
      },
      {
        phase: 'SEED',
        stageName: 'STAGE 02',
        title: 'Sprint 01 Creative Deployment',
        description: 'Launch initial batch of 20+ creative variations across distinct hook angles and audience segments.',
        duration: 'Week 2',
      },
      {
        phase: 'ITERATE',
        stageName: 'STAGE 03',
        title: 'Algorithmic Optimization',
        description: 'Cut underperforming concepts, double down on winning hooks, and iterate variants to lower acquisition costs.',
        duration: 'Weeks 3 – 4',
      },
      {
        phase: 'SCALE',
        stageName: 'STAGE 04',
        title: 'Budget Scaling & Channel Expansion',
        description: 'Scale ad spend on validated creative engines and expand into secondary growth channels.',
        duration: 'Ongoing',
      },
    ],
    verifiedBenefits: [
      { title: 'Continuous Creative Replenishment', desc: 'Shields ad accounts from the inevitable decay of ad fatigue.' },
      { title: 'Zero Guesswork Feedback', desc: 'Direct correlation between creative variants and measurable revenue returns.' },
      { title: 'Full Ownership of Creative', desc: 'All assets, scripts, and production files remain 100% brand owned.' },
    ],
    relatedSlugs: ['ai-ugc-ads', 'website-development', 'brand-management'],
  },

  'website-development': {
    slug: 'website-development',
    heroHeadline: 'WEBSITES THAT WORK BEAUTIFULLY.',
    heroSubheadline:
      'Headless Next.js architecture, interactive Three.js 3D spatial scenes, and high-converting performance engineering.',
    centerpieceDescription:
      'A floating laptop displaying a responsive interface with layered browser windows, interactive code components, and a 3D wireframe lattice.',
    overviewSummary:
      'Websites should not be static brochures; they are living digital flagship stores. We craft interactive, 60fps web experiences utilizing Next.js App Router, WebGL spatial canvases, and clean design systems that command attention and drive conversions.',
    interactivePillars: [
      {
        title: 'UI/UX Design & Spatial Systems',
        tagline: 'Human-Centered Polish',
        description: 'Editorial typographic layouts, intuitive user journeys, wireframes, and high-fidelity Figma prototypes.',
        deliverableList: ['Interactive Figma Design System', 'Component Token Architecture', 'Micro-Interaction Prototypes'],
      },
      {
        title: 'Frontend Development & 3D Spatial Canvas',
        tagline: '60FPS Engineering',
        description: 'Next.js App Router, React Three Fiber canvases, Motion animations, and responsive fluid typography.',
        deliverableList: ['Clean TypeScript Codebase', 'Custom Three.js 3D Interactive Elements', 'Mobile-First Fluid Breakpoints'],
      },
      {
        title: 'Backend Development & Integrations',
        tagline: 'Rock-Solid Infrastructure',
        description: 'Secure server actions, REST/GraphQL APIs, CRM hooks, newsletter syncs, and Supabase / PostgreSQL schemas.',
        deliverableList: ['API Route Handlers with Rate Limiting', 'Database Architecture & Migrations', 'Third-Party Webhooks'],
      },
      {
        title: 'Performance, Accessibility & SEO',
        tagline: 'Enterprise Quality',
        description: '95+ Google Lighthouse scores, semantic HTML5 structure, WCAG AA accessibility, and JSON-LD structured data.',
        deliverableList: ['Lighthouse 95+ Audit Guarantee', 'WCAG AA Compliance Verification', 'Complete OpenGraph & SEO Schema'],
      },
    ],
    processTimeline: [
      {
        phase: 'WIRE',
        stageName: 'STAGE 01',
        title: 'Architecture & UX Wireframes',
        description: 'Information architecture, sitemap mapping, user journey funnels, and low-fidelity responsive wireframes.',
        duration: 'Week 1',
      },
      {
        phase: 'DESIGN',
        stageName: 'STAGE 02',
        title: 'High-Fidelity 3D UI Exploration',
        description: 'Visual identity application, 3D interactive assets, motion choreography, and component system design.',
        duration: 'Weeks 2 – 3',
      },
      {
        phase: 'BUILD',
        stageName: 'STAGE 03',
        title: 'Next.js & WebGL Implementation',
        description: 'Production code development, responsive styling, 3D canvas optimization, and API endpoint integration.',
        duration: 'Weeks 4 – 5',
      },
      {
        phase: 'LAUNCH',
        stageName: 'STAGE 04',
        title: 'QA, Speed Audit & Domain Cutover',
        description: 'Cross-browser testing, SEO audit, security hardening, CI/CD pipeline setup, and seamless production launch.',
        duration: 'Week 6',
      },
    ],
    verifiedBenefits: [
      { title: 'Sub-Second Page Loads', desc: 'Microsecond server responses keep bounce rates low and conversions high.' },
      { title: 'Memorable Brand Differentiation', desc: '3D spatial immersion sets your digital presence apart from generic templates.' },
      { title: 'Future-Proof Scalability', desc: 'Componentized React architecture grows seamlessly with your business.' },
    ],
    relatedSlugs: ['brand-management', 'digital-marketing', 'ai-filmmaking'],
  },

  'ai-ugc-ads': {
    slug: 'ai-ugc-ads',
    heroHeadline: 'REAL FEEL. HIGH IMPACT.',
    heroSubheadline:
      'Authentic creator-style ads, product storytelling, and high-velocity variations engineered to conquer TikTok and Meta algorithms.',
    centerpieceDescription:
      'A floating creator studio featuring a vertical smartphone recording UI, product hero display, live REC indicator, and engagement badge overlays.',
    overviewSummary:
      'Traditional influencer content is slow, unpredictable, and expensive to iterate. We synthesize authentic creator-style UGC ad variations with organic smartphone aesthetics, native hooks, and hundreds of iterations to dramatically lower customer acquisition costs.',
    interactivePillars: [
      {
        title: 'Creative Concepts & Viral Hooks',
        tagline: 'Retention Architecture',
        description: 'Deconstruct TikTok and Instagram algorithmic hooks to script compelling 3-second opening patterns.',
        deliverableList: ['50+ Hook Variations Document', 'Native Problem-Solution Scripts', 'Visual Pattern Interrupt Ideas'],
      },
      {
        title: 'Creator-Style Ads & Persona Matching',
        tagline: 'Organic Credibility',
        description: 'Naturalistic smartphone presentation, diverse relatable creator profiles, and authentic unscripted cadence.',
        deliverableList: ['Multiple Creator Personas', 'Multi-Accent Audio Tracks', 'Authentic Selfie-Style Framing'],
      },
      {
        title: 'Product Storytelling & Demos',
        tagline: 'Proof of Value',
        description: 'Dynamic product unboxings, texture close-ups, split-screen comparisons, and benefit callout overlays.',
        deliverableList: ['Macro Product B-Roll Footage', 'Custom Kinetic Text Overlays', 'Feature Highlight Callout Cards'],
      },
      {
        title: 'High-Velocity Ad Variations',
        tagline: 'Scale Testing',
        description: 'Systematic permutations of hooks, call-to-actions, audio beds, and caption styles to identify top performers.',
        deliverableList: ['Batch Packages of 20–50 Ad Cuts', 'Native Platform Formats (9:16)', 'Performance Hook Audit Reports'],
      },
    ],
    processTimeline: [
      {
        phase: 'DISSECT',
        stageName: 'STAGE 01',
        title: 'Product Deconstruction & Hook Mining',
        description: 'Analyze customer reviews, identify top purchase objections, and draft 30+ native angle variations.',
        duration: 'Days 1 – 2',
      },
      {
        phase: 'CAPTURE',
        stageName: 'STAGE 02',
        title: 'Creator Production & B-Roll Capture',
        description: 'Shoot or synthesize native creator footage, product demos, and contextual everyday usage.',
        duration: 'Days 3 – 5',
      },
      {
        phase: 'PERMUTE',
        stageName: 'STAGE 03',
        title: 'Modular Assembly & Cutdowns',
        description: 'Systematically splice top hooks with demo bodies and CTA variations for multi-variant testing.',
        duration: 'Days 6 – 8',
      },
      {
        phase: 'DEPLOY',
        stageName: 'STAGE 04',
        title: 'Delivery & Account Launch',
        description: 'Deliver categorized 9:16 video packages ready for immediate import into Meta and TikTok ad managers.',
        duration: 'Days 9 – 10',
      },
    ],
    verifiedBenefits: [
      { title: 'Ad-Blindness Immunity', desc: 'Blends seamlessly into organic feeds so users watch rather than skipping immediately.' },
      { title: 'Hyper-Fast Iteration', desc: 'Swap opening hooks in minutes to revive successful ad angles when fatigue sets in.' },
      { title: 'Cost-Effective Production', desc: 'Produces 10x more usable ad variations than traditional influencer agency contracts.' },
    ],
    relatedSlugs: ['digital-marketing', 'video-editing', 'brand-management'],
  },
};
