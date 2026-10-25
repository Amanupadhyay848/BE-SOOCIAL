# BE SOOCIAL — Production Deployment Guide

### Deployment Target
- **Recommended Platform**: Vercel (Native Next.js 15 App Router support) or Google Cloud Run (Standalone Docker container).

### Build Verification
Always verify clean builds prior to pushing:
```bash
npm run build
```

### Pre-Deployment Checklist
1. **Database**: Apply `supabase/migrations/20261010000000_be_soocial_init.sql` to your Supabase PostgreSQL cluster.
2. **Environment Variables**: Configure Supabase and Cloudinary credentials in project deployment settings.
3. **Admin Provisioning**: Insert the initial admin user profile into the `profiles` table matching the administrative user ID in `auth.users`.
4. **Custom Domain**: Set up apex and `www` CNAME records pointing to Vercel/Cloud Run.
5. **Asset CDN**: Verify Cloudinary media URLs are properly whitelisted in `next.config.ts`.
