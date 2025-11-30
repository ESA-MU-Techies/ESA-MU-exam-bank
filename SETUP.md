# Setup Guide - ESA-MU Examination Bank System

## Prerequisites

Before you begin, ensure you have:
- Node.js 18 or higher
- npm or pnpm package manager
- Git
- A Supabase account (free tier available)
- A Vercel account (for Blob storage)

## Step-by-Step Setup

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/your-org/exam-bank-system.git
cd exam-bank-system
\`\`\`

### 2. Install Dependencies

Using npm:
\`\`\`bash
npm install
\`\`\`

Or using pnpm:
\`\`\`bash
pnpm install
\`\`\`

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project or use an existing one
3. Go to Project Settings → API
4. Copy your project URL and anon key
5. Go to Project Settings → Database → Connection Pooling
6. Copy the connection string

### 4. Set Up Vercel Blob

1. Go to [vercel.com](https://vercel.com) and sign in
2. Go to Storage → Blob
3. Create a new Blob store
4. Copy your read/write token

### 5. Configure Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_POSTGRES_URL=your_connection_string_here

# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_blob_token_here
\`\`\`

### 6. Initialize the Database

1. In your Supabase project, go to SQL Editor
2. Create a new query
3. Copy the contents of `scripts/001_create_exam_schema.sql`
4. Paste and run the query
5. Wait for completion

If you encounter policy errors, run `scripts/004_fresh_departments.sql` instead.

### 7. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will be available at `http://localhost:3000`

### 8. Verify Setup

- Visit `http://localhost:3000` - Home page should load
- Click "Browse Exams" - Should show empty list (no exams yet)
- Click "Upload Exam" - Upload form should display
- Try uploading a test PDF

## Troubleshooting Setup Issues

### "Cannot find module" errors
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
\`\`\`

### Supabase connection errors
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is valid
- Ensure your Supabase project is active

### Blob upload errors
- Verify `BLOB_READ_WRITE_TOKEN` is correct
- Check token hasn't expired
- Ensure file size is under 50MB

### Database migration errors
- If you see "policy already exists" error, run `scripts/004_fresh_departments.sql`
- Verify you're using the correct Supabase project
- Check that RLS is enabled on all tables

## Next Steps

1. Read [CONTRIBUTING.md](./CONTRIBUTING.md) to learn how to contribute
2. Check [API.md](./API.md) for API documentation
3. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for system design details

## Getting Help

- Check the [Troubleshooting](#troubleshooting-setup-issues) section
- Review Supabase documentation: https://supabase.com/docs
- Check Vercel Blob documentation: https://vercel.com/docs/storage/vercel-blob
