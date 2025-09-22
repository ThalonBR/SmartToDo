import type {Metadata} from "next"
import {Geist, Geist_Mono} from "next/font/google"
import "./globals.css"
import {Toaster} from "sonner"
import {Providers} from "@/components/providers"
import {Suspense} from "react"
import PageLoading from "@/components/PageLoading"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Smart To Do",
  description: "Organize suas tarefas com inteligência artificial.",
  icons: {
    icon: "/checkIcon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <Providers>
          <Suspense fallback={<PageLoading />}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  )
}
