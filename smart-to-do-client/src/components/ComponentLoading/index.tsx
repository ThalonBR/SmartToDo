import {CheckSquare} from "lucide-react"
export default function ComponentLoading() {
  return (
    <div className="w-full h-screen flex items-center justify-center  bg-background">
      <div className="flex items-center gap-2">
        <div>
          <CheckSquare className="h-8 w-8 text-primary animate-pulse" />
        </div>
        <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-pulse">
          SmartTodo
        </span>
      </div>
    </div>
  )
}
