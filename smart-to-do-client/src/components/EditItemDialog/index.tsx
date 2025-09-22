"use client"

import type React from "react"

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
import {Edit, Loader2} from "lucide-react"
import {IUpdateList} from "@/lib/types/list.types"

interface EditItemDialogProps {
  item: IUpdateList
  onItemUpdated: (item: IUpdateList) => void
  trigger?: React.ReactNode
}

export function EditItemDialog({
  item,
  onItemUpdated,
  trigger,
}: EditItemDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<IUpdateList>({
    defaultValues: {
      title: item.title,
    },
  })

  const onSubmit = async (data: IUpdateList) => {
    setIsLoading(true)
    try {
      const updatedItem = data
      onItemUpdated(updatedItem)
      reset()
      setOpen(false)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Lista</DialogTitle>
          <DialogDescription>
            Altere o nome da sua lista de tarefas.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título da Lista</Label>
            <Input
              id="title"
              placeholder="Ex: Projeto da casa nova"
              {...register("title", {
                required: "O título é obrigatório",
                minLength: {
                  value: 3,
                  message: "O título deve ter pelo menos 3 caracteres",
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
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
