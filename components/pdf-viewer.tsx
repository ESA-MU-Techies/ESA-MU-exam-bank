"use client"

import { useState } from "react"
import { X, Download } from "lucide-react"

interface PDFViewerProps {
  fileUrl: string
  fileName: string
  onClose: () => void
}

export function PDFViewer({ fileUrl, fileName, onClose }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground truncate">{fileName}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-md transition" aria-label="Close">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* PDF Viewer - Using native browser PDF support */}
        <div className="flex-1 overflow-auto bg-gray-100">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading PDF...</p>
              </div>
            </div>
          )}
          <embed
            src={`${fileUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            type="application/pdf"
            width="100%"
            height="100%"
            onLoad={() => setIsLoading(false)}
            className="w-full h-full"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t border-border bg-gray-50">
          <p className="text-sm text-muted-foreground">
            Use your browser's built-in PDF controls to navigate, zoom, and print
          </p>
          <a
            href={fileUrl}
            download={fileName}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-[#600000] transition font-medium"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      </div>
    </div>
  )
}
