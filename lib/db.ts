// Database abstraction layer using Neon PostgreSQL
import { neon } from "@neondatabase/serverless"

// Initialize Neon SQL client
const sql = neon(process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || "")

export type Department = {
  id: string
  code: string
  name: string
  created_at?: string
}

export type Year = {
  id: string
  year_number: number
  name?: string
  created_at?: string
}

export type Semester = {
  id: string
  year_id: string
  semester_number: number
  name?: string
  created_at?: string
}

export type ExamType = {
  id: string
  code?: string
  name: string
  created_at?: string
}

export type Exam = {
  id: string
  department_id: string
  year_id: string
  semester_id: string
  exam_type_id: string
  course_name: string
  course_code: string
  academic_year?: string
  file_url: string
  file_name: string
  file_size: number
  uploaded_by: string
  uploaded_at?: string
  created_at?: string
  // denormalized fields from joins
  department_code?: string
  department_name?: string
  year_number?: number
  year_name?: string
  semester_number?: number
  semester_name?: string
  exam_type_code?: string
  exam_type_name?: string
}

export async function fetchDepartments(): Promise<Department[]> {
  try {
    const result = await sql`SELECT * FROM departments ORDER BY name`
    return result as Department[]
  } catch (error) {
    console.error("Error fetching departments:", error)
    return []
  }
}

export async function fetchYears(): Promise<Year[]> {
  try {
    const result = await sql`SELECT * FROM years ORDER BY year_number`
    return result as Year[]
  } catch (error) {
    console.error("Error fetching years:", error)
    return []
  }
}

export async function fetchSemesters(): Promise<Semester[]> {
  try {
    const result = await sql`SELECT * FROM semesters ORDER BY semester_number`
    return result as Semester[]
  } catch (error) {
    console.error("Error fetching semesters:", error)
    return []
  }
}

export async function fetchExamTypes(): Promise<ExamType[]> {
  try {
    const result = await sql`SELECT * FROM exam_types ORDER BY name`
    return result as ExamType[]
  } catch (error) {
    console.error("Error fetching exam types:", error)
    return []
  }
}

export async function fetchExams(filters?: {
  department_id?: string
  year_id?: string
  semester_id?: string
  exam_type_id?: string
}): Promise<Exam[]> {
  try {
    // Build dynamic query based on filters
    let result

    if (
      filters?.department_id &&
      filters?.year_id &&
      filters?.semester_id &&
      filters?.exam_type_id
    ) {
      result = await sql`
        SELECT e.*, 
          d.code as department_code, d.name as department_name,
          y.year_number, y.name as year_name,
          s.semester_number, s.name as semester_name,
          et.code as exam_type_code, et.name as exam_type_name
        FROM exams e
        LEFT JOIN departments d ON e.department_id = d.id
        LEFT JOIN years y ON e.year_id = y.id
        LEFT JOIN semesters s ON e.semester_id = s.id
        LEFT JOIN exam_types et ON e.exam_type_id = et.id
        WHERE e.department_id = ${filters.department_id}
          AND e.year_id = ${filters.year_id}
          AND e.semester_id = ${filters.semester_id}
          AND e.exam_type_id = ${filters.exam_type_id}
        ORDER BY e.uploaded_at DESC
      `
    } else if (filters?.department_id) {
      result = await sql`
        SELECT e.*, 
          d.code as department_code, d.name as department_name,
          y.year_number, y.name as year_name,
          s.semester_number, s.name as semester_name,
          et.code as exam_type_code, et.name as exam_type_name
        FROM exams e
        LEFT JOIN departments d ON e.department_id = d.id
        LEFT JOIN years y ON e.year_id = y.id
        LEFT JOIN semesters s ON e.semester_id = s.id
        LEFT JOIN exam_types et ON e.exam_type_id = et.id
        WHERE e.department_id = ${filters.department_id}
        ORDER BY e.uploaded_at DESC
      `
    } else if (filters?.year_id) {
      result = await sql`
        SELECT e.*, 
          d.code as department_code, d.name as department_name,
          y.year_number, y.name as year_name,
          s.semester_number, s.name as semester_name,
          et.code as exam_type_code, et.name as exam_type_name
        FROM exams e
        LEFT JOIN departments d ON e.department_id = d.id
        LEFT JOIN years y ON e.year_id = y.id
        LEFT JOIN semesters s ON e.semester_id = s.id
        LEFT JOIN exam_types et ON e.exam_type_id = et.id
        WHERE e.year_id = ${filters.year_id}
        ORDER BY e.uploaded_at DESC
      `
    } else if (filters?.semester_id) {
      result = await sql`
        SELECT e.*, 
          d.code as department_code, d.name as department_name,
          y.year_number, y.name as year_name,
          s.semester_number, s.name as semester_name,
          et.code as exam_type_code, et.name as exam_type_name
        FROM exams e
        LEFT JOIN departments d ON e.department_id = d.id
        LEFT JOIN years y ON e.year_id = y.id
        LEFT JOIN semesters s ON e.semester_id = s.id
        LEFT JOIN exam_types et ON e.exam_type_id = et.id
        WHERE e.semester_id = ${filters.semester_id}
        ORDER BY e.uploaded_at DESC
      `
    } else if (filters?.exam_type_id) {
      result = await sql`
        SELECT e.*, 
          d.code as department_code, d.name as department_name,
          y.year_number, y.name as year_name,
          s.semester_number, s.name as semester_name,
          et.code as exam_type_code, et.name as exam_type_name
        FROM exams e
        LEFT JOIN departments d ON e.department_id = d.id
        LEFT JOIN years y ON e.year_id = y.id
        LEFT JOIN semesters s ON e.semester_id = s.id
        LEFT JOIN exam_types et ON e.exam_type_id = et.id
        WHERE e.exam_type_id = ${filters.exam_type_id}
        ORDER BY e.uploaded_at DESC
      `
    } else {
      result = await sql`
        SELECT e.*, 
          d.code as department_code, d.name as department_name,
          y.year_number, y.name as year_name,
          s.semester_number, s.name as semester_name,
          et.code as exam_type_code, et.name as exam_type_name
        FROM exams e
        LEFT JOIN departments d ON e.department_id = d.id
        LEFT JOIN years y ON e.year_id = y.id
        LEFT JOIN semesters s ON e.semester_id = s.id
        LEFT JOIN exam_types et ON e.exam_type_id = et.id
        ORDER BY e.uploaded_at DESC
      `
    }

    return result as Exam[]
  } catch (error) {
    console.error("Error fetching exams:", error)
    return []
  }
}

export async function insertExam(examData: {
  department_id: string
  year_id: string
  semester_id?: string
  exam_type_id: string
  course_name: string
  course_code: string
  academic_year?: string
  file_url: string
  file_name: string
  file_size: number
  uploaded_by: string
}): Promise<Exam | null> {
  try {
    // If semester_id not provided, fetch the first semester for the year
    let semester_id = examData.semester_id
    if (!semester_id) {
      try {
        // Preferred: match year + semester 1
        const semesterResult = await sql`
          SELECT id FROM semesters
          WHERE semester_number = 1 AND year_id = ${examData.year_id}
          LIMIT 1
        `
        if (semesterResult && semesterResult.length > 0) {
          semester_id = (semesterResult[0] as { id: string }).id
        }
      } catch (err) {
        console.warn("Year-specific semester lookup failed; trying global fallback", err)
      }

      // Fallback: pick the first semester in the table (any year) to keep demo uploads working
      if (!semester_id) {
        try {
          const fallback = await sql`SELECT id FROM semesters ORDER BY created_at ASC LIMIT 1`
          if (fallback && fallback.length > 0) {
            semester_id = (fallback[0] as { id: string }).id
          }
        } catch (err) {
          console.error("Error fetching fallback semester:", err)
        }
      }

      if (!semester_id) {
        throw new Error("Cannot determine semester for exam")
      }
    }

    const result = await sql`
      INSERT INTO exams (
        department_id, year_id, semester_id, exam_type_id,
        course_name, course_code, academic_year,
        file_url, file_name, file_size, uploaded_by
      ) VALUES (
        ${examData.department_id},
        ${examData.year_id},
        ${semester_id},
        ${examData.exam_type_id},
        ${examData.course_name},
        ${examData.course_code},
        ${examData.academic_year || new Date().getFullYear().toString()},
        ${examData.file_url},
        ${examData.file_name},
        ${examData.file_size},
        ${examData.uploaded_by}
      )
      RETURNING *
    `
    return (result as Exam[])[0] || null
  } catch (error) {
    console.error("Error inserting exam:", error)
    throw error
  }
}

export async function clearAllExams(): Promise<{ success: boolean }> {
  try {
    await sql`DELETE FROM exams`
    return { success: true }
  } catch (error) {
    console.error("Error clearing exams:", error)
    throw error
  }
}

export async function deleteExam(id: string): Promise<{ success: boolean }> {
  try {
    await sql`DELETE FROM exams WHERE id = ${id}`
    return { success: true }
  } catch (error) {
    console.error("Error deleting exam:", error)
    throw error
  }
}
