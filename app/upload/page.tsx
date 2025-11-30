import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UploadForm } from "@/components/upload-form"
import { createClient } from "@/lib/supabase/server"

export default async function UploadPage() {
  const supabase = await createClient()

  const [{ data: departments }, { data: years }, { data: semesters }, { data: examTypes }] = await Promise.all([
    supabase.from("departments").select("*"),
    supabase.from("years").select("*").order("year_number"),
    supabase.from("semesters").select("*"),
    supabase.from("exam_types").select("*"),
  ])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="bg-primary text-white py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold">Upload Exam Paper</h1>
            <p className="text-accent-light mt-2">Share past exam papers with the ESA-MU community</p>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <UploadForm
              departments={departments || []}
              years={years || []}
              semesters={semesters || []}
              examTypes={examTypes || []}
            />

            <div className="mt-12 bg-accent-light p-8 rounded-lg">
              <h3 className="text-lg font-bold text-primary mb-4">Guidelines</h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>✓ Only upload PDF files of exam papers</li>
                <li>✓ Ensure the file is clear and readable</li>
                <li>✓ Include the correct course name and code</li>
                <li>✓ Select the appropriate exam type and semester</li>
                <li>✓ Maximum file size is 50MB</li>
                <li>✓ You can upload anonymously or provide your name</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
