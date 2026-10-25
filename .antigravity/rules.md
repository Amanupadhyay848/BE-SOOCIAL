# BE SOOCIAL — Antigravity Agent Rules & Conventions

This file governs all agent execution sessions in Antigravity for **BE SOOCIAL**. Every agent session must inspect and adhere strictly to these rules before proposing or implementing changes.

---

### Core Tenets

1. **Brand Canonical Spelling**:
   - The brand name is strictly **BE SOOCIAL** (uppercase with space). Never "Be Social", "BeSocial", or "BE_SOOCIAL".

2. **Honest Content & Zero Fabrication**:
   - Absolutely no fake client logos, fabricated metrics (e.g. "+9999% Growth"), dummy quotes, or fake pricing tiers.
   - All portfolio case studies, quotes, and services represent authentic production deliverables or explicitly annotated client briefs.

3. **Link & Navigation Hygiene**:
   - Strictly prohibit `target="_blank"` on internal routes. All internal routing uses Next.js `<Link>`.
   - External links must include `rel="noopener noreferrer"`.

4. **Security & Secrets Seclusion**:
   - Zero secrets, private database tokens, or service-role keys in client bundles.
   - All database mutations and sensitive operations run server-side in Next.js Route Handlers (`app/api/*`) or Server Actions.

5. **Server-Confirmed Success States**:
   - Never display a success state or confirmation toast in forms before the server has returned a validated HTTP `2xx` response.
   - Always handle and display clean recoverable errors when requests fail.

6. **Accessibility & Motion Restraint**:
   - Respect `prefers-reduced-motion` at all times. Disable continuous camera drift and provide static composition fallbacks.
   - Maintain WCAG AA contrast standards ($\ge 4.5:1$ for normal text, $\ge 3:1$ for large text).
   - Ensure touch targets are at least $44\text{px} \times 44\text{px}$ on touch devices.

7. **TypeScript Strict Mode**:
   - Zero `any` types. All domain models, Supabase entities, and component props must be strongly typed.

8. **End-of-Phase Verification Report**:
   - At the conclusion of every phase or session, provide a structured summary including:
     - Files created or modified
     - Test passes and verification commands run
     - Known operational limitations
     - Required third-party credentials or environment variables
