"use client"

import Link from "next/link"
import {CheckSquare} from "lucide-react"

export function Header() {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            suppressHydrationWarning
            href="/"
            className="flex items-center space-x-2"
          >
            <div className="relative">
              <CheckSquare className="h-8 w-8 text-primary" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              SmartToDo
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
