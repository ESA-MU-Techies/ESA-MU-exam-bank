import { del, list } from "@vercel/blob"
import { clearAllExams } from "@/lib/db"

export async function POST() {
  try {
    // Delete all files from Vercel Blob
    const { blobs } = await list()
    for (const blob of blobs) {
      await del(blob.url)
    }

    // Delete all exams from Neon database
    await clearAllExams()

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
