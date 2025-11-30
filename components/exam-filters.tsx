"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { Department, Year, ExamType } from "@/lib/types"

interface ExamFiltersProps {
  departments: Department[]
  years: Year[]
  examTypes: ExamType[]
}

export function ExamFilters({ departments, years, examTypes }: ExamFiltersProps) {
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
    <div className="bg-white p-6 rounded-lg shadow-md border border-border">
      <h3 className="text-lg font-bold text-primary mb-4">Filter Exams</h3>

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
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Semesters</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
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

      <button
        onClick={handleReset}
        className="mt-4 px-4 py-2 bg-muted text-foreground rounded-md hover:bg-opacity-80 transition text-sm font-medium"
      >
        Reset Filters
      </button>
    </div>
  )
}
