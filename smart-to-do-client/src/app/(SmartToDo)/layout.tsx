"use client"

import {Header} from "@/components/layout/header"
import {CheckSquare} from "lucide-react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div suppressHydrationWarning className="min-h-screen bg-background">
      <Header />
      {children}
    </div>
  )
}
