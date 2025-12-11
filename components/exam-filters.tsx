"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { Department, Year, Semester, ExamType } from "@/lib/types"

interface ExamFiltersProps {
  departments: Department[]
  years: Year[]
  semesters: Semester[]
  examTypes: ExamType[]
}

export function ExamFilters({ departments, years, semesters, examTypes }: ExamFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedDept, setSelectedDept] = useState(searchParams.get("department") || "")
  const [selectedYear, setSelectedYear] = useState(searchParams.get("year") || "")
  const [selectedSemester, setSelectedSemester] = useState(searchParams.get("semester") || "")
  const [selectedExamType, setSelectedExamType] = useState(searchParams.get("examType") || "")

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams()
      if (selectedDept) params.set("department", selectedDept)
      if (selectedYear) params.set("year", selectedYear)
      if (selectedSemester) params.set("semester", selectedSemester)
      if (selectedExamType) params.set("examType", selectedExamType)

      router.push(`/browse?${params.toString()}`)
    }, 300) // 300ms debounce

    return () => clearTimeout(timer)
  }, [selectedDept, selectedYear, selectedSemester, selectedExamType, router])

  const handleReset = () => {
    setSelectedDept("")
    setSelectedYear("")
    setSelectedSemester("")
    setSelectedExamType("")
    router.push("/browse")
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-border/70">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Filters</p>
          <h3 className="text-lg font-bold text-primary">Refine results</h3>
        </div>
        <button
          onClick={handleReset}
          className="text-sm font-semibold text-primary hover:text-primary-dark underline-offset-4 hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Department</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.code}>
                {dept.code} - {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year.id} value={year.id}>
                Year {year.year_number}
              </option>
            ))}
          </select>
        </div>

        {/* Semester Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Semester</label>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            disabled={!selectedYear}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          >
            <option value="">All Semesters</option>
            {selectedYear && semesters
              .filter((s) => s.year_id === selectedYear)
              .map((sem) => (
                <option key={sem.id} value={sem.semester_number}>
                  Semester {sem.semester_number}
                </option>
              ))}
          </select>
        </div>

        {/* Exam Type Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Exam Type</label>
          <select
            value={selectedExamType}
            onChange={(e) => setSelectedExamType(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Types</option>
            {examTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>

    </div>
  )
}
