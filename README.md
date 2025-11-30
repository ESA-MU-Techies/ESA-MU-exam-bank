# ESA-MU Examination Bank System

A modern, open-access platform for browsing, downloading, and uploading engineering exam papers from Moi University's School of Engineering.

## Overview

The ESA-MU Examination Bank System is a web application built with Next.js that allows students and faculty to:
- **Browse** exam papers organized by department, year, semester, and exam type
- **Download** exam papers in PDF format
- **Contribute** by uploading new exam papers to the repository

The platform is completely open and requires no authentication, making it accessible to everyone in the Moi University community.

## Features

- 🎓 **5 Engineering Departments**: MPE, TLE, EC, CPE, CSE
- 📚 **5 Years of Study**: Each with 2 semesters
- 📝 **4 Exam Types**: CAT 1, CAT 2, Main Exam, Supplementary Exam
- 🔍 **Advanced Filtering**: Filter exams by department, year, semester, and exam type with debounced search
- 👁️ **PDF Preview**: View exam papers directly in browser without downloading
- 📥 **Easy Upload**: Anyone can contribute exam papers without authentication
- ☁️ **Cloud Storage**: Exams stored securely on Vercel Blob
- 🗄️ **Database**: Powered by Supabase PostgreSQL
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Professional branding with Moi University and ESA-MU logos, smooth animations, and glassmorphism effects
- ⚡ **Optimized Performance**: Efficient database queries, debounced filtering, and lazy loading

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **File Storage**: Vercel Blob
- **Deployment**: Vercel

## Project Structure

\`\`\`
exam-bank-system/
├── app/
│   ├── api/                    # API routes
│   │   ├── exams/             # Exam data endpoints
│   │   ├── upload/            # File upload endpoint
│   │   └── migrate-fresh/      # Database migration endpoint
│   ├── admin/
│   │   └── migrate/           # Migration admin page
│   ├── browse/                # Exam browser page
│   ├── upload/                # Upload form page
│   ├── page.tsx               # Home page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── header.tsx             # Navigation header
│   ├── footer.tsx             # Footer
│   ├── exam-filters.tsx       # Filter controls
│   ├── exam-card.tsx          # Exam display card
│   ├── upload-form.tsx        # Upload form
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── supabase/
│   │   ├── client.ts          # Client-side Supabase
│   │   └── server.ts          # Server-side Supabase
│   ├── types.ts               # TypeScript interfaces
│   └── utils.ts               # Utility functions
├── public/                    # Static assets
│   ├── esamu-logo-transparent.png
│   ├── moi-university-logo.png
│   └── ...
├── scripts/                   # Database migration scripts
│   ├── 001_create_exam_schema.sql
│   ├── 002_fix_policies.sql
│   ├── 003_update_departments.sql
│   └── 004_fresh_departments.sql
└── package.json
\`\`\`

## Database Schema

### Tables

**departments**
- `id` (UUID): Primary key
- `code` (TEXT): Department code (MPE, TLE, EC, CPE, CSE)
- `name` (TEXT): Full department name
- `created_at` (TIMESTAMP): Creation timestamp

**years**
- `id` (UUID): Primary key
- `year_number` (INT): Year 1-5
- `created_at` (TIMESTAMP): Creation timestamp

**semesters**
- `id` (UUID): Primary key
- `year_id` (UUID): Foreign key to years
- `semester_number` (INT): 1 or 2
- `created_at` (TIMESTAMP): Creation timestamp

**exam_types**
- `id` (UUID): Primary key
- `name` (TEXT): Exam type (CAT 1, CAT 2, Main Exam, Supplementary Exam)
- `created_at` (TIMESTAMP): Creation timestamp

**exams**
- `id` (UUID): Primary key
- `department_id` (UUID): Foreign key to departments
- `semester_id` (UUID): Foreign key to semesters
- `exam_type_id` (UUID): Foreign key to exam_types
- `course_name` (TEXT): Name of the course
- `course_code` (TEXT): Course code
- `file_url` (TEXT): URL to the PDF file in Vercel Blob
- `file_name` (TEXT): Original filename
- `file_size` (INT): File size in bytes
- `uploaded_by` (TEXT): Name of uploader
- `uploaded_at` (TIMESTAMP): Upload timestamp
- `created_at` (TIMESTAMP): Creation timestamp

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Supabase account and project
- Vercel account (for Blob storage)

### Local Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd exam-bank-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   BLOB_READ_WRITE_TOKEN=your_blob_token
   \`\`\`

4. **Initialize the database**
   - Go to your Supabase project dashboard
   - Open the SQL editor
   - Run the migration script from `scripts/001_create_exam_schema.sql`
   - If you encounter policy errors, run `scripts/004_fresh_departments.sql`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   pnpm dev
   \`\`\`

6. **Open in browser**
   Navigate to `http://localhost:3000`

## Usage

### Browsing Exams

1. Click "Browse Exams" in the navigation
2. Use the filters to select:
   - Department
   - Year
   - Semester
   - Exam Type
3. Exams are filtered in real-time as you adjust filters
4. Click "View" to preview the PDF in your browser
5. Click "Download" to download the PDF file

### Viewing Exams

- Click the "View" button on any exam card to open the PDF in your browser's native viewer
- Use your browser's built-in PDF controls to zoom, search, and print
- No download required for viewing

### Uploading Exams

1. Click "Upload Exam" in the navigation
2. Fill in the exam details:
   - Select department, year, semester, and exam type
   - Enter course name and code
   - Select the PDF file (max 50MB)
   - Enter your name
3. Click "Upload"
4. The exam will be available immediately in the browse section

## API Documentation

See [API.md](./API.md) for detailed API endpoint documentation.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to this project.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy

\`\`\`bash
vercel deploy
\`\`\`

## Troubleshooting

### Database Connection Issues
- Verify environment variables are correctly set
- Check Supabase project is active
- Ensure RLS policies are enabled

### File Upload Issues
- Check file size is under 50MB
- Verify file is a valid PDF
- Ensure Vercel Blob token is valid

### PDF Viewing Issues
- Ensure your browser supports PDF viewing (all modern browsers do)
- If PDF doesn't open, try downloading instead
- Clear browser cache if you see old versions of PDFs

### Missing Departments
- Run the migration script: `scripts/004_fresh_departments.sql`
- Refresh the page after migration

## License

This project is maintained by the Engineering Students' Association (ESA) at Moi University.

## Support

For issues or questions, please contact the ESA-MU team or open an issue in the repository.
