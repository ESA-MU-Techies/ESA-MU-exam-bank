# API Documentation - ESA-MU Examination Bank System

## Overview

The ESA-MU Examination Bank System provides REST API endpoints for managing exams and uploads. All endpoints are public and require no authentication.

## Base URL

\`\`\`
http://localhost:3000/api
\`\`\`

Or on production:
\`\`\`
https://your-domain.vercel.app/api
\`\`\`

## Endpoints

### 1. Get Exams

Retrieve exam papers with optional filtering.

**Endpoint:** `GET /api/exams`

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `department` | string | Filter by department code (MPE, TLE, EC, CPE, CSE) |
| `year` | number | Filter by year (1-5) |
| `semester` | number | Filter by semester (1-2) |
| `exam_type` | string | Filter by exam type (CAT 1, CAT 2, Main Exam, Supplementary Exam) |

**Example Request:**
\`\`\`bash
curl "http://localhost:3000/api/exams?department=MPE&year=3&semester=1"
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "department_id": "uuid-dept",
      "semester_id": "uuid-sem",
      "exam_type_id": "uuid-type",
      "course_name": "Thermodynamics",
      "course_code": "MPE301",
      "file_url": "https://blob.vercel-storage.com/...",
      "file_name": "Thermodynamics_2023.pdf",
      "file_size": 2048576,
      "uploaded_by": "John Doe",
      "uploaded_at": "2024-01-15T10:30:00Z",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
\`\`\`

**Error Response (400 Bad Request):**
\`\`\`json
{
  "success": false,
  "error": "Invalid filter parameters"
}
\`\`\`

### 2. Upload Exam

Upload a new exam paper.

**Endpoint:** `POST /api/upload`

**Content-Type:** `multipart/form-data`

**Form Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | File | Yes | PDF file (max 50MB) |
| `department_id` | string | Yes | UUID of department |
| `semester_id` | string | Yes | UUID of semester |
| `exam_type_id` | string | Yes | UUID of exam type |
| `course_name` | string | Yes | Name of the course |
| `course_code` | string | Yes | Course code |
| `uploaded_by` | string | Yes | Name of uploader |

**Example Request:**
\`\`\`bash
curl -X POST http://localhost:3000/api/upload \
  -F "file=@thermodynamics.pdf" \
  -F "department_id=uuid-mpe" \
  -F "semester_id=uuid-sem" \
  -F "exam_type_id=uuid-cat1" \
  -F "course_name=Thermodynamics" \
  -F "course_code=MPE301" \
  -F "uploaded_by=John Doe"
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "message": "Exam uploaded successfully",
  "data": {
    "id": "uuid-new-exam",
    "file_url": "https://blob.vercel-storage.com/...",
    "file_name": "thermodynamics.pdf"
  }
}
\`\`\`

**Error Response (400 Bad Request):**
\`\`\`json
{
  "success": false,
  "error": "File size exceeds 50MB limit"
}
\`\`\`

**Error Response (415 Unsupported Media Type):**
\`\`\`json
{
  "success": false,
  "error": "Only PDF files are allowed"
}
\`\`\`

### 3. Get Departments

Retrieve all departments.

**Endpoint:** `GET /api/exams?departments=true`

**Response (200 OK):**
\`\`\`json
{
  "success": true,
  "departments": [
    {
      "id": "uuid-1",
      "code": "MPE",
      "name": "Mechanical and Production Engineering"
    },
    {
      "id": "uuid-2",
      "code": "TLE",
      "name": "Electrical and Telecommunication Engineering"
    },
    {
      "id": "uuid-3",
      "code": "EC",
      "name": "Electrical and Electronics Engineering"
    },
    {
      "id": "uuid-4",
      "code": "CPE",
      "name": "Chemical and Processing Engineering"
    },
    {
      "id": "uuid-5",
      "code": "CSE",
      "name": "Civil and Structural Engineering"
    }
  ]
}
\`\`\`

## Data Types

### Exam Object
\`\`\`typescript
{
  id: string                    // UUID
  department_id: string         // UUID
  semester_id: string           // UUID
  exam_type_id: string          // UUID
  course_name: string           // e.g., "Thermodynamics"
  course_code: string           // e.g., "MPE301"
  file_url: string              // URL to PDF
  file_name: string             // Original filename
  file_size: number             // Size in bytes
  uploaded_by: string           // Uploader name
  uploaded_at: string           // ISO 8601 timestamp
  created_at: string            // ISO 8601 timestamp
}
\`\`\`

### Department Object
\`\`\`typescript
{
  id: string                    // UUID
  code: string                  // MPE, TLE, EC, CPE, CSE
  name: string                  // Full department name
}
\`\`\`

### Semester Object
\`\`\`typescript
{
  id: string                    // UUID
  year_id: string               // UUID
  semester_number: number       // 1 or 2
}
\`\`\`

### ExamType Object
\`\`\`typescript
{
  id: string                    // UUID
  name: string                  // CAT 1, CAT 2, Main Exam, Supplementary Exam
}
\`\`\`

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid parameters or file |
| 415 | Unsupported Media Type | File type not allowed |
| 500 | Internal Server Error | Server error |

## Rate Limiting

Currently, there are no rate limits. However, please use the API responsibly.

## CORS

The API supports CORS requests from any origin.

## Examples

### JavaScript/Fetch

\`\`\`javascript
// Get exams for a specific department
const response = await fetch(
  '/api/exams?department=MPE&year=3'
);
const data = await response.json();
console.log(data.data);

// Upload an exam
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('department_id', 'uuid-mpe');
formData.append('semester_id', 'uuid-sem');
formData.append('exam_type_id', 'uuid-cat1');
formData.append('course_name', 'Thermodynamics');
formData.append('course_code', 'MPE301');
formData.append('uploaded_by', 'John Doe');

const uploadResponse = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});
const uploadData = await uploadResponse.json();
console.log(uploadData);
\`\`\`

### cURL

\`\`\`bash
# Get exams
curl "http://localhost:3000/api/exams?department=MPE"

# Upload exam
curl -X POST http://localhost:3000/api/upload \
  -F "file=@exam.pdf" \
  -F "department_id=uuid" \
  -F "semester_id=uuid" \
  -F "exam_type_id=uuid" \
  -F "course_name=Course Name" \
  -F "course_code=CODE101" \
  -F "uploaded_by=Your Name"
\`\`\`

## Changelog

### v1.0.0 (Current)
- Initial API release
- GET /api/exams endpoint
- POST /api/upload endpoint
