"use client"
import {CheckSquare} from "lucide-react"

export default function PageLoading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="flex gap-2 items-center">
        <div>
          <CheckSquare className="h-8 w-8 text-primary" />
        </div>
        <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          SmartTodo
        </span>
      </div>
    </div>
  )
}
