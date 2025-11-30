"use client"

import { useState } from "react"
import { Eye, Download } from "lucide-react"
import type { ExamWithDetails } from "@/lib/types"
import { PDFViewer } from "./pdf-viewer"

interface ExamCardProps {
  exam: ExamWithDetails
}

export function ExamCard({ exam }: ExamCardProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [showViewer, setShowViewer] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch(exam.file_url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = exam.file_name
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleView = () => {
    window.open(exam.file_url, "_blank")
  }

  const uploadDate = new Date(exam.uploaded_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const fileSizeMB = (exam.file_size / (1024 * 1024)).toFixed(2)

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-primary mb-1">{exam.course_name}</h3>
            <p className="text-sm text-muted-foreground">{exam.course_code}</p>
          </div>
          <span className="bg-accent-light text-primary px-3 py-1 rounded-full text-sm font-medium">
            {exam.exam_type?.name || "Exam"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-muted-foreground">Department</p>
            <p className="font-medium text-foreground">{exam.department?.code}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Year & Semester</p>
            <p className="font-medium text-foreground">
              Year {exam.semester?.year_id ? "N/A" : "N/A"} - Sem {exam.semester?.semester_number}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
          <span>Uploaded: {uploadDate}</span>
          <span>Size: {fileSizeMB} MB</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleView}
            className="flex-1 bg-[#b22222] text-white py-2 rounded-md hover:bg-[#8b1a1a] transition font-medium flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 bg-primary text-white py-2 rounded-md hover:bg-[#600000] transition font-medium disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? "Downloading..." : "Download"}
          </button>
        </div>
      </div>

      {showViewer && (
        <PDFViewer fileUrl={exam.file_url} fileName={exam.file_name} onClose={() => setShowViewer(false)} />
      )}
    </>
  )
}
