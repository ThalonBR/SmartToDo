"use-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ITask } from "@/lib/types/task.types"

export function useUnmarkAllTasks(id: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}/unmarkAll`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error("Failed to unmark all tasks")
            }
            const data: ITask[] = await response.json()
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-list-tasks", id],
            })
        },
    })
}
