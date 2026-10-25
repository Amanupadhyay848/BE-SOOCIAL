# BE SOOCIAL — Local Development & Environment Setup

### 1. Requirements
- Node.js 20+ LTS or Node.js 22 LTS
- npm 10+

### 2. Quick Start
```bash
# Clone the repository
git clone <repo-url>
cd be-soocial

# Install pinned dependencies
npm install

# Start local development server
npm run dev
```

The application will be live at `http://localhost:3000`.

### 3. Environment Configuration
Create a `.env.local` file based on `.env.example`:
```ini
# Supabase Configuration (Optional for dev — uses local parity adapter by default)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Cloudinary CDN (For signed client uploads in production)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email Notifications (Optional for inquiries)
RESEND_API_KEY="re_123456789"
NOTIFICATION_EMAIL="hello@besoocial.com"
```

### 4. Running Migrations
To apply the database schema to your Supabase project:
```bash
npx supabase db push
# Or run supabase/migrations/20261010000000_be_soocial_init.sql in the Supabase SQL editor.
```
