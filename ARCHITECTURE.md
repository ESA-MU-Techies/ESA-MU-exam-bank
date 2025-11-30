# Architecture - ESA-MU Examination Bank System

## System Overview

The ESA-MU Examination Bank System is a full-stack web application built with modern technologies to provide a seamless experience for browsing and uploading engineering exam papers.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React Components (TypeScript)                       │   │
│  │  - Home Page                                         │   │
│  │  - Browse Page (with filters)                        │   │
│  │  - Upload Page                                       │   │
│  │  - Header/Footer/Navigation                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Styling (Tailwind CSS + shadcn/ui)                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                  Next.js Server                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Routes                                          │   │
│  │  - GET /api/exams (fetch exams)                      │   │
│  │  - POST /api/upload (handle uploads)                 │   │
│  │  - POST /api/migrate-fresh (database setup)          │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Server Utilities                                    │   │
│  │  - Supabase Server Client                            │   │
│  │  - File Upload Handler                               │   │
│  │  - Database Query Handler                            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         ↓                                    ↓
    ┌─────────────┐                  ┌──────────────────┐
    │  Supabase   │                  │  Vercel Blob     │
    │  PostgreSQL │                  │  File Storage    │
    │             │                  │                  │
    │ - Exams     │                  │ - PDF Files      │
    │ - Metadata  │                  │ - Metadata       │
    │ - Filters   │                  │                  │
    └─────────────┘                  └──────────────────┘
\`\`\`

## Component Architecture

### Frontend Components

\`\`\`
App
├── Header
│   ├── Logo (ESA-MU)
│   ├── Navigation Links
│   └── Mobile Menu
├── Main Content
│   ├── Home Page
│   │   ├── Hero Section
│   │   ├── Features Section
│   │   ├── How It Works
│   │   └── Departments Showcase
│   ├── Browse Page
│   │   ├── ExamFilters
│   │   │   ├── Department Select
│   │   │   ├── Year Select
│   │   │   ├── Semester Select
│   │   │   └── Exam Type Select
│   │   └── ExamCard (repeated)
│   │       ├── Course Info
│   │       ├── Metadata
│   │       └── Download Button
│   └── Upload Page
│       └── UploadForm
│           ├── Department Select
│           ├── Year Select
│           ├── Semester Select
│           ├── Exam Type Select
│           ├── Course Name Input
│           ├── Course Code Input
│           ├── File Input
│           ├── Uploader Name Input
│           └── Submit Button
└── Footer
    ├── Links
    ├── Copyright
    └── Contact Info
\`\`\`

### Data Flow

#### Browsing Exams
\`\`\`
User selects filters
        ↓
URL parameters updated
        ↓
Browse page re-renders
        ↓
ExamFilters component sends request
        ↓
GET /api/exams?department=...&year=...
        ↓
API route queries Supabase
        ↓
Results returned to component
        ↓
ExamCard components rendered
        ↓
User sees filtered exams
\`\`\`

#### Uploading Exam
\`\`\`
User fills upload form
        ↓
User clicks submit
        ↓
Form data collected
        ↓
POST /api/upload with FormData
        ↓
API route:
  1. Validates file (PDF, <50MB)
  2. Uploads to Vercel Blob
  3. Saves metadata to Supabase
        ↓
Success response returned
        ↓
User redirected to browse page
        ↓
New exam appears in list
\`\`\`

## Database Schema

### Relationships

\`\`\`
departments (1) ──→ (many) exams
years (1) ──→ (many) semesters
semesters (1) ──→ (many) exams
exam_types (1) ──→ (many) exams
\`\`\`

### Table Details

**departments**
- Stores 5 engineering departments
- Code is unique identifier
- No deletions expected

**years**
- Stores years 1-5
- Static data
- No deletions expected

**semesters**
- Stores 10 semester records (5 years × 2 semesters)
- References years table
- Cascading delete enabled

**exam_types**
- Stores 4 exam types
- Static data
- No deletions expected

**exams**
- Main table storing exam records
- References departments, semesters, exam_types
- Cascading delete enabled
- Stores file metadata and upload info

## Security

### Row Level Security (RLS)

All tables have RLS enabled with policies:

**Public Read Access**
- Anyone can read from all tables
- No authentication required
- Enables open browsing

**Public Insert Access**
- Anyone can insert exams
- No authentication required
- Enables open uploads

### File Security

- Only PDF files allowed
- File size limited to 50MB
- Files stored in Vercel Blob (secure cloud storage)
- File URLs are public but not easily guessable

### Data Validation

- Course name and code required
- Uploader name required
- Department, year, semester, exam type must exist
- File must be valid PDF

## Performance Considerations

### Caching

- Departments, years, semesters, exam types are static
- Could be cached on client side
- Exams list could be paginated for large datasets

### Database Queries

- Filters applied at database level
- Only necessary data returned
- Indexes on foreign keys for fast joins

### File Storage

- Files stored in Vercel Blob (CDN-backed)
- Fast downloads from edge locations
- Automatic compression and optimization

## Scalability

### Current Limitations

- No pagination (all exams returned)
- No search functionality
- No user accounts or tracking

### Future Improvements

- Implement pagination for large datasets
- Add full-text search
- Add user accounts for tracking uploads
- Add admin moderation for uploads
- Add analytics and statistics
- Add email notifications

## Deployment

### Development
- Local Next.js server
- Local Supabase instance (optional)
- Local file storage

### Production
- Vercel hosting
- Supabase cloud database
- Vercel Blob storage
- CDN for static assets

### Environment Variables

**Required for Production**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `BLOB_READ_WRITE_TOKEN`

## Error Handling

### Client-Side
- Form validation before submission
- User-friendly error messages
- Retry logic for failed uploads

### Server-Side
- Input validation
- File type and size checks
- Database error handling
- Blob upload error handling

### User Feedback
- Success/error toast notifications
- Loading states during operations
- Clear error messages

## Testing Strategy

### Unit Tests
- Component rendering
- Utility functions
- Type checking

### Integration Tests
- API endpoints
- Database operations
- File uploads

### E2E Tests
- Complete user workflows
- Browse and filter
- Upload and verify

## Monitoring

### Metrics to Track
- Upload success rate
- Average file size
- Popular departments/courses
- User activity patterns

### Error Tracking
- Failed uploads
- Database errors
- API errors
- File storage errors

## Future Enhancements

1. **Search Functionality**
   - Full-text search on course names
   - Search by course code

2. **User Accounts**
   - Track uploads per user
   - User profiles
   - Upload history

3. **Admin Panel**
   - Moderate uploads
   - Delete inappropriate content
   - View statistics

4. **Advanced Filtering**
   - Search by professor
   - Filter by upload date
   - Sort by popularity

5. **Social Features**
   - Rate exams
   - Add comments
   - Share exams

6. **Mobile App**
   - Native iOS/Android app
   - Offline access
   - Push notifications
