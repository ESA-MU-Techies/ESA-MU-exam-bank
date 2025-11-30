"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white text-primary sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition">
            <Image src="/esamu-logo-transparent.png" alt="ESA-MU Logo" width={60} height={60} className="h-14 w-auto" />
            <span className="hidden sm:inline font-bold text-lg">ESA-MU Exam Bank</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="hover:text-accent transition">
              Home
            </Link>
            <Link href="/browse" className="hover:text-accent transition">
              Browse Exams
            </Link>
            <Link href="/upload" className="hover:text-accent transition">
              Upload Paper
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            <Link href="/" className="block py-2 hover:text-accent transition">
              Home
            </Link>
            <Link href="/browse" className="block py-2 hover:text-accent transition">
              Browse Exams
            </Link>
            <Link href="/upload" className="block py-2 hover:text-accent transition">
              Upload Paper
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
