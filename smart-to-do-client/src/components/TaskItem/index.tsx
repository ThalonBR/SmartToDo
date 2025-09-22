"use client"

import {useState} from "react"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Trash2, Clock} from "lucide-react"
import {cn} from "@/lib/utils"
import {formatDate} from "@/lib/utils/date.utils"
import {ITask} from "@/lib/types/task.types"

interface TaskItemProps {
  task: ITask
  onToggle: (taskId: string) => Promise<void>
  onDelete: (taskId: string) => Promise<void>
  disabled?: boolean
}

export function TaskItem({task, onToggle, onDelete, disabled}: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete(task.id)
    } catch (error) {
      throw error
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card
      className={cn(
        "group transition-all duration-200",
        task.isCompleted && "opacity-75"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={task.isCompleted}
            disabled={disabled}
            onCheckedChange={() => onToggle(task.id)}
            className="mt-1 data-[state=checked]:bg-primary border border-primary data-[state=checked]:border-primary"
          />
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "text-sm font-medium leading-relaxed",
                task.isCompleted && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {formatDate(task.createdAt, "dd MMM HH:mm")}
              </Badge>
              {task.isCompleted && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-primary/10 text-primary"
                >
                  Concluída
                </Badge>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="md:opacity-0 group-hover:opacity-100 hover:cursor-pointer transition-opacity md:text-muted-foreground md:hover:text-destructive text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
