"use client"

import type React from "react"

import { useState } from "react"
import type { Department, Year, Semester, ExamType } from "@/lib/types"

interface UploadFormProps {
  departments: Department[]
  years: Year[]
  semesters: Semester[]
  examTypes: ExamType[]
}

export function UploadForm({ departments, years, semesters, examTypes }: UploadFormProps) {
  const [formData, setFormData] = useState({
    department: "",
    year: "",
    semester: "",
    examType: "",
    courseName: "",
    courseCode: "",
    uploaderName: "",
  })

  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const selectedYear = years.find((y) => y.id === formData.year)
  const availableSemesters = selectedYear ? semesters.filter((s) => s.year_id === selectedYear.id) : []

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setMessage({ type: "error", text: "Please select a PDF file" })
        return
      }
      if (selectedFile.size > 50 * 1024 * 1024) {
        setMessage({ type: "error", text: "File size must be less than 50MB" })
        return
      }
      setFile(selectedFile)
      setMessage(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // Validation
    if (!formData.department || !formData.year || !formData.examType) {
      setMessage({ type: "error", text: "Please fill in department, year, and exam type" })
      return
    }

    if (!formData.courseName || !formData.courseCode) {
      setMessage({ type: "error", text: "Please enter course name and code" })
      return
    }

    if (!file) {
      setMessage({ type: "error", text: "Please select a PDF file" })
      return
    }

    setIsLoading(true)

    try {
      // Upload file to Vercel Blob
      const formDataBlob = new FormData()
      formDataBlob.append("file", file)

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formDataBlob,
      })

      if (!uploadResponse.ok) {
        throw new Error("File upload failed")
      }

      const { url, filename, size } = await uploadResponse.json()

      // Save exam metadata to database
      const examResponse = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          department_id: formData.department,
          year_id: formData.year,
          semester_id: formData.semester,
          exam_type_id: formData.examType,
          course_name: formData.courseName,
          course_code: formData.courseCode,
          file_url: url,
          file_name: filename,
          file_size: size,
          uploaded_by: formData.uploaderName || "Anonymous",
        }),
      })

      if (!examResponse.ok) {
        throw new Error("Failed to save exam metadata")
      }

      setMessage({
        type: "success",
        text: "Exam paper uploaded successfully! Thank you for contributing.",
      })

      // Reset form
      setFormData({
        department: "",
        year: "",
        semester: "",
        examType: "",
        courseName: "",
        courseCode: "",
        uploaderName: "",
      })
      setFile(null)
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Upload failed. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-border/70">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Submit</p>
        <h2 className="text-2xl font-bold text-primary">Upload Exam Paper</h2>
        <p className="text-sm text-muted-foreground mt-2">Provide the details below so others can easily find this paper.</p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-md mb-6 ${
            message.type === "success"
              ? "bg-accent-light/70 text-primary border border-accent/50"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
          role="status"
        >
          {message.text}
        </div>
      )}

      {/* Filter Section */}
      <div className="mb-8 pb-8 border-b border-border">
        <h3 className="text-lg font-bold text-primary mb-4">Exam Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.code} - {dept.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">Choose the department that owns the course.</p>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Year <span className="text-red-500">*</span>
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year.id} value={year.id}>
                  Year {year.year_number}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">Required so we can place the paper in the right cohort.</p>
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Semester
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
              disabled={!formData.year}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="">Select Semester (optional)</option>
              {availableSemesters.map((sem) => (
                <option key={sem.id} value={sem.id}>
                  Semester {sem.semester_number}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">Optional. If omitted, we will associate it automatically.</p>
          </div>

          {/* Exam Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Exam Type <span className="text-red-500">*</span>
            </label>
            <select
              name="examType"
              value={formData.examType}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Exam Type</option>
              {examTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">Select whether this is CAT, main exam, or supplementary.</p>
          </div>
        </div>
      </div>

      {/* Course Section */}
      <div className="mb-8 pb-8 border-b border-border">
        <h3 className="text-lg font-bold text-primary mb-4">Course Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Course Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              placeholder="e.g., Engineering Mathematics"
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Course Code */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Course Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleInputChange}
              placeholder="e.g., ENG101"
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* File Section */}
      <div className="mb-8 pb-8 border-b border-border">
        <h3 className="text-lg font-bold text-primary mb-4">Upload File</h3>

        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition bg-accent-light/30">
          <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="file-input" />
          <label htmlFor="file-input" className="cursor-pointer space-y-2 block">
            <div className="text-4xl font-bold text-primary" aria-hidden>
              PDF
            </div>
            <p className="text-foreground font-semibold">{file ? file.name : "Click to select a PDF"}</p>
            <p className="text-sm text-muted-foreground">PDF only - Max 50MB</p>
            {file && <p className="text-xs text-muted-foreground">Ready to upload</p>}
          </label>
        </div>
      </div>

      {/* Uploader Info */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-foreground mb-2">Your Name (Optional)</label>
        <input
          type="text"
          name="uploaderName"
          value={formData.uploaderName}
          onChange={handleInputChange}
          placeholder="Leave blank to upload anonymously"
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition font-bold disabled:opacity-50"
      >
        {isLoading ? "Uploading..." : "Upload Exam Paper"}
      </button>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        By uploading, you agree that this is your own work or you have permission to share it.
      </p>
    </form>
  )
}
