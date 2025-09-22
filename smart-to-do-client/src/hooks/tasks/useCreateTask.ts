"use-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ICreateTask, ITaskWithListData } from "@/lib/types/task.types"

export function useCreateTask(id: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (formData: ICreateTask) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error("Failed to create task")
            }
            const data: ITaskWithListData = await response.json()
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-list-tasks", id],

            })
        },
    })
}
