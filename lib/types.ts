export interface Department {
  id: string
  code: string
  name: string
}

export interface Year {
  id: string
  year_number: number
}

export interface Semester {
  id: string
  year_id: string
  semester_number: number
}

export interface ExamType {
  id: string
  name: string
}

export interface Exam {
  id: string
  department_id: string
  semester_id: string
  exam_type_id: string
  course_name: string
  course_code: string
  file_url: string
  file_name: string
  file_size: number
  uploaded_by: string
  uploaded_at: string
}

export interface ExamWithDetails extends Exam {
  department?: Department
  semester?: Semester
  exam_type?: ExamType
}
