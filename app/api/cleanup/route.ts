import { del, list } from "@vercel/blob"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    })

    // Delete all files from Vercel Blob
    const { blobs } = await list()
    for (const blob of blobs) {
      await del(blob.url)
    }

    const { data: exams, error: fetchError } = await supabase.from("exams").select("id")

    if (fetchError) {
      throw new Error(`Failed to fetch exams: ${fetchError.message}`)
    }

    // Delete all exams by their IDs
    if (exams && exams.length > 0) {
      const examIds = exams.map((exam: any) => exam.id)
      const { error: deleteError } = await supabase.from("exams").delete().in("id", examIds)

      if (deleteError) {
        throw new Error(`Failed to delete exams: ${deleteError.message}`)
      }
    }

    return Response.json({
      success: true,
      message: "All exam papers and database records have been deleted successfully",
    })
  } catch (error) {
    console.error("Cleanup error:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Cleanup failed",
      },
      { status: 500 },
    )
  }
}
