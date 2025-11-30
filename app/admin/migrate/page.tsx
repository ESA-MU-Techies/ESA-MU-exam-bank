"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function MigrationPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleMigrate = async () => {
    setLoading(true)
    setMessage("")
    setError("")

    try {
      const response = await fetch("/api/migrate-fresh", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        setMessage(data.message)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Migration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Database Migration</h1>

        <div className="bg-card p-6 rounded-lg border">
          <p className="text-sm text-muted-foreground mb-4">
            Click the button below to recreate the departments table with correct names.
          </p>

          <Button onClick={handleMigrate} disabled={loading} className="w-full">
            {loading ? "Migrating..." : "Run Migration"}
          </Button>

          {message && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-green-800 text-sm">
              ✓ {message}
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">✗ {error}</div>
          )}
        </div>
      </div>
    </div>
  )
}
