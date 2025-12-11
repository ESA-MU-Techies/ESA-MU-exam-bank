import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ExamFilters } from "@/components/exam-filters"
import { ExamCard } from "@/components/exam-card"
import { fetchDepartments, fetchYears, fetchSemesters, fetchExamTypes, fetchExams } from "@/lib/db"
import { Suspense } from "react"

async function ExamsList({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams

  // Fetch filter options in parallel
  const [departments, years, semesters, examTypes] = await Promise.all([
    fetchDepartments(),
    fetchYears(),
    fetchSemesters(),
    fetchExamTypes(),
  ])

  // Build filter object for database query
  const filters: { department_id?: string; semester_id?: string; exam_type_id?: string } = {}

  // Apply department filter
  if (params.department) {
    const dept = departments.find((d) => d.code === params.department)
    if (dept) filters.department_id = dept.id
  }

  // Apply year and semester filters
  if (params.year && params.semester) {
    const year = years.find((y) => y.id === params.year)
    if (year) {
      const semester = semesters.find(
        (s) => s.year_id === year.id && s.semester_number === Number.parseInt(params.semester)
      )
      if (semester) {
        filters.semester_id = semester.id
      }
    }
  }

  // Apply exam type filter
  if (params.examType) {
    filters.exam_type_id = params.examType
  }

  const exams = await fetchExams(filters)

  // Exams already denormalized from Neon with all related data joined
  const enrichedExams = exams

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ExamFilters departments={departments} years={years} semesters={semesters} examTypes={examTypes} />

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-primary mb-6">
          {enrichedExams && enrichedExams.length > 0
            ? `Found ${enrichedExams.length} Exam${enrichedExams.length !== 1 ? "s" : ""}`
            : "No Exams Found"}
        </h2>

        {enrichedExams && enrichedExams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrichedExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        ) : (
          <div className="bg-accent-light p-8 rounded-lg text-center">
            <p className="text-foreground mb-4">No exam papers found matching your filters.</p>
            <p className="text-muted-foreground">Try adjusting your search criteria or browse all exams.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
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
            <p className="text-accent-light text-sm font-semibold uppercase tracking-wide">Explore</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">Browse Exam Papers</h1>
            <p className="text-accent-light mt-3 max-w-2xl text-base md:text-lg">
              Filter and download past examination papers across departments, years, semesters, and exam types.
            </p>
          </div>
        </section>

        <section className="py-10 px-4">
          <Suspense fallback={<div className="text-center py-12">Loading exams...</div>}>
            <ExamsList searchParams={searchParams} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  )
}
