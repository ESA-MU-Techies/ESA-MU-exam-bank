import { insertExam, fetchExams } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      department_id,
      year_id,
      semester_id,
      exam_type_id,
      course_name,
      course_code,
      file_url,
      file_name,
      file_size,
      uploaded_by,
    } = body

    // Validate required fields
      if (!department_id || !year_id || !exam_type_id || !course_name || !course_code || !file_url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert exam record using Neon
    const examData = {
      department_id,
      year_id,
      semester_id,
      exam_type_id,
      course_name,
      course_code,
      file_url,
      file_name,
      file_size,
      uploaded_by: uploaded_by || "Anonymous",
    }

    const exam = await insertExam(examData)

    if (!exam) {
      return NextResponse.json({ error: "Failed to save exam metadata" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: exam }, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const department_id = searchParams.get("department_id")
    const year_id = searchParams.get("year_id")
    const semester_id = searchParams.get("semester_id")
    const exam_type_id = searchParams.get("exam_type_id")

    const filters = {
      ...(department_id && { department_id }),
      ...(year_id && { year_id }),
      ...(semester_id && { semester_id }),
      ...(exam_type_id && { exam_type_id }),
    }

    const data = await fetchExams(filters)

    return NextResponse.json({ data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
