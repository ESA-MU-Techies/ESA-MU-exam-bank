import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UploadForm } from "@/components/upload-form"
import { fetchDepartments, fetchYears, fetchSemesters, fetchExamTypes } from "@/lib/db"

export default async function UploadPage() {
  const [departments, years, semesters, examTypes] = await Promise.all([
    fetchDepartments(),
    fetchYears(),
    fetchSemesters(),
    fetchExamTypes(),
  ])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-neutral-light/70 via-white to-white">
        <section className="gradient-primary text-white py-14 px-4 relative overflow-hidden shadow-sm">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-10 w-72 h-72 bg-accent-yellow rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-10 w-80 h-80 bg-accent-light rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <p className="text-accent-light text-sm font-semibold uppercase tracking-wide">Contribute</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">Upload Exam Paper</h1>
            <p className="text-accent-light mt-3 max-w-2xl text-base md:text-lg">
              Share past exam papers with the ESA-MU community. Help students prepare with up-to-date resources.
            </p>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <UploadForm
              departments={departments}
              years={years}
              semesters={semesters}
              examTypes={examTypes}
            />

            <div className="mt-12 bg-accent-light/70 p-8 rounded-lg border border-accent/20">
              <h3 className="text-lg font-bold text-primary mb-4">Guidelines</h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>✓ Only upload PDF files of exam papers.</li>
                <li>✓ Ensure the file is clear and readable.</li>
                <li>✓ Include the correct course name and code.</li>
                <li>✓ Select the appropriate exam type and semester.</li>
                <li>✓ Maximum file size is 50MB.</li>
                <li>✓ You can upload anonymously or provide your name.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
