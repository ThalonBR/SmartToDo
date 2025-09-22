"use client"

import {useParams, useRouter} from "next/navigation"
import Link from "next/link"
import {TaskItem} from "@/components/TaskItem"
import {AddTaskDialog} from "@/components/AddTaskDialog"
import {EditItemDialog} from "@/components/EditItemDialog"
import {DeleteItemDialog} from "@/components/DeleteItemDialog"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Progress} from "@/components/ui/progress"
import {motion, AnimatePresence} from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  MoreVertical,
  Sparkles,
  Target,
  TrendingUp,
  Edit,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {AITaskGenerator} from "@/components/AiTaskGenerator"
import {useGetListTasks} from "@/hooks/list/useGetListTasks"
import ComponentLoading from "@/components/ComponentLoading"
import {formatDate} from "@/lib/utils/date.utils"
import {ICreateTask} from "@/lib/types/task.types"
import {useListActions} from "@/hooks/tasks/useTaskActions"
import {toast} from "sonner"
import {IUpdateList} from "@/lib/types/list.types"
import {ErrorState} from "@/components/ErrorState"

export default function ItemDetailPage() {
  const {id} = useParams()
  const router = useRouter()

  const {
    data: listData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetListTasks(id as string)
  const {
    toggleTask,
    deleteTask,
    createTask,
    updateList,
    deleteList,
    unmarkAllTasks,
    markAllTasks,
    isLoading: isLoadingActions,
  } = useListActions(id as string)

  const handleTaskToggle = async (taskId: string) => {
    if (!listData) return
    try {
      await toggleTask(taskId)
      toast.success("Tarefa atualizada com sucesso", {
        richColors: true,
        id: "loading-actions",
      })
    } catch (error) {
      toast.error("Erro ao atualizar tarefa", {
        richColors: true,
        id: "loading-actions",
      })
    }
  }

  const handleTaskDelete = async (taskId: string) => {
    if (!listData) return
    try {
      await deleteTask(taskId)
      toast.success("Tarefa deletada com sucesso", {
        richColors: true,
        id: "loading-actions",
      })
    } catch (error) {
      toast.error("Erro ao deletar tarefa", {
        richColors: true,
        id: "loading-actions",
      })
    }
  }

  const handleTaskAdded = async (newTask: ICreateTask) => {
    if (!listData) return
    try {
      await createTask({title: newTask.title})
      toast.success("Tarefa criada com sucesso", {
        richColors: true,
        id: "loading-actions",
      })
    } catch (error) {
      toast.error("Erro ao criar tarefa", {
        richColors: true,
        id: "loading-actions",
      })
    }
  }

  const handleItemUpdated = async (updatedItem: IUpdateList) => {
    if (!listData) return
    try {
      await updateList({title: updatedItem.title})
      toast.success("Lista atualizada com sucesso", {
        richColors: true,
        id: "loading-actions",
      })
    } catch (error) {
      toast.error("Erro ao atualizar lista", {
        richColors: true,
        id: "loading-actions",
      })
    }
  }

  const handleItemDeleted = async () => {
    try {
      await deleteList()
      toast.success("Lista deletada com sucesso", {
        richColors: true,
        id: "loading-actions",
      })
      router.push("/")
    } catch (error) {
      toast.error("Erro ao deletar lista", {
        richColors: true,
        id: "loading-actions",
      })
    }
  }

  const handleMarkAllCompleted = async () => {
    try {
      await markAllTasks()
      toast.success("Todas as tarefas marcadas como concluídas", {
        richColors: true,
        id: "loading-actions",
      })
    } catch (error) {
      toast.error("Erro ao marcar todas as tarefas como concluídas", {
        richColors: true,
        id: "loading-actions",
      })
    }
  }

  const handleUnmarkAll = async () => {
    try {
      await unmarkAllTasks()
      toast.success("Todas as tarefas desmarcadas como concluídas", {
        id: "loading-actions",
        richColors: true,
      })
    } catch (error) {
      toast.error("Erro ao desmarcar todas as tarefas como concluídas", {
        id: "loading-actions",
        richColors: true,
      })
    }
  }

  if (isLoading) {
    return <ComponentLoading />
  }

  if (isLoadingActions) {
    toast.loading("Carregando...", {id: "loading-actions", richColors: true})
  }

  if (isError || !listData) {
    const status = (error as any)?.status

    return (
      <>
        {status === 404 ? (
          <ErrorState
            type="not-found"
            onRetry={refetch}
            showRetry
            backUrl="/"
          />
        ) : (
          <ErrorState type="server" onRetry={refetch} showRetry backUrl="/" />
        )}
      </>
    )
  }

  const completedTasks =
    listData.tasks.filter((task) => task.isCompleted).length || 0
  const totalTasks = listData.tasks.length || 0
  const progressPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-6">
          <Link suppressHydrationWarning href="/">
            <Button variant="ghost" size="sm" className="group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Voltar
            </Button>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-balance mb-2">
                    {listData.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Criado em {formatDate(listData.createdAt)}</span>
                    </div>
                    <Badge variant="outline">
                      {totalTasks} {totalTasks === 1 ? "tarefa" : "tarefas"}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      disabled={isLoadingActions}
                      variant="ghost"
                      size="sm"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <EditItemDialog
                      item={listData}
                      onItemUpdated={handleItemUpdated}
                      trigger={
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar Lista
                        </DropdownMenuItem>
                      }
                    />
                    <AITaskGenerator
                      listId={id as string}
                      disabled={isLoadingActions}
                      trigger={
                        <DropdownMenuItem
                          disabled={isLoadingActions}
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Gerar com IA
                        </DropdownMenuItem>
                      }
                    />
                    <DeleteItemDialog
                      itemId={listData.id}
                      itemTitle={listData.title}
                      onItemDeleted={handleItemDeleted}
                      trigger={
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-destructive"
                        >
                          Excluir Lista
                        </DropdownMenuItem>
                      }
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {totalTasks > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-medium">
                      {completedTasks} de {totalTasks} concluídas
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <AddTaskDialog
                disabled={isLoadingActions}
                onTaskAdded={handleTaskAdded}
              />
              <AITaskGenerator
                disabled={isLoadingActions}
                listId={id as string}
              />
            </div>

            <div className="space-y-4">
              {listData?.tasks?.length === 0 ? (
                <Card className="border-dashed border-2 border-border/50">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Circle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Nenhuma tarefa ainda
                    </h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Adicione tarefas manualmente ou use a IA para gerar uma
                      lista completa
                    </p>
                    <div className="flex gap-2">
                      <AddTaskDialog
                        disabled={isLoadingActions}
                        onTaskAdded={handleTaskAdded}
                      />
                      <AITaskGenerator
                        disabled={isLoadingActions}
                        listId={id as string}
                      />
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Circle className="h-5 w-5 mr-2 text-muted-foreground" />
                      Pendentes (
                      {
                        listData.tasks.filter((task) => !task.isCompleted)
                          .length
                      }
                      )
                    </h3>
                    <ul className="flex flex-col gap-3">
                      <AnimatePresence>
                        {listData.tasks
                          .filter((task) => !task.isCompleted)
                          .sort((a, b) => a.order - b.order)
                          .map((task) => (
                            <motion.li
                              key={task.id}
                              initial={{opacity: 0, y: -10}}
                              animate={{opacity: 1, y: 0}}
                              exit={{opacity: 0, x: -50}}
                              transition={{duration: 0.2}}
                              layout
                            >
                              <TaskItem
                                disabled={isLoadingActions}
                                task={task}
                                onToggle={handleTaskToggle}
                                onDelete={handleTaskDelete}
                              />
                            </motion.li>
                          ))}
                      </AnimatePresence>
                    </ul>
                  </div>

                  {completedTasks > 0 && (
                    <div className="space-y-3 mt-8">
                      <h3 className="text-lg font-semibold flex items-center">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                        Concluídas ({completedTasks})
                      </h3>
                      <ul className="flex flex-col gap-3">
                        <AnimatePresence>
                          {listData.tasks
                            .filter((task) => task.isCompleted)
                            .sort((a, b) => a.order - b.order)
                            .map((task) => (
                              <motion.li
                                key={task.id}
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, x: 50}}
                                transition={{duration: 0.2}}
                                layout
                              >
                                <TaskItem
                                  key={task.id}
                                  task={task}
                                  onToggle={handleTaskToggle}
                                  onDelete={handleTaskDelete}
                                  disabled={isLoadingActions}
                                />
                              </motion.li>
                            ))}
                        </AnimatePresence>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="lg:w-80 space-y-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total de tarefas
                  </span>
                  <span className="font-semibold">{totalTasks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Concluídas
                  </span>
                  <span className="font-semibold text-primary">
                    {completedTasks}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Pendentes
                  </span>
                  <span className="font-semibold">
                    {totalTasks - completedTasks}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Taxa de conclusão
                  </span>
                  <span className="font-semibold">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  disabled={totalTasks === 0 || isLoadingActions}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={handleMarkAllCompleted}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Marcar todas como concluídas
                </Button>
                <Button
                  disabled={totalTasks === 0 || isLoadingActions}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={handleUnmarkAll}
                >
                  <Circle className="h-4 w-4 mr-2" />
                  Desmarcar todas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
