import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      department_id,
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
    if (!department_id || !semester_id || !exam_type_id || !course_name || !course_code || !file_url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    // Insert exam record
    const { data, error } = await supabase.from("exams").insert({
      department_id,
      semester_id,
      exam_type_id,
      course_name,
      course_code,
      file_url,
      file_name,
      file_size,
      uploaded_by: uploaded_by || "Anonymous",
    })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save exam metadata" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { searchParams } = new URL(request.url)
    const department = searchParams.get("department")
    const year = searchParams.get("year")
    const semester = searchParams.get("semester")
    const examType = searchParams.get("examType")

    let query = supabase.from("exams").select(`
        *,
        department:departments(*),
        semester:semesters(*),
        exam_type:exam_types(*)
      `)

    if (department) query = query.eq("department_id", department)
    if (year) query = query.eq("semester.year_id", year)
    if (semester) query = query.eq("semester.semester_number", Number.parseInt(semester))
    if (examType) query = query.eq("exam_type_id", examType)

    const { data, error } = await query.order("uploaded_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch exams" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
