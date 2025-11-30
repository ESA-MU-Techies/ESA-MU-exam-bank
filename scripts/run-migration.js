import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.SUPABASE_POSTGRES_URL_NON_POOLING)

async function runMigration() {
  try {
    console.log("[v0] Starting department name migration...")

    const updates = [
      { code: "MPE", name: "Mechanical and Production Engineering" },
      { code: "TLE", name: "Electrical and Telecommunication Engineering" },
      { code: "EC", name: "Electrical and Electronics Engineering" },
      { code: "CPE", name: "Chemical and Processing Engineering" },
      { code: "CSE", name: "Civil and Structural Engineering" },
    ]

    for (const dept of updates) {
      await sql`UPDATE public.departments SET name = ${dept.name} WHERE code = ${dept.code}`
      console.log(`[v0] Updated ${dept.code}: ${dept.name}`)
    }

    console.log("[v0] ✅ Migration completed successfully!")
    console.log("[v0] All department names have been corrected.")
  } catch (error) {
    console.error("[v0] ❌ Migration failed:", error.message)
    process.exit(1)
  }
}

runMigration()
