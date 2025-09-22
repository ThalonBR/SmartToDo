// app/providers.tsx
"use client"

import {QueryClientProvider} from "@tanstack/react-query"
import {ReactNode, useState} from "react"
import {getQueryClient} from "@/lib/queryClient"

export function Providers({children}: {children: ReactNode}) {
  const [queryClient] = useState(getQueryClient)

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
