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
import {useCreateList} from "@/hooks/list/useCreateList"
import {ICreateList} from "@/lib/types/list.types"
import {useRouter} from "next/navigation"
import {toast} from "sonner"

export function CreateItemDialog() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const {mutateAsync: createList, isPending} = useCreateList()

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<ICreateList>()

  const onSubmit = async (data: ICreateList) => {
    try {
      const response = await createList({title: data.title})
      reset()
      setOpen(false)
      toast.success(`Lista "${data.title}" criada com sucesso!`, {
        richColors: true,
      })
      router.push(`/${response.id}`)
    } catch (error) {
      throw error
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="group">
          <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
          Nova Lista
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Nova Lista</DialogTitle>
          <DialogDescription>
            Dê um nome para sua nova lista de tarefas. Você poderá adicionar
            tarefas depois.
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
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Criar Lista
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
