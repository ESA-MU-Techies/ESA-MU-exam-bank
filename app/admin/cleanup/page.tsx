"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CleanupPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleCleanup = async () => {
    if (!confirm("Are you sure you want to delete ALL exam papers? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    setMessage("")
    setError("")

    try {
      const response = await fetch("/api/cleanup", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        setMessage(data.message)
      } else {
        setError(data.error || "Cleanup failed")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900">Database Cleanup</CardTitle>
            <CardDescription className="text-red-800">Delete all exam papers and start fresh</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white p-4 rounded border border-red-200">
              <p className="text-sm text-gray-700 mb-4">This action will:</p>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>Delete all exam papers from Vercel Blob storage</li>
                <li>Delete all exam records from the database</li>
                <li>This action CANNOT be undone</li>
              </ul>
            </div>

            {message && (
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <p className="text-green-900 text-sm">{message}</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <p className="text-red-900 text-sm">{error}</p>
              </div>
            )}

            <Button
              onClick={handleCleanup}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {loading ? "Cleaning up..." : "Delete All Exam Papers"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
