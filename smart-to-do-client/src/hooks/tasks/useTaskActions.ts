import { useToggleTask } from "@/hooks/tasks/useToggleTask"
import { useDeleteTask } from "@/hooks/tasks/useDeleteTask"
import { useCreateTask } from "@/hooks/tasks/useCreateTask"
import { useUpdateList } from "@/hooks/list/useUpdateList"
import { useDeleteList } from "@/hooks/list/useDeleteList"
import { useUnmarkAllTasks } from "@/hooks/tasks/useUnmarkAllTasks"
import { useMarkAllTasks } from "@/hooks/tasks/useMarkAllTasks"

export function useListActions(listId: string) {
    const { mutateAsync: toggleTask, isPending: isTogglingTask } = useToggleTask(listId)
    const { mutateAsync: deleteTask, isPending: isDeletingTask } = useDeleteTask(listId)
    const { mutateAsync: createTask, isPending: isCreatingTask } = useCreateTask(listId)
    const { mutateAsync: updateList, isPending: isUpdatingList } = useUpdateList(listId)
    const { mutateAsync: deleteList, isPending: isDeletingList } = useDeleteList(listId)
    const { mutateAsync: unmarkAllTasks, isPending: isUnmarkingAll } = useUnmarkAllTasks(listId)
    const { mutateAsync: markAllTasks, isPending: isMarkingAll } = useMarkAllTasks(listId)

    const isLoading = isTogglingTask || isDeletingTask || isCreatingTask || isUpdatingList || isDeletingList || isUnmarkingAll || isMarkingAll

    return {
        toggleTask,
        deleteTask,
        createTask,
        updateList,
        deleteList,
        unmarkAllTasks,
        markAllTasks,
        isLoading,
    }
}