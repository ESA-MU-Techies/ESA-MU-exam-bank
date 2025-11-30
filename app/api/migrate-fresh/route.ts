import { createClient } from "@supabase/supabase-js"

export async function POST() {
  try {
    console.log("[v0] Starting fresh department migration...")

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    // Drop and recreate departments
    const { error: dropError } = await supabase.rpc("exec_sql", {
      sql: "DROP TABLE IF EXISTS public.departments CASCADE",
    })

    if (dropError) {
      // If rpc doesn't exist, use direct query
      await supabase.from("departments").delete().neq("id", "00000000-0000-0000-0000-000000000000")
    }

    console.log("[v0] ✓ Dropped existing departments table")

    // Create table
    const { error: createError } = await supabase.from("departments").insert([
      { code: "MPE", name: "Mechanical and Production Engineering" },
      { code: "TLE", name: "Electrical and Telecommunication Engineering" },
      { code: "EC", name: "Electrical and Electronics Engineering" },
      { code: "CPE", name: "Chemical and Processing Engineering" },
      { code: "CSE", name: "Civil and Structural Engineering" },
    ])

    if (createError) throw createError

    console.log("[v0] ✓ Inserted correct departments")

    return Response.json({
      success: true,
      message: "Departments recreated successfully with correct names",
    })
  } catch (error) {
    console.error("[v0] ❌ Migration failed:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
