import { neon } from "@neondatabase/serverless"

export async function POST() {
  try {
    const sql = neon(process.env.SUPABASE_POSTGRES_URL_NON_POOLING!)

    // Execute the department name updates
    const updates = [
      "UPDATE public.departments SET name = 'Mechanical and Production Engineering' WHERE code = 'MPE'",
      "UPDATE public.departments SET name = 'Electrical and Telecommunication Engineering' WHERE code = 'TLE'",
      "UPDATE public.departments SET name = 'Electrical and Electronics Engineering' WHERE code = 'EC'",
      "UPDATE public.departments SET name = 'Chemical and Processing Engineering' WHERE code = 'CPE'",
      "UPDATE public.departments SET name = 'Civil and Structural Engineering' WHERE code = 'CSE'",
    ]

    for (const query of updates) {
      await sql(query)
    }

    return Response.json({
      success: true,
      message: "Department names updated successfully",
    })
  } catch (error) {
    console.error("[v0] Migration error:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Migration failed",
      },
      { status: 500 },
    )
  }
}
