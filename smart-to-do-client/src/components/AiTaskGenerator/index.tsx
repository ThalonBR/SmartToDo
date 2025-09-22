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
import {Textarea} from "@/components/ui/textarea"
import {Sparkles, Loader2, Wand2} from "lucide-react"
import {useGenerateIATasks} from "@/hooks/tasks/useGenerateIATasks"
import {ICreateAITask} from "@/lib/types/task.types"
import {RainbowButton} from "../ui/rainbow-button"
import {ShineBorder} from "../ui/shine-border"
import {toast} from "sonner"

interface AITaskGeneratorProps {
  listId: string
  trigger?: React.ReactNode
  disabled?: boolean
}

export function AITaskGenerator({
  listId,
  trigger,
  disabled,
}: AITaskGeneratorProps) {
  const {mutateAsync: generateTasks, isPending: isLoading} =
    useGenerateIATasks(listId)
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<ICreateAITask>()

  const onSubmit = async (data: ICreateAITask) => {
    try {
      const response = await generateTasks(data)
      handleClose()
      toast.success(`${response.length} tarefas geradas com sucesso!`, {
        richColors: true,
      })
    } catch (error) {
      toast.error("Erro ao gerar tarefas", {
        richColors: true,
      })
      console.error("Erro ao gerar tarefas:", error)
    }
  }

  const handleClose = () => {
    setOpen(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <RainbowButton disabled={disabled} className="group">
            <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
            Gerar com IA
          </RainbowButton>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Wand2 className="h-5 w-5 mr-2 text-primary" />
            Gerador Inteligente de Tarefas
          </DialogTitle>
          <DialogDescription>
            Descreva seu objetivo e nossa IA criará uma lista detalhada de
            tarefas para você alcançá-lo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="objective">Descreva seu objetivo</Label>
            <Textarea
              id="objective"
              className="bg-primary/5"
              placeholder="Ex: Organizar uma festa de aniversário para 20 pessoas, Aprender React em 30 dias, Planejar uma viagem para o Japão..."
              rows={4}
              {...register("prompt", {
                required: "Por favor, descreva seu objetivo",
                minLength: {
                  value: 10,
                  message:
                    "Descreva seu objetivo com mais detalhes (mínimo 10 caracteres)",
                },
              })}
            />
            {errors.prompt && (
              <p className="text-sm text-destructive">
                {errors.prompt.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">Chave da API de IA</Label>
            <Input
              id="apiKey"
              type="password"
              className="bg-primary/5"
              placeholder="sk-..."
              {...register("apiKey", {
                required: "A chave da API é obrigatória",
                minLength: {value: 10, message: "Chave da API inválida"},
              })}
            />
            {errors.apiKey && (
              <p className="text-sm text-destructive">
                {errors.apiKey.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Sua chave da API será usada apenas para esta sessão e não será
              armazenada.
            </p>
          </div>

          <div className="bg-muted/80 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Sparkles className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Como funciona</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Nossa IA analisará seu objetivo e criará uma lista estruturada
                  de tarefas, considerando dependências, prioridades e melhores
                  práticas para ajudá-lo a alcançar seu objetivo de forma
                  eficiente.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>

            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              <Sparkles className="h-4 w-4 mr-2" />
              Gerar Tarefas
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
