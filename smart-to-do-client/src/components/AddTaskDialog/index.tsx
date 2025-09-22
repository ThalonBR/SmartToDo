"use client"

import {useState} from "react"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Plus, Loader2} from "lucide-react"
import {ICreateTask} from "@/lib/types/task.types"
import {toast} from "sonner"

interface AddTaskDialogProps {
  onTaskAdded: (task: ICreateTask) => Promise<void>
  disabled?: boolean
}

export function AddTaskDialog({onTaskAdded, disabled}: AddTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<ICreateTask>()

  const onSubmit = async (data: ICreateTask) => {
    setIsLoading(true)
    try {
      await onTaskAdded(data)
      reset()
      setOpen(false)
    } catch (error) {
      toast.error("Erro ao adicionar tarefa", {
        richColors: true,
        id: "loading-actions",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className="group bg-transparent"
        >
          <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
          Adicionar Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
          <DialogDescription>
            Descreva a tarefa que você deseja adicionar à esta lista.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Descrição da Tarefa</Label>
            <Input
              id="title"
              placeholder="Ex: Comprar ingredientes para o jantar"
              {...register("title", {
                required: "A descrição é obrigatória",
                minLength: {
                  value: 3,
                  message: "A descrição deve ter pelo menos 3 caracteres",
                },
              })}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
